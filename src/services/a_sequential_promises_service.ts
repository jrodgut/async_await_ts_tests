import {UsersService} from "./users_service"

export class SequentialPromisesUsersService extends UsersService {

    /**
     * Implementation fetching first the users in the page and then
     * the number of users
     */
    getPageUsers(): Promise<{ users: string[]; count: number; }> {
        let users: string[];

        return this.usersData.fetchUsers()
                .then(usersInPage => {
                    users = usersInPage;
                    return this.usersData.countUsers();
                })
                .then(countInResponse => {
                    let count = countInResponse;
                    return {
                        users: users,
                        count: count
                    }
                });
    }
}
