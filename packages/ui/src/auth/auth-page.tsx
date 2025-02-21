'use client';

import { useEffect } from 'react';
import { redirectToAuth } from "supertokens-auth-react"
import * as SuperTokensReact from "supertokens-auth-react/ui"
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

export function AuthPage() {

  useEffect(() => {
    if (
        SuperTokensReact.canHandleRoute([EmailPasswordPreBuiltUI]) === false
    ) {
      redirectToAuth({ redirectBack: true });
    }
  }, []);

  if (typeof window !== 'undefined') {
    return SuperTokensReact.getRoutingComponent([EmailPasswordPreBuiltUI]);
  }

  return null;
}