import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import LoginPage from "./login/page";
import { getServerAuthSession } from "@/server/auth";

export const metadata = {
  title: "Thothica",
  description: "Reimagine the way research is done.",
  icons: [{ rel: "icon", url: "/thothica.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          {!user ? <LoginPage /> : children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
