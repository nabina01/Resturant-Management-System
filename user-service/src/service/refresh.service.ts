import prisma from "../utils/prismaClient";
import { verifyRefreshToken, compareToken } from "../utils/jwt";
import { issueTokenPair } from "./token.service";

export const refreshService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    throw new Error("Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || !user.refreshTokenHash || !user.refreshTokenExpiry) {
    throw new Error("Refresh token not found");
  }

  if (user.refreshTokenExpiry.getTime() < Date.now()) {
    throw new Error("Refresh token expired");
  }

  const isValidToken = await compareToken(
    refreshToken,
    user.refreshTokenHash
  );

  if (!isValidToken) {
    throw new Error("Invalid refresh token");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await issueTokenPair(user);

  return {
    accessToken,
    newRefreshToken,
  };
};
