import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { getServerSession } from "next-auth";
import LoginPage from "./_login/page";

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
  const user = await getServerSession();
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
