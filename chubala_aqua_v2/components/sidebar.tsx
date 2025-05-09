"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

interface SidebarProps {
  className?: string
  activeCategory?: string
}

export default function Sidebar({ className, activeCategory }: SidebarProps) {
  const pathname = usePathname()

  // Xác định xem đang ở trang cá cảnh hay thức ăn
  const isOnFoodPage = pathname.includes("/thuc-an")

  // Danh mục cá cảnh
  const fishCategories = [
    { name: "Cá Koi", href: "/ca-koi", slug: "ca-koi" },
    { name: "Cá Rồng", href: "/ca-rong", slug: "ca-rong" },
    { name: "Cá Đĩa", href: "/ca-dia", slug: "ca-dia" },
    { name: "Cá Vàng", href: "/ca-vang", slug: "ca-vang" },
    { name: "Cá La Hán", href: "/ca-la-han", slug: "ca-la-han" },
    { name: "Cá Betta", href: "/ca-betta", slug: "ca-betta" },
    { name: "Cá Neon", href: "/ca-neon", slug: "ca-neon" },
    { name: "Cá Thủy Sinh", href: "/ca-thuy-sinh", slug: "ca-thuy-sinh" },
    { name: "Cá Ali", href: "/ca-ali", slug: "ca-ali" },
    { name: "Cá Cảnh Khác", href: "/ca-canh-khac", slug: "ca-canh-khac" },
  ]

  // Danh mục thức ăn cá cảnh
  const fishFoodCategories = [
    { name: "Thức ăn cá cảnh", href: "/thuc-an-ca-canh", slug: "thuc-an-ca-canh" },
    { name: "Thức ăn cá Koi", href: "/thuc-an-ca-koi", slug: "thuc-an-ca-koi" },
    { name: "Thức ăn cá rồng", href: "/thuc-an-ca-rong", slug: "thuc-an-ca-rong" },
    { name: "Thức ăn cá đĩa", href: "/thuc-an-ca-dia", slug: "thuc-an-ca-dia" },
    { name: "Thức ăn cá vàng", href: "/thuc-an-ca-vang", slug: "thuc-an-ca-vang" },
    { name: "Thức ăn cá la hán", href: "/thuc-an-ca-la-han", slug: "thuc-an-ca-la-han" },
    { name: "Thức ăn cá betta", href: "/thuc-an-ca-betta", slug: "thuc-an-ca-betta" },
    { name: "Thức ăn cá neon", href: "/thuc-an-ca-neon", slug: "thuc-an-ca-neon" },
    { name: "Thức ăn cá thủy sinh", href: "/thuc-an-ca-thuy-sinh", slug: "thuc-an-ca-thuy-sinh" },
  ]

  // Chọn danh mục phù hợp dựa trên trang hiện tại
  const categories = isOnFoodPage ? fishFoodCategories : fishCategories
  const categoryTitle = isOnFoodPage ? "DANH MỤC THỨC ĂN" : "DANH MỤC CÁ CẢNH"
  const featuredTitle = isOnFoodPage ? "THỨC ĂN NỔI BẬT" : "CÁ CẢNH NỔI BẬT"

  // Sản phẩm nổi bật với ID thực tế từ dữ liệu
  const featuredItems = isOnFoodPage
    ? [
        { id: 1, name: "Thức ăn cá cảnh Tetra Bits Complete", price: "120.000₫", img: "/img/1.png" },
        { id: 2, name: "Thức ăn cá La Hán Okiko Platinum", price: "180.000₫", img: "/img/2.png"  },
        { id: 3, name: "Thức ăn cá Koi Hikari Growth", price: "250.000₫", img: "/img/3.png"  },
      ]
    : [
        { id: 1, name: "Cá Betta Halfmoon Đỏ", price: "150.000₫", img: "/img/ca1.jpg"  },
        { id: 4, name: "Cá Đĩa Blue Diamond", price: "450.000₫", img: "/img/ca4.jpg"  },
        { id: 6, name: "Cá Rồng Huyết Long", price: "15.000.000₫", img: "/img/ca6.jpg"  },
      ]

  return (
    <div className={className}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-[#194f91] text-white py-3 px-4 font-medium">{categoryTitle}</div>
        <ul className="divide-y">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href={category.href}
                className={`flex items-center justify-between py-3 px-4 hover:bg-gray-50 ${
                  category.slug === activeCategory ? "text-[#194f91] font-medium" : ""
                }`}
              >
                <span>{category.name}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#194f91]  text-white py-3 px-4 font-medium">{featuredTitle}</div>
        <div className="p-4 space-y-4">
          {featuredItems.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover"/>
              </div>
              <div>
                <Link href={isOnFoodPage ? `/thuc-an-ca-canh/${item.id}` : `/ca-canh/${item.id}`}>
                  <h3 className="font-medium text-sm hover:text-[#194f91]">{item.name}</h3>
                </Link>
                <p className="text-red-600 font-medium text-sm mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
