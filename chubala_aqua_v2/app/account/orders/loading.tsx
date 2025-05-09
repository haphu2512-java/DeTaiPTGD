import Header from "@/components/header"
import Footer from "@/components/footer"

export default function OrdersLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Skeleton */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse mb-3"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content Skeleton */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>

                <div className="h-12 bg-gray-200 rounded animate-pulse mb-6"></div>

                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 p-4 flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center py-2 border-b">
                          <div className="h-20 w-20 bg-gray-200 rounded animate-pulse mr-4"></div>
                          <div className="flex-grow space-y-2">
                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="mt-4 text-right space-y-1">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse ml-auto"></div>
                          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse ml-auto"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
