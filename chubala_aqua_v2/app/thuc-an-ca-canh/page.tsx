"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter, ShoppingCart, SlidersHorizontal } from "lucide-react"
import { fishFoodData } from "@/data/fish-food"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function FishFoodPage() {
  const [sortOption, setSortOption] = useState("default")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [showInStock, setShowInStock] = useState(true)
  const [showDiscount, setShowDiscount] = useState(false)
  const [showFeatured, setShowFeatured] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(fishFoodData)
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState<Record<number, boolean>>({})

  const categories = Array.from(new Set(fishFoodData.map((product) => product.category)))
  const categoryNames: Record<string, string> = {
    "thuc-an-ca-canh": "Thức ăn cá cảnh",
    "thuc-an-ca-koi": "Thức ăn cá Koi",
    "thuc-an-ca-rong": "Thức ăn cá rồng",
    "thuc-an-ca-dia": "Thức ăn cá đĩa",
    "thuc-an-ca-vang": "Thức ăn cá vàng",
    "thuc-an-ca-la-han": "Thức ăn cá La Hán",
    "thuc-an-ca-betta": "Thức ăn cá Betta",
    "thuc-an-ca-neon": "Thức ăn cá Neon",
    "thuc-an-ca-thuy-sinh": "Thức ăn cá thủy sinh",
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
    applyFilters(value, priceRange, showInStock, showDiscount, showFeatured)
  }

  const applyFilters = (
    sort = sortOption,
    price = priceRange,
    inStock = showInStock,
    discount = showDiscount,
    featured = showFeatured,
  ) => {
    let filtered = [...fishFoodData]

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= price[0] && product.price <= price[1])

    // Filter by stock status
    if (inStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Filter by discount
    if (discount) {
      filtered = filtered.filter((product) => product.discount > 0)
    }

    // Filter by featured
    if (featured) {
      filtered = filtered.filter((product) => product.featured)
    }

    // Apply sorting
    switch (sort) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      default:
        // Default sorting (newest)
        filtered = [...filtered]
    }

    setFilteredProducts(filtered)
  }

  // Format price for display
  const formatPrice = (price: number) => {
      return price.toLocaleString('vi-VN') + "₫"
  }

  const handleAddToCart = (product: any) => {
    setIsAdding((prev) => ({ ...prev, [product.id]: true }))

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem(product, 1)
      setIsAdding((prev) => ({ ...prev, [product.id]: false }))

      toast({
        title: "Đã thêm vào giỏ hàng",
        description: product.name,
        action: (
          <ToastAction altText="Xem giỏ hàng">
            <Link href="/cart">Xem giỏ hàng</Link>
          </ToastAction>
        ),
      })
    }, 300)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-gray-100 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#194f91]">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="font-medium">Thức ăn cá cảnh</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">THỨC ĂN CÁ CẢNH</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="w-full md:w-64 hidden md:block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-[#194f91] text-white py-3 px-4 font-medium">DANH MỤC</div>
              <ul className="divide-y">
                <li>
                  <Link
                    href="/thuc-an-ca-canh"
                    className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 text-[#194f91] font-medium"
                  >
                    <span>Tất cả thức ăn cá cảnh</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/${category}`}
                      className="flex items-center justify-between py-3 px-4 hover:bg-gray-50"
                    >
                      <span>{categoryNames[category] || category}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg mb-4">Lọc sản phẩm</h3>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Khoảng giá</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 500000]}
                      max={500000}
                      step={10000}
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value)
                        applyFilters(sortOption, value, showInStock, showDiscount, showFeatured)
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Trạng thái</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inStock"
                        checked={showInStock}
                        onCheckedChange={(checked) => {
                          setShowInStock(checked as boolean)
                          applyFilters(sortOption, priceRange, checked as boolean, showDiscount, showFeatured)
                        }}
                      />
                      <Label htmlFor="inStock">Còn hàng</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="discount"
                        checked={showDiscount}
                        onCheckedChange={(checked) => {
                          setShowDiscount(checked as boolean)
                          applyFilters(sortOption, priceRange, showInStock, checked as boolean, showFeatured)
                        }}
                      />
                      <Label htmlFor="discount">Đang giảm giá</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={showFeatured}
                        onCheckedChange={(checked) => {
                          setShowFeatured(checked as boolean)
                          applyFilters(sortOption, priceRange, showInStock, showDiscount, checked as boolean)
                        }}
                      />
                      <Label htmlFor="featured">Sản phẩm nổi bật</Label>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#00335f] hover:bg-green-700"
                  onClick={() => {
                    setPriceRange([0, 500000])
                    setShowInStock(true)
                    setShowDiscount(false)
                    setShowFeatured(false)
                    applyFilters("default", [0, 500000], true, false, false)
                  }}
                >
                  Đặt lại bộ lọc
                </Button>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-bold mb-2 sm:mb-0">TẤT CẢ THỨC ĂN CÁ CẢNH</h2>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-initial">
                    <Select value={sortOption} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sắp xếp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Mặc định</SelectItem>
                        <SelectItem value="name-asc">Tên A-Z</SelectItem>
                        <SelectItem value="name-desc">Tên Z-A</SelectItem>
                        <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                        <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                        <SelectItem value="discount">Khuyến mãi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="sm:flex hidden">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="sm:hidden flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Lọc</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Lọc sản phẩm</SheetTitle>
                        <SheetDescription>Điều chỉnh các bộ lọc để tìm sản phẩm phù hợp</SheetDescription>
                      </SheetHeader>

                      <div className="py-4 space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium">Khoảng giá</h3>
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, 500000]}
                              max={500000}
                              step={10000}
                              value={priceRange}
                              onValueChange={(value) => {
                                setPriceRange(value)
                                applyFilters(sortOption, value, showInStock, showDiscount, showFeatured)
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>{formatPrice(priceRange[0])}</span>
                            <span>{formatPrice(priceRange[1])}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">Trạng thái</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="inStock-mobile"
                                checked={showInStock}
                                onCheckedChange={(checked) => {
                                  setShowInStock(checked as boolean)
                                  applyFilters(sortOption, priceRange, checked as boolean, showDiscount, showFeatured)
                                }}
                              />
                              <Label htmlFor="inStock-mobile">Còn hàng</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="discount-mobile"
                                checked={showDiscount}
                                onCheckedChange={(checked) => {
                                  setShowDiscount(checked as boolean)
                                  applyFilters(sortOption, priceRange, showInStock, checked as boolean, showFeatured)
                                }}
                              />
                              <Label htmlFor="discount-mobile">Đang giảm giá</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="featured-mobile"
                                checked={showFeatured}
                                onCheckedChange={(checked) => {
                                  setShowFeatured(checked as boolean)
                                  applyFilters(sortOption, priceRange, showInStock, showDiscount, checked as boolean)
                                }}
                              />
                              <Label htmlFor="featured-mobile">Sản phẩm nổi bật</Label>
                            </div>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-[#00335f] hover:bg-green-700"
                          onClick={() => {
                            setPriceRange([0, 500000])
                            setShowInStock(true)
                            setShowDiscount(false)
                            setShowFeatured(false)
                            applyFilters("default", [0, 500000], true, false, false)
                          }}
                        >
                          Đặt lại bộ lọc
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp với bộ lọc.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/thuc-an-ca-canh/${product.id}`} className="block relative">
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
                        <Link href={`/thuc-an-ca-canh/${product.id}`}>
                          <h3 className="font-medium text-sm mb-2 hover:text-[#194f91] line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center mb-3">
                          <span className="text-red-600 font-bold">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <Button
                          className="w-full bg-[#00335f] hover:bg-green-700 text-white text-sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={isAdding[product.id]}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {isAdding[product.id] ? "Đang thêm..." : "Thêm vào giỏ"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
