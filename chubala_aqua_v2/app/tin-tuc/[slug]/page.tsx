"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Eye, ChevronRight, Facebook, Twitter, Linkedin, Mail, Printer } from "lucide-react"
import { blogPostsData } from "@/data/blog-posts"
import type { BlogPost } from "@/data/blog-posts"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Tìm bài viết theo slug
    const foundPost = blogPostsData.find((p) => p.slug === slug)
    setPost(foundPost || null)

    // Tìm các bài viết liên quan (cùng danh mục)
    if (foundPost) {
      const related = blogPostsData
        .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3)
      setRelatedPosts(related)
    }

    setIsLoading(false)
  }, [slug])

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

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">Không tìm thấy bài viết</div>
            <Link href="/tin-tuc">
              <Button className="bg-[#00335f] hover:bg-green-700">Quay lại trang tin tức</Button>
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

      <div className="bg-gray-100 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#194f91]">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/tin-tuc" className="hover:text-[#194f91]">
              Tin tức
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Nội dung bài viết */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full mr-3">{post.category}</span>
                <div className="flex items-center mr-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center mr-3">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{post.views} lượt xem</span>
                </div>
                <span className="mr-3">Tác giả: {post.author}</span>
              </div>

              {/* Ảnh bài viết */}
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nội dung bài viết */}
              <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Chia sẻ bài viết */}
              <div className="border-t pt-6">
                <div className="flex flex-wrap items-center">
                  <span className="font-medium mr-4">Chia sẻ bài viết:</span>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600">
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700">
                      <Printer className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bài viết liên quan */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-bold mb-4">Bài viết liên quan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="border rounded-lg overflow-hidden">
                      <Link href={`/tin-tuc/${relatedPost.slug}`}>
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="p-3">
                        <Link href={`/tin-tuc/${relatedPost.slug}`}>
                          <h3 className="font-medium text-sm hover:text-[#194f91] line-clamp-2 mb-2">
                            {relatedPost.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Danh mục */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">Danh mục</h3>
              <ul className="space-y-2">
                {Array.from(new Set(blogPostsData.map((p) => p.category))).map((category) => (
                  <li key={category}>
                    <Link
                      href={`/tin-tuc?category=${encodeURIComponent(category)}`}
                      className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-50"
                    >
                      <span>{category}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {blogPostsData.filter((p) => p.category === category).length}
                      </span>
                    </Link>
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
                  .map((popularPost) => (
                    <div key={popularPost.id} className="flex gap-3">
                      <Link href={`/tin-tuc/${popularPost.slug}`} className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden">
                          <Image
                            src={popularPost.image || "/placeholder.svg"}
                            alt={popularPost.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div>
                        <Link href={`/tin-tuc/${popularPost.slug}`}>
                          <h4 className="font-medium text-sm hover:text-[#194f91] line-clamp-2">{popularPost.title}</h4>
                        </Link>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{popularPost.date}</span>
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
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
