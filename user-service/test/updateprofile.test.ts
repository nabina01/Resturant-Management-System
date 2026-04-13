import { z } from "zod";
import {
  UpdateProfileRequestSchema,
  ProfileUpdateSchema,
  UserSchema,
} from "../src/utils/validationSchemas";

describe("Update Profile Request & Response Validation", () => {
  describe("ProfileUpdateSchema - Update Input Validation", () => {
    it("should validate update with all fields", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        phone: "9876543210",
      };
      const result = ProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate update with only firstName", () => {
      const validData = {
        firstName: "John",
      };
      const result = ProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate update with only lastName", () => {
      const validData = {
        lastName: "Doe",
      };
      const result = ProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate update with only phone", () => {
      const validData = {
        phone: "9876543210",
      };
      const result = ProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate empty update object", () => {
      const validData = {};
      const result = ProfileUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should fail with empty firstName string", () => {
      const invalidData = {
        firstName: "",
      };
      const result = ProfileUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail with empty lastName string", () => {
      const invalidData = {
        lastName: "",
      };
      const result = ProfileUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("UpdateProfileRequestSchema - Full Request Validation", () => {
    it("should validate update request with userId and body", () => {
      const validRequest = {
        userId: "user-123",
        body: {
          firstName: "Jane",
          lastName: "Smith",
          phone: "5551234567",
        },
      };
      const result = UpdateProfileRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should validate request with empty body", () => {
      const validRequest = {
        userId: "user-123",
        body: {},
      };
      const result = UpdateProfileRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it("should fail with missing userId", () => {
      const invalidRequest = {
        body: {
          firstName: "Jane",
        },
      };
      const result = UpdateProfileRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });

    it("should fail with missing body", () => {
      const invalidRequest = {
        userId: "user-123",
      };
      const result = UpdateProfileRequestSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe("UserSchema - Updated User Response Validation", () => {
    it("should validate updated user response", () => {
      const validUser = {
        id: "user-123",
        email: "test@example.com",
        firstName: "Jane",
        lastName: "Smith",
        phone: "5551234567",
      };
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should validate user response without phone", () => {
      const validUser = {
        id: "user-123",
        email: "test@example.com",
        firstName: "Jane",
        lastName: "Smith",
      };
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should fail with invalid email", () => {
      const invalidUser = {
        id: "user-123",
        email: "invalid-email",
        firstName: "Jane",
        lastName: "Smith",
      };
      const result = UserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });
});
