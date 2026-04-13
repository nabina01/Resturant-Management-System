import { z } from "zod";
import { ProfileRequestSchema } from "../src/utils/validationSchemas";

describe("Delete User Request & Response Validation", () => {
  describe("Delete Request Validation", () => {
    it("should validate delete request with userId", () => {
      const deleteRequestSchema = z.object({
        userId: z.string(),
        user: z.object({
          role: z.string(),
        }),
      });
      const validRequest = {
        userId: "user-123",
        user: {
          role: "user",
        },
      };
      const result = deleteRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should validate delete request with admin role", () => {
      const deleteRequestSchema = z.object({
        userId: z.string(),
        user: z.object({
          role: z.enum(["user", "admin", "restaurant_owner"]),
        }),
      });
      const validRequest = {
        userId: "user-123",
        user: {
          role: "admin",
        },
      };
      const result = deleteRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should validate delete request with restaurant_owner role", () => {
      const deleteRequestSchema = z.object({
        userId: z.string(),
        user: z.object({
          role: z.enum(["user", "admin", "restaurant_owner"]),
        }),
      });
      const validRequest = {
        userId: "user-123",
        user: {
          role: "restaurant_owner",
        },
      };
      const result = deleteRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing userId", () => {
      const deleteRequestSchema = z.object({
        userId: z.string(),
        user: z.object({
          role: z.string(),
        }),
      });
      const invalidRequest = {
        user: {
          role: "user",
        },
      };
      const result = deleteRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });

    it("should fail with missing user role", () => {
      const deleteRequestSchema = z.object({
        userId: z.string(),
        user: z.object({
          role: z.string(),
        }),
      });
      const invalidRequest = {
        userId: "user-123",
        user: {},
      };
      const result = deleteRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe("Delete Response Validation", () => {
    it("should validate delete success response", () => {
      const deleteResponseSchema = z.object({
        message: z.string(),
      });
      const validResponse = {
        message: "User deleted",
      };
      const result = deleteResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should fail with missing message", () => {
      const deleteResponseSchema = z.object({
        message: z.string(),
      });
      const invalidResponse = {};
      const result = deleteResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });
  });

  describe("ProfileRequestSchema - General Request Validation", () => {
    it("should validate basic profile request", () => {
      const validRequest = {
        userId: "user-123",
      };
      const result = ProfileRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with empty userId", () => {
      const invalidRequest = {
        userId: "",
      };
      const result = ProfileRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });
});
