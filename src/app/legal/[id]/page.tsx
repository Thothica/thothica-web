import { api } from "@/trpc/server";
import { Suspense } from "react";

export default function Document({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<h1>Loading.....</h1>}>
      <ShowDoc documentId={params.id} />
    </Suspense>
  );
}

async function ShowDoc({ documentId }: { documentId: string }) {
  const doc = await api.documentRouter.getDocById({
    documentId,
    opensearchIndex: "legaltext-index",
  });
  if (!doc) {
    return <h1> No document found with this id ! </h1>;
  }
  const text = doc._source.Raw_Response;
  return <span>{text}</span>;
}
