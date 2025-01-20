import { Router } from "@instapark/utils";
import { getMetadata, upsertMetadata } from "../controllers/metadata.controller";

const router = Router();

router.post("/", upsertMetadata);

router.get("/",getMetadata)

export default router