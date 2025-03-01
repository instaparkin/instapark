"use client"

import React from "react"
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import { GLOBAL_CONSTANTS } from "@instapark/constants";

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
            appName: process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME!,
            apiDomain: process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN!,
            websiteDomain: process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_DOMAIN!,
            apiBasePath: process.env.NEXT_PUBLIC_SUPERTOKENS_API_BASE_PATH!,
            websiteBasePath: process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_BASE_PATH!,
        },
        style: `
         [data-supertokens~=container] {
             --palette-background: 51, 51, 51;
            --palette-inputBackground: 41, 41, 41;
            --palette-inputBorder: 41, 41, 41;
            --palette-textTitle: 255, 255, 255;
            --palette-textLabel: 255, 255, 255;
            --palette-textPrimary: 255, 255, 255;
            --palette-error: 173, 46, 46;
            --palette-textInput: 169, 169, 169;
            --palette-textLink: 114,114,114;
            --palette-textGray: 158, 158, 158;
        }
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