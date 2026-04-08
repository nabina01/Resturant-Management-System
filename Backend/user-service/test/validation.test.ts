import { validateRequest, registerSchema, loginSchema } from '../src/utils/validation';

describe('Validation Utilities', () => {
  describe('Register Schema', () => {
    it('should validate correct register data', async () => {
      const data = {
        email: 'test@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = await validateRequest(registerSchema, data);
      expect(result.valid).toBe(true);
      expect(result.data).toEqual(data);
    });

    it('should reject invalid email', async () => {
      const data = {
        email: 'invalid-email',
        password: 'TestPassword123!',
      };

      const result = await validateRequest(registerSchema, data);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid email');
    });

    it('should reject short password', async () => {
      const data = {
        email: 'test@example.com',
        password: 'short',
      };

      const result = await validateRequest(registerSchema, data);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('at least 8 characters');
    });

    it('should accept optional fields', async () => {
      const data = {
        email: 'test@example.com',
        password: 'TestPassword123!',
      };

      const result = await validateRequest(registerSchema, data);
      expect(result.valid).toBe(true);
    });

    it('should reject missing required fields', async () => {
      const data = {
        email: 'test@example.com',
      };

      const result = await validateRequest(registerSchema, data);
      expect(result.valid).toBe(false);
    });
  });

  describe('Login Schema', () => {
    it('should validate correct login data', async () => {
      const data = {
        email: 'test@example.com',
        password: 'TestPassword123!',
      };

      const result = await validateRequest(loginSchema, data);
      expect(result.valid).toBe(true);
      expect(result.data).toEqual(data);
    });

    it('should reject invalid email on login', async () => {
      const data = {
        email: 'not-an-email',
        password: 'TestPassword123!',
      };

      const result = await validateRequest(loginSchema, data);
      expect(result.valid).toBe(false);
    });

    it('should reject missing password on login', async () => {
      const data = {
        email: 'test@example.com',
        password: '',
      };

      const result = await validateRequest(loginSchema, data);
      expect(result.valid).toBe(false);
    });
  });

});
