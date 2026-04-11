import { Request, Response, NextFunction } from "express";
import { refreshUserToken } from "../src/controller/refresh.controller";
import * as refreshServiceModule from "../src/service/refresh.service";

jest.mock("../src/service/refresh.service");

describe("Refresh Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      cookies: {
        refreshToken: "mock-refresh-token",
      },
      body: {},
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("refreshUserToken", () => {
    it("should successfully refresh token from cookie", async () => {
      const mockRefreshService = refreshServiceModule.refreshService as jest.Mock;

      mockRefreshService.mockResolvedValue({
        accessToken: "new-access-token",
        newRefreshToken: "new-refresh-token",
      });

      await refreshUserToken(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRefreshService).toHaveBeenCalledWith("mock-refresh-token");
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "refreshToken",
        "new-refresh-token"
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        accessToken: "new-access-token",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should refresh token from request body if not in cookies", async () => {
      mockReq = {
        cookies: {},
        body: {
          refreshToken: "token-from-body",
        },
      };

      const mockRefreshService = refreshServiceModule.refreshService as jest.Mock;

      mockRefreshService.mockResolvedValue({
        accessToken: "new-access-token",
        newRefreshToken: "new-refresh-token",
      });

      await refreshUserToken(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRefreshService).toHaveBeenCalledWith("token-from-body");
      expect(mockRes.json).toHaveBeenCalledWith({
        accessToken: "new-access-token",
      });
    });

    it("should return 400 if no refresh token provided", async () => {
      mockReq = {
        cookies: {},
        body: {},
      };

      await refreshUserToken(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Refresh token is required",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle invalid refresh token error", async () => {
      const mockRefreshService = refreshServiceModule.refreshService as jest.Mock;
      const mockError = new Error("Invalid refresh token");

      mockRefreshService.mockRejectedValue(mockError);

      await refreshUserToken(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.cookie).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should handle refresh service errors", async () => {
      const mockRefreshService = refreshServiceModule.refreshService as jest.Mock;
      const mockError = new Error("Token verification failed");

      mockRefreshService.mockRejectedValue(mockError);

      await refreshUserToken(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
