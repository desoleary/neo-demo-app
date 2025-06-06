import { describe, it, expect } from 'vitest';
import { request } from '../setup';
import { createUser, createAccount } from '../utils';
import fs from 'fs';

const createAccountQuery = fs.readFileSync(require.resolve('../fixtures/createAccount.graphql'), 'utf8');
const getAccountQuery = fs.readFileSync(require.resolve('../fixtures/getAccount.graphql'), 'utf8');

describe('Account GraphQL', () => {
  it('creates an account', async () => {
    const user = await createUser();
    const res = await request.post('/').send({ query: createAccountQuery, variables: { userId: user.id, balance: 50 } });
    expect(res.status).toBe(200);
    expect(res.body.data.createAccount.balance).toBe(50);
  });

  it('gets an account', async () => {
    const user = await createUser();
    const account = await createAccount(user.id);
    const res = await request.post('/').send({ query: getAccountQuery, variables: { id: account.id } });
    expect(res.status).toBe(200);
    expect(res.body.data.account.id).toBe(account.id);
  });
});
