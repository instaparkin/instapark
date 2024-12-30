import { PrismaClient } from "@prisma/client";

declare global {
    let prisma: PrismaClient | undefined;
}

export const listingsDb = prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") prisma = listingsDb