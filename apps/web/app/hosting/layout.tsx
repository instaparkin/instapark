"use client"

import { HeaderMain, MapProvider } from "@instapark/ui";
import { SessionAuth, SuperTokensProvider } from "@instapark/auth";
import { StoreProvider } from "@instapark/state";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <SuperTokensProvider>
      <SessionAuth>
        <StoreProvider>
          <MapProvider>
            <main>
              <HeaderMain />
              {children}
            </main>
          </MapProvider>
        </StoreProvider>
      </SessionAuth>
    </SuperTokensProvider>
  );
}
