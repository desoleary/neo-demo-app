import { describe, it, expect } from 'vitest';
import { request } from '../setup';
import { createMerchant } from '../utils';
import fs from 'fs';

const createMerchantQuery = fs.readFileSync(require.resolve('../fixtures/createMerchant.graphql'), 'utf8');
const getMerchantQuery = fs.readFileSync(require.resolve('../fixtures/getMerchant.graphql'), 'utf8');

describe('Merchant GraphQL', () => {
  it('creates a merchant', async () => {
    const res = await request.post('/').send({ query: createMerchantQuery, variables: { name: 'Shop' } });
    expect(res.status).toBe(200);
    expect(res.body.data.createMerchant.name).toBe('Shop');
  });

  it('gets a merchant', async () => {
    const merchant = await createMerchant();
    const res = await request.post('/').send({ query: getMerchantQuery, variables: { id: merchant.id } });
    expect(res.status).toBe(200);
    expect(res.body.data.merchant.id).toBe(merchant.id);
  });
});
