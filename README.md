# Hello

This module is a couple of simple functions that allow you to handle promises inside Lodash/Ramda pipelines.

# Examples

## Promises
    flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => n / 2),
      then((n) => expect(n).toEqual(21)),
    )(42);
    // Promise(21)

## Catching errors
    flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => Promise.reject(n / 2)),
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
    flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => Promise.resolve(n / 2)),
      then(S.Right)
    )(42);
    // Promise(Right(21))
    
You can also use Sanctuary types with `forkP`:


    flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => Promise.resolve(n / 2)),
      forkP(S.Left, S.Right),
    )(42);
    // Promise(Right(21))