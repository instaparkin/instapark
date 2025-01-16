"use client"

import { HeaderSkeleton, MapsProvider, StoreProvider, SessionAuthProvider } from "@instapark/ui";
import dynamic from "next/dynamic";

const HeaderMainDynamic = dynamic(() =>
  import("@instapark/ui").then(mod => mod.HeaderMain), {
  loading: () => <HeaderSkeleton />
})


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionAuthProvider>
      <StoreProvider>
        <MapsProvider>
          <main>
            <HeaderMainDynamic />
            {children}
          </main>
        </MapsProvider>
      </StoreProvider>
    </SessionAuthProvider>
  );
}
