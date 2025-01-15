import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession, SessionRequest } from "@instapark/auth";
import { API_ENDPOINTS } from "@instapark/constants";
import { config, cors, express } from "@instapark/utils";

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

    app.get(
        API_ENDPOINTS.AUTH_SERVER.PREFIX,
        (req, res) => {
            res.send("Auth Server is up and running");
        })

    app.get("/auth/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
        const session = req.session;
        res.send({
            sessionHandle: session!.getHandle(),
            userId: session!.getUserId(),
            accessTokenPayload: session!.getAccessTokenPayload(),
        });
    });

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
}

init();