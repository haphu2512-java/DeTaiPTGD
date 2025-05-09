"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fishFoodData } from "@/data/fish-food"
import type { FishFood } from "@/types/fish-food"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Sidebar from "@/components/sidebar"
import { useFavorites } from "@/context/favorites-context"

export default function FishFoodDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<FishFood | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()
  const [relatedProducts, setRelatedProducts] = useState<FishFood[]>([])
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    // In a real app, this would be an API call
    const productId = Number(params.id)
    const foundProduct = fishFoodData.find((p) => p.id === productId)

    // Get related products from the same category
    const related = foundProduct
      ? fishFoodData.filter((p) => p.category === foundProduct.category && p.id !== productId).slice(0, 4)
      : []

    // Simulate API delay
    setTimeout(() => {
      setProduct(foundProduct || null)
      setRelatedProducts(related)
      setLoading(false)
    }, 300)
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem(product, quantity)
      setIsAdding(false)

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

  const handleToggleFavorite = () => {
    if (!product) return

    const productId = product.id
    if (isFavorite(productId)) {
      removeFavorite(productId)
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: product.name,
      })
    } else {
      addFavorite(productId)
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: product.name,
      })
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return price.toLocaleString() + "₫"
  }

  // Map category to display name
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
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Đang tải...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">Không tìm thấy sản phẩm</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/thuc-an-ca-canh">Thức ăn cá cảnh</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/thuc-an-ca-canh/${product.category}`}>
                {categoryNames[product.category] || product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar className="w-full md:w-64" activeCategory={product.category} />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-lg border">
                    <Image
                      src={product.image || "/placeholder.svg?height=500&width=500"}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-red-600 mr-3">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">{product.description}</p>

                    <div className="flex items-center mb-4">
                      <span className="text-gray-600 mr-2">Tình trạng:</span>
                      {product.inStock ? (
                        <span className="text-[#194f91] font-medium">Còn hàng</span>
                      ) : (
                        <span className="text-red-600 font-medium">Hết hàng</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="flex items-center border rounded-md mr-4">
                      <button className="px-3 py-2 border-r" onClick={decrementQuantity} disabled={quantity <= 1}>
                        -
                      </button>
                      <span className="px-4 py-2">{quantity}</span>
                      <button className="px-3 py-2 border-l" onClick={incrementQuantity}>
                        +
                      </button>
                    </div>
                    <Button
                      className="bg-[#00335f] hover:bg-green-700 flex-1"
                      onClick={handleAddToCart}
                      disabled={isAdding || !product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleFavorite}
                      className={isFavorite(product.id) ? "bg-pink-50 text-pink-600 border-pink-200" : ""}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${isFavorite(product.id) ? "fill-pink-600 text-pink-600" : ""}`}
                      />
                      {isFavorite(product.id) ? "Đã yêu thích" : "Yêu thích"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Chi tiết sản phẩm</TabsTrigger>
                  <TabsTrigger value="usage">Hướng dẫn sử dụng</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Thông tin chi tiết</h3>
                    <p className="text-gray-700">{product.description}</p>
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-blue-800">
                        Lưu ý: Thức ăn cá cảnh cần được bảo quản đúng cách để đảm bảo chất lượng. Hãy đọc kỹ hướng dẫn
                        sử dụng trước khi cho cá ăn.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="usage" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hướng dẫn sử dụng</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Cho cá ăn 1-2 lần mỗi ngày, lượng vừa đủ trong 2-3 phút.</li>
                      <li>Không cho cá ăn quá nhiều để tránh dư thừa thức ăn làm bẩn nước.</li>
                      <li>Bảo quản thức ăn ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.</li>
                      <li>Đậy kín hộp sau khi sử dụng để giữ độ tươi ngon của thức ăn.</li>
                    </ul>
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <p className="text-sm text-yellow-800">
                        Lưu ý: Mỗi loại cá có nhu cầu dinh dưỡng khác nhau, hãy chọn loại thức ăn phù hợp với loài cá
                        bạn đang nuôi.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedProducts.map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/thuc-an-ca-canh/${relatedProduct.id}`} className="block relative">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                            alt={relatedProduct.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {relatedProduct.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
                            -{relatedProduct.discount}%
                          </div>
                        )}
                      </Link>
                      <div className="p-3">
                        <Link href={`/thuc-an-ca-canh/${relatedProduct.id}`}>
                          <h3 className="font-medium text-sm mb-2 hover:text-[#194f91] line-clamp-2 min-h-[2.5rem]">
                            {relatedProduct.name}
                          </h3>
                        </Link>

                        <div className="flex items-center mb-3">
                          <span className="text-red-600 font-bold">{formatPrice(relatedProduct.price)}</span>
                          {relatedProduct.originalPrice > relatedProduct.price && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(relatedProduct.originalPrice)}
                            </span>
                          )}
                        </div>

                        <Button
                          className="w-full bg-[#00335f] hover:bg-green-700 text-white text-sm"
                          onClick={() => {
                            addItem(relatedProduct, 1)
                            toast({
                              title: "Đã thêm vào giỏ hàng",
                              description: relatedProduct.name,
                              action: (
                                <ToastAction altText="Xem giỏ hàng">
                                  <Link href="/cart">Xem giỏ hàng</Link>
                                </ToastAction>
                              ),
                            })
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Thêm vào giỏ
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
