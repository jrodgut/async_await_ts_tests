import {UsersService} from "./users_service"

export class SequentialAsyncAwaitUsersService extends UsersService {

    /**
     * Implementation fetching first the users in the page and then
     * the number of users with async/await syntax
     */
    async getPageUsers(): Promise<{ users: string[]; count: number; }> {

        let users = await this.usersData.fetchUsers();

        let count = await this.usersData.countUsers();

        return {
            users: users,
            count: count
        };
    }
}
