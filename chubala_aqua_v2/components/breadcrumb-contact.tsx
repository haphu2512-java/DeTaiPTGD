import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function BreadcrumbContact() {
  return (
    <div className="bg-gray-100 py-3 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="flex items-center hover:text-[#194f91]">
            <Home className="h-4 w-4 mr-1" />
            Trang chủ
          </Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <span className="font-medium">Liên hệ</span>
        </div>
      </div>
    </div>
  )
}
