import { z } from "zod";
import {
  RegisterRequestSchema,
  CreateUserSchema,
  UserSchema,
} from "../src/utils/validationSchemas";

describe("Register Request & Response Validation", () => {
  describe("CreateUserSchema - Registration Input Validation", () => {
    it("should validate correct registration data", () => {
      const validData = {
        email: "newuser@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
      };
      const result = CreateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate registration without phone", () => {
      const validData = {
        email: "newuser@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };
      const result = CreateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should fail with invalid email format", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };
      const result = CreateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with password less than 6 characters", () => {
      const invalidData = {
        email: "newuser@example.com",
        password: "pass",
        firstName: "John",
        lastName: "Doe",
      };
      const result = CreateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with missing firstName", () => {
      const invalidData = {
        email: "newuser@example.com",
        password: "password123",
        lastName: "Doe",
      };
      const result = CreateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with missing lastName", () => {
      const invalidData = {
        email: "newuser@example.com",
        password: "password123",
        firstName: "John",
      };
      const result = CreateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with empty firstName", () => {
      const invalidData = {
        email: "newuser@example.com",
        password: "password123",
        firstName: "",
        lastName: "Doe",
      };
      const result = CreateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with missing email", () => {
      const invalidData = {
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };
      const result = CreateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("RegisterRequestSchema - Full Request Validation", () => {
    it("should validate register request with correct structure", () => {
      const validRequest = {
        body: {
          email: "newuser@example.com",
          password: "password123",
          firstName: "John",
          lastName: "Doe",
          phone: "1234567890",
        },
      };
      const result = RegisterRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing body", () => {
      const invalidRequest = {};
      const result = RegisterRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe("UserSchema - Response Validation", () => {
    it("should validate user response with UUID ID", () => {
      const validUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "newuser@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
        role: "user",
      };
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should validate user response with string ID", () => {
      const validUser = {
        id: "user-123",
        email: "newuser@example.com",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should validate user response with optional fields", () => {
      const validUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "newuser@example.com",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should fail with invalid email in response", () => {
      const invalidUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "invalid-email",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it("should fail with missing ID", () => {
      const invalidUser = {
        email: "newuser@example.com",
        firstName: "John",
        lastName: "Doe",
      };
      const result = UserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });
});
