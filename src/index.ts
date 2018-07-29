export function then<T, U>(fn: (arg: T) => U) {
  return function thenPromise(p: Promise<T>): Promise<U> {
    return p.then(fn);
  };
}

export function catchP<T, U, V>(fn: (arg: U) => V) {
  return function catchPromise(p: Promise<T>): Promise<T | V> {
    return p.catch<V>(fn);
  };
}
