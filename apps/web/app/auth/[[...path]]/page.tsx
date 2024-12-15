'use client';

import { useEffect } from 'react';
import { ThirdPartyPreBuiltUI, SuperTokensReact, redirectToAuth, Session, EmailPasswordPreBuiltUI } from '@instapark/auth';

export default function Auth() {
  
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