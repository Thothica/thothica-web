import Spinner from "@/components/spinner";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect('/search')
  return <main className="flex flex-center min-h-screen"><Spinner size={100}/></main>;
}
