import S from 'sanctuary';

interface Functor<A> {
  constructor: {
    '@@type': 'sanctuary/Functor';
  };
}

interface Either<A, B> {
  constructor: {
    '@@type': 'sanctuary/Either';
  };
}

interface Maybe<A> {
  constructor: {
    '@@type': 'sanctuary/Maybe';
  };
}

function isEither<T, U>(val: Either<T, U> | any): val is Either<T, U> {
  return S.type(val).name === 'Either';
}

function isMaybe<T>(val: Maybe<T> | any): val is Maybe<T> {
  return S.type(val).name === 'Maybe';
}

export function then<T, U>(fn: (arg: T) => U) {
  return function thenPromise(p: Promise<T>): Promise<U> {
    return p.then(fn);
  };
}

export function thenChain<T, U>(fn: (arg: T) => U) {
  function thenPromiseChain<V>(p: Promise<Either<T, V>>): Promise<Either<T, U>>;
  function thenPromiseChain(p: Promise<Maybe<T>>): Promise<Maybe<U>>;
  function thenPromiseChain(p: Promise<T>): Promise<U>;
  function thenPromiseChain<V>(p: Promise<Either<V, T> | Maybe<T> | T>): Promise<Either<V, U> | Maybe<U> | U> {
    return p.then((val) => {
      if (isEither(val)) return S.map(fn)(val);
      if (isMaybe(val)) return S.map(fn)(val);
      return fn(val);
    });
  }

  return thenPromiseChain;
}

export function catchP<T, U, V>(fn: (arg: U) => V) {
  return function catchPromise(p: Promise<T>): Promise<T | V> {
    return p.catch<V>(fn);
  };
}
