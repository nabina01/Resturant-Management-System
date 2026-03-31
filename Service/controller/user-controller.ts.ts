import { Request, Response, NextFunction } from "express";
import prisma from "../utils/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
    });

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);

    return res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { addresses: true },
    });

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: req.body,
    });

    return res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    await prisma.user.delete({
      where: { id: req.userId },
    });

    return res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export const addAddress = async (req: any, res: Response, next: NextFunction) => {
  try {
    const address = await prisma.address.create({
      data: {
        ...req.body,
        userId: req.userId,
      },
    });

    return res.json(address);
  } catch (err) {
    next(err);
  }
};

export const getAddresses = async (req: any, res: Response, next: NextFunction) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.userId },
    });

    return res.json(addresses);
  } catch (err) {
    next(err);
  }
};

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const address = await prisma.address.update({
      where: { id },
      data: req.body,
    });

    return res.json(address);
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.address.delete({
      where: { id },
    });

    return res.json({ message: "Address deleted" });
  } catch (err) {
    next(err);
  }
};

export const setDefaultAddress = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.address.updateMany({
      where: { userId: req.userId },
      data: { isDefault: false },
    });

    const address = await prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });

    return res.json(address);
  } catch (err) {
    next(err);
  }
};