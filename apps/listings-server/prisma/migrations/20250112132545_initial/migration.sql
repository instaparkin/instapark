-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM (
    'House',
    'Barn',
    'Cabin',
    'Castle',
    'Hotel',
    'Farm'
);

-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('Car', 'Bike', 'Cycle');

-- CreateTable
CREATE TABLE
    "Listing" (
        "listingId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "isOpen" BOOLEAN NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        PRIMARY KEY ("listingId")
    );

-- CreateTable
CREATE TABLE
    "Place" (
        "placeId" TEXT NOT NULL,
        "type" "PlaceType" NOT NULL,
        PRIMARY KEY ("placeId")
    );

-- CreateTable
CREATE TABLE
    "Pricing" (
        "pricingId" TEXT NOT NULL,
        "basePrice" DOUBLE PRECISION NOT NULL,
        "pphbi" DOUBLE PRECISION,
        "pphcy" DOUBLE PRECISION,
        "pphcr" DOUBLE PRECISION,
        "plph" DOUBLE PRECISION,
        PRIMARY KEY ("pricingId")
    );

-- CreateTable
CREATE TABLE
    "Photo" (
        "photoId" TEXT NOT NULL,
        "listingId" TEXT NOT NULL,
        "url" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Photo_pkey" PRIMARY KEY ("photoId")
    );

-- CreateTable
CREATE TABLE
    "Review" (
        "reviewId" TEXT NOT NULL,
        "listingId" TEXT NOT NULL,
        "location" INTEGER,
        "cleanliness" INTEGER,
        "communication" INTEGER,
        "value" INTEGER,
        "accuracy" INTEGER,
        "description" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
    );

-- CreateTable
CREATE TABLE
    "Rating" (
        "ratingId" TEXT NOT NULL,
        "listingId" TEXT NOT NULL,
        "rating" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Rating_pkey" PRIMARY KEY ("ratingId")
    );

-- CreateTable
CREATE TABLE
    "Location" (
        "locationId" TEXT NOT NULL,
        "latitude" DOUBLE PRECISION NOT NULL,
        "longitude" DOUBLE PRECISION NOT NULL,
        "country" TEXT NOT NULL,
        "state" TEXT NOT NULL,
        "district" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "street" TEXT NOT NULL,
        "pincode" INTEGER NOT NULL,
        "name" TEXT,
        "landmark" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
    );

-- CreateTable
CREATE TABLE
    "NotAvailableDate" (
        "id" TEXT NOT NULL,
        "date" TIMESTAMP(3) NOT NULL,
        "listingId" TEXT NOT NULL,
        CONSTRAINT "NotAvailableDate_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "AllowedVehicle" (
        "id" TEXT NOT NULL,
        "listingId" TEXT NOT NULL,
        "vehicle" "Vehicle" NOT NULL,
        CONSTRAINT "AllowedVehicle_pkey" PRIMARY KEY ("id")
    );

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotAvailableDate" ADD CONSTRAINT "NotAvailableDate_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllowedVehicle" ADD CONSTRAINT "AllowedVehicle_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("listingId") ON DELETE CASCADE ON UPDATE CASCADE;