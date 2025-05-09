import Header from "@/components/header"
import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export default function PolicyLoading() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 mx-2 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <Skeleton className="h-8 w-48 mb-6" />

              <div className="space-y-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <section key={i}>
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
