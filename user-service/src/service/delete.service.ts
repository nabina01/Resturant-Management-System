import prisma from "../utils/prismaClient";
import { AppError } from "../utils/apiError";

export const deleteUserService = async (
  userId: string | number,
  requesterRole: string
) => {
  // Check if requester is admin
  if (requesterRole !== "ADMIN") {
    throw new AppError("Only admins can delete users", 403);
  }

  const id = typeof userId === "string" ? parseInt(userId, 10) : userId;

  // Validate user ID
  if (isNaN(id)) {
    throw new AppError("Invalid user ID", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await prisma.user.delete({
    where: { id },
  });
};
