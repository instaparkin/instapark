import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import { API_ENDPOINTS } from "@instapark/constants";
import { config, cors, express } from "@instapark/utils";
import mongoose from "mongoose"
import { BOOKINGS_SERVER_CONSTANTS } from "./constants/bookings-server-constants";
import bookingsRouter from "./routes/booking.route";

config();

async function init() {

    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    /**MongoDB Connection */
    await mongoose.connect(BOOKINGS_SERVER_CONSTANTS.MONGODB.URI);

    app.get(API_ENDPOINTS.BOOKINGS_SERVER.PREFIX, (req, res) => {
        res.send("Booking Server is up and running");
    })

    app.use("/bookings",
        bookingsRouter
    )

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();