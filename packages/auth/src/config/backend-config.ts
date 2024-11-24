import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import { appInfo } from "./app-info";
import SuperTokens from "supertokens-node/lib/build/supertokens";
import { addRoleToUser } from "../actions/add-role-to-user";

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

                                if (response.status === "OK") {
                                    let { id } = response.user;

                                    if (input.session === undefined) {
                                        if (response.createdNewRecipeUser && response.user.loginMethods.length === 1) {
                                            await addRoleToUser(id, "Seller");
                                            await addRoleToUser(id, "Buyer");
                                        } else {
                                            // TODO: Post sign in logic
                                        }
                                    }
                                }
                                return response;
                            }
                        }
                    }
                }
            }),
            Session.init(),
            Dashboard.init(),
            UserRoles.init(),
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
