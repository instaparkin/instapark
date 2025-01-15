"use client"

import { HeaderSkeleton, MapsProvider, AuthProvider,StoreProvider } from "@instapark/ui";
import { SessionAuth } from "@instapark/auth";
import dynamic from "next/dynamic";

const HeaderMainDynamic = dynamic(() =>
  import("@instapark/ui").then(mod => mod.HeaderMain), {
  loading: () => <HeaderSkeleton />
})

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
