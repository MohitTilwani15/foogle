import MockAdapter from 'axios-mock-adapter';
import { isEqual } from 'lodash';
import http from '../../src/services/http';
import searchRestaurantsModule from '../../src/services/store/modules/searchRestaurantsModule';

describe('search Restaurant Module actions', () => {
  let mockAxios;
  let testContext;

  beforeEach(() => {
    mockAxios = new MockAdapter(http);

    testContext = {
      dispatch: jest.fn(),
      commit: jest.fn(),
      state: {
        restaurants: [],
        venueDetails: {},
      },
    };
  });

  test('should set venue details', async () => {
    mockAxios.onGet('venues/123').reply(200, { response: { venue: 'mockData' } });

    const commitMock = testContext.commit;

    await searchRestaurantsModule.actions.GET_VENUE_DETAILS(testContext, 123);
    expect(commitMock.mock.calls[0]).toEqual(['SET_VENUE_DETAILS', 'mockData']);
  });

  test('should set restaurants list', async () => {
    mockAxios.onGet('venues/search').reply(200, { response: { venues: [{}, {}] } });

    const commitMock = testContext.commit;

    await searchRestaurantsModule.actions.SEARCH_NEARBY_RESTAURANTS(testContext, { params: {}});
    expect(commitMock.mock.calls[0]).toEqual(['SET_RESTAURANTS', [{}, {}]]);
  });
});

describe('search Restaurant Module getters', () => {
  let testState = {};

  beforeEach(() => {
    testState = {
      restaurants: [],
      venueDetails: {},
    };
  });

  test('should give restaurants list of 2', () => {
    testState.restaurants = [{}, {}];

    const actual = searchRestaurantsModule.getters.getRestaurants(testState)(1, 10);
    const expected = [{}, {}];

    const isTrue = isEqual(actual, expected);
    expect(isTrue).toBe(true);
  });

  test('should give total restaurants list counts', () => {
    testState.restaurants = [{}, {}];

    const actual = searchRestaurantsModule.getters.getTotalRestaurantsCount(testState);
    const expected = 2;

    expect(actual).toBe(expected);
  });

  test('should give venue details', () => {
    testState.venueDetails = 'mockData';

    const actual = searchRestaurantsModule.getters.getVenueDetails(testState);
    const expected = 'mockData';

    expect(actual).toBe(expected);
  });
});

describe('search Restaurant Module mutations', () => {
  let testState = {};

  beforeEach(() => {
    testState = {
      restaurants: [],
      venueDetails: {},
    };
  });

  test('should set restaurants', () => {
    searchRestaurantsModule.mutations.SET_RESTAURANTS(testState, [{}, {}]);

    const actual = testState.restaurants;
    const expected = [{}, {}];

    const isTrue = isEqual(actual, expected);
    expect(isTrue).toBe(true);
  });

  test('should set venue details', () => {
    searchRestaurantsModule.mutations.SET_VENUE_DETAILS(testState, 'mockData');

    const actual = testState.venueDetails;
    const expected = 'mockData';

    expect(actual).toBe(expected);

    searchRestaurantsModule.mutations.RESET_VENUE_DETAILS(testState);

    expect(Object.keys(testState.venueDetails).length).toBe(0);
  });
});
