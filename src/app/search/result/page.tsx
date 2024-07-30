import ResultCard from "@/components/ResultCard";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
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
    <>
      {resultGroups.map((result) => (
        <Link key={result.id} href={`/search/result/${result.id}`}>
          <ResultCard key={result.id} title={result.query} />
        </Link>
      ))}
    </>
  );
}
