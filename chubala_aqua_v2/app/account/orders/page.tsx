"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, ShoppingBag, Heart, LogOut, User, Key, Eye } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "15/05/2023",
    status: "Đã giao hàng",
    total: 1250000,
    items: [
      {
        id: 1,
        name: "Cá Betta Halfmoon",
        price: 350000,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Thức ăn cá Tetra",
        price: 550000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "02/06/2023",
    status: "Đang giao hàng",
    total: 780000,
    items: [
      {
        id: 3,
        name: "Cá Koi Nhật Bản",
        price: 780000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "10/06/2023",
    status: "Đang xử lý",
    total: 450000,
    items: [
      {
        id: 4,
        name: "Cá Rồng",
        price: 450000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

export default function OrdersPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])

  // Lấy đơn hàng từ localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(savedOrders)
    }
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/account/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
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
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-[#194f91] font-medium"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Đơn hàng của tôi</span>
                  </Link>
                  <Link
                    href="/account/wishlist"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
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
                  <CardTitle>Đơn hàng của tôi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-6">
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Không có đơn hàng</h3>
                        <p className="mt-1 text-sm text-gray-500">Bạn chưa có đơn hàng nào.</p>
                        <div className="mt-6">
                          <Link href="/ca-canh">
                            <Button className="bg-[#00335f] hover:bg-green-700">Mua sắm ngay</Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex justify-between items-center">
                              <div>
                                <p className="font-medium">Đơn hàng #{order.id}</p>
                                <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Link href={`/account/orders/${order.id}`}>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>Chi tiết</span>
                                  </Button>
                                </Link>
                              </div>
                            </div>
                            <div className="p-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center py-2 border-b last:border-0">
                                  <div className="flex-shrink-0 mr-4">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={80}
                                      height={80}
                                      className="rounded-md"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                      {formatCurrency(item.price)} x {item.quantity}
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0 font-medium">
                                    {formatCurrency(item.price * item.quantity)}
                                  </div>
                                </div>
                              ))}
                              <div className="mt-4 text-right">
                                <p className="text-sm text-gray-500">Tổng tiền:</p>
                                <p className="text-lg font-bold text-[#194f91]">{formatCurrency(order.total)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
