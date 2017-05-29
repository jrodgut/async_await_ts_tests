/**
 * This class returns some hardcoded data simulating retrieving them from a source like a database.
 */
export class UsersData {
    users: string[] = [
        "user1",
        "user2",
        "user3",
        "user4",
        "user5",
    ];

    // Returns an array of users
    fetchUsers(): Promise<string[]> {
        return new Promise<string[]>(resolve =>{
            setTimeout(() =>resolve(this.users), 1000 * Math.random());
        });
    }

    // returns the number of users in the system
    countUsers(): Promise<number> {
        return new Promise<number>((resolve, reject) =>{
            setTimeout(() =>resolve(5), 1000 * Math.random());
        });
    }

    // Gets the surname of a given username
    fetchSurname(user: string): Promise<string> {
        return new Promise<string>(resolve =>{
            // get the user id
            let userId = parseInt(user.split("user")[1], 10);
            // returns the associated surname
            setTimeout(() =>resolve("surname" + userId), userId * 1000 );
        });
    }
}