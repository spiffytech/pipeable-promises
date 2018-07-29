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

export function forkP<T, U, V, W>(fnReject: (arg: T) => U, fnResolve: (arg: V) => W) {
  return function forkPromise(p: Promise<V>): Promise<U | W> {
    return p.then(fnResolve).catch(fnReject);
  };
}
