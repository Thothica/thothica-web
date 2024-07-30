import Spinner from "@/components/spinner";
export default function resultLoading() {
  return (
    <div className="flex flex-center py-12">
      <Spinner size={100} />;
    </div>
  )

}
