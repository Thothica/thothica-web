import Error from "@/components/Error";
import ResultCard from "@/components/ResultCard";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import LargeInformation from "./component/largeInformation";

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
    <section className="container">
      {opensearchDocument.map((doc) => (
        <div key={doc._id} className="font-bold">
          <ResultCard
            title={doc._source.Title ? doc._source.Title : doc._source.title}
            author={doc._source.Author}
          >
            {Object.keys(doc._source).map((key) => (
              <div key={key} className="flex space-x-2">
                <h1>{key}:</h1>
                {doc._source[key].length > 20 ? ( 
                  <LargeInformation title={'Expand'} value={doc?._source[key]}/>
                ) : (
                  <h1>{doc._source[key]}</h1>
                )}
              </div>
            ))}
          </ResultCard>
        </div>
      ))}
    </section>
  );
}
