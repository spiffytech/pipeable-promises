import {flow} from 'lodash/fp';

import * as lib from './index';

describe('It chains promises', () => {
  it('chains simple promises', () => {
    return flow(
      (n: number): Promise<number> => Promise.resolve(n),
      lib.then((n) => n / 2),
      lib.then((n) => expect(n).toEqual(21)),
    )(42);
  });
});
