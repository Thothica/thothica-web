import Error from "@/components/Error";
import ResultCard from "@/components/ResultCard";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import SummaryButton from "./component/summaryButton";
import PaperButton from "./component/paperButton";
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

  let dehydratedSource = "";
  let dehydratedkeys = "";

  for (const doc of opensearchDocument) {
    const sourceString = JSON.stringify(doc._source);
    dehydratedSource += sourceString + "\n\n";
    dehydratedkeys = Object.keys(doc._source).join(","); // eslint-disable-line
  }

  const summary = results.generatedSummary as string;
  const paper = results.generatedPaper as string;

  return (
    <>
      {summary ? (
        <h1>{summary}</h1>
      ) : (
        <SummaryButton
          opensearchIndex={results.opensearchIndex}
          resultId={results.id}
          dehydratedSource={dehydratedSource}
        />
      )}
      {paper ? (
        <h1>{paper}</h1>
      ) : (
        <PaperButton
          dehydratedSource={dehydratedSource}
          dehydratedKeys={dehydratedkeys}
          query={results.query}
          resultId={results.id}
        />
      )}
      <section>
        {opensearchDocument.map((doc) => (
          <div key={doc._id} className="text-base font-bold sm:text-lg">
            <ResultCard
              title={doc._source.Title ? doc._source.Title : doc._source.title} // eslint-disable-line
              author={doc._source.Author} // eslint-disable-line
            >
              {Object.keys(doc._source).map( // eslint-disable-line
                (
                  key, // eslint-disable-line
                ) => (
                  <div key={key} className="flex py-2">
                    <h1>{key}:&nbsp;</h1>
                    {doc._source[key] && doc._source[key].length > 100 ? ( // eslint-disable-line
                      <LargeInformation
                        title={"Expand"}
                        value={doc?._source[key]} // eslint-disable-line
                      />
                    ) : (
                      <h1 className="font-normal">{doc._source[key]}</h1> // eslint-disable-line
                    )}
                  </div>
                ),
              )}
            </ResultCard>
          </div>
        ))}
      </section>
    </>
  );
}
