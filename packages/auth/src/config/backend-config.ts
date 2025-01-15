import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import SuperTokens from "supertokens-node/lib/build/supertokens";
import { AUTH_CONSTANTS } from "../constants/auth-constants";
import { GLOBAL_CONSTANTS } from "@instapark/constants";

console.log(AUTH_CONSTANTS.SUPERTOKENS_API_KEY);

const backendConfig = (): TypeInput => {
    return {
        supertokens: {
            connectionURI: AUTH_CONSTANTS.SUPERTOKENS_CONNECTION_URL,
            apiKey: AUTH_CONSTANTS.SUPERTOKENS_API_KEY as string
        },
        appInfo: {
            appName: GLOBAL_CONSTANTS.SUPERTOKENS.APP_NAME,
            apiDomain: GLOBAL_CONSTANTS.SUPERTOKENS.API_DOMAIN,
            websiteDomain: GLOBAL_CONSTANTS.SUPERTOKENS.WEBSITE_DOMAIN,
            apiBasePath: GLOBAL_CONSTANTS.SUPERTOKENS.API_BASE_PATH,
            websiteBasePath: GLOBAL_CONSTANTS.SUPERTOKENS.WEBSITE_BASE_PATH,
        },
        recipeList: [
            EmailPassword.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            signUp: async function (input) {
                                const response = await originalImplementation.signUp(input);
                                return response;
                            }
                        }
                    }
                }
            }),
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: [
                        {
                            config: {
                                thirdPartyId: AUTH_CONSTANTS.GOOGLE_ID,
                                clients: [
                                    {
                                        clientId:
                                            AUTH_CONSTANTS.GOOGLE_CLIENT_ID,
                                        clientSecret: AUTH_CONSTANTS.GOOGLE_CLIENT_SECRET,
                                    },
                                ],
                            },
                        },
                    ],
                },
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            signInUp: async function (input) {

                                const response = await originalImplementation.signInUp(input);

                                return response;
                            }
                        }
                    }
                }
            }),
            Session.init({
                exposeAccessTokenToFrontendInCookieBasedAuth: true
            }),
            Dashboard.init(),
        ],
    };
}

let initialized = false;
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(backendConfig());
        initialized = true;
    }
}
