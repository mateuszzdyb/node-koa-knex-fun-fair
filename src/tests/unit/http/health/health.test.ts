import { Server } from 'node:http';
import supertest from 'supertest';
import httpLoader from '../../../../interface/http';

describe('Get /health', () => {
  let server: Partial<Server> = {};
  beforeAll(async () => {
    const app = await httpLoader();
    server = app.listen(3000);
  });

  afterAll(() => {
    if (server.close) {
      server.close();
    }
  });
  it('returns ok with no header used', (done) => {
    supertest(server).get('/health').expect(200, {}, done);
  });

  it('returns 404 for non-existing path', (done) => {
    supertest(server).get('/healthss').expect(404, done);
  });
});
