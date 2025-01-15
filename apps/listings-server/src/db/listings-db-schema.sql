-- Enums
CREATE TYPE "PlaceType" AS ENUM (
    'House',
    'Barn',
    'Cabin',
    'Castle',
    'Hotel',
    'Farm'
);

CREATE TYPE "VehicleType" AS ENUM ('Car', 'Bike', 'Cycle');

-- Listing Table
CREATE TABLE
    "Listing" (
        "id" CHAR(36) PRIMARY KEY,
        "userId" CHAR(36) NOT NULL,
        "type" "PlaceType" NOT NULL,
        "basePrice" NUMERIC(10, 2) NOT NULL,
        "pphBi" NUMERIC(10, 2) NOT NULL,
        "pphCy" NUMERIC(10, 2) NOT NULL,
        "pphCr" NUMERIC(10, 2) NOT NULL,
        "plph" NUMERIC(10, 2) NOT NULL,
        "latitude" DECIMAL(10, 8) NOT NULL,
        "longitude" DECIMAL(11, 8) NOT NULL,
        "country" VARCHAR(100) NOT NULL,
        "state" VARCHAR(100) NOT NULL,
        "district" VARCHAR(100) NOT NULL,
        "city" VARCHAR(100) NOT NULL,
        "street" VARCHAR(255) NOT NULL,
        "pincode" VARCHAR(20) NOT NULL,
        "name" VARCHAR(255),
        "landmark" VARCHAR(255),
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Photos Table
CREATE TABLE
    "Photos" (
        "listingId" CHAR(36) NOT NULL REFERENCES "Listing" ("id") ON DELETE CASCADE,
        "url" TEXT NOT NULL PRIMARY KEY,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- AllowedVehicles Table
CREATE TABLE
    "AllowedVehicles" (
        "listingId" CHAR(36) NOT NULL REFERENCES "Listing" ("id") ON DELETE CASCADE,
        "vehicle" "VehicleType" NOT NULL,
        PRIMARY KEY ("listingId", "vehicle")
    );

CREATE TABLE 
"NotAvailableDates"(
        "listingId" CHAR(36) NOT NULL REFERENCES "Listing" ("id") ON DELETE CASCADE,
        "startDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "endDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY("listingId", "startDate", "endDate")
);

-- Reviews Table
CREATE TABLE
    "Reviews" (
        "id" CHAR(36) PRIMARY KEY,
        "listingId" CHAR(36) NOT NULL REFERENCES "Listing" ("id") ON DELETE CASCADE,
        "location" SMALLINT NOT NULL CHECK ("location" BETWEEN 1 AND 5),
        "cleanliness" SMALLINT NOT NULL CHECK ("cleanliness" BETWEEN 1 AND 5),
        "communication" SMALLINT NOT NULL CHECK ("communication" BETWEEN 1 AND 5),
        "value" SMALLINT NOT NULL CHECK ("value" BETWEEN 1 AND 5),
        "accuracy" SMALLINT NOT NULL CHECK ("accuracy" BETWEEN 1 AND 5),
        "description" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Ratings Table
CREATE TABLE
    "Ratings" (
        "id" CHAR(36) PRIMARY KEY,
        "listingId" CHAR(36) NOT NULL REFERENCES "Listing" ("id") ON DELETE CASCADE,
        "rating" SMALLINT NOT NULL CHECK ("rating" BETWEEN 1 AND 5),
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );