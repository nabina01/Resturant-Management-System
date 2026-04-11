import { Request, Response, NextFunction } from "express";
import { getProfile } from "../src/controller/profile.controller";
import * as profileServiceModule from "../src/service/profile.service";

jest.mock("../src/service/profile.service");

describe("Profile Controller", () => {
  let mockReq: Partial<any>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      userId: "user-123",
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("should successfully retrieve user profile", async () => {
      const mockGetProfileService =
        profileServiceModule.getProfileService as jest.Mock;
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
      };

      mockGetProfileService.mockResolvedValue(mockUser);

      await getProfile(mockReq as any, mockRes as Response, mockNext);

      expect(mockGetProfileService).toHaveBeenCalledWith("user-123");
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return null when user not found", async () => {
      const mockGetProfileService =
        profileServiceModule.getProfileService as jest.Mock;

      mockGetProfileService.mockResolvedValue(null);

      await getProfile(mockReq as any, mockRes as Response, mockNext);

      expect(mockGetProfileService).toHaveBeenCalledWith("user-123");
      expect(mockRes.json).toHaveBeenCalledWith(null);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle profile service errors", async () => {
      const mockGetProfileService =
        profileServiceModule.getProfileService as jest.Mock;
      const mockError = new Error("Database connection failed");

      mockGetProfileService.mockRejectedValue(mockError);

      await getProfile(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should handle missing userId", async () => {
      mockReq.userId = undefined;
      const mockGetProfileService =
        profileServiceModule.getProfileService as jest.Mock;
      const mockError = new Error("User ID is required");

      mockGetProfileService.mockRejectedValue(mockError);

      await getProfile(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
