import { Request, Response, NextFunction } from "express";
import { registerService } from "../service/register.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const user = await registerService({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
