"use client"

import { HeaderMain, HeaderSkeleton, MapsProvider } from "@instapark/ui";
import { SessionAuth, SuperTokensProvider } from "@instapark/auth";
import { StoreProvider } from "@instapark/state";
import dynamic from "next/dynamic";

const HeaderMainDynamic = dynamic(() =>
    import("@instapark/ui").then(mod => mod.HeaderMain), {
    loading: () => <HeaderSkeleton />
})

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <SuperTokensProvider>
      <SessionAuth>
        <StoreProvider>
          <MapsProvider>
            <main>
              <HeaderMainDynamic />
              {children}
            </main>
          </MapsProvider>
        </StoreProvider>
      </SessionAuth>
    </SuperTokensProvider>
  );
}
