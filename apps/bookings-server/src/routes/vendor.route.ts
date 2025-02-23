import { Router } from "express";
import { createVendor, getBalance, getVendor, updateVendor } from "../controllers/vendor.controller";

const VendorRouter = Router();

VendorRouter.post("/", createVendor);

VendorRouter.get("/", getVendor);

VendorRouter.patch("/", updateVendor);

VendorRouter.get("/balance", getBalance);

export { VendorRouter };