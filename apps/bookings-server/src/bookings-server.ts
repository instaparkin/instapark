import "dotenv/config"
import { config } from 'dotenv';
import { errorHandler, middleware, supertokens, ensureSuperTokensInit } from "@instapark/auth";
import { API_ENDPOINTS } from "@instapark/constants";
import mongoose from "mongoose";
import { BOOKINGS_SERVER_CONSTANTS } from "./constants/bookings-server-constants";
import bookingsRouter from "./routes/booking.route";
import cashfreeRouter from "./routes/cashfree.route";
import express, { Request, Response } from "express";
import cors from "cors";
import path from 'path';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from "./graphql/schema";
import { VendorRoute } from "./routes/vendor.route";
import { settlementRouter } from "./routes/settlements.route";
import { PaymentRouter } from "./routes/payment.route";

config({ path: path.resolve(__dirname, "../", ".env.local") });

async function connectDB() {
    try {
        await mongoose.connect(BOOKINGS_SERVER_CONSTANTS.MONGODB.URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

async function init() {
    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    await connectDB();

    app.get("/", (req, res) => {
        res.send("🚀 Booking Server is up and running");
    });

    app.use(API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.PREFIX, bookingsRouter);

    app.use("/settlements", settlementRouter)

    app.use("/bookings", cashfreeRouter);

    app.use("/vendor", VendorRoute)

    app.use("/payments", PaymentRouter)

    app.use(errorHandler());

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

init();
