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

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshTokenHash,
      refreshTokenExpiry: expiryDate,
    },
  });

  return { accessToken, refreshToken };
};
