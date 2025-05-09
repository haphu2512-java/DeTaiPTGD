"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Vui lòng nhập email")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email không hợp lệ")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)

      toast({
        title: "Yêu cầu đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold text-center mb-6">QUÊN MẬT KHẨU</h1>

            {isSubmitted ? (
              <div className="text-center">
                <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
                  <p>Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến địa chỉ:</p>
                  <p className="font-medium mt-2">{email}</p>
                </div>
                <p className="mb-4">Vui lòng kiểm tra hộp thư đến của bạn và làm theo hướng dẫn để đặt lại mật khẩu.</p>
                <p className="text-sm text-gray-500">
                  Không nhận được email? Kiểm tra thư mục spam hoặc{" "}
                  <button
                    type="button"
                    className="text-[#194f91] hover:underline font-medium"
                    onClick={() => setIsSubmitted(false)}
                  >
                    thử lại
                  </button>
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6 text-center">
                  Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email của bạn"
                        className={`pl-10 ${error ? "border-red-500" : ""}`}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>

                  <Button type="submit" className="w-full bg-[#00335f] hover:bg-green-700 py-6" disabled={isLoading}>
                    {isLoading ? "ĐANG XỬ LÝ..." : "GỬI YÊU CẦU"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/account/login" className="text-[#194f91] hover:underline font-medium">
                    Quay lại đăng nhập
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
