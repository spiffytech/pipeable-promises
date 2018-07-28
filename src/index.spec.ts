import {flow} from 'lodash/fp';

import * as lib from './index';
const then = lib.then;

describe('It chains promises', () => {
  it('chains simple promises', () => {
    return flow(
      (n: number): Promise<number> => Promise.resolve(n),
      then((n) => n / 2),
      then((n) => expect(n).toEqual(21)),
    )(42);
  });
});
