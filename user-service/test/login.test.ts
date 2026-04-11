import { Request, Response, NextFunction } from "express";
import { loginUser } from "../src/controller/login.controller";
import * as loginServiceModule from "../src/service/login.service";

jest.mock("../src/service/login.service");

describe("Login Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    it("should successfully login user and return accessToken and user data", async () => {
      const mockLoginService = loginServiceModule.loginService as jest.Mock;
      const mockUser = {
        id: "1",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
      };

      mockLoginService.mockResolvedValue({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: mockUser,
      });

      await loginUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockLoginService).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "refreshToken",
        "mock-refresh-token"
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        accessToken: "mock-access-token",
        user: mockUser,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle login service errors", async () => {
      const mockLoginService = loginServiceModule.loginService as jest.Mock;
      const mockError = new Error("Invalid credentials");

      mockLoginService.mockRejectedValue(mockError);

      await loginUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should handle missing email or password", async () => {
      mockReq.body = {};
      const mockLoginService = loginServiceModule.loginService as jest.Mock;
      const mockError = new Error("Email and password are required");

      mockLoginService.mockRejectedValue(mockError);

      await loginUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
