import express from "express";
import cors from "cors";
import { config } from "dotenv";
import geocoder from "./routers/geocoder";

config();

async function init() {
    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    }));

    app.use(express.json());

    app.use("/geocoder", geocoder);

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();