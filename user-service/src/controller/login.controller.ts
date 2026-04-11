import { Request, Response, NextFunction } from "express";
import { loginService } from "../service/login.service";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await loginService(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken);

    return res.json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
