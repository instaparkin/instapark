import express from "express";

const router = express.Router();

router.get("/:query_by", async (req, res) => {
    try {
        const { query_by } = req.params;
        const response = await fetch(`http://localhost:8108/multi_search?query_by=${query_by}&x-typesense-api-key=xyz`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "searches": [
                    {
                        "collection": "listings_1",
                        "q": "lst"
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data.results);
    } catch (error) {
        res.status(502).json({
            message: "Failed to fetch data",
            error: error.message,
        });
    }
});

export default router;
