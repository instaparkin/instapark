"use client"

import { HeaderMain, MapsProvider } from "@instapark/ui";
import { SessionAuth, SuperTokensProvider } from "@instapark/auth";
import { StoreProvider } from "@instapark/state";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <SuperTokensProvider>
      <SessionAuth>
        <StoreProvider>
          <MapsProvider>
            <main>
              <HeaderMain />
              {children}
            </main>
          </MapsProvider>
        </StoreProvider>
      </SessionAuth>
    </SuperTokensProvider>
  );
}
