import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { getServerAuthSession } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "./login/page";

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
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
