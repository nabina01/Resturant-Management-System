import * as Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({ 'string.email': 'Invalid email' }),
  password: Joi.string().min(8).required().messages({ 'string.min': 'Password must be at least 8 characters' }),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().min(10).optional(),
});

export const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
  addressType: Joi.string().default('home'),
  isDefault: Joi.boolean().default(false),
});

export async function validateRequest(schema: Joi.ObjectSchema, data: any) {
  try {
    const value = await schema.validateAsync(data, { abortEarly: false });
    return { valid: true, data: value };
  } catch (err: any) {
    return {
      valid: false,
      error: err.details ? err.details.map((d: any) => d.message).join(', ') : err.message,
    };
  }
}