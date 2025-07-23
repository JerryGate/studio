
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="flex container mx-auto px-4 py-12 gap-8 flex-col md:flex-row">
      {/* Sidebar Skeleton */}
      <aside className="w-64 flex-shrink-0 hidden md:block">
        <div className="sticky top-24 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
            ))}
            <div className="pt-4">
                 <Skeleton className="h-10 w-full" />
            </div>
        </div>
      </aside>
      
      {/* Main Content Skeleton */}
      <main className="flex-1 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-2/4" />
            </CardHeader>
             <CardContent>
                <Skeleton className="h-40 w-full" />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/4" />
            </CardHeader>
             <CardContent>
                <Skeleton className="h-96 w-full" />
            </CardContent>
        </Card>
      </main>
    </div>
  )
}
