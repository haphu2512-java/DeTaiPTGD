"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Eye, ChevronRight, Search } from "lucide-react"
import { blogPostsData } from "@/data/blog-posts"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const categories = Array.from(new Set(blogPostsData.map((post) => post.category)))
  const featuredPosts = blogPostsData.filter((post) => post.featured)

  // Tìm kiếm bài viết
  const filteredPosts = searchTerm
    ? blogPostsData.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : blogPostsData

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Đã xử lý tìm kiếm thông qua state
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
            <span className="font-medium">Tin tức</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">TIN TỨC & KIẾN THỨC</h1>

        {/* Bài viết nổi bật */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">BÀI VIẾT NỔI BẬT</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link href={`/tin-tuc/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{post.category}</span>
                    <div className="flex items-center ml-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center ml-3">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <Link href={`/tin-tuc/${post.slug}`}>
                    <h3 className="font-bold text-lg mb-2 hover:text-[#194f91] line-clamp-2">{post.title}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">{post.excerpt}</p>
                  <Link href={`/tin-tuc/${post.slug}`}>
                    <Button variant="outline" className="text-[#194f91] border-green-600 hover:bg-green-50">
                      Đọc tiếp
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Danh sách bài viết */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">TẤT CẢ BÀI VIẾT</h2>
                <form onSubmit={handleSearch} className="relative w-full max-w-xs">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </form>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-6 flex flex-wrap">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all">
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <div key={post.id} className="flex flex-col md:flex-row gap-4 border-b pb-6">
                        <Link href={`/tin-tuc/${post.slug}`} className="md:w-1/3">
                          <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <div className="md:w-2/3">
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{post.category}</span>
                            <div className="flex items-center ml-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center ml-3">
                              <Eye className="h-3 w-3 mr-1" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          <Link href={`/tin-tuc/${post.slug}`}>
                            <h3 className="font-bold text-lg mb-2 hover:text-[#194f91]">{post.title}</h3>
                          </Link>
                          <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                          <div className="flex items-center">
                            <Link href={`/tin-tuc/${post.slug}`}>
                              <Button variant="outline" className="text-[#194f91] border-green-600 hover:bg-green-50">
                                Đọc tiếp
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {categories.map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="space-y-6">
                      {filteredPosts
                        .filter((post) => post.category === category)
                        .map((post) => (
                          <div key={post.id} className="flex flex-col md:flex-row gap-4 border-b pb-6">
                            <Link href={`/tin-tuc/${post.slug}`} className="md:w-1/3">
                              <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                                <Image
                                  src={post.image || "/placeholder.svg"}
                                  alt={post.title}
                                  width={400}
                                  height={300}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </Link>
                            <div className="md:w-2/3">
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  {post.category}
                                </span>
                                <div className="flex items-center ml-3">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center ml-3">
                                  <Eye className="h-3 w-3 mr-1" />
                                  <span>{post.views}</span>
                                </div>
                              </div>
                              <Link href={`/tin-tuc/${post.slug}`}>
                                <h3 className="font-bold text-lg mb-2 hover:text-[#194f91]">{post.title}</h3>
                              </Link>
                              <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                              <div className="flex items-center">
                                <Link href={`/tin-tuc/${post.slug}`}>
                                  <Button
                                    variant="outline"
                                    className="text-[#194f91] border-green-600 hover:bg-green-50"
                                  >
                                    Đọc tiếp
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Phân trang */}
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#00335f] text-white hover:bg-green-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Danh mục */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">Danh mục</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        const tabElement = document.querySelector(`[data-value="${category}"]`) as HTMLElement
                        if (tabElement) tabElement.click()
                      }}
                      className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-50"
                    >
                      <span>{category}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {blogPostsData.filter((post) => post.category === category).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bài viết phổ biến */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">Bài viết phổ biến</h3>
              <div className="space-y-4">
                {blogPostsData
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <Link href={`/tin-tuc/${post.slug}`} className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div>
                        <Link href={`/tin-tuc/${post.slug}`}>
                          <h4 className="font-medium text-sm hover:text-[#194f91] line-clamp-2">{post.title}</h4>
                        </Link>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Cá cảnh
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Thức ăn
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Bệnh cá
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Thủy sinh
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Bể cá
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Cá Koi
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Cá Betta
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer">
                  Lọc nước
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
