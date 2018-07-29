import {flow} from 'lodash/fp';

import * as lib from './index';
const then = lib.then;
const catchP = lib.catchP;

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

  it('catches promises', () => {
    return flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => Promise.reject(n / 2)),
      catchP((n) => n),
      then((n) => expect(n).toEqual(21)),
    )(42);
  });
});
