"use client"

import { useState, useEffect } from "react"
import { fishFoodData } from "@/data/fish-food"
import type { FishFood } from "@/types/fish-food"
import ProductCard from "./product-card"

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<FishFood[]>([])

  useEffect(() => {
    // Get products from the same category, excluding the current product
    const related = fishFoodData
      .filter((product) => product.category === category && product.id !== currentProductId)
      .slice(0, 4) // Limit to 4 products

    setRelatedProducts(related)
  }, [currentProductId, category])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">SẢN PHẨM LIÊN QUAN</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
