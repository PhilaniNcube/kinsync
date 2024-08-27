import { Skeleton } from "@/components/ui/skeleton";

const SummaryLoading = () => {
  return <div className="grid flex-1 gap-3">
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-full h-20" />
    <Skeleton className="w-full h-12" />
  </div>;
};
export default SummaryLoading;
