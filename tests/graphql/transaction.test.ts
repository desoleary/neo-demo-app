import { describe, it, expect } from 'vitest';
import { request } from '../setup';
import { createUser, createAccount, createMerchant, createTransaction } from '../utils';
import fs from 'fs';

const createTransactionQuery = fs.readFileSync(require.resolve('../fixtures/createTransaction.graphql'), 'utf8');
const getTransactionQuery = fs.readFileSync(require.resolve('../fixtures/getTransaction.graphql'), 'utf8');

describe('Transaction GraphQL', () => {
  it('creates a transaction', async () => {
    const user = await createUser();
    const account = await createAccount(user.id);
    const merchant = await createMerchant();
    const res = await request
      .post('/')
      .send({ query: createTransactionQuery, variables: { accountId: account.id, merchantId: merchant.id, amount: 20 } });
    expect(res.status).toBe(200);
    expect(res.body.data.createTransaction.rewardsEarned).toBeCloseTo(0.2);
  });

  it('gets a transaction', async () => {
    const user = await createUser();
    const account = await createAccount(user.id);
    const merchant = await createMerchant();
    const txn = await createTransaction(account.id, merchant.id);
    const res = await request.post('/').send({ query: getTransactionQuery, variables: { id: txn.id } });
    expect(res.status).toBe(200);
    expect(res.body.data.transaction.id).toBe(txn.id);
  });
});
