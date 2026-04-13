import { z } from "zod";
import { ProfileRequestSchema } from "../src/utils/validationSchemas";

describe("Logout Request Validation", () => {
  describe("ProfileRequestSchema - Logout Request Validation", () => {
    it("should validate logout request with valid userId", () => {
      const validRequest = {
        userId: "user-123",
      };
      const result = ProfileRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should validate logout request with UUID format userId", () => {
      const validRequest = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
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

    it("should fail with null userId", () => {
      const invalidRequest = {
        userId: null,
      };
      const result = ProfileRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe("Logout Response Structure", () => {
    it("should validate logout success response format", () => {
      const logoutResponseSchema = z.object({
        message: z.string(),
      });
      const validResponse = {
        message: "Logged out successfully",
      };
      const result = logoutResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should fail with missing message", () => {
      const logoutResponseSchema = z.object({
        message: z.string(),
      });
      const invalidResponse = {};
      const result = logoutResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });
  });
});
