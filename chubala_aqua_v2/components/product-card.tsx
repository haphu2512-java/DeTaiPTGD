"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface ProductCardProps {
  product: any
  detailUrl?: string
}

export default function ProductCard({ product, detailUrl }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product, 1)
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: product.name,
      action: (
        <ToastAction altText="Xem giỏ hàng">
          <Link href="/cart">Xem giỏ hàng</Link>
        </ToastAction>
      ),
    })
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return price.toLocaleString() + "₫"
  }

  // Default detail URL if not provided
  const productDetailUrl = detailUrl || `/product/${product.id}`

  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={productDetailUrl} className="block relative">
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
        <Link href={productDetailUrl}>
          <h3 className="font-medium text-sm mb-2 hover:text-[#194f91] line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        </Link>

        <div className="flex items-center mb-3">
          <span className="text-red-600 font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-500 text-sm line-through ml-2">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <Button
          className="w-full bg-[#00335f] hover:bg-green-700 text-white text-sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  )
}
