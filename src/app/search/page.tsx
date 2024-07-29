import Searchbar from "@/components/Searchbar";
import Image from "next/image";

function page() {
  return (
    <section className="flex-center flex min-h-screen flex-col space-y-8 p-6">
      <Image
        src="/assets/logo.png"
        alt="Thothica Logo"
        width={350}
        height={350}
      />
      <Searchbar />
    </section>
  );
}

export default page;
