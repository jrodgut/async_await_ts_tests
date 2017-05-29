import {UsersData} from "../data/users_data"

export abstract class UsersService {
    usersData: UsersData;

    constructor() {
        this.usersData = new UsersData();
    }

    abstract getPageUsers(): Promise<{ users: string[]; count: number; }>;
}