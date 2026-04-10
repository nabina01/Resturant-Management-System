import prisma from "../utils/prismaClient";

export const logoutService = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      refreshTokenHash: null,
      refreshTokenExpiry: null,
    },
  });
};
