import {flow} from 'lodash/fp';
import S from 'sanctuary';

import * as lib from './index';
const then = lib.then;
const thenChain = lib.thenChain;

describe('It chains promises', () => {
  it('chains simple promises', () => {
    return flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => n / 2),
      then((n) => expect(n).toEqual(21)),
    )(42);
  });

  it('chains nested promises', () => {
    return flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => Promise.resolve(n / 2)),
      then((n) => expect(n).toEqual(21)),
    )(42);
  });
});

describe('It chains Sanctuary types', () => {
  it('chains Rights', () => {
    return flow(
      (n: number) => Promise.resolve(S.Right(n)),
      thenChain((n) => n * 2),
      thenChain((n) => expect(n).toEqual(84)),
    )(42);
  });

  it('chains Maybes', () => {
    return flow(
      (n: number) => Promise.resolve(S.Just(n)),
      thenChain((n) => n * 2),
      thenChain((n) => expect(n).toEqual(84)),
    )(42);
  });

  it('doesn\'t chain Lefts', () => {
    return flow(
      (n: number) => Promise.resolve(S.Left(n)),
      thenChain((n) => n * 2),
      then((v) => {
        expect(S.isLeft(v)).toBe(true)
        S.bimap((l) => expect(l).toEqual(42));
      }),
    )(42);
  });

  it('doesn\'t chain Nothing', () => {
    return flow(
      (n: number) => Promise.resolve(S.Nothing),
      thenChain((n) => n * 2),
      then((v) => expect(S.isNothing(v)).toBe(true)),
    )(42);
  });
});
