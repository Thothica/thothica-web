import SavedCard from "@/components/SavedCard";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { Bookmark } from "lucide-react";
import Link from "next/link";
export default async function AllResults() {
  const session = await getServerAuthSession();
  if (!session) {
    return null; // already handled this at top level layout
  }
  const resultGroups = await db.query.resultGroup.findMany({
    where: (resultGroup, { eq }) => eq(resultGroup.userId, session.user.id),
  });

  if (resultGroups.length === 0) {
    return <h1>You do not have result, try search and coming back here</h1>;
  }

  return (
    <section>
      <div className="flex flex-center space-x-2">
        <Bookmark className="w-6 sm:w-12 h-6 sm:h-12"/>
        <h1 className="text-2xl sm:text-4xl font-bold">Saved Queries</h1>
      </div>
      {resultGroups.map((result) => (
        <Link key={result.id} href={`/search/result/${result.id}`}>
          <SavedCard key={result.id} title={result.query} />
        </Link>
      ))}
    </section>
  );
}
