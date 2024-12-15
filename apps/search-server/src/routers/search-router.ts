import { search } from "@instapark/search";
import express from "express";

const router = express();

router.get("/:q", async (req, res) => {
    const { q } = req.params;

    const resp = await search({ q });

    res.send(resp);
})

export default router;