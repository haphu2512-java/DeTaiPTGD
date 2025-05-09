"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "15/05/2023",
    status: "Đã giao hàng",
    total: 1250000,
    shipping: 30000,
    payment: "Thanh toán khi nhận hàng (COD)",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
    recipient: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@example.com",
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
    shipping: 30000,
    payment: "Chuyển khoản ngân hàng",
    address: "456 Đường DEF, Phường UVW, Quận 2, TP. Hồ Chí Minh",
    recipient: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@example.com",
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
    shipping: 30000,
    payment: "Thanh toán khi nhận hàng (COD)",
    address: "789 Đường GHI, Phường RST, Quận 3, TP. Hồ Chí Minh",
    recipient: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@example.com",
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

export default function OrderDetailPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<any>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/account/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Fetch order data
  useEffect(() => {
    if (orderId && typeof window !== "undefined") {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = savedOrders.find((o) => o.id === orderId)
      setOrder(foundOrder || null)
    }
  }, [orderId])

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

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
              <Link href="/account/orders" className="flex items-center text-[#194f91] hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại đơn hàng
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Không tìm thấy đơn hàng</h2>
              <p className="text-gray-500 mb-6">Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              <Link href="/account/orders">
                <Button className="bg-[#00335f] hover:bg-green-700">Quay lại danh sách đơn hàng</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/account/orders" className="flex items-center text-[#194f91] hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Quay lại đơn hàng
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết đơn hàng #{order.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phương thức thanh toán</p>
                      <p className="font-medium">{order.payment}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Sản phẩm</h3>
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center py-3 border-b last:border-0">
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
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex-shrink-0 font-medium">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span>{formatCurrency(order.total - order.shipping)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span>{formatCurrency(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-[#194f91]">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
            </div>

            <div className="space-y-6">
              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin giao hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Địa chỉ giao hàng</h3>
                        <p className="text-sm text-gray-600">{order.recipient}</p>
                        <p className="text-sm text-gray-600">{order.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <h3 className="font-medium">Số điện thoại</h3>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button className="w-full bg-[#00335f] hover:bg-green-700">Liên hệ hỗ trợ</Button>
                    <Button variant="outline" className="w-full">
                      Đánh giá sản phẩm
                    </Button>
                    <Button variant="outline" className="w-full">
                      Mua lại
                    </Button>
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
