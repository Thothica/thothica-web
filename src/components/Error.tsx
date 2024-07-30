import { CircleAlert } from "lucide-react";

const Error = ({ message }: { message: string }) => {
  return (
    <section className="rounded-lg border bg-destructive p-2">
      <div className="flex items-center p-2 text-white">
        <CircleAlert className="mr-2 h-5 w-5" />
        <span className="text-xl font-bold">Error</span>
      </div>
      <div className="rounded-lg border bg-background/60 p-2">{message}</div>
    </section>
  );
};

export default Error;
