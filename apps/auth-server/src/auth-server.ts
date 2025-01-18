import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession, SessionRequest } from "@instapark/auth";
import { API_ENDPOINTS } from "@instapark/constants";
import { config, cors, express, sendResponse } from "@instapark/utils";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import usernameRouter from "./routes/username.route";
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

    app.use("/auth/username", verifySession(), usernameRouter)

    app.post("/auth/username", verifySession(), async (req: SessionRequest, res) => {
        const session = req.session;
        const { first_name, last_name } = req.body;

        console.log(first_name, last_name);

        const userId = session?.getUserId() as string;

        await UserMetadata.updateUserMetadata(userId, { first_name, last_name })
            .then((response) => {
                sendResponse(res, 200, "User Name added", "SUCCESS", response)
            })
            .catch((error) => {
                sendResponse(res, 500, "Failed to add User Name added", "FAILURE", error)
            })
    });

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
}

init();