import {flow} from 'lodash/fp';

import * as lib from './index';
const then = lib.then;
const catchP = lib.catchP;
const forkP = lib.forkP;

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
      (n: number) => Promise.resolve(n),
      then((n) => Promise.resolve(n / 2)),
      then((n: number) => expect(n).toEqual(21)),
    )(42);
  });

  it('catches promises', () => {
    return flow(
      (n: number): Promise<number> => Promise.reject(n),
      then((n) => n / 2),
      catchP((n) => n),
      then((n) => expect(n).toEqual(42)),
    )(42);
  });
});

describe('Forking promises', () => {
  const double = (n: number) => n * 2;
  const halve = (n: number) => n / 2;

  it('Handles promise resolution', () => {
    return flow(
      (n: number) => Promise.resolve(n),
      forkP(double, halve),
      then((n) => expect(n).toEqual(21)),
    )(42);
  });

  it('Handles promise rejection', () => {
    return flow(
      (n: number) => Promise.reject(n),
      forkP(double, halve),
      then((n) => expect(n).toEqual(84)),
    )(42);
  });
});
