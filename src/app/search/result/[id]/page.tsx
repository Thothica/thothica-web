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
    <section>
      {opensearchDocument.map((doc) => (
        <div key={doc._id} className="text-base sm:text-lg font-bold">
          <ResultCard
            title={doc._source.Title ? doc._source.Title : doc._source.title}
            author={doc._source.Author}
          >
            {Object.keys(doc._source).map((key) => (
              <div key={key} className="flex py-2">
                <h1>{key}:&nbsp;</h1>
                {doc._source[key].length > 100 ? ( 
                  <LargeInformation title={'Expand'} value={doc?._source[key]}/>
                ) : (
                  <h1 className="font-normal">{doc._source[key]}</h1>
                )}
              </div>
            ))}
          </ResultCard>
        </div>
      ))}
    </section>
  );
}
