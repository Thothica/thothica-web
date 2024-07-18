"use client";
export default function documentError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <>
      <h1>
        Error fetching your document. The document with the given ID does not
        exsist.
      </h1>
      <h1>{error.message}</h1>
    </>
  );
}
