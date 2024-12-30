import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import { appInfo } from "./app-info";
import SuperTokens from "supertokens-node/lib/build/supertokens";
import { addRoleToUser } from "../actions/add-role-to-user";
import UserMetadata from "supertokens-node/recipe/usermetadata";

const backendConfig = (): TypeInput => {
    return {
        supertokens: {
            connectionURI: "http://localhost:3567",
            apiKey: "FrZi04J9cC3Rub5TLr8YSikLMWpWLpjcioMMwxGeR4dWxmSWhwyaL93TqTe7ADcg"
        },
        appInfo: appInfo,
        recipeList: [
            EmailPassword.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            signUp: async function (input) {
                                const response = await originalImplementation.signUp(input);

                                if (response.status === "OK" && response.user.loginMethods.length === 1 && input.session === undefined) {
                                    const { id } = response.user;
                                    await addRoleToUser(id, "Seller");
                                    await addRoleToUser(id, "Buyer");
                                }
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
                                thirdPartyId: "google",
                                clients: [
                                    {
                                        clientId:
                                            "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                        clientSecret: "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",
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
            UserRoles.init(),
            UserMetadata.init()
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
