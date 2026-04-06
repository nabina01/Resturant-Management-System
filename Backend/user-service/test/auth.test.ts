import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  compareToken,
} from '../src/utils/auth';

describe('Auth Utilities', () => {
  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);

      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'TestPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });

    it('should compare password with its hash correctly', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);

      const isValid = await comparePassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should return false when comparing wrong password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hash = await hashPassword(password);

      const isValid = await comparePassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });

  describe('JWT Token', () => {
    it('should generate a valid access token', () => {
      const userId = 'test-user-123';
      const email = 'test@example.com';
      const role = 'CUSTOMER';

      const token = generateAccessToken({ userId, email, role });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); 
    });

    it('should verify a valid access token', () => {
      const userId = 'test-user-123';
      const email = 'test@example.com';
      const role = 'CUSTOMER';

      const token = generateAccessToken({ userId, email, role });
      const payload = verifyAccessToken(token);

      expect(payload).not.toBeNull();
      expect(payload?.userId).toBe(userId);
      expect(payload?.email).toBe(email);
      expect(payload?.role).toBe(role);
    });

    it('should return null for invalid access token', () => {
      const invalidToken = 'invalid.token.here';
      const payload = verifyAccessToken(invalidToken);

      expect(payload).toBeNull();
    });

    it('should return null for empty token', () => {
      const payload = verifyAccessToken('');
      expect(payload).toBeNull();
    });

    it('should generate and verify refresh token', () => {
      const userId = 'user-456';
      const email = 'another@example.com';
      const role = 'ADMIN';

      const token = generateRefreshToken({ userId, email, role });
      const payload = verifyRefreshToken(token);

      expect(payload?.userId).toBe(userId);
      expect(payload?.email).toBe(email);
      expect(payload?.role).toBe(role);
    });

    it('should hash and compare refresh token value', async () => {
      const token = 'sample-refresh-token';
      const tokenHash = await hashToken(token);

      expect(await compareToken(token, tokenHash)).toBe(true);
      expect(await compareToken('bad-token', tokenHash)).toBe(false);
    });
  });
});
