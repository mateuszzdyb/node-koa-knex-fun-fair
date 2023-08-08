import { Server } from 'node:http';
import supertest from 'supertest';
import httpLoader from '../../../interface/http';
import psqlStore from '../../../services/psqlStore';
import projects from '../../mockedData/projects.json';

const mockedProjects = jest.spyOn(psqlStore, 'getPaginatedProjects') as unknown as jest.Mock<
  ReturnType<(limit: string, offset: string) => Promise<object>>
>;

describe('Get /projects', () => {
  let server: Partial<Server> = {};
  let token = '';

  beforeAll(async () => {
    const app = await httpLoader();
    server = app.listen(3000);
    mockedProjects.mockResolvedValue(projects);
    token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.clzLLiiu0H-u2dgeor5pH5CcfMG3WbqA8fvB5wGAQio';
  });

  afterAll(() => {
    if (server.close) {
      server.close();
    }
  });

  it('returns 401 with no header used', (done) => {
    supertest(server).get('/project').expect(401, {}, done);
  });

  it('returns 200 with headers used', (done) => {
    supertest(server).get('/project').set('Authorization', `Bearer ${token}`).expect(200).end(done);
  });

  it('returns array of projects', (done) => {
    supertest(server)
      .get('/project')
      .set('Authorization', `Bearer ${token}`)
      .expect((response) => {
        if (response.body.length !== 2) throw new Error('length supposed to be 2');
        if (response.body[0].id !== 1) throw new Error('expected id is 1');
      })
      .end(done);
  });
});
