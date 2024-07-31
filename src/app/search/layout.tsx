import Signout from "@/components/Signout";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
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
        <div className="flex items-center">
          <span className="text-bold mr-4 font-serif text-lg">
            <Image
              src="/thothica.svg"
              alt="Thothica Logo"
              width={40}
              height={40}
            />
          </span>
          {session.user.email}
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={"/search"}
            prefetch={true}
            className="font-serif underline hover:text-primary"
          >
            Search
          </Link>
          <Link
            href={"/search/result"}
            prefetch={true}
            className="mr-4 font-serif underline hover:text-primary"
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
