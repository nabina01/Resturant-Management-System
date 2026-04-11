import { Request, Response, NextFunction } from "express";
import { deleteUserService } from "../service/delete.service";

export const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteUserService(req.userId, req.user.role);

    return res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
