import prisma from "../utils/prismaClient";


export const getProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { password, refreshTokenHash, ...safeUser } = user;
  return safeUser;
};
