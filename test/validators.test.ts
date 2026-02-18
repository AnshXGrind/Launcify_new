import { describe, it, expect } from 'vitest';

import { validateStrategy, validateEstimate } from '../lib/validators';

describe('validators', () => {
  it('validates a correct strategy object', async () => {
    const obj = {
      diagnosis: 'Some issue',
      recommendedSystem: 'Custom system',
      estimatedHoursSaved: '10-20 hours',
      implementationPlan: [{ week: 'Week 1', task: 'Do stuff' }],
      topTools: ['Supabase'],
      nextStep: 'Book a call',
    };
    const res = await validateStrategy(obj);
    expect(res).not.toBeNull();
    if (res) expect(res.diagnosis).toBe('Some issue');
  });

  it('rejects invalid strategy objects', async () => {
    const obj = { foo: 'bar' };
    const res = await validateStrategy(obj as any);
    expect(res).toBeNull();
  });

  it('validates a correct estimate', async () => {
    const obj = { weeks: 3, ballpark_usd: '$5k-$10k', note: 'Example' };
    const res = await validateEstimate(obj);
    expect(res).not.toBeNull();
    if (res) expect(res.weeks).toBe(3);
  });

  it('rejects invalid estimate', async () => {
    const obj = { weeks: 'three' };
    const res = await validateEstimate(obj as any);
    expect(res).toBeNull();
  });
});
