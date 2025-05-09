import ProductList from "@/components/product-list"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Banner />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar className="w-full md:w-64" />
          <ProductList className="flex-1" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
