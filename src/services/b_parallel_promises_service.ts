import {UsersService} from "./users_service"

export class ParallelPromisesUsersService extends UsersService {

    /**
     * Implementation fetching the users in the page and the number
     * of users at the same time
     */
    getPageUsers(): Promise<{ users: string[]; count: number; }> {
        return Promise.all([
                    this.usersData.fetchUsers(),
                    this.usersData.countUsers()
                ]).then( result => {
                    return {
                        users: result[0],
                        count: result[1]
                    };
                });
    }
}
