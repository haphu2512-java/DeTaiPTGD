import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#194f91]  text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Thay đổi grid từ 4 cột thành 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-bold mb-4">VỀ CHÚNG TÔI</h3>
            <p className="text-sm mb-4">
              Cá Cảnh Chubala Aqua chuyên cung cấp các loại cá cảnh chất lượng cao, đảm bảo sức khỏe và vẻ đẹp cho bể cá
              của bạn.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-4">THÔNG TIN LIÊN HỆ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>0123.456.789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@cacanhchubalaaqua.com</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">LIÊN KẾT NHANH</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:underline">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/ca-canh" className="hover:underline">
                  Cá cảnh
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:underline">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach" className="hover:underline">
                  Chính sách
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:underline">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Xóa phần Newsletter */}
        </div>

        <div className="border-t border-[#00335f] mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Cá Cảnh Chubala Aqua. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
