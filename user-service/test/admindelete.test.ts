import { Request, Response, NextFunction } from "express";
import { deleteUser } from "../src/controller/delete.controller";
import * as deleteServiceModule from "../src/service/delete.service";

jest.mock("../src/service/delete.service");

describe("Delete Controller", () => {
  let mockReq: Partial<any>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      userId: "user-123",
      user: {
        role: "user",
      },
    };

    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe("deleteUser", () => {
    it("should successfully delete user", async () => {
      const mockDeleteUserService =
        deleteServiceModule.deleteUserService as jest.Mock;

      mockDeleteUserService.mockResolvedValue(undefined);

      await deleteUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockDeleteUserService).toHaveBeenCalledWith("user-123", "user");
      expect(mockRes.json).toHaveBeenCalledWith({ message: "User deleted" });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle admin role deletion", async () => {
      mockReq.user.role = "admin";
      const mockDeleteUserService =
        deleteServiceModule.deleteUserService as jest.Mock;

      mockDeleteUserService.mockResolvedValue(undefined);

      await deleteUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockDeleteUserService).toHaveBeenCalledWith("user-123", "admin");
      expect(mockRes.json).toHaveBeenCalledWith({ message: "User deleted" });
    });

    it("should handle deletion service errors", async () => {
      const mockDeleteUserService =
        deleteServiceModule.deleteUserService as jest.Mock;
      const mockError = new Error("User not found");

      mockDeleteUserService.mockRejectedValue(mockError);

      await deleteUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should handle unauthorized deletion attempts", async () => {
      const mockDeleteUserService =
        deleteServiceModule.deleteUserService as jest.Mock;
      const mockError = new Error("Unauthorized to delete this user");

      mockDeleteUserService.mockRejectedValue(mockError);

      await deleteUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should handle missing userId", async () => {
      mockReq.userId = undefined;
      const mockDeleteUserService =
        deleteServiceModule.deleteUserService as jest.Mock;
      const mockError = new Error("User ID is required");

      mockDeleteUserService.mockRejectedValue(mockError);

      await deleteUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should pass correct parameters to delete service", async () => {
      mockReq.userId = "another-user-id";
      mockReq.user.role = "moderator";

      const mockDeleteUserService =
        deleteServiceModule.deleteUserService as jest.Mock;

      mockDeleteUserService.mockResolvedValue(undefined);

      await deleteUser(mockReq as any, mockRes as Response, mockNext);

      expect(mockDeleteUserService).toHaveBeenCalledWith(
        "another-user-id",
        "moderator"
      );
    });
  });
});
