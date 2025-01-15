import { Router } from "@instapark/utils";
import { kafkaSearchProducer } from "../controllers/kafka.controller";

const router = Router();

router.post("/produce", kafkaSearchProducer)

export default router;