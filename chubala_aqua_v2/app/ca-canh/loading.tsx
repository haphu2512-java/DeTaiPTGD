import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-gray-100 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 mx-2 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="w-full md:w-64 hidden md:block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <Skeleton className="h-12 w-full" />
              <div className="divide-y">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-5 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="space-y-2">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))}
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Product List Skeleton */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <Skeleton className="h-6 w-48 mb-2 sm:mb-0" />
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Skeleton className="h-10 w-full sm:w-[180px]" />
                  <Skeleton className="h-10 w-10 sm:flex hidden" />
                  <Skeleton className="h-10 w-20 sm:hidden flex" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="bg-white border rounded-lg overflow-hidden">
                      <Skeleton className="aspect-square w-full" />
                      <div className="p-3">
                        <Skeleton className="h-5 w-full mb-1" />
                        <Skeleton className="h-5 w-3/4 mb-3" />
                        <div className="flex items-baseline gap-2 mb-3">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
