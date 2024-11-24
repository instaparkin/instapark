import type { Metadata } from "next";
import localFont from "next/font/local";
import "@instapark/ui/src/styles/globals.css";
import { MapProvider } from "@instapark/ui";
import { StoreProvider } from "@instapark/state";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Instapark",
  description: "Get a space to park your vehicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <StoreProvider>
          <MapProvider>
            <main className="container">
              {children}
            </main>
          </MapProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
