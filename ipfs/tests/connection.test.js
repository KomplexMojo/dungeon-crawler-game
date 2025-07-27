import { describe, it, expect } from 'vitest';
import { testConnection } from '../utils/connection.js';

describe('IPFS Infura Connection', () => {
  it('should connect and return a version string', async () => {
    const data = await testConnection();
    expect(data).toHaveProperty('Version');
    expect(typeof data.Version).toBe('string');
    expect(data.Version.length).toBeGreaterThan(0);
    console.log('IPFS node version:', data.Version);
  });
});