import type { Metadata } from "next";
import localFont from "next/font/local";
import "@instapark/ui/src/styles/globals.css";
import { GraphQLProvider, ThemeProvider, Toaster } from "@instapark/ui";

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
      <body className={`${geistSans.className} overflow-y-scroll`}>
        <GraphQLProvider>
          <ThemeProvider>
            <Toaster
              containerClassName={"p-20"}
              toastOptions={
                {
                  duration: 3000,
                  className: "p-20"
                }
              }
              position="top-right" />
            {children}
          </ThemeProvider>
        </GraphQLProvider>
      </body>
    </html >
  );
}
