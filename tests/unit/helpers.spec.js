import { sort } from '../../src/services/helpers';
import { isEqual } from 'lodash';

describe('helper.js', () => {
  const arr = [
    {
      name: 'Max',
      details: {
        age: 35,
      },
    },
    {
      name: 'Rock',
      details: {
        age: 30,
      },
    },
  ];

  const expectedArr = [
    {
      name: 'Rock',
      details: {
        age: 30,
      },
    },
    {
      name: 'Max',
      details: {
        age: 35,
      },
    },
  ];

  test('should sort object array based on nested key', () => {
    const actual = sort('details.age', arr);
    const expected = expectedArr;

    const isTrue = isEqual(actual, expected);
    expect(isTrue).toBe(true);
  });
});
