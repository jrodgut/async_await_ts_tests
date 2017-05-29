import {UsersService} from "./users_service"

export class LoopAsyncAwaitUsersService extends UsersService {

    /**
     * Implementation to overcome the problem of await not working properly inside a loop
     * using a similar answer like this one https://stackoverflow.com/a/37576787/249699
     */
    async getPageUsers(): Promise<{ users: string[]; count: number; }> {
        let [users, count] = await Promise.all([
                                                   this.usersData.fetchUsers(),
                                                   this.usersData.countUsers()
                                               ]);

        let usersWithSurnames = await Promise.all(users.map(async (user) => {
            let surname = await this.usersData.fetchSurname(user);
            return user + " " + surname;
        }));

        return {
            users: usersWithSurnames,
            count: count
        };
    }
}
