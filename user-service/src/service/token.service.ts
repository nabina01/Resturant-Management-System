import prisma from "../utils/prismaClient";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../utils/jwt";

export const issueTokenPair = async (user: {
  id: string;
  email: string;
  role: string;
}) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const refreshTokenHash = await hashToken(refreshToken);

  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const userId = typeof user.id === "string" ? parseInt(user.id, 10) : user.id;

  await prisma.user.update({
    where: { id: userId },
    data: {
      refreshTokenHash,
      refreshTokenExpiry: expiryDate,
    },
  });

  return { accessToken, refreshToken };
};
