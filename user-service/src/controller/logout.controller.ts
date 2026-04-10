import { Request, Response, NextFunction } from "express";
import { logoutService } from "../service/logout.service";

export const logoutUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    await logoutService(req.userId);

    res.clearCookie("refreshToken");

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
