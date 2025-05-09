"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BreadcrumbContact from "@/components/breadcrumb-contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import GoogleMapComponent from "@/components/google-map"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Gửi thành công",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreadcrumbContact />

      <main className="flex-grow">
        {/* Map Section */}
        <div className="w-full">
          <div className="container mx-auto px-4 py-4">
            <h2 className="text-xl font-bold mb-2">Vị trí cửa hàng</h2>
            <p className="text-gray-600 mb-4">Quý khách có thể ghé thăm cửa hàng của chúng tôi tại địa chỉ dưới đây:</p>
          </div>
          <div className="w-full h-[400px] relative">
            <GoogleMapComponent />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8 text-center">LIÊN HỆ</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Thông tin liên hệ</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Địa chỉ chúng tôi</h3>
                    <p className="text-gray-600 mt-1">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Email chúng tôi</h3>
                    <p className="text-gray-600 mt-1">info@cacanhchubalaaqua.com</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Điện thoại</h3>
                    <p className="text-gray-600 mt-1">0123.456.789</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Thời gian làm việc</h3>
                    <p className="text-gray-600 mt-1">Thứ 2 đến Thứ 6: 8h đến 17h30</p>
                    <p className="text-gray-600">Thứ 7: 8h đến 12h</p>
                    <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Kết nối với chúng tôi</h2>
                  <div className="flex space-x-4 mt-4">
                    <a
                      href="#"
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      aria-label="YouTube"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-[#00335f] text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                      aria-label="Zalo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Gửi thắc mắc cho chúng tôi</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Tên của bạn <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nhập tên của bạn"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email của bạn <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Nhập email của bạn"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại của bạn
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại của bạn"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Nhập nội dung tin nhắn"
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="text-xs text-gray-500">
                    Trang này được bảo vệ bởi reCAPTCHA và tuân theo{" "}
                    <a href="#" className="text-[#194f91] hover:underline">
                      Chính sách bảo mật
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-[#194f91] hover:underline">
                      Điều khoản dịch vụ
                    </a>{" "}
                    của Google.
                  </div>

                  <Button type="submit" className="bg-[#00335f] hover:bg-green-700 w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Đang gửi..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> Gửi tin nhắn
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
