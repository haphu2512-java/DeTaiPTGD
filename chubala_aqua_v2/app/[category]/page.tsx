"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fishData } from "@/data/fish-data"
import { fishFoodData } from "@/data/fish-food"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// Map of category slugs to display names
const categoryNames: Record<string, string> = {
  "thuc-an-ca-canh": "Thức ăn cá cảnh",
  "thuc-an-ca-koi": "Thức ăn cá Koi",
  "thuc-an-ca-rong": "Thức ăn cá rồng",
  "thuc-an-ca-dia": "Thức ăn cá đĩa",
  "thuc-an-ca-vang": "Thức ăn cá vàng",
  "thuc-an-ca-la-han": "Thức ăn cá La Hán",
  "thuc-an-ca-betta": "Thức ăn cá Betta",
  "thuc-an-ca-neon": "Thức ăn cá Neon",
  "thuc-an-ca-thuy-sinh": "Thức ăn cá thủy sinh",
  "ca-canh": "Cá cảnh",
  "ca-betta": "Cá Betta",
  "ca-dia": "Cá Đĩa",
  "ca-rong": "Cá Rồng",
  "ca-koi": "Cá Koi",
  "ca-la-han": "Cá La Hán",
  "ca-thuy-sinh": "Cá Thủy Sinh",
  "ca-ali": "Cá Ali",
  "ca-vang": "Cá Vàng",
  "ca-neon": "Cá Neon",
  "ca-canh-khac": "Cá Cảnh Khác",
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState<Record<number, boolean>>({})
  const { addItem } = useCart()
  const { toast } = useToast()

  // Format price for display
  const formatPrice = (price: number) => {
    return price.toLocaleString() + "₫"
  }

  const handleAddToCart = (product: any) => {
    setIsAdding((prev) => ({ ...prev, [product.id]: true }))

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem(product, 1)
      setIsAdding((prev) => ({ ...prev, [product.id]: false }))

      toast({
        title: "Đã thêm vào giỏ hàng",
        description: product.name,
        action: (
          <ToastAction altText="Xem giỏ hàng">
            <Link href="/cart">Xem giỏ hàng</Link>
          </ToastAction>
        ),
      })
    }, 300)
  }

  useEffect(() => {
    setLoading(true)

    // Xác định loại sản phẩm (cá cảnh hay thức ăn)
    const isFishCategory = categorySlug.startsWith("ca-")
    const isFoodCategory = categorySlug.startsWith("thuc-an")

    let filteredProducts: any[] = []

    if (isFishCategory) {
      // Lọc cá cảnh theo danh mục
      filteredProducts = fishData.filter((fish) => fish.category === categorySlug)
    } else if (isFoodCategory) {
      // Lọc thức ăn theo danh mục
      filteredProducts = fishFoodData.filter((food) => food.category === categorySlug)
    }

    // Simulate API delay
    setTimeout(() => {
      setProducts(filteredProducts)
      setLoading(false)
    }, 300)
  }, [categorySlug])

  // Xác định loại sản phẩm để hiển thị đường dẫn chi tiết đúng
  const isFishCategory = categorySlug.startsWith("ca-")
  const detailUrlPrefix = isFishCategory ? "/ca-canh" : "/thuc-an-ca-canh"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-gray-100 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#194f91]">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href={isFishCategory ? "/ca-canh" : "/thuc-an-ca-canh"} className="hover:text-[#194f91]">
              {isFishCategory ? "Cá cảnh" : "Thức ăn cá cảnh"}
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="font-medium">{categoryNames[categorySlug] || categorySlug}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">
          {categoryNames[categorySlug]?.toUpperCase() || categorySlug.toUpperCase()}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar className="w-full md:w-64" activeCategory={categorySlug} />

          <div className="flex-1">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="animate-pulse text-xl">Đang tải...</div>
              </div>
            ) : products.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-bold mb-6 uppercase">{categoryNames[categorySlug] || categorySlug}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link href={`${detailUrlPrefix}/${product.id}`} className="block relative">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg?height=300&width=300"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {product.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
                            -{product.discount}%
                          </div>
                        )}
                      </Link>
                      <div className="p-3">
                        <Link href={`${detailUrlPrefix}/${product.id}`}>
                          <h3 className="font-medium text-sm mb-2 hover:text-[#194f91] line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center mb-3">
                          <span className="text-red-600 font-bold">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <Button
                          className="w-full bg-[#00335f] hover:bg-green-700 text-white text-sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={isAdding[product.id] || !product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {isAdding[product.id] ? "Đang thêm..." : "Thêm vào giỏ"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-500 mb-4">Không tìm thấy sản phẩm trong danh mục này</div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
