"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { fishFoodData } from "@/data/fish-food"
import type { FishFood } from "@/types/fish-food"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<FishFood[]>([])
  const [searchTerm, setSearchTerm] = useState(query)
  const [isLoading, setIsLoading] = useState(true)

  // Thực hiện tìm kiếm khi query thay đổi
  useEffect(() => {
    setSearchTerm(query)
    performSearch(query)
  }, [query])

  // Hàm tìm kiếm
  const performSearch = (term: string) => {
    setIsLoading(true)

    // Mô phỏng độ trễ API
    setTimeout(() => {
      if (!term.trim()) {
        setSearchResults([])
        setIsLoading(false)
        return
      }

      const normalizedTerm = term.toLowerCase().trim()

      // Tìm kiếm trong tên, mô tả và danh mục
      const results = fishFoodData.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedTerm) ||
          product.description.toLowerCase().includes(normalizedTerm) ||
          product.category.toLowerCase().includes(normalizedTerm),
      )

      setSearchResults(results)
      setIsLoading(false)
    }, 300)
  }

  // Xử lý khi người dùng submit form tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Chuyển hướng đến URL tìm kiếm với query mới
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Tìm kiếm sản phẩm</h1>

          {/* Form tìm kiếm */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Nhập từ khóa tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button type="submit" className="bg-[#00335f] hover:bg-green-700">
                Tìm kiếm
              </Button>
            </div>
          </form>

          {/* Hiển thị kết quả */}
          {query && (
            <div className="mb-4">
              <p className="text-gray-600">
                {isLoading
                  ? "Đang tìm kiếm..."
                  : searchResults.length === 0
                    ? "Không tìm thấy sản phẩm nào phù hợp."
                    : `Tìm thấy ${searchResults.length} sản phẩm cho "${query}"`}
              </p>
            </div>
          )}

          {/* Danh sách sản phẩm */}
          {!isLoading && searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Hiển thị khi không có kết quả */}
          {!isLoading && query && searchResults.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-500 mb-4">Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}".</div>
              <p className="text-gray-600 mb-4">Gợi ý:</p>
              <ul className="list-disc text-left max-w-md mx-auto text-gray-600">
                <li>Kiểm tra lỗi chính tả</li>
                <li>Sử dụng các từ khóa khác</li>
                <li>Sử dụng các từ khóa ngắn hơn</li>
                <li>Tìm kiếm theo tên sản phẩm hoặc danh mục</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
