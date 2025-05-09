"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Heart, LogOut, User, Key } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function ChangePasswordPage() {
  const { user, isAuthenticated, isLoading, logout, updatePassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/account/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp")
      setIsSubmitting(false)
      return
    }

    // Update password
    const success = updatePassword(currentPassword, newPassword)

    if (success) {
      toast({
        title: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được cập nhật.",
      })

      // Reset form
      e.currentTarget.reset()
    } else {
      setError("Mật khẩu hiện tại không đúng")
    }

    setIsSubmitting(false)
  }

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

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">TÀI KHOẢN CỦA TÔI</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <nav className="space-y-1">
                  <Link
                    href="/account/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <User className="h-5 w-5" />
                    <span>Thông tin tài khoản</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Đơn hàng của tôi</span>
                  </Link>
                  <Link
                    href="/account/wishlist"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Sản phẩm yêu thích</span>
                  </Link>
                  <Link
                    href="/account/change-password"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-[#194f91] font-medium"
                  >
                    <Key className="h-5 w-5" />
                    <span>Đổi mật khẩu</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 text-red-500 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                  <CardDescription>Cập nhật mật khẩu của bạn để bảo vệ tài khoản.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <Input id="currentPassword" name="currentPassword" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input id="newPassword" name="newPassword" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input id="confirmPassword" name="confirmPassword" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-[#00335f] hover:bg-green-700" disabled={isSubmitting}>
                      {isSubmitting ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
