"use client"

import { Header } from "@instapark/ui";
import { SessionAuth, SuperTokensProvider } from "@instapark/auth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <SuperTokensProvider>
      <SessionAuth>
          <main>
            <Header />
            {children}
          </main>
      </SessionAuth>
    </SuperTokensProvider>
  );
}
