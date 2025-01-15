import { userDb } from "./pg/user-pg-client";
import userNameRoute from "./routes/userName.route";
import userProofRoute from "./routes/userProof.route";
import userAddressRoute from "./routes/userAddress.route";
import userPhoneNumberRoute from "./routes/userPhoneNumber.route";
import { errorHandler, middleware, ensureSuperTokensInit, verifySession } from "@instapark/auth";
import { config, cors, express } from "@instapark/utils";

config();

async function init() {
    ensureSuperTokensInit();

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    }));

    app.use(middleware());

    await userDb.connect();

    app.get("/user", (req, res) => {
        res.send("User Server is Up and Running")
    })

    app.use("/user/user-name", verifySession(), userNameRoute);

    app.use("/user/user-proof", verifySession(), userProofRoute);

    app.use("/user/user-address", verifySession(), userAddressRoute);

    app.use("/user/user-phoneNumber", verifySession(), userPhoneNumberRoute);

    app.use(errorHandler());

    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
}

init()