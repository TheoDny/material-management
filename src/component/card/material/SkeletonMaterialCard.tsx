import { Skeleton } from "@/component/ui/skeleton"
import { BasicCard } from "@/component/card/basicCard"

export function SkeletonMaterialCard() {
    return (
        <BasicCard
            className={{ card: "w-fit" }}
            header={
                <>
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </>
            }
        >
            <div className="flex items-center space-x-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[190px]" />
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[180px]" />
                    <div className="border-b"></div>
                    <div className="flex flex-row gap-1">
                        <Skeleton className="h-4 w-[30px]" />
                        <Skeleton className="h-4 w-[25px]" />
                        <Skeleton className="h-4 w-[30px]" />
                    </div>
                </div>
            </div>
        </BasicCard>
    )
}
