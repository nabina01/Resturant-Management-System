import prisma from "../utils/prismaClient";

export const logoutService = async (userId: string | number) => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  await prisma.user.update({
    where: { id },
    data: {
      refreshTokenHash: null,
      refreshTokenExpiry: null,
    },
  });
};
