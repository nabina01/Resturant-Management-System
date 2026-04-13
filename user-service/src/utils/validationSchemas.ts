import { z } from "zod";

// User Schemas
export const UserSchema = z.object({
  id: z.string().min(1, "ID is required"),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional().nullable(),
  role: z.enum(["admin", "user", "restaurant_owner"]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().optional(),
  user: UserSchema,
});

export const ProfileUpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
});

export const RefreshTokenSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().optional(),
});

// Request Schemas
export const LoginRequestSchema = z.object({
  body: LoginSchema,
});

export const RegisterRequestSchema = z.object({
  body: CreateUserSchema,
});

export const ProfileRequestSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const UpdateProfileRequestSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  body: ProfileUpdateSchema,
});

// Auth Middleware Schemas
export const AuthHeaderSchema = z.object({
  authorization: z
    .string()
    .refine(
      (val) => val.startsWith("Bearer "),
      "Must start with 'Bearer '"
    )
    .transform((val) => val.replace("Bearer ", "")),
});

export const AuthenticatedRequestSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  user: z.object({
    userId: z.string().min(1, "User ID is required"),
    email: z.string().email(),
    role: z.string(),
  }),
});
