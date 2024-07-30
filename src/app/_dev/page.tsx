import Searchbar from "@/components/Searchbar";
import { SkeletonCard } from "@/components/SkeletonCard";
import React from "react";

function page() {
  return (
    <section className="flex-center flex min-h-screen flex-col space-y-8 px-6">
      <Searchbar />
      <SkeletonCard />
    </section>
  );
}

export default page;
