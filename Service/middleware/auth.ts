import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(err);
  }
};