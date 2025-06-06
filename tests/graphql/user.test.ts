import { describe, it, expect } from 'vitest';
import { request } from '../setup';
import { createUser } from '../utils';
import fs from 'fs';

const createUserQuery = fs.readFileSync(require.resolve('../fixtures/createUser.graphql'), 'utf8');
const getUserQuery = fs.readFileSync(require.resolve('../fixtures/getUser.graphql'), 'utf8');

describe('User GraphQL', () => {
  it('creates a user', async () => {
    const res = await request
      .post('/')
      .send({
        query: createUserQuery,
        variables: { name: 'Alice', email: 'alice@example.com' },
      });
    expect(res.status).toBe(200);
    expect(res.body.data.createUser.name).toBe('Alice');
    expect(res.body.data.createUser.email).toBe('alice@example.com');
  });

  it('gets a user by id', async () => {
    const user = await createUser({ name: 'Bob' });
    const res = await request.post('/').send({ query: getUserQuery, variables: { id: user.id } });
    expect(res.status).toBe(200);
    expect(res.body.data.user.name).toBe('Bob');
  });

  it('returns null for missing user', async () => {
    const res = await request.post('/').send({ query: getUserQuery, variables: { id: '612f1b8690f1a0b1c1c1c1c1' } });
    expect(res.status).toBe(200);
    expect(res.body.data.user).toBeNull();
  });
});
