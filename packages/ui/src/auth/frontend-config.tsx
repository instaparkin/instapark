"use client"

import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import ThirdParty, { Google } from 'supertokens-auth-react/recipe/thirdparty';
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
            EmailPassword.init(),
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: [
                        Google.init(),
                    ],
                },
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