import Header from "@/components/header"
import Footer from "@/components/footer"

export default function OrderDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Order Info Skeleton */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between mb-6">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between mb-6">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-center py-3 border-b">
                      <div className="h-20 w-20 bg-gray-200 rounded animate-pulse mr-4"></div>
                      <div className="flex-grow space-y-2">
                        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between py-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Timeline Skeleton */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full h-8 w-8 bg-gray-200 animate-pulse"></div>
                        <div className="h-16 w-0.5 bg-gray-200 -mt-2 ml-0"></div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Shipping Info Skeleton */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse mr-2"></div>
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse mr-2"></div>
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse mr-2"></div>
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Skeleton */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-3">
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
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
