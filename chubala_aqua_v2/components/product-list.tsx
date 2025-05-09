"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ProductCard from "./product-card"
import { fishData } from "@/data/fish-data"
import type { Fish } from "@/data/fish-data"

interface ProductListProps {
  className?: string
}

export default function ProductList({ className }: ProductListProps) {
  const [products, setProducts] = useState<Fish[]>([])
  const [sortOption, setSortOption] = useState("default")

  useEffect(() => {
    // Load products from our data
    setProducts(fishData)
  }, [])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value
    setSortOption(option)

    let sortedProducts = [...products]

    switch (option) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      default:
        // Default sorting (newest)
        sortedProducts = [...fishData]
    }

    setProducts(sortedProducts)
  }

  return (
    <div className={className}>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-bold mb-2 sm:mb-0">CÁ CẢNH</h2>
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm">
              Sắp xếp:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border rounded py-1 px-2 text-sm"
            >
              <option value="default">Mặc định</option>
              <option value="name-asc">Tên A-Z</option>
              <option value="name-desc">Tên Z-A</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} detailUrl={`/ca-canh/${product.id}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
