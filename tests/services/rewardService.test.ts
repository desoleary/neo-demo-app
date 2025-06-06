import { describe, it, expect } from 'vitest';
import { calculateRewards } from '../../src/services/rewardService';

describe('rewardService', () => {
  it('calculates rewards correctly', () => {
    expect(calculateRewards(100, 0.1)).toBe(10);
  });
});
