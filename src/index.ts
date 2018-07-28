export function then<T, U>(fn: (arg: T) => U) {
  return function thenPromise(p: Promise<T>): Promise<U> {
    return p.then(fn);
  };
}
