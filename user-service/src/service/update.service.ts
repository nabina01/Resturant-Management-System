import prisma from "../utils/prismaClient";
import { hashPassword } from "../utils/jwt";

export const updateService = async (
  userId: string,
  updateData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
  }
) => {
  const data: any = {
    firstName: updateData.firstName,
    lastName: updateData.lastName,
    phone: updateData.phone,
  };

  if (updateData.password) {
    data.password = await hashPassword(updateData.password);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });

  const { password, refreshTokenHash, ...safeUser } = updatedUser;
  return safeUser;
};
