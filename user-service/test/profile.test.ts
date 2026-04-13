import { z } from "zod";
import {
  ProfileRequestSchema,
  UserSchema,
  AuthenticatedRequestSchema,
} from "../src/utils/validationSchemas";

describe("Profile Request & Response Validation", () => {
  describe("ProfileRequestSchema - Request Validation", () => {
    it("should validate profile request with valid userId", () => {
      const validRequest = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
      };
      const result = ProfileRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should validate profile request with string userId", () => {
      const validRequest = {
        userId: "user-123",
      };
      const result = ProfileRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing userId", () => {
      const invalidRequest = {};
      const result = ProfileRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });

    it("should fail with empty userId", () => {
      const invalidRequest = {
        userId: "",
      };
      const result = ProfileRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe("UserSchema - Profile Response Validation", () => {
    it("should validate complete user profile response", () => {
      const validProfile = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
        role: "user",
      };
      const result = UserSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it("should validate user profile with string ID", () => {
      const validProfile = {
        id: "user-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it("should validate user profile without phone", () => {
      const validProfile = {
        id: "user-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it("should validate user profile with null phone", () => {
      const validProfile = {
        id: "user-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: null,
      };
      const result = UserSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it("should fail with invalid email", () => {
      const invalidProfile = {
        id: "user-123",
        email: "invalid-email",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it("should fail with missing firstName", () => {
      const invalidProfile = {
        id: "user-123",
        email: "test@example.com",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it("should fail with empty firstName", () => {
      const invalidProfile = {
        id: "user-123",
        email: "test@example.com",
        firstName: "",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it("should fail with missing lastName", () => {
      const invalidProfile = {
        id: "user-123",
        email: "test@example.com",
        firstName: "John",
      };
      const result = UserSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it("should handle null profile gracefully", () => {
      const result = UserSchema.safeParse(null);
      expect(result.success).toBe(false);
    });
  });

  describe("AuthenticatedRequestSchema - Authenticated Request Validation", () => {
    it("should validate authenticated request with user data", () => {
      const validRequest = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        user: {
          userId: "550e8400-e29b-41d4-a716-446655440000",
          email: "test@example.com",
          role: "user",
        },
      };
      const result = AuthenticatedRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing user object", () => {
      const invalidRequest = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
      };
      const result = AuthenticatedRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });

    it("should fail with invalid user email", () => {
      const invalidRequest = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        user: {
          userId: "550e8400-e29b-41d4-a716-446655440000",
          email: "invalid-email",
          role: "user",
        },
      };
      const result = AuthenticatedRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });
});
