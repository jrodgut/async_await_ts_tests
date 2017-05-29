# async_await_ts_tests
Some tests for different implementations of waiting for promises using async/await for Typescript 2.1 with ES5 target.

Each test has a different implementation to solve the typical problem of fetching data from 2 different promises
and joining the results in a single response. Those implementations called Buggy... are bad implementations to solve
the problem, so we test that they are not working.

## Setup
Install dependencies with node
```
npm install
```

# Run tests
Simply execute
```
npm test
```