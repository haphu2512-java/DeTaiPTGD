import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-gray-100 py-3 border-b">
        <div className="container mx-auto px-4">
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="w-full md:w-64 hidden md:block">
            <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>

          {/* Product List Skeleton */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <Skeleton className="h-7 w-48 mb-2 sm:mb-0" />
                <Skeleton className="h-10 w-full sm:w-[180px]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white border rounded-lg overflow-hidden">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-3">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-5 w-1/2 mb-3" />
                      <Skeleton className="h-9 w-full" />
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
