import request from 'supertest';

import {
  connectWithMongoose,
  clearDatabaseAndRestartCounters,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../test';
import { createUser } from '../modules/user/fixtures/createUser';
import app from '../app';
import { generateJwtToken } from '../auth';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

describe('app server', () => {
  it('should return 200 and return logged user', async () => {
    const user = await createUser();
    const token = generateJwtToken(user);

    const query = `
      query Q {
        me {
          email
          username
        }
      }
    `;

    const variables = {};

    const payload = {
      query,
      variables,
    };

    const response = await request(app.callback())
      .post('/graphql')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      })
      .send(JSON.stringify(payload));

    expect(response.status).toBe(200);
    expect(response.body.data.me.email).toBe(user.email);
    expect(response.body.data.me.username).toBe(user.username);
    expect(sanitizeTestObject(response.body)).toMatchSnapshot();
  });
});
