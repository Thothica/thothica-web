import Searchbar from "@/components/Searchbar";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { type Index } from "@/server/api/utils";

export interface indexSelection {
    id: number;
    name: string;
    opensearchIndex: Index;
}

async function page() {
    const session = await getServerAuthSession()
    if (!session) {
        redirect('/login')
    }

    let tags: indexSelection[] = []

    if (session.user.role === "thothica_generation") {
        tags = [
            // { id: 1, name: "Library Of Congress", opensearchIndex: "loc-new-index" },
            { id: 2, name: "Arabic Books", opensearchIndex: "cleaned-arabicbooks-index" },
            { id: 3, name: "Legal", opensearchIndex: "legaltext-index" },
            { id: 4, name: "Indic Literature", opensearchIndex: "indic-lit-index" },
            {
                id: 5,
                name: "Grey Literature",
                opensearchIndex: "libertarian-chunks-index",
            },
            { id: 6, name: "Poetry", opensearchIndex: "arabic-poems-index" },
            { id: 7, name: "Dutch Text", opensearchIndex: "cleaned-dutchtext-index" },
            { id: 8, name: "Academic Papers", opensearchIndex: "openalex-index" },
        ];
    } else {
        tags = [
            { id: 9, name: "TOS", opensearchIndex: "american-data-index" },
        ]
    }


    return (
        <section className="flex-center flex flex-col space-y-8 p-6 ">
            <Image
                src="/assets/logo.png"
                alt="Thothica Logo"
                width={350}
                height={350}
            />
            <Searchbar tags={tags} />
        </section>
    );
}

export default page;
