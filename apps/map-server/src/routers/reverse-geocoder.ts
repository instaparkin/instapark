import express from "express";

const router = express.Router();

router.get("/:latitude/:longitude", async (req, res) => {
    try {
        const { latitude, longitude } = req.params;
        const response = await fetch(`https://photon.komoot.io/reverse?lon=${longitude}&lat=${latitude}`)
        const locations = await response.json();
        res.send(locations).status(200);
    } catch (error) {
        console.error("Error fetching geocoder data:", error);
        res.sendStatus(500);
    }
})

export default router;
