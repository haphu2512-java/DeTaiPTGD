"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { useFavorites } from "@/context/favorites-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, ShoppingBag, Heart, LogOut, User, Key, Trash2, ShoppingCart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fishData } from "@/data/fish-data"
import { fishFoodData } from "@/data/fish-food"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const { favorites, removeFavorite } = useFavorites()
  const router = useRouter()
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([])
  const { toast } = useToast()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/account/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Get favorite products
  useEffect(() => {
    // Lấy tất cả sản phẩm
    const allFishProducts = fishData.map((product) => ({ ...product, type: "fish" }))
    const allFoodProducts = fishFoodData.map((product) => ({ ...product, type: "food" }))
    const allProducts = [...allFishProducts, ...allFoodProducts]

    // Lọc sản phẩm yêu thích dựa trên ID
    const favProducts = allProducts.filter((product) => favorites.includes(product.id))

    // Loại bỏ các sản phẩm trùng lặp (nếu có)
    const uniqueProducts = favProducts.filter(
      (product, index, self) => index === self.findIndex((p) => p.id === product.id),
    )

    setFavoriteProducts(uniqueProducts)
  }, [favorites])

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Handle remove from favorites
  const handleRemoveFromFavorites = (id: number) => {
    removeFavorite(id)
    toast({
      title: "Đã xóa khỏi danh sách yêu thích",
      description: "Sản phẩm đã được xóa khỏi danh sách yêu thích của bạn.",
      variant: "default",
    })
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Calculate discount percentage
  const calculateDiscount = (originalPrice: number, price: number) => {
    if (!originalPrice || originalPrice <= price) return null
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
    return discount
  }

  // Get product URL
  const getProductUrl = (product: any) => {
    // Check if it's a fish or fish food based on some property
    if (product.type === "fish") {
      return `/ca-canh/${product.id}`
    } else {
      return `/thuc-an-ca-canh/${product.id}`
    }
  }

  if (isLoading) {
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

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">TÀI KHOẢN CỦA TÔI</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-3">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=100&width=100"}
                      alt={user.fullName}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#00335f] text-white p-1 rounded-full">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="font-bold text-lg">{user.fullName}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                <nav className="space-y-1">
                  <Link
                    href="/account/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <User className="h-5 w-5" />
                    <span>Thông tin tài khoản</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Đơn hàng của tôi</span>
                  </Link>
                  <Link
                    href="/account/wishlist"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-[#194f91] font-medium"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Sản phẩm yêu thích</span>
                  </Link>
                  <Link
                    href="/account/change-password"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <Key className="h-5 w-5" />
                    <span>Đổi mật khẩu</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 text-red-500 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm yêu thích ({favoriteProducts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {favoriteProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có sản phẩm yêu thích</h3>
                      <p className="mt-1 text-sm text-gray-500">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.</p>
                      <div className="mt-6">
                        <Link href="/ca-canh">
                          <Button className="bg-[#00335f] hover:bg-green-700">Khám phá sản phẩm</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteProducts.map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden group">
                          <div className="relative">
                            <Link href={getProductUrl(product)}>
                              <div className="aspect-square overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg?height=300&width=300"}
                                  alt={product.name}
                                  width={300}
                                  height={300}
                                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </Link>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                -{calculateDiscount(product.originalPrice, product.price)}%
                              </div>
                            )}
                            <button
                              onClick={() => handleRemoveFromFavorites(product.id)}
                              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors"
                              aria-label="Xóa khỏi yêu thích"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                          <div className="p-4">
                            <Link href={getProductUrl(product)}>
                              <h3 className="font-medium text-gray-900 hover:text-[#194f91] transition-colors line-clamp-2 min-h-[48px]">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="mt-2 flex justify-between items-center">
                              <div>
                                <p className="font-bold text-[#194f91]">{formatCurrency(product.price)}</p>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <p className="text-gray-500 text-sm line-through">
                                    {formatCurrency(product.originalPrice)}
                                  </p>
                                )}
                              </div>
                              <Button size="sm" className="bg-[#00335f] hover:bg-green-700">
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                <span>Mua</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
