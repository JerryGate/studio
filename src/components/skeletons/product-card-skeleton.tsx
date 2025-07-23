
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full" />
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Skeleton className="h-5 w-4/5 mb-2" />
        <Skeleton className="h-4 w-2/5 mb-4" />
        <div className="mt-auto space-y-2">
           <Skeleton className="h-4 w-1/4" />
           <Skeleton className="h-6 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
