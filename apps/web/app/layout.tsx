import type { Metadata } from "next";
import localFont from "next/font/local";
import "@instapark/ui/src/styles/globals.css";
import { FooterMain, GraphQLProvider, ThemeProvider, Toaster } from "@instapark/ui";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Home - Instapark",
  description: "Get a space to park your vehicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.className} overflow-y-scroll`}>
        <GraphQLProvider>
          <ThemeProvider>
            <Toaster
              toastOptions={
                {
                  duration: 3000,
                }
              }
              position="top-right" />
            {children}
            <FooterMain />
          </ThemeProvider>
        </GraphQLProvider>
      </body>
    </html >
  );
}
