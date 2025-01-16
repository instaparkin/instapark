import searchRoute from "./routes/search.route";
import olaMapsRoute from "./routes/olamaps.route";
import TypesenseRoute from "./routes/typesense.route";
import { errorHandler, middleware, supertokens, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import { searchConsumer } from "@instapark/kafka";
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
        API_ENDPOINTS.SEARCH_SERVER.PREFIX,
        (req, res) => {
            res.send("Search Server is up and running");
        })

    app.use(
        API_ENDPOINTS.SEARCH_SERVER.ROUTES.SEARCH.PREFIX,
        searchRoute);

    app.use(
        API_ENDPOINTS.SEARCH_SERVER.ROUTES.TYPESENSE.PREFIX,
        TypesenseRoute);

    app.use(
        API_ENDPOINTS.SEARCH_SERVER.ROUTES.OLAMAPS.PREFIX,
        verifySession(),
        olaMapsRoute);

    app.use(errorHandler());

    searchConsumer({ fromBeginning: true });

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}


init();