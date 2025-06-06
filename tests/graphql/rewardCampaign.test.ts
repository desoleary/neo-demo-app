import { describe, it, expect } from 'vitest';
import { request } from '../setup';
import { createRewardCampaign } from '../utils';
import fs from 'fs';

const createRewardCampaignQuery = fs.readFileSync(require.resolve('../fixtures/createRewardCampaign.graphql'), 'utf8');
const getRewardCampaignQuery = fs.readFileSync(require.resolve('../fixtures/getRewardCampaign.graphql'), 'utf8');

describe('RewardCampaign GraphQL', () => {
  it('creates a campaign', async () => {
    const res = await request
      .post('/')
      .send({ query: createRewardCampaignQuery, variables: { name: 'Promo', rewardRate: 0.05 } });
    expect(res.status).toBe(200);
    expect(res.body.data.createRewardCampaign.rewardRate).toBe(0.05);
  });

  it('gets a campaign', async () => {
    const campaign = await createRewardCampaign();
    const res = await request.post('/').send({ query: getRewardCampaignQuery, variables: { id: campaign.id } });
    expect(res.status).toBe(200);
    expect(res.body.data.rewardCampaign.id).toBe(campaign.id);
  });
});
