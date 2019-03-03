import MockAdapter from 'axios-mock-adapter';
import http from '../../src/services/http';

describe('http', () => {
  let mockAxios;

  test('client_id and client_secret are present', (done) => {
    mockAxios = new MockAdapter(http);

    mockAxios.onGet('https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/foo').reply(200, {
      response: 'mockData'
    });

    http.get('/foo').then((res) => {
      expect(res.data).toBe('mockData');
      done();
    });
  });
});
