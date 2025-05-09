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
        <Skeleton className="h-10 w-3/4 mx-auto mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Skeleton className="aspect-video rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-12">
          <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-12">
          <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex items-center">
                          <Skeleton className="h-3 w-3 rounded-full mr-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gray-200 p-8 rounded-lg">
          <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-4 w-2/3 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
              ))}
          </div>
          <div className="text-center mt-6">
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
