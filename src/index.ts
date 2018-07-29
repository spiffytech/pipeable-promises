type Unpacked<T> =
    T extends Array<infer U> ? U :
    T extends (...args: any[]) => infer V ? V :
    T extends Promise<infer W> ? W :
    T;

export function then<T, U>(fn: (arg: T) => U) {
  function thenPromise(p: Promise<T>): Promise<Unpacked<U>> {
    return p.then(fn) as Promise<Unpacked<U>>;
  }

  return thenPromise;
}

export function catchP<T, U, V>(fn: (arg: U) => V) {
  return function catchPromise(p: Promise<T>): Promise<T | V> {
    return p.catch<V>(fn);
  };
}

export function forkP<T, U, V, W>(fnReject: (arg: T) => U, fnResolve: (arg: V) => W) {
  return function forkPromise(p: Promise<V>): Promise<Unpacked<U> | Unpacked<W>> {
    return p.then(fnResolve).catch(fnReject) as Promise<Unpacked<U> | Unpacked<W>>;
  };
}
