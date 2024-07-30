import Error from "@/components/Error";
import ResultCard from "@/components/ResultCard";
import { db } from "@/server/db";
import { api } from "@/trpc/server";

export default async function ResultGroup({
  params,
}: {
  params: { id: string };
}) {
  const results = await db.query.resultGroup.findFirst({
    where: (resultGroup, { eq }) => eq(resultGroup.id, params.id),
  });

  if (!results) {
    return <Error message="No result found with the given ID." />;
  }

  const promises = results.opensearchIds.map((id) =>
    api.documentRouter.getDocById({
      opensearchIndex: results.opensearchIndex,
      documentId: id,
    }),
  );

  const data = await Promise.all(promises);
  const opensearchDocument = data.filter((doc) => doc !== undefined);

  return (
    <>
      {opensearchDocument.map((doc) => (
        <ResultCard
          key={doc._id}
          title={doc._source.Title ? doc._source.Title : doc._source.title}
          author={doc._source.Author}
        />
      ))}
    </>
  );
}
