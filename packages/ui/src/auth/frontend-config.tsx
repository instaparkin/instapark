"use client"

import React from "react"
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import { GLOBAL_CONSTANTS } from "@instapark/constants";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
    {};

export function setRouter(
    router: ReturnType<typeof useRouter>,
    pathName: string,
) {
    routerInfo.router = router;
    routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
    return {
        appInfo: {
            appName: GLOBAL_CONSTANTS.SUPERTOKENS.APP_NAME,
            apiDomain: GLOBAL_CONSTANTS.SUPERTOKENS.API_DOMAIN,
            websiteDomain: GLOBAL_CONSTANTS.SUPERTOKENS.WEBSITE_DOMAIN,
            apiBasePath: GLOBAL_CONSTANTS.SUPERTOKENS.API_BASE_PATH,
            websiteBasePath: GLOBAL_CONSTANTS.SUPERTOKENS.WEBSITE_BASE_PATH,
        },
        style: `
          [data-supertokens~=superTokensBranding] {
            display: none
        }`,
        recipeList: [
            EmailPassword.init({
                signInAndUpFeature: {
                    signUpForm: {
                        formFields: [{
                            id: "firstName",
                            label: "First name",
                            placeholder: "First name",
                        }, {
                            id: "lastName",
                            label: "Last name",
                            placeholder: "Last name",
                            optional: true
                        },
                        {
                            id: "terms",
                            label: "",
                            optional: false,
                            nonOptionalErrorMsg: "You must accept the terms and conditions",
                            inputComponent: ({ name, onChange }) => (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "left",
                                        marginBottom: " -12px",
                                    }}>
                                    <input name={name} type="checkbox" onChange={(e) => onChange(e.target.checked.toString())}></input>
                                    <span style={{ marginLeft: 5 }}>
                                        I agree to the{" "}
                                        <a href="https://supertokens.com/legal/terms-and-conditions" data-supertokens="link">
                                            Terms and Conditions
                                        </a>
                                    </span>
                                </div>
                            ),
                        }]
                    }
                }
            }),
            Session.init(),
        ],
        windowHandler: (orig) => {
            return {
                ...orig,
                location: {
                    ...orig.location,
                    getPathName: () => routerInfo.pathName!,
                    assign: (url) => routerInfo.router!.push(url.toString()),
                    setHref: (url) => routerInfo.router!.push(url.toString()),
                },
            };
        },
    };
}