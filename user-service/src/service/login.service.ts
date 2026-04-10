import prisma from "../utils/prismaClient";
import { comparePassword } from "../utils/jwt";
import { issueTokenPair } from "./token.service";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const { accessToken, refreshToken } = await issueTokenPair(user);

  const { password: _, refreshTokenHash, ...safeUser } = user;

  return {
    accessToken,
    refreshToken,
    user: safeUser,
  };
};
