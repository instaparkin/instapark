import { Router } from "@instapark/utils";
import { aadhaarOTP, verifyAadhar } from "../controllers/aadhar.controller";

const AadharRouter = Router();

AadharRouter.post("/verify", verifyAadhar)

AadharRouter.post("/otp", aadhaarOTP)

export { AadharRouter }