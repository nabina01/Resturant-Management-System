import prisma from "../utils/prismaClient";
import { hashPassword } from "../utils/jwt";

export const updateService = async (
  userId: string | number,
  updateData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
  }
) => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  const data: any = {
    firstName: updateData.firstName,
    lastName: updateData.lastName,
    phone: updateData.phone,
  };

  if (updateData.password) {
    data.password = await hashPassword(updateData.password);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  const { password, refreshTokenHash, ...safeUser } = updatedUser;
  return safeUser;
};
