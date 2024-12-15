import express from "express";

const router = express.Router();

router.get("/:q", async (req, res) => {
    try {
        const { q } = req.params;
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`);
        const locations = await response.json();
        res.send(locations);
    } catch (error) {
        console.error("Error fetching geocoder data:", error);
        res.sendStatus(500);
    }
});

export default router;
