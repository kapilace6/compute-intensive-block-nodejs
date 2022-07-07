## Instructions
`npm install` <br>
`npm start`

## Code Structure
Script is contained within index.js
Contains 2 routes for the Fibonacci Series
 - Promise Fib (blocking) - `http://localhost:3000/api/promise/fib/:n`
 - Set Immediate Fib (non-blocking) - `http://localhost:3000/api/immediate/fib/:n`

## Observations
The Promise Fib method, is a naive implementation using promises which blocks the event loop. This is because each new call adds the timer block, and does not let the poll phase for I/O operations, including route checks take place. As a result, no other operation takes place until all events in the timer queue are executed.
<p>

However, the `setImmediate` function adds functions to a different queue, i.e. the check phase in the event loop. This allows the event loop to poll in each iteration of the event loop, due to the precedence order. As a result, this function call is non-blocking. However, due to the overhead of adding items to this queue, the execution is very slow and not recommended.
<p>

Ideal approach should make use of the additional hardware avaiable in server systems. Break away from the single threaded application within node.js, and make use of `child processes` or `worker threads/pools` for compute intensive process.
<p>

Thank you for the challenge :)

## References
1. https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
1. https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
1. https://yarin.dev/nodejs-cpu-bound-tasks-worker-threads/
1. https://jinoantony.com/blog/setimmediate-vs-process-nexttick-in-nodejs