import { Request, Response, NextFunction } from "express";
import { updateService } from "../service/update.service";

export const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, phone, password } = req.body;

    const updatedUser = await updateService(req.userId, {
      firstName,
      lastName,
      phone,
      password,
    });

    return res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};
