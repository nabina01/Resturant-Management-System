import { Request, Response, NextFunction } from "express";
import { updateUser } from "../src/controller/updateProfile.controller";
import * as updateServiceModule from "../src/service/update.service";

jest.mock("../src/service/update.service");

describe("Update Profile Controller", () => {
  let mockReq: Partial<any>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      userId: "user-123",
      body: {
        firstName: "John",
        lastName: "Doe",
        phone: "9876543210",
        password: "newpassword123",
      },
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("updateUser", () => {
    it("should successfully update user profile with all fields", async () => {
      const mockUpdateService = updateServiceModule.updateService as jest.Mock;
      const mockUpdatedUser = {
        id: "user-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "9876543210",
      };

      mockUpdateService.mockResolvedValue(mockUpdatedUser);

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockUpdateService).toHaveBeenCalledWith("user-123", {
        firstName: "John",
        lastName: "Doe",
        phone: "9876543210",
        password: "newpassword123",
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedUser);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should update only firstName and lastName", async () => {
      mockReq.body = {
        firstName: "Jane",
        lastName: "Smith",
      };

      const mockUpdateService = updateServiceModule.updateService as jest.Mock;
      const mockUpdatedUser = {
        id: "user-123",
        firstName: "Jane",
        lastName: "Smith",
      };

      mockUpdateService.mockResolvedValue(mockUpdatedUser);

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockUpdateService).toHaveBeenCalledWith("user-123", {
        firstName: "Jane",
        lastName: "Smith",
        phone: undefined,
        password: undefined,
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it("should update only phone", async () => {
      mockReq.body = {
        phone: "5555555555",
      };

      const mockUpdateService = updateServiceModule.updateService as jest.Mock;

      mockUpdateService.mockResolvedValue({
        id: "user-123",
        phone: "5555555555",
      });

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockUpdateService).toHaveBeenCalledWith("user-123", {
        firstName: undefined,
        lastName: undefined,
        phone: "5555555555",
        password: undefined,
      });
    });

    it("should update password", async () => {
      mockReq.body = {
        password: "newpassword123",
      };

      const mockUpdateService = updateServiceModule.updateService as jest.Mock;

      mockUpdateService.mockResolvedValue({ id: "user-123" });

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockUpdateService).toHaveBeenCalledWith("user-123", {
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        password: "newpassword123",
      });
    });

    it("should handle empty request body", async () => {
      mockReq.body = {};

      const mockUpdateService = updateServiceModule.updateService as jest.Mock;

      mockUpdateService.mockResolvedValue({ id: "user-123" });

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockUpdateService).toHaveBeenCalledWith("user-123", {
        firstName: undefined,
        lastName: undefined,
        phone: undefined,
        password: undefined,
      });
    });

    it("should handle update service errors", async () => {
      const mockUpdateService = updateServiceModule.updateService as jest.Mock;
      const mockError = new Error("Database error");

      mockUpdateService.mockRejectedValue(mockError);

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should handle user not found error", async () => {
      const mockUpdateService = updateServiceModule.updateService as jest.Mock;
      const mockError = new Error("User not found");

      mockUpdateService.mockRejectedValue(mockError);

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should handle validation errors", async () => {
      const mockUpdateService = updateServiceModule.updateService as jest.Mock;
      const mockError = new Error("Invalid phone format");

      mockUpdateService.mockRejectedValue(mockError);

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should handle missing userId", async () => {
      mockReq.userId = undefined;
      const mockUpdateService = updateServiceModule.updateService as jest.Mock;
      const mockError = new Error("User ID is required");

      mockUpdateService.mockRejectedValue(mockError);

      await updateUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
