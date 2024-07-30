import Spinner from "@/components/spinner";
export default function resultLoading() {
  return (
    <div className="flex flex-center min-h-screen">
      <Spinner size={100} />;
    </div>
  )

}
