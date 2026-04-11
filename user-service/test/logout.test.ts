import { Request, Response, NextFunction } from "express";
import { logoutUser } from "../src/controller/logout.controller";
import * as logoutServiceModule from "../src/service/logout.service";

jest.mock("../src/service/logout.service");

describe("Logout Controller", () => {
  let mockReq: Partial<any>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      userId: "user-123",
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("logoutUser", () => {
    it("should successfully logout user and clear refresh token cookie", async () => {
      const mockLogoutService = logoutServiceModule.logoutService as jest.Mock;

      mockLogoutService.mockResolvedValue(undefined);

      await logoutUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockLogoutService).toHaveBeenCalledWith("user-123");
      expect(mockRes.clearCookie).toHaveBeenCalledWith("refreshToken");
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Logged out successfully",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle logout service errors", async () => {
      const mockLogoutService = logoutServiceModule.logoutService as jest.Mock;
      const mockError = new Error("Database error");

      mockLogoutService.mockRejectedValue(mockError);

      await logoutUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.clearCookie).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should handle invalid userId", async () => {
      mockReq.userId = undefined;
      const mockLogoutService = logoutServiceModule.logoutService as jest.Mock;
      const mockError = new Error("User ID is required");

      mockLogoutService.mockRejectedValue(mockError);

      await logoutUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should call logout service with correct user ID", async () => {
      const mockLogoutService = logoutServiceModule.logoutService as jest.Mock;

      mockLogoutService.mockResolvedValue(undefined);

      mockReq.userId = "different-user-id";
      await logoutUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockLogoutService).toHaveBeenCalledWith("different-user-id");
    });
  });
});
