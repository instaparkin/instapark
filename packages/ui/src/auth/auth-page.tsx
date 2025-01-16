'use client';

import { useEffect } from 'react';
import { redirectToAuth } from "supertokens-auth-react"
import * as SuperTokensReact from "supertokens-auth-react/ui"
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

export function AuthPage() {
  
  useEffect(() => {
    if (
        SuperTokensReact.canHandleRoute([EmailPasswordPreBuiltUI,ThirdPartyPreBuiltUI]) === false
    ) {
      redirectToAuth({ redirectBack: true });
    }
  }, []);

  if (typeof window !== 'undefined') {
    return SuperTokensReact.getRoutingComponent([EmailPasswordPreBuiltUI,ThirdPartyPreBuiltUI]);
  }

  return null;
}