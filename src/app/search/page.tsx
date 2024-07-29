import Searchbar from "@/components/Searchbar"
import Image from "next/image"

function page() {
  return (
    <section className="flex flex-col flex-center min-h-screen p-6 space-y-8">
        <Image 
            src='/assets/logo.png'
            alt='Thothica Logo'
            width={350}
            height={350}

        />
        <Searchbar />
    </section>
  )
}

export default page