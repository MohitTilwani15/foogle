import MockAdapter from 'axios-mock-adapter';
import { isEqual } from 'lodash';
import axios from 'axios';
import userModule from '../../src/services/store/modules/userModule';

describe('user module actions', () => {
  let mockAxiosWithAxios;
  let testContext;

  beforeEach(() => {
    mockAxiosWithAxios = new MockAdapter(axios);

    testContext = {
      dispatch: jest.fn(),
      commit: jest.fn(),
      state: {
        user: {},
        isAuthenticated: false,
      },
    };
  });

  test('should fetch access token', async () => {
    mockAxiosWithAxios.onGet('https://cors-anywhere.herokuapp.com/https://foursquare.com/oauth2/access_token').reply(200, { access_token: 'access_token' });

    const commitMock = testContext.commit;

    await userModule.actions.GET_ACCESS_TOKEN(testContext, { params: {}});
    expect(commitMock.mock.calls[0]).toEqual(['SET_AUTHENTICATION', true]);
  });
});

describe('user module getters', () => {
  let testState = {};

  beforeEach(() => {
    testState = {
      user: {},
      isAuthenticated: false,
    };
  });

  test('should return isAuthenticated as false', () => {
    const actual = userModule.getters.isAuthenticated(testState);
    const expected = false;

    expect(actual).toBe(expected);
  });

  test('should return isAuthenticated as true', () => {
    testState.isAuthenticated = true;

    const actual = userModule.getters.isAuthenticated(testState);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('should return user fav venue', () => {
    testState.user = ['venue1', 'venue2'];

    const actual = userModule.getters.getUser(testState);
    const expected = ['venue1', 'venue2'];

    const isTrue = isEqual(actual, expected);
    expect(isTrue).toBe(true);
  });
});

describe('user module mutations', () => {
  let testState = {};

  beforeEach(() => {
    testState = {
      user: {},
      isAuthenticated: false,
    };
  });

  test('should set isAuthenticated to true', () => {
    userModule.mutations.SET_AUTHENTICATION(testState, true);

    const actual = testState.isAuthenticated;
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('should set user favorite venue details', () => {
    userModule.mutations.SET_USER(testState, { venue: { name: 'mockRestaurant', likes: 30 }});

    const actual = testState.user;
    const expected = { venue: { name: 'mockRestaurant', likes: 30 }};

    const isTrue = isEqual(actual, expected);
    expect(isTrue).toBe(true);
  });
});
