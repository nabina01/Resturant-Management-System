import { validateRequest, registerSchema, loginSchema, addressSchema } from '../validation';

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

  describe('Address Schema', () => {
    it('should validate correct address data', async () => {
      const data = {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        addressType: 'home',
      };

      const result = await validateRequest(addressSchema, data);
      expect(result.valid).toBe(true);
    });

    it('should use default values', async () => {
      const data = {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      };

      const result = await validateRequest(addressSchema, data);
      expect(result.valid).toBe(true);
      expect(result.data?.addressType).toBe('home');
      expect(result.data?.isDefault).toBe(false);
    });

    it('should reject incomplete address', async () => {
      const data = {
        street: '123 Main St',
        city: 'New York',
      };

      const result = await validateRequest(addressSchema, data);
      expect(result.valid).toBe(false);
    });

    it('should allow custom address type', async () => {
      const data = {
        street: '456 Work Ave',
        city: 'Boston',
        state: 'MA',
        zipCode: '02101',
        country: 'USA',
        addressType: 'work',
      };

      const result = await validateRequest(addressSchema, data);
      expect(result.valid).toBe(true);
      expect(result.data?.addressType).toBe('work');
    });
  });
});
