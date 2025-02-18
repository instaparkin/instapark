import { Router } from "express";
import { createVendor, getBalance, getDocumentStatus, getVendor, updateVendor } from "../controllers/vendor.controller";

const VendorRoute = Router();

VendorRoute.post("/", createVendor);

 VendorRoute.get("/", getVendor);

VendorRoute.patch("/", updateVendor);

// VendorRoute.post("/documents/upload", uploadDocuments);

 VendorRoute.get("/documents/status", getDocumentStatus);

 VendorRoute.get("/balance", getBalance);

export { VendorRoute };