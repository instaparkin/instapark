import { Router } from "express";
import { createOnDemandBalanceTransfer, createVendor, getBalance, getVendor, updateVendor } from "../controllers/vendor.controller";

const VendorRoute = Router();

VendorRoute.post("/", createVendor);

 VendorRoute.get("/", getVendor);

VendorRoute.patch("/", updateVendor);

// VendorRoute.post("/documents/upload", uploadDocuments);

 VendorRoute.get("/balance", getBalance);

 VendorRoute.post("/transfer", createOnDemandBalanceTransfer)

export { VendorRoute };