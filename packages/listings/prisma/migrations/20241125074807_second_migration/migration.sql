/*
  Warnings:

  - You are about to drop the column `house` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Place` table. All the data in the column will be lost.
  - Added the required column `isOpen` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AllowedVehicle" AS ENUM ('Car', 'Bike', 'Cycle');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "allowedVehicles" "AllowedVehicle"[],
ADD COLUMN     "isOpen" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "house",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Pricing" (
    "pricingId" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "pphbi" DOUBLE PRECISION,
    "pphcy" DOUBLE PRECISION,
    "pphcr" DOUBLE PRECISION,
    "plph" DOUBLE PRECISION,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("pricingId")
);

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Listing"("listingId") ON DELETE CASCADE ON UPDATE CASCADE;
