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
        <div className="flex w-full items-center justify-center p-6 lg:w-1/3">
          <div className="rounded-xl border bg-background p-6 shadow-md xl:p-12">
            <Image
              src="/assets/logo.png"
              alt="Thothica"
              width={180}
              height={180}
            />
            <h1 className="text-gradient py-4 text-3xl font-bold lg:text-4xl">
              Welcome to Thothica
            </h1>
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden lg:block lg:w-2/3">
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
