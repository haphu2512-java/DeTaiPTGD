"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ChevronLeft, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, itemCount } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleApplyCoupon = () => {
    if (!couponCode) return

    setIsApplyingCoupon(true)

    // Simulate API call to validate coupon
    setTimeout(() => {
      setIsApplyingCoupon(false)
      alert(`Mã giảm giá "${couponCode}" không hợp lệ hoặc đã hết hạn.`)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">GIỎ HÀNG CỦA BẠN</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</div>
            <Link href="/thuc-an-ca-canh">
              <Button className="bg-[#00335f] hover:bg-green-700">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
                    <div className="col-span-6">Sản phẩm</div>
                    <div className="col-span-2 text-center">Đơn giá</div>
                    <div className="col-span-2 text-center">Số lượng</div>
                    <div className="col-span-2 text-center">Thành tiền</div>
                  </div>
                </div>

                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex items-center">
                            <div className="w-16 h-16 flex-shrink-0 mr-4">
                              <Image
                                src={item.image || "/placeholder.svg?height=100&width=100"}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 text-xs flex items-center mt-1 hover:underline"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 text-center">
                          <div className="text-red-600 font-medium">{item.price.toLocaleString()}₫</div>
                          {item.originalPrice > item.price && (
                            <div className="text-gray-500 text-xs line-through">
                              {item.originalPrice.toLocaleString()}₫
                            </div>
                          )}
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border rounded">
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-10 text-center border-x py-1 text-sm"
                            />
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 text-center font-medium text-red-600">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Link href="/thuc-an-ca-canh">
                  <Button variant="outline" className="text-[#194f91] border-green-600">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Tiếp tục mua sắm
                  </Button>
                </Link>

                <div className="text-right">
                  <div className="text-gray-600">
                    Tổng số sản phẩm: <span className="font-medium">{itemCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold mb-4">TÓM TẮT ĐƠN HÀNG</h2>

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

                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600 text-lg">{total.toLocaleString()}₫</span>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">(Đã bao gồm VAT nếu có)</div>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      variant="outline"
                      className="border-green-600 text-[#194f91]"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                    >
                      {isApplyingCoupon ? "Đang áp dụng..." : "Áp dụng"}
                    </Button>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-[#00335f] hover:bg-green-700 py-6">TIẾN HÀNH THANH TOÁN</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
