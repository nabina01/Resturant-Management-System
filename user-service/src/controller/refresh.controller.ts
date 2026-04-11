import { Request, Response, NextFunction } from "express";
import { refreshService } from "../service/refresh.service";

export const refreshUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.["refreshToken"] || req.body?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const { accessToken, newRefreshToken } = await refreshService(
      refreshToken
    );

    res.cookie("refreshToken", newRefreshToken);

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};
