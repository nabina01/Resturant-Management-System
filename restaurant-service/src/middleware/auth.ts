import { NextFunction, Request, Response } from "express";

export const requireAdminKey = (req: Request, res: Response, next: NextFunction) => {
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    return next();
  }

  const providedKey = req.headers["x-admin-key"];

  if (providedKey !== expectedKey) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};
