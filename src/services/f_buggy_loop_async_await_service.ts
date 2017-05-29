import {UsersService} from "./users_service"

export class BuggyLoopAsyncAwaitUsersService extends UsersService {

    /**
     * Implementation to check that await is not working properly inside a loop
     * replicating this problem: https://stackoverflow.com/q/37576685/249699
     */
    async getPageUsers(): Promise<{ users: string[]; count: number; }> {
        let [users, count] = await Promise.all([
                                                   this.usersData.fetchUsers(),
                                                   this.usersData.countUsers()
                                               ]);

        let usersWithSurnames: string[] = [];

        for(let user of users) {
            let surname = await this.usersData.fetchSurname(user);
            usersWithSurnames.push( user + " " + surname);
        }

        return {
            users: usersWithSurnames,
            count: count
        };
    }
}
