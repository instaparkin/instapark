import { errorHandler, middleware, supertokens, ensureSuperTokensInit } from "@instapark/auth";
import { API_ENDPOINTS } from "@instapark/constants";
import { config, cors, express } from "@instapark/utils";
import mongoose from "mongoose"
import { CHAT_SERVER_CONSTANTS } from "./constants/chat-server-constants";
import { createServer } from "http";
import { SocketService } from "./services/socket.service";

config();

async function init() {

    ensureSuperTokensInit();

    const app = express();

    const server = createServer(app);

    app.use(express.json());

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    }));

    app.use(middleware());

    /**MongoDB Connection */
    await mongoose.connect(CHAT_SERVER_CONSTANTS.MONGODB.URI);

    app.get(API_ENDPOINTS.BOOKINGS_SERVER.PREFIX, (req, res) => {
        res.send("Chat Server is up and running");
    })

    app.use(errorHandler());

    server.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init();