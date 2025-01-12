import { Router } from "express"
import { addDocumentsToTypesense } from "../controllers/typesense.controller";

const router = Router();

router.post("/documents/add", addDocumentsToTypesense)

export default router