import express from "express";

const router = express.Router();

router.get("/:startlat/:startlng/:endlat/:endlng", async (req, res) => {
    try {
        const { startlat, startlng, endlat, endlng } = req.params;
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${startlng},${startlat};${endlng},${endlat}?alternatives=true&geometries=geojson&overview=full`)
        const geojson = await response.json();
        res.send(geojson).status(200);
    } catch (error) {
        console.error("Error fetching geocoder data:", error);
        res.sendStatus(500);
    }
})

export default router;
