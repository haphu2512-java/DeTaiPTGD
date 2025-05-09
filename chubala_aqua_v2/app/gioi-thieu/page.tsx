import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
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
            <span className="font-medium">Giới thiệu</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">GIỚI THIỆU VỀ CỬA HÀNG CÁ CẢNH CHUBALA AQUA</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-video rounded-lg overflow-hidden">
          <img src="/img/chubala.jpg" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-[#194f91]">Chào mừng đến với Cá Cảnh Chubala Aqua</h2>
            <h1>Nguyễn Xuân Thi - 22723611</h1>
            <h1>Hà Xuân Phú - 22691261</h1>
            <h1>Lưu Văn Phát - 22691081</h1>
            <p className="text-gray-700 mb-4">
              Cá Cảnh Chubala Aqua được thành lập vào năm 2010, là một trong những cửa hàng cá cảnh uy tín hàng đầu tại Việt
              Nam. Với hơn 13 năm kinh nghiệm trong lĩnh vực thủy sinh và cá cảnh, chúng tôi tự hào mang đến cho khách
              hàng những sản phẩm chất lượng cao và dịch vụ chuyên nghiệp.
            </p>
            <p className="text-gray-700">
              Chúng tôi chuyên cung cấp các loại cá cảnh đa dạng từ những loài phổ biến đến những loài cá quý hiếm, đáp
              ứng nhu cầu của cả người mới bắt đầu và những người chơi cá chuyên nghiệp. Bên cạnh đó, chúng tôi còn cung
              cấp đầy đủ các loại thức ăn, thuốc, phụ kiện và thiết bị cần thiết cho việc nuôi cá cảnh.
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#194f91]">Tầm nhìn & Sứ mệnh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#194f91]">Tầm nhìn</h3>
              <p className="text-gray-700">
                Trở thành cửa hàng cá cảnh hàng đầu Chubala Aqua, mang đến cho khách hàng những sản phẩm cá cảnh đẹp nhất,
                chất lượng nhất với giá cả hợp lý. Chúng tôi không ngừng nỗ lực để phát triển và mở rộng, đồng thời góp
                phần nâng cao văn hóa chơi cá cảnh tại Chubala Aqua.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#194f91]">Sứ mệnh</h3>
              <p className="text-gray-700">
                Cung cấp cho khách hàng những sản phẩm cá cảnh chất lượng cao, đa dạng về chủng loại và giá cả phù hợp.
                Chúng tôi cam kết mang đến dịch vụ tư vấn chuyên nghiệp, hỗ trợ khách hàng trong quá trình nuôi cá và
                xây dựng cộng đồng yêu thích cá cảnh tại Chubala Aqua.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#194f91]">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#194f91] text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#194f91]">Chất lượng</h3>
              <p className="text-gray-700">
                Chúng tôi cam kết cung cấp những sản phẩm cá cảnh chất lượng cao, khỏe mạnh và đẹp mắt.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#194f91] text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#194f91]">Uy tín</h3>
              <p className="text-gray-700">
                Chúng tôi luôn đặt chữ tín lên hàng đầu, đảm bảo sự minh bạch trong kinh doanh và bán hàng.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#194f91] text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#194f91]">Chuyên nghiệp</h3>
              <p className="text-gray-700">
                Đội ngũ nhân viên được đào tạo chuyên nghiệp, có kiến thức sâu rộng về cá cảnh và thủy sinh.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#194f91] text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#194f91]">Đổi mới</h3>
              <p className="text-gray-700">
                Chúng tôi không ngừng cập nhật và đổi mới để mang đến những sản phẩm tốt nhất cho khách hàng.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#194f91]">Dịch vụ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#194f91]">Cung cấp cá cảnh</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Cá cảnh nước ngọt đa dạng</li>
                <li>Cá cảnh biển</li>
                <li>Cá Koi và cá hồ cảnh</li>
                <li>Cá cảnh nhập khẩu</li>
                <li>Cá cảnh quý hiếm</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#194f91]">Thiết kế và thi công</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Thiết kế và thi công hồ cá</li>
                <li>Thiết kế bể thủy sinh</li>
                <li>Thi công hồ Koi</li>
                <li>Bảo trì hồ cá định kỳ</li>
                <li>Tư vấn thiết kế không gian</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4 text-[#194f91]">Phụ kiện và thức ăn</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Thức ăn cá cảnh các loại</li>
                <li>Thuốc và hóa chất xử lý nước</li>
                <li>Thiết bị lọc và máy bơm</li>
                <li>Đèn và thiết bị chiếu sáng</li>
                <li>Phụ kiện trang trí hồ cá</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#194f91] text-white p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Liên hệ với chúng tôi</h2>
            <p>Hãy liên hệ ngay để được tư vấn và hỗ trợ tốt nhất!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-bold mb-2">Địa chỉ</h3>
              <p>123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">Điện thoại</h3>
              <p>0123 456 789</p>
              <p>0987 654 321</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">Email</h3>
              <p>info@cacanhchubalaaqua.com</p>
              <p>support@cacanhchubalaaqua.com</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              href="/lien-he"
              className="inline-block bg-white text-[#194f91] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Đến trang liên hệ
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
