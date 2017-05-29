import * as chai from "chai";

import {UsersService} from "../src/services/users_service"
import {SequentialPromisesUsersService} from "../src/services/a_sequential_promises_service"
import {ParallelPromisesUsersService} from "../src/services/b_parallel_promises_service"
import {SequentialAsyncAwaitUsersService} from "../src/services/c_sequential_async_await_service"
import {ParallelAsyncAwaitUsersService} from "../src/services/d_parallel_async_await_service"
import {BuggyLoopPromisesUsersService} from "../src/services/e_buggy_loop_promises_service"
import {BuggyLoopAsyncAwaitUsersService} from "../src/services/f_buggy_loop_async_await_service"
import {LoopAsyncAwaitUsersService} from "../src/services/g_loop_async_await_service"


const should = chai.should();

function checkNameImplementationWorks(usersService: UsersService): Promise<void> {
    return usersService.getPageUsers()
    .then(result => {
        let users = result.users;
        users[0].should.equal("user1");
        users[1].should.equal("user2");
        users[2].should.equal("user3");
        users[3].should.equal("user4");
        users[4].should.equal("user5");
        result.count.should.equal(5);
    });
}

function checkFullNameImplementationWorks(usersService: UsersService): Promise<void> {
    return usersService.getPageUsers()
    .then(result => {
        let users = result.users;
        users[0].should.equal("user1 surname1");
        users[1].should.equal("user2 surname2");
        users[2].should.equal("user3 surname3");
        users[3].should.equal("user4 surname4");
        users[4].should.equal("user5 surname5");
        result.count.should.equal(5);
    });
}

describe('Traditional promises', () => {
    it('Implementation with sequential promises (without async/await) works', ()=> {
        return checkNameImplementationWorks(new SequentialPromisesUsersService());
    });

    it('Implementation with parallel promises (without async/await) works', ()=> {
        return checkNameImplementationWorks(new ParallelPromisesUsersService());
    });
});

describe('Symple async await', () => {
    it('Implementation with sequential promises (with async/await) works', ()=> {
        return checkNameImplementationWorks(new SequentialAsyncAwaitUsersService());
    });

    it('Implementation with parallel promises (with async/await) works', ()=> {
        return checkNameImplementationWorks(new ParallelAsyncAwaitUsersService());
    });

});

describe('Waiting for promises in a loop', function() {
    this.timeout(10000);

    it('Bad implementation with traditional promises in a loop returns wrong data', ()=> {
        // In that bad implementation when each promise is resolved the loop has finished and
        // it uses by mistake the data from the last loop instead of the calling loop
        let usersService = new BuggyLoopPromisesUsersService();
        return usersService.getPageUsers()
        .then(result => {
            let users = result.users;
            users[0].should.equal("user5 surname1");
            users[1].should.equal("user5 surname2");
            users[2].should.equal("user5 surname3");
            users[3].should.equal("user5 surname4");
            users[4].should.equal("user5 surname5");
            result.count.should.equal(5);
        });
    });

    it('Bad implementation with "await" inside a loop is not resolved', (done)=> {
        // An await inside a loop does not work and the promise is never resolved
        let usersService = new BuggyLoopAsyncAwaitUsersService();
        let promise = usersService.getPageUsers()
        .then((result)=> {
            done( new Error('promise with bug is resolved!'));
        })
        setTimeout(()=> {
            done();
        }, 9000);
    });

    it('Approach with mapping a loop to an array of promises and awaiting for it works', ()=> {
        return checkFullNameImplementationWorks(new LoopAsyncAwaitUsersService());
    });
});