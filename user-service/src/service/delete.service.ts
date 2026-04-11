import prisma from "../utils/prismaClient";

export const deleteUserService = async (userId: string | number) => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: { id },
  });
};
