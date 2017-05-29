import {UsersService} from "./users_service"

export class ParallelAsyncAwaitUsersService extends UsersService {

    /**
     * Implementation fetching the users in the page and the number
     * of users at the same time using async/await syntax
     */
    async getPageUsers(): Promise<{ users: string[]; count: number; }> {
        let [users, count] = await  Promise.all([
                    this.usersData.fetchUsers(),
                    this.usersData.countUsers()
                ]);

        return {
            users: users,
            count: count
        };

    }
}
