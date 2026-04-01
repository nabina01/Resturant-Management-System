-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'CUSTOMER');

-- AlterTable
ALTER TABLE "User"
ADD COLUMN "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN "refreshTokenHash" TEXT,
ADD COLUMN "refreshTokenExpiry" TIMESTAMP(3);
