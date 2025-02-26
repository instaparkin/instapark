import "dotenv/config"
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import SuperTokens from "supertokens-node/lib/build/supertokens";
import { AUTH_CONSTANTS } from "../constants/auth-constants";
import { GLOBAL_CONSTANTS } from "@instapark/constants";
import axios from "axios"

const backendConfig = (): TypeInput => {
    return {
        framework: "express",
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
                signUpFeature: {
                    formFields: [{
                        id: "firstName"
                    }, {
                        id: "lastName",
                        optional: true
                    }, {
                        id: "terms"
                    }]
                },
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            signUpPOST: async function (input) {
                                if (originalImplementation.signUpPOST === undefined) {
                                    throw Error("Should never come here");
                                }
                                const response = await originalImplementation.signUpPOST(input);
                                if (response.status === "OK") {
                                    /**User Input */
                                    const formFields = input.formFields;
                                    const firstName = formFields.find(f => f.id === "firstName")?.value || "";
                                    const lastName = formFields.find(f => f.id === "lastName")?.value || "";

                                    /**Fetching other required details from the session */
                                    axios.post("http://localhost:8088/profile", {
                                        userId: response.user.id,
                                        firstName,
                                        lastName,
                                        emails: response.user.emails,
                                        timeJoined: Math.floor(response.user.timeJoined / 1000)
                                    })
                                }
                                return response;
                            }
                        }
                    }
                }
            }),
            Session.init(),
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
