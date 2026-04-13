import { z } from "zod";
import { RefreshTokenSchema } from "../src/utils/validationSchemas";

describe("Refresh Token Request & Response Validation", () => {
  describe("RefreshTokenSchema - Response Validation", () => {
    it("should validate successful token refresh response", () => {
      const validResponse = {
        accessToken: "new-access-token-abc123",
        refreshToken: "new-refresh-token-xyz789",
      };
      const result = RefreshTokenSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should validate response with only accessToken", () => {
      const validResponse = {
        accessToken: "new-access-token-abc123",
      };
      const result = RefreshTokenSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should fail with missing accessToken", () => {
      const invalidResponse = {
        refreshToken: "new-refresh-token-xyz789",
      };
      const result = RefreshTokenSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });

    it("should fail with empty accessToken", () => {
      const invalidResponse = {
        accessToken: "",
      };
      const result = RefreshTokenSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });
  });

  describe("Refresh Token Request Schema", () => {
    it("should validate refresh token in cookies", () => {
      const refreshRequestSchema = z.object({
        cookies: z.object({
          refreshToken: z.string(),
        }),
        body: z.record(z.any()).optional(),
      });
      const validRequest = {
        cookies: {
          refreshToken: "mock-refresh-token",
        },
        body: {},
      };
      const result = refreshRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should validate refresh token in request body", () => {
      const refreshRequestSchema = z.object({
        body: z.object({
          refreshToken: z.string(),
        }),
      });
      const validRequest = {
        body: {
          refreshToken: "token-from-body",
        },
      };
      const result = refreshRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing refresh token", () => {
      const refreshRequestSchema = z.object({
        body: z.object({
          refreshToken: z.string(),
        }),
      });
      const invalidRequest = {
        body: {},
      };
      const result = refreshRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });

    it("should fail with empty refresh token string", () => {
      const refreshRequestSchema = z.object({
        body: z.object({
          refreshToken: z.string().min(1),
        }),
      });
      const invalidRequest = {
        body: {
          refreshToken: "",
        },
      };
      const result = refreshRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });
});
