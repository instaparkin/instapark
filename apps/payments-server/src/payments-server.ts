import "dotenv/config";
import express from "express"
import cors from "cors"
import { sendResponse } from "@instapark/utils";
import { settlementRouter } from "./routes/settlements.route";
import mongoose from "mongoose";
import { PAYMENTS_SERVER_CONSTANTS } from "./constants/payments-server-constants";
import { VendorRoute } from "./routes/vendor.route";
import { ensureSuperTokensInit, errorHandler, middleware, supertokens, verifySession } from "@instapark/auth";

const PORT = process.env.PORT || 8090

async function connectDB() {
    try {
        await mongoose.connect(PAYMENTS_SERVER_CONSTANTS.MONGODB_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
}
async function init() {
    ensureSuperTokensInit();

    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    app.use(express.json());

    await connectDB();

    app.get("/", (req, res) => {
        res.send("Payment server is up and running");
    })

    app.use("/settlements", settlementRouter)

    app.use("/vendor", verifySession(), VendorRoute)

    // app.post("/vendor", async (req, res) => {

    //     try {
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'x-api-version': '2023-08-01',
    //                 'x-client-id': 'TEST10180324795c6ed369800e535fc242308101',
    //                 'x-client-secret': 'cfsk_ma_test_ea216f531ab789cd1bb6c0d98bf6f4a6_179a58b2',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: '{"vendor_id":"vendortest1234","status":"ACTIVE","name":"customer","email":"johndoe@cashfree.com","phone":"9876543210","verify_account":true,"dashboard_access":true,"schedule_option":1,"bank":{"account_number":"12345678890","account_holder":"John Doe","ifsc":"YESB0000262"},"kyc_details":{"account_type":"BUSINESS","business_type":"Travel and Hospitality","uidai":"753624181019","pan":"BIAPA2934N"}}'
    //         };

    //         fetch('https://sandbox.cashfree.com/pg/easy-split/vendors', options)
    //             .then(response => response.json())
    //             .then(response => console.log(response))
    //             .catch(err => console.error(err));

    //         sendResponse(res, 200, "Vendor craeted Successfully", "SUCCESS", null)
    //     } catch (error) {
    //         sendResponse(res, 500, "Failed to create vendor", "FAILURE", error)
    //     }
    // })

    app.use(errorHandler());

    app.listen(PORT, () => {
        console.log(`Payment Server Running on http://localhost:${PORT}`);
    })

}

init();