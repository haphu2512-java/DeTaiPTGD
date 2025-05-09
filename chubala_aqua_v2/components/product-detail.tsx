"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Heart, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import type { FishFood } from "@/types/fish-food"
import { Badge } from "@/components/ui/badge"
import { useReviews } from "@/context/review-context"
import StarRating from "./star-rating"

interface ProductDetailProps {
  product: FishFood
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()
  const { addItem } = useCart()

  // In a real app, we would have multiple images
  const productImages = [
    product.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    setIsAdding(true)

    setTimeout(() => {
      addItem(product, quantity)
      setIsAdding(false)

      toast({
        title: "Đã thêm vào giỏ hàng",
        description: `${quantity} x ${product.name}`,
      })
    }, 500)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg mb-4 border">
            <Image
              src={productImages[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`aspect-square border rounded-md overflow-hidden cursor-pointer ${
                  activeImageIndex === index ? "border-green-600 ring-2 ring-green-600" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Ảnh ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              <StarRating rating={useReviews().getAverageRating(product.id)} />
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({useReviews().getProductReviews(product.id).length} đánh giá)
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-[#194f91]">Còn hàng</span>
          </div>

          <div className="mb-4">
            <div className="text-2xl font-bold text-red-600">{product.price.toLocaleString()}₫</div>
            {product.originalPrice > product.price && (
              <div className="flex items-center mt-1">
                <span className="text-gray-500 line-through">{product.originalPrice.toLocaleString()}₫</span>
                <Badge variant="destructive" className="ml-2">
                  -{product.discount}%
                </Badge>
              </div>
            )}
          </div>

          <div className="border-t border-b py-4 my-4">
            <div className="text-sm text-gray-600 mb-4">{product.description}</div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-[#194f91] mr-2" />
                <span>Giao hàng toàn quốc</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-[#194f91] mr-2" />
                <span>Đổi trả trong 7 ngày</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-[#194f91] mr-2" />
                <span>Thanh toán khi nhận hàng</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-[#194f91] mr-2" />
                <span>Sản phẩm chính hãng</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Số lượng:</label>
            <div className="flex items-center">
              <button
                className="border rounded-l-md px-3 py-2 hover:bg-gray-100"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                className="border-y w-16 py-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                className="border rounded-r-md px-3 py-2 hover:bg-gray-100"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="bg-[#00335f] hover:bg-green-700 flex-1 h-12"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isAdding ? "ĐANG THÊM..." : "THÊM VÀO GIỎ HÀNG"}
            </Button>

            <Button variant="outline" className="border-green-600 text-[#194f91] hover:bg-green-50">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="outline" className="border-green-600 text-[#194f91] hover:bg-green-50">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
