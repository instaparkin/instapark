import express from "express";
import cors from "cors";
import { config } from "dotenv";
import searchRouter from "./routers/search-router";

config();

async function init() {
    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    }));

    app.use(express.json());
    
    app.get("/search", (req, res) => {
        res.send("Search Server is up and running");
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();