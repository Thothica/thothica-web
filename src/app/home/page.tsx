import Image from "next/image";
import { InputForm } from "./form";

export default async function Home() {
    return (
        <main>
            <section className="flex min-h-screen">
                <div className="lg:w-1/3 w-full flex justify-center items-center">
                    <div className="p-6">
                        <Image src="/assets/logo.png" alt="Thothica" width={180} height={180}/>
                        <h1 className="text-4xl font-bold text-gradient py-4">
                            Welcome to Thothica
                        </h1>

                        <InputForm/>
                    </div>
                </div>
                <div className="lg:w-2/3 hidden lg:block relative">
                    <Image 
                        src="/assets/background.jpeg" 
                        alt="library" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
            </section>
        </main>
    );
}
