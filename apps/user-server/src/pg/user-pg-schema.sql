/*
Whenever this schema is changed the types package as well the typesense schema should be changed as well.
*/
CREATE TABLE
    IF NOT EXISTS "UserName" (
        "userId" VARCHAR(255) PRIMARY KEY,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "preferred_name" VARCHAR(100)
    );

CREATE TABLE
    IF NOT EXISTS "UserProof" (
        "userId" VARCHAR(255) NOT NULL,
        "government_Id" VARCHAR(12) PRIMARY KEY,
        "frontside_url" TEXT NOT NULL,
        "backside_url" TEXT NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "UserName" ("userId") ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS "UserAddress" (
        "userId" VARCHAR(255) NOT NULL,
        "addressId" VARCHAR(255) PRIMARY KEY,
        "country" VARCHAR(100) NOT NULL,
        "state" VARCHAR(100) NOT NULL,
        "city" VARCHAR(100) NOT NULL,
        "pincode" VARCHAR(20) NOT NULL,
        "street" TEXT NOT NULL,
        "name" VARCHAR(100),
        FOREIGN KEY ("userId") REFERENCES "UserName" ("userId") ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS "UserPhoneNumbers" (
        "userId" VARCHAR(255) NOT NULL,
        "phoneNumber" VARCHAR(15) NOT NULL,
        PRIMARY KEY ("userId", "phoneNumber"),
        FOREIGN KEY ("userId") REFERENCES "UserName" ("userId") ON DELETE CASCADE
    );