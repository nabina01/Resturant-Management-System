import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
  compareToken,
} from "../utils/auth";
import { refreshTokenSchema, validateRequest } from "../utils/validation";

const REFRESH_COOKIE_NAME = "refreshToken";

function getRefreshCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api",
  };
}

function getRefreshTokenExpiryDate() {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}

function sanitizeUser(user: any) {
  const { password, refreshTokenHash, ...safeUser } = user;
  return safeUser;
}

async function issueTokenPair(user: { id: string; email: string; role: string }) {
  const payload = { userId: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  const refreshTokenHash = await hashToken(refreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshTokenHash,
      refreshTokenExpiry: getRefreshTokenExpiryDate(),
    },
  });

  return { accessToken, refreshToken };
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
    });

    return res.status(201).json(sanitizeUser(user));
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = await issueTokenPair(user);
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

    return res.json({ accessToken, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
};

export const refreshUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = await validateRequest(refreshTokenSchema, req.body || {});
    if (!validation.valid) {
      return res.status(400).json({ message: validation.error });
    }

    const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME] || validation.data?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.refreshTokenHash || !user.refreshTokenExpiry) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    if (user.refreshTokenExpiry.getTime() < Date.now()) {
      return res.status(401).json({ message: "Refresh token expired" });
    }

    const isValidToken = await compareToken(refreshToken, user.refreshTokenHash);
    if (!isValidToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await issueTokenPair(user);
    res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, getRefreshCookieOptions());

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    await prisma.user.update({
      where: { id: req.userId },
      data: {
        refreshTokenHash: null,
        refreshTokenExpiry: null,
      },
    });

    res.clearCookie(REFRESH_COOKIE_NAME, {
      ...getRefreshCookieOptions(),
      maxAge: undefined,
    });

    return res.json({ message: "Logged out successfully" });
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

    return res.json(user ? sanitizeUser(user) : null);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, phone, password } = req.body;
    const data: any = { firstName, lastName, phone };
    if (password) {
      data.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data,
    });

    return res.json(sanitizeUser(updatedUser));
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
    const id = String(req.params.id);

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
    const id = String(req.params.id);

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