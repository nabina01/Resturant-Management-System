import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(10).optional(),
});

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  addressType: z.string().default('home'),
  isDefault: z.boolean().default(false),
});

export async function validateRequest(schema: z.ZodSchema, data: any) {
  try {
    const value = await schema.parseAsync(data);
    return { valid: true, data: value };
  } catch (err: any) {
    return {
      valid: false,
      error: err.errors ? err.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ') : err.message,
    };
  }
}