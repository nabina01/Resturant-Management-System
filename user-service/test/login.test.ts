import { z } from "zod";
import {
  LoginRequestSchema,
  LoginResponseSchema,
  LoginSchema,
} from "../src/utils/validationSchemas";

describe("Login Request & Response Validation", () => {
  describe("LoginSchema - Input Validation", () => {
    it("should validate correct email and password", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };
      const result = LoginSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should fail with invalid email format", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      };
      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with missing password", () => {
      const invalidData = {
        email: "test@example.com",
      };
      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with empty password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "",
      };
      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with missing email", () => {
      const invalidData = {
        password: "password123",
      };
      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("LoginRequestSchema - Full Request Validation", () => {
    it("should validate login request with correct body structure", () => {
      const validRequest = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const result = LoginRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing body", () => {
      const invalidRequest = {};
      const result = LoginRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe("LoginResponseSchema - Response Validation", () => {
    it("should validate correct login response", () => {
      const validResponse = {
        accessToken: "mock-access-token-abc123",
        refreshToken: "mock-refresh-token-xyz789",
        user: {
          id: "550e8400-e29b-41d4-a716-446655440000",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      };
      const result = LoginResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should validate response without refreshToken", () => {
      const validResponse = {
        accessToken: "mock-access-token-abc123",
        user: {
          id: "550e8400-e29b-41d4-a716-446655440000",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      };
      const result = LoginResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should fail with missing accessToken", () => {
      const invalidResponse = {
        user: {
          id: "550e8400-e29b-41d4-a716-446655440000",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      };
      const result = LoginResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it("should fail with invalid user email in response", () => {
      const invalidResponse = {
        accessToken: "mock-access-token-abc123",
        user: {
          id: "550e8400-e29b-41d4-a716-446655440000",
          email: "invalid-email",
          firstName: "John",
          lastName: "Doe",
        },
      };
      const result = LoginResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });
  });
});
