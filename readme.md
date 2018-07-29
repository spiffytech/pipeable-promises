# Hello

This module is a couple of simple functions that allow you to handle promises inside Lodash/Ramda pipelines. It's designed to allow function chaining and point-free handling of promises inline with your synchronous code pipes.

This library tries to support built-in promises, rather than replacing them with an alternate async mechanism.

Includes TypeScript definitions.

# API
- `then(fn)(promise)`: Attaches `fn` to the `then` method of a promise
- `catchP(fn)(promise)`: Attaches `fn` to the `catch` method of a promise
- `fork(fn1, fn2)(promise)`: Runs fn1 if the promise errors, and fn2 if the promise succeeds. Useful for converting a promise to an Either via e.g., Sanctuary.

# Examples

## Promises
    const flow = require('lodash/fp').flow;

    flow(
      (n) => Promise.resolve(n),
      then((n) => n / 2),
      then((n) => expect(n).toEqual(21)),
    )(42);
    // Promise(21)

## Catching errors
    flow(
      (n) => Promise.reject(n),
      then((n) => n / 2),
      catchP((n) => n),
    )(42);
    // Promise(21)

## Try/catch
The `fork` function follows left/right Either semantics, so the rejection branch is the first function, and the resolution branch is the second function.

    flow(
      (n: number) => Promise.resolve(n),
      forkP(double, halve),
    )(42);
    // Promise(21)

    flow(
      (n: number) => Promise.reject(n),
      forkP(double, halve),
    )(42);
    // Promise(84)

## Sanctuary Maybe/Either types
The module is designed to integrate with Sanctuary in a point-free style.

    flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => Promise.resolve(n / 2)),
      then(S.Right)
    )(42);
    // Promise(Right(21))
    
You can also convert promises to Sanctuary types with `forkP`, which performs a one-step then/catch on a promise:

    flow(
      (n) => Promise.resolve(n),
      then((n) => Promise.resolve(n / 2)),
      forkP(S.Left, S.Right),
    )(42);
    // Promise(Right(21))
