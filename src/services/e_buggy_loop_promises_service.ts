import {UsersService} from "./users_service"

export class BuggyLoopPromisesUsersService extends UsersService {

    /**
     * Implementation which tries to replicate a bad implementation of
     * waiting for promises in a loop, as the data used when the data is
     * fetch is not the same as the one when the function was invoked as we
     * are in a loop.
     */
    getPageUsers(): Promise<{ users: string[]; count: number; }> {
        let users: string[];

        return Promise.all([
            this.usersData.fetchUsers(),
            this.usersData.countUsers()
        ]).then( result => {
            let users = result[0];
            let count = result[1];
            let usersWithSurnames: string[];

            let surnamePromises: Promise<string>[] = [];
            var user: string = null;
            for(let id in users) {
                user = users[id];
                let surnamePromise =  this.usersData.fetchSurname(user)
                        .then(surname => {
                            return user + " " + surname;
                        })

                surnamePromises.push(surnamePromise);
            }

            return Promise.all(surnamePromises)
                            .then((usersWithSurnames) => {
                                return {
                                    users: usersWithSurnames,
                                    count: result[1]
                                };
                            });
        });
    }
}
