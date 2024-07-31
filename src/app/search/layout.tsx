import Signout from "@/components/Signout";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <div>
      <div className="container flex justify-between py-6 sm:py-12">
        <span className="text-bold font-serif text-lg">
          {session.user.email}
        </span>
        <div className="flex items-center gap-4">
          <Link
            href={"/search"}
            className="font-serif underline hover:text-primary"
          >
            Search
          </Link>
          <Link
            href={"/search/result"}
            className="font-serif underline hover:text-primary"
          >
            Saved
          </Link>
          <Signout />
        </div>
      </div>

      <div className="container">{children}</div>
    </div>
  );
}
