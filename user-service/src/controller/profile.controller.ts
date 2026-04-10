import { Request, Response, NextFunction } from "express";
import { getProfileService } from "../service/profile.service";

export const getProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getProfileService(req.userId);

    return res.json(user ? user : null);
  } catch (err) {
    next(err);
  }
};
