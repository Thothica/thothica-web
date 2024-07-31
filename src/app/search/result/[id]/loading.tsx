import { Skeleton, SVGSkeleton } from "@/components/SkeletonCard";

const LoadingSkeleton = () => (
  <>
    <div className="my-6 rounded-lg border border-yellow-800 p-6 shadow-xl">
      <div className="flex justify-between pb-4">
        <div>
          <h1>
            <Skeleton className="w-[128px] max-w-full" />
          </h1>
          <p>
            <Skeleton className="w-[104px] max-w-full" />
          </p>
        </div>
        <div className="ml-4 flex"></div>
      </div>
      <div className="rounded-lg border border-yellow-800 p-6">
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[104px] max-w-full" />
          </h1>
          <div>
            <div className="border-b">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between">
                  <Skeleton className="w-[48px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[72px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[72px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[56px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[128px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[104px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[176px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[48px] max-w-full" />
          </h1>
          <div>
            <div className="border-b">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between">
                  <Skeleton className="w-[48px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[128px] max-w-full" />
          </h1>
          <div>
            <div className="border-b">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between">
                  <Skeleton className="w-[48px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[72px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[432px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[40px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[568px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[88px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[104px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[48px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[64px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[64px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[104px] max-w-full" />
          </h1>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[64px] max-w-full" />
          </h1>
          <div>
            <div className="border-b">
              <h3 className="flex">
                <div className="flex flex-1 items-center justify-between">
                  <Skeleton className="w-[48px] max-w-full" />
                  <SVGSkeleton className="h-[24px] w-[24px] shrink-0" />
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex py-2">
          <h1>
            <Skeleton className="w-[64px] max-w-full" />
          </h1>
          <h1>
            <Skeleton className="w-[96px] max-w-full" />
          </h1>
        </div>
      </div>
    </div>
  </>
);

const SandboxPreview = () => (
  <div className="flex h-full w-full justify-center p-6">
    <LoadingSkeleton />
  </div>
);

export default SandboxPreview;
