"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fishData } from "@/data/fish-data"
import type { Fish } from "@/data/fish-data"
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

export default function FishDetailPage() {
  const params = useParams()
  const [fish, setFish] = useState<Fish | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()
  const [relatedFish, setRelatedFish] = useState<Fish[]>([])
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    // In a real app, this would be an API call
    const fishId = Number(params.id)
    const foundFish = fishData.find((p) => p.id === fishId)

    // Get related fish from the same category
    const related = foundFish
      ? fishData.filter((p) => p.category === foundFish.category && p.id !== fishId).slice(0, 4)
      : []

    // Simulate API delay
    setTimeout(() => {
      setFish(foundFish || null)
      setRelatedFish(related)
      setLoading(false)
    }, 300)
  }, [params.id])

  const handleAddToCart = () => {
    if (!fish) return

    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem(fish as any, quantity)
      setIsAdding(false)

      toast({
        title: "Đã thêm vào giỏ hàng",
        description: fish.name,
        action: (
          <ToastAction altText="Xem giỏ hàng">
            <Link href="/cart">Xem giỏ hàng</Link>
          </ToastAction>
        ),
      })
    }, 300)
  }

  const handleToggleFavorite = () => {
    if (!fish) return

    const fishId = fish.id
    if (isFavorite(fishId)) {
      removeFavorite(fishId)
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: fish.name,
      })
    } else {
      addFavorite(fishId)
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: fish.name,
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
    "ca-betta": "Cá Betta",
    "ca-dia": "Cá Đĩa",
    "ca-rong": "Cá Rồng",
    "ca-koi": "Cá Koi",
    "ca-la-han": "Cá La Hán",
    "ca-thuy-sinh": "Cá Thủy Sinh",
    "ca-ali": "Cá Ali",
    "ca-vang": "Cá Vàng",
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

  if (!fish) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">Không tìm thấy cá cảnh</div>
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
              <BreadcrumbLink href="/ca-canh">Cá cảnh</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/ca-canh/${fish.category}`}>
                {categoryNames[fish.category] || fish.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{fish.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar className="w-full md:w-64" activeCategory={fish.category} />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-lg border">
                    <Image
                      src={fish.image || "/placeholder.svg?height=500&width=500"}
                      alt={fish.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {fish.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      -{fish.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-2xl font-bold mb-2">{fish.name}</h1>
                  <p className="text-gray-600 mb-4">{fish.scientificName}</p>

                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-red-600 mr-3">{formatPrice(fish.price)}</span>
                    {fish.originalPrice > fish.price && (
                      <span className="text-gray-500 line-through">{formatPrice(fish.originalPrice)}</span>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">{fish.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Xuất xứ:</span>
                        <span className="font-medium">{fish.origin}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Kích thước:</span>
                        <span className="font-medium">{fish.size}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Nhiệt độ:</span>
                        <span className="font-medium">{fish.temperature}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">pH:</span>
                        <span className="font-medium">{fish.pH}</span>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="text-gray-600 mr-2">Tình trạng:</span>
                      {fish.inStock ? (
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
                      disabled={isAdding || !fish.inStock}
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
                      className={isFavorite(fish.id) ? "bg-pink-50 text-pink-600 border-pink-200" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite(fish.id) ? "fill-pink-600 text-pink-600" : ""}`} />
                      {isFavorite(fish.id) ? "Đã yêu thích" : "Yêu thích"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Chi tiết</TabsTrigger>
                  <TabsTrigger value="care">Chăm sóc</TabsTrigger>
                  <TabsTrigger value="compatibility">Tương thích</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Thông tin chi tiết</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Tên khoa học:</span> {fish.scientificName}
                        </p>
                        <p>
                          <span className="font-medium">Xuất xứ:</span> {fish.origin}
                        </p>
                        <p>
                          <span className="font-medium">Kích thước:</span> {fish.size}
                        </p>
                        <p>
                          <span className="font-medium">Tuổi thọ:</span> {fish.lifespan}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Nhiệt độ:</span> {fish.temperature}
                        </p>
                        <p>
                          <span className="font-medium">pH:</span> {fish.pH}
                        </p>
                        <p>
                          <span className="font-medium">Kích thước bể:</span> {fish.tankSize}
                        </p>
                        <p>
                          <span className="font-medium">Mức độ chăm sóc:</span> {fish.careLevel}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{fish.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="care" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hướng dẫn chăm sóc</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Chế độ ăn:</span> {fish.diet}
                      </p>
                      <p>
                        <span className="font-medium">Nhiệt độ nước:</span> {fish.temperature}
                      </p>
                      <p>
                        <span className="font-medium">Độ pH:</span> {fish.pH}
                      </p>
                      <p>
                        <span className="font-medium">Kích thước bể tối thiểu:</span> {fish.tankSize}
                      </p>
                      <p>
                        <span className="font-medium">Sinh sản:</span> {fish.breeding}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-blue-800">
                        Lưu ý: Cá cảnh cần được chăm sóc đúng cách để đảm bảo sức khỏe và tuổi thọ. Hãy đảm bảo môi
                        trường sống phù hợp và chế độ ăn đầy đủ dinh dưỡng.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="compatibility" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tương thích với các loài khác</h3>
                    <p>{fish.compatibility}</p>
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <p className="text-sm text-yellow-800">
                        Lưu ý: Trước khi kết hợp các loài cá khác nhau trong cùng một bể, hãy nghiên cứu kỹ về tính
                        tương thích để tránh xung đột và stress cho cá.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {relatedFish.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Cá cảnh liên quan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedFish.map((relatedFish) => (
                    <div
                      key={relatedFish.id}
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/ca-canh/${relatedFish.id}`} className="block relative">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={relatedFish.image || "/placeholder.svg?height=300&width=300"}
                            alt={relatedFish.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {relatedFish.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
                            -{relatedFish.discount}%
                          </div>
                        )}
                      </Link>
                      <div className="p-3">
                        <Link href={`/ca-canh/${relatedFish.id}`}>
                          <h3 className="font-medium text-sm mb-2 hover:text-[#194f91] line-clamp-2 min-h-[2.5rem]">
                            {relatedFish.name}
                          </h3>
                        </Link>

                        <div className="flex items-center mb-3">
                          <span className="text-red-600 font-bold">{formatPrice(relatedFish.price)}</span>
                          {relatedFish.originalPrice > relatedFish.price && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(relatedFish.originalPrice)}
                            </span>
                          )}
                        </div>

                        <Button
                          className="w-full bg-[#00335f] hover:bg-green-700 text-white text-sm"
                          onClick={() => {
                            addItem(relatedFish as any, 1)
                            toast({
                              title: "Đã thêm vào giỏ hàng",
                              description: relatedFish.name,
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
