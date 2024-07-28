import Image from "next/image";
import { LoginForm } from "./form";

export default async function LoginPage() {
    return (
        <main>
            <Image
                src="/assets/background.jpeg"
                alt="library"
                layout="fill"
                objectFit="cover"
                className="-z-50 lg:hidden"
            />
            <section className="flex min-h-screen">
                <div className="p-6 lg:w-1/3 w-full flex justify-center items-center">
                    <div className="p-6 xl:p-12 border rounded-xl shadow-md bg-background">
                        <Image src="/assets/logo.png" alt="Thothica" width={180} height={180} />
                        <h1 className="text-3xl lg:text-4xl font-bold text-gradient py-4">
                            Welcome to Thothica
                        </h1>
                        <LoginForm />
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
