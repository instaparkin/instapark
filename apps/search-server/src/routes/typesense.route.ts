import { Router } from "@instapark/utils";
import { createDocument, updateDocument, deleteDocument } from "../controllers/typesense.controller";

const router = Router();

router.post("/:collection", createDocument)

router.put("/:collection/", updateDocument)

router.delete("/collection/:id", deleteDocument)

export default router