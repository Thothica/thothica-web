"use client";

import { Button } from "@/components/ui/button";
import { type ChangeEvent, useState } from "react";
import { generatePaper } from "../../actions/academicPaper";
import { readStreamableValue } from "ai/rsc";

export default function PaperButton({
  dehydratedKeys,
  dehydratedSource,
  resultId,
  query,
}: {
  dehydratedKeys: string;
  dehydratedSource: string;
  resultId: string;
  query: string;
}) {
  const [paper, setPaper] = useState("");

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPaper("Generating Paper please wait a moment...");
    const result = await generatePaper(
      dehydratedSource,
      dehydratedKeys,
      resultId,
      query,
    );

    setPaper("");
    // @ts-expect-error Docs say to do this
    for await (const content of readStreamableValue(result)) {
      if (!content) {
        continue;
      }
      setPaper(content);
    }
  };
  return (
    <>
      {paper}
      {paper.length == 0 && (
        <form onSubmit={HandleSubmit}>
          <Button type="submit">Generate Paper</Button>
        </form>
      )}
    </>
  );
}
