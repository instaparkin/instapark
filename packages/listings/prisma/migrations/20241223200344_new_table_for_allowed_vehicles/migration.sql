/*
  Warnings:

  - You are about to drop the column `allowedVehicles` on the `Listing` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('Car', 'Bike', 'Cycle');

-- AlterEnum
ALTER TYPE "PlaceType" ADD VALUE 'Farm';

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "allowedVehicles";

-- DropEnum
DROP TYPE "AllowedVehicle";

-- CreateTable
CREATE TABLE "AllowedVehicle" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "vehicle" "Vehicle" NOT NULL,

    CONSTRAINT "AllowedVehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AllowedVehicle" ADD CONSTRAINT "AllowedVehicle_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("listingId") ON DELETE CASCADE ON UPDATE CASCADE;
