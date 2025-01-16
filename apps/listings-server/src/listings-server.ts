import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import listingsRouter from "./routes/listings.route";
import redisRouter from "./routes/redis.route";
import { API_ENDPOINTS } from "@instapark/constants";
import { uploadthingExpress } from "./uploadthing/uploadthing-express";
import { config, cors, express } from "@instapark/utils";
import mongoose from "mongoose";

config();

async function init() {

    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: [process.env.FRONTEND_URL!],
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders(), "x-uploadthing-package", "x-uploadthing-version"],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    await mongoose.connect("mongodb://localhost:27017/instapark-listings")

    app.get(
        API_ENDPOINTS.LISTINGS_SERVER.PREFIX,
        (req, res) => {
            res.send("Listings server is up and Running")
        })

    app.use(
        API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.PREFIX,
        listingsRouter);

    app.use(
        API_ENDPOINTS.LISTINGS_SERVER.ROUTES.UPLOADTHING.PREFIX,
        verifySession(),
        uploadthingExpress);

    app.use(
        API_ENDPOINTS.LISTINGS_SERVER.ROUTES.REDIS.PREFIX,
        verifySession(),
        redisRouter)

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();