import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"

export const metadata: Metadata = {
  title: "Chính sách - Cá Cảnh Chubala Aqua",
  description: "Các chính sách mua hàng, vận chuyển, đổi trả và bảo hành của Cá Cảnh Chubala Aqua",
}

export default function PolicyPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#194f91]">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Chính sách</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Chính sách</h1>

              <div className="space-y-8">
                {/* Chính sách mua hàng */}
                <section>
                  <h2 className="text-xl font-bold text-[#194f91] mb-4">Chính sách mua hàng</h2>
                  <div className="prose max-w-none">
                    <p>
                      Cá Cảnh Chubala Aqua cam kết cung cấp các loại cá cảnh chất lượng cao với giá cả hợp lý. Chúng tôi
                      luôn đảm bảo cá được chăm sóc trong môi trường tốt nhất trước khi đến tay khách hàng.
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Quy trình mua hàng</h3>
                    <ol>
                      <li>Chọn sản phẩm và thêm vào giỏ hàng</li>
                      <li>Tiến hành thanh toán và điền thông tin giao hàng</li>
                      <li>Nhận email xác nhận đơn hàng</li>
                      <li>Đơn hàng được xử lý và chuẩn bị</li>
                      <li>Giao hàng đến địa chỉ của bạn</li>
                    </ol>
                    <p>
                      Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau bao gồm chuyển khoản ngân hàng, thanh
                      toán khi nhận hàng (COD), và các ví điện tử phổ biến.
                    </p>
                  </div>
                </section>

                {/* Chính sách vận chuyển */}
                <section>
                  <h2 className="text-xl font-bold text-[#194f91] mb-4">Chính sách vận chuyển</h2>
                  <div className="prose max-w-none">
                    <p>
                      Cá Cảnh Chubala Aqua sử dụng các phương pháp vận chuyển đặc biệt để đảm bảo cá cảnh đến tay khách
                      hàng trong tình trạng khỏe mạnh nhất.
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Thời gian vận chuyển</h3>
                    <ul>
                      <li>Nội thành TP.HCM: 1-2 ngày</li>
                      <li>Các tỉnh thành khác: 2-5 ngày tùy khu vực</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4">Phí vận chuyển</h3>
                    <p>
                      Phí vận chuyển được tính dựa trên khoảng cách và số lượng cá. Đơn hàng trên 1.000.000đ sẽ được
                      miễn phí vận chuyển nội thành TP.HCM.
                    </p>
                    <p>
                      Chúng tôi sử dụng túi oxy chuyên dụng và thùng cách nhiệt để đảm bảo cá được vận chuyển an toàn
                      trong suốt quá trình giao hàng.
                    </p>
                  </div>
                </section>

                {/* Chính sách đổi trả */}
                <section>
                  <h2 className="text-xl font-bold text-[#194f91] mb-4">Chính sách đổi trả</h2>
                  <div className="prose max-w-none">
                    <p>
                      Chúng tôi cam kết 100% về chất lượng cá cảnh. Trong trường hợp cá bị chết trong vòng 24 giờ sau
                      khi nhận hàng (với điều kiện tuân thủ hướng dẫn chăm sóc), chúng tôi sẽ thực hiện đổi trả theo
                      chính sách sau:
                    </p>
                    <ul>
                      <li>Hoàn tiền 100% nếu cá chết khi mở túi</li>
                      <li>Đổi cá mới hoặc hoàn tiền 80% nếu cá chết trong vòng 24 giờ</li>
                      <li>
                        Hỗ trợ tư vấn và giảm giá cho lần mua tiếp theo nếu cá chết do điều kiện nuôi không phù hợp
                      </li>
                    </ul>
                    <p>
                      Để yêu cầu đổi trả, vui lòng liên hệ với chúng tôi qua hotline hoặc email kèm theo hình ảnh/video
                      làm bằng chứng trong vòng 24 giờ kể từ khi nhận hàng.
                    </p>
                  </div>
                </section>

                {/* Chính sách bảo hành */}
                <section>
                  <h2 className="text-xl font-bold text-[#194f91] mb-4">Chính sách bảo hành</h2>
                  <div className="prose max-w-none">
                    <p>
                      Cá Cảnh Chubala Aqua cung cấp dịch vụ tư vấn miễn phí về cách chăm sóc và nuôi dưỡng cá cảnh trong
                      suốt thời gian bạn sở hữu cá của chúng tôi.
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Cam kết của chúng tôi</h3>
                    <ul>
                      <li>Tư vấn miễn phí về môi trường sống, thức ăn và bệnh tật của cá</li>
                      <li>Hỗ trợ xử lý các vấn đề phát sinh trong quá trình nuôi</li>
                      <li>Cung cấp thông tin và kiến thức về từng loại cá</li>
                    </ul>
                    <p>
                      Chúng tôi luôn sẵn sàng hỗ trợ khách hàng để đảm bảo cá cảnh của bạn sống khỏe mạnh và phát triển
                      tốt trong môi trường mới.
                    </p>
                  </div>
                </section>

                {/* Chính sách bảo mật */}
                <section>
                  <h2 className="text-xl font-bold text-[#194f91] mb-4">Chính sách bảo mật</h2>
                  <div className="prose max-w-none">
                    <p>
                      Cá Cảnh Chubala Aqua cam kết bảo vệ thông tin cá nhân của khách hàng. Chúng tôi không chia sẻ thông
                      tin của bạn với bất kỳ bên thứ ba nào ngoại trừ các đối tác vận chuyển để thực hiện giao hàng.
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Thông tin chúng tôi thu thập</h3>
                    <ul>
                      <li>Thông tin liên hệ: tên, địa chỉ, số điện thoại, email</li>
                      <li>Thông tin đơn hàng và lịch sử mua hàng</li>
                      <li>Thông tin thanh toán (được mã hóa và bảo mật)</li>
                    </ul>
                    <p>
                      Mọi thông tin của khách hàng đều được lưu trữ an toàn và chỉ được sử dụng cho mục đích cung cấp
                      dịch vụ tốt nhất cho bạn.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
