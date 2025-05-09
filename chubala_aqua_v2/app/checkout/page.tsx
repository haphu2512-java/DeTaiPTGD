"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const { items, subtotal, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Tạo đơn hàng mới
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      date: new Date().toLocaleDateString("vi-VN"),
      items: items,
      total: total,
      shipping: 30000,
      payment:
        paymentMethod === "cod"
          ? "Thanh toán khi nhận hàng (COD)"
          : paymentMethod === "bank"
            ? "Chuyển khoản ngân hàng"
            : "Thanh toán qua ví MoMo",
    }

    // Lưu đơn hàng vào localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]))

    // Thông báo và chuyển hướng
    setTimeout(() => {
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Cá Cảnh Chubala Aqua.")
      clearCart()
      window.location.href = "/account/orders"
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</div>
            <Link href="/thuc-an-ca-canh">
              <Button className="bg-[#00335f] hover:bg-green-700">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">THANH TOÁN</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer information */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">THÔNG TIN GIAO HÀNG</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="fullName">
                      Họ và tên <span className="text-red-500">*</span>
                    </Label>
                    <Input id="fullName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      Số điện thoại <span className="text-red-500">*</span>
                    </Label>
                    <Input id="phone" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="address">
                      Địa chỉ <span className="text-red-500">*</span>
                    </Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Textarea
                      id="note"
                      className="mt-1"
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">PHƯƠNG THỨC THANH TOÁN</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-grow cursor-pointer">
                      Thanh toán khi giao hàng (COD)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-grow cursor-pointer">
                      Chuyển khoản ngân hàng
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex-grow cursor-pointer">
                      Thanh toán qua ví MoMo
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "bank" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm">
                    <p className="font-medium">Thông tin tài khoản:</p>
                    <p>Ngân hàng: Vietcombank</p>
                    <p>Số tài khoản: 1234567890</p>
                    <p>Chủ tài khoản: NGUYEN VAN A</p>
                    <p className="mt-2">Nội dung chuyển khoản: [Họ tên] - [Số điện thoại]</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Link href="/cart">
                  <Button type="button" variant="outline" className="text-[#194f91] border-green-600">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Quay lại giỏ hàng
                  </Button>
                </Link>

                <Button type="submit" className="bg-[#00335f] hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-bold mb-4">ĐƠN HÀNG CỦA BẠN</h2>

              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between font-medium mb-2">
                  <span>Sản phẩm</span>
                  <span>Tạm tính</span>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex items-start">
                        <div className="w-10 h-10 flex-shrink-0 mr-2">
                          <Image
                            src={item.image || "/placeholder.svg?height=50&width=50"}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="line-clamp-1">{item.name}</div>
                          <div className="text-gray-500">SL: {item.quantity}</div>
                        </div>
                      </div>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()}₫</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">Tính khi thanh toán</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600 text-lg">{total.toLocaleString()}₫</span>
                </div>
                <div className="text-xs text-gray-500 text-right mt-1">(Đã bao gồm VAT nếu có)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
