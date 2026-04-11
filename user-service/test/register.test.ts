import { Request, Response, NextFunction } from "express";
import { registerUser } from "../src/controller/register.controller";
import * as registerServiceModule from "../src/service/register.service";

jest.mock("../src/service/register.service");

describe("Register Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "newuser@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
      },
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should successfully register a new user", async () => {
      const mockRegisterService = registerServiceModule.registerService as jest.Mock;
      const mockUser = {
        id: "1",
        email: "newuser@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
      };

      mockRegisterService.mockResolvedValue(mockUser);

      await registerUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRegisterService).toHaveBeenCalledWith({
        email: "newuser@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle duplicate email error", async () => {
      const mockRegisterService = registerServiceModule.registerService as jest.Mock;
      const mockError = new Error("Email already exists");

      mockRegisterService.mockRejectedValue(mockError);

      await registerUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should handle missing required fields", async () => {
      mockReq.body = { email: "newuser@example.com" };
      const mockRegisterService = registerServiceModule.registerService as jest.Mock;
      const mockError = new Error("Missing required fields");

      mockRegisterService.mockRejectedValue(mockError);

      await registerUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should handle validation errors", async () => {
      const mockRegisterService = registerServiceModule.registerService as jest.Mock;
      const mockError = new Error("Invalid email format");

      mockRegisterService.mockRejectedValue(mockError);

      await registerUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
