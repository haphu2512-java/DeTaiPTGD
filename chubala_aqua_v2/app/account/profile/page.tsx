"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, ShoppingBag, Heart, LogOut, User, Key, Plus, Trash, Edit } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

// Định nghĩa kiểu dữ liệu cho địa chỉ
interface Address {
  id: string
  fullName: string
  phone: string
  address: string
  isDefault: boolean
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, updateUserProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [birthday, setBirthday] = useState<string>("")

  // State cho danh sách địa chỉ
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  // Load địa chỉ từ localStorage và ngày sinh
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      // Load địa chỉ
      const storedAddresses = localStorage.getItem("userAddresses")
      if (storedAddresses) {
        try {
          setAddresses(JSON.parse(storedAddresses))
        } catch (e) {
          console.error("Failed to parse addresses from localStorage", e)
        }
      } else {
        // Tạo địa chỉ mặc định nếu chưa có
        const defaultAddress: Address = {
          id: "1",
          fullName: user.fullName,
          phone: user.phone,
          address: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
          isDefault: true,
        }
        setAddresses([defaultAddress])
        localStorage.setItem("userAddresses", JSON.stringify([defaultAddress]))
      }

      // Load ngày sinh
      const authData = localStorage.getItem("auth")
      if (authData) {
        const parsedData = JSON.parse(authData)
        if (parsedData.user && parsedData.user.birthday) {
          setBirthday(parsedData.user.birthday)
        }
      }
    }
  }, [user])

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

  // Handle save changes for profile
  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Lấy dữ liệu từ form
    const formData = new FormData(e.currentTarget)
    const birthdayValue = formData.get("birthday") as string

    const updatedUser = {
      ...user!,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      birthday: birthdayValue || undefined,
    }

    // Cập nhật state ngày sinh
    setBirthday(birthdayValue)

    // Cập nhật thông tin người dùng
    updateUserProfile(updatedUser)

    // Hiển thị thông báo thành công rõ ràng
    toast({
      title: "Lưu thành công!",
      description: "Thông tin cá nhân của bạn đã được cập nhật thành công.",
      variant: "default",
    })
  }

  // Xử lý thêm địa chỉ mới
  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const newAddress: Address = {
      id: Date.now().toString(),
      fullName: formData.get("addressFullName") as string,
      phone: formData.get("addressPhone") as string,
      address: formData.get("addressDetail") as string,
      isDefault: addresses.length === 0, // Mặc định nếu là địa chỉ đầu tiên
    }

    const updatedAddresses = [...addresses, newAddress]
    setAddresses(updatedAddresses)
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses))

    setShowAddressForm(false)
    toast({
      title: "Thành công",
      description: "Địa chỉ mới đã được thêm thành công.",
    })
  }

  // Xử lý cập nhật địa chỉ
  const handleUpdateAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!editingAddress) return

    const formData = new FormData(e.currentTarget)
    const updatedAddress: Address = {
      ...editingAddress,
      fullName: formData.get("addressFullName") as string,
      phone: formData.get("addressPhone") as string,
      address: formData.get("addressDetail") as string,
    }

    const updatedAddresses = addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))

    setAddresses(updatedAddresses)
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses))

    setEditingAddress(null)
    toast({
      title: "Thành công",
      description: "Địa chỉ đã được cập nhật thành công.",
    })
  }

  // Xử lý xóa địa chỉ
  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id)

    // Nếu là địa chỉ mặc định, không cho xóa
    if (addressToDelete?.isDefault && addresses.length > 1) {
      toast({
        title: "Không thể xóa địa chỉ mặc định",
        description: "Vui lòng đặt địa chỉ khác làm mặc định trước khi xóa.",
        variant: "destructive",
      })
      return
    }

    const updatedAddresses = addresses.filter((addr) => addr.id !== id)

    // Nếu xóa hết địa chỉ, không làm gì cả
    if (updatedAddresses.length === 0) {
      toast({
        title: "Không thể xóa",
        description: "Bạn cần có ít nhất một địa chỉ.",
        variant: "destructive",
      })
      return
    }

    // Nếu xóa địa chỉ mặc định, đặt địa chỉ đầu tiên làm mặc định
    if (addressToDelete?.isDefault) {
      updatedAddresses[0].isDefault = true
    }

    setAddresses(updatedAddresses)
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses))

    toast({
      title: "Thành công",
      description: "Địa chỉ đã được xóa thành công.",
    })
  }

  // Xử lý đặt địa chỉ mặc định
  const handleSetDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }))

    setAddresses(updatedAddresses)
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses))

    toast({
      title: "Thành công",
      description: "Địa chỉ mặc định đã được cập nhật.",
    })
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
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-3">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=100&width=100"}
                      alt={user.fullName}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#00335f] text-white p-1 rounded-full">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="font-bold text-lg">{user.fullName}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                <nav className="space-y-1">
                  <Link
                    href="/account/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-[#194f91] font-medium"
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
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50"
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
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
                  <TabsTrigger value="address">Địa chỉ</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin cá nhân</CardTitle>
                      <CardDescription>
                        Cập nhật thông tin cá nhân của bạn. Đảm bảo email của bạn luôn chính xác.
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSaveChanges}>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input id="fullName" name="fullName" defaultValue={user.fullName} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" defaultValue={user.email} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" name="phone" defaultValue={user.phone} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="birthday">Ngày sinh</Label>
                            <Input
                              id="birthday"
                              type="date"
                              name="birthday"
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button type="submit" className="bg-[#00335f] hover:bg-green-700">
                          Lưu thay đổi
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="address">
                  <Card>
                    <CardHeader>
                      <CardTitle>Địa chỉ giao hàng</CardTitle>
                      <CardDescription>
                        Quản lý địa chỉ giao hàng của bạn. Bạn có thể thêm nhiều địa chỉ khác nhau.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Danh sách địa chỉ */}
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-md p-4 mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">
                                {address.fullName} {address.isDefault && "(Địa chỉ mặc định)"}
                              </h3>
                              <p className="text-sm text-gray-500">{address.phone}</p>
                            </div>
                            <div className="flex space-x-2">
                              {!address.isDefault && (
                                <Button variant="outline" size="sm" onClick={() => handleSetDefaultAddress(address.id)}>
                                  Đặt mặc định
                                </Button>
                              )}
                              <Button variant="outline" size="sm" onClick={() => setEditingAddress(address)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Sửa
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-500"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash className="h-4 w-4 mr-1" />
                                Xóa
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm">{address.address}</p>
                        </div>
                      ))}

                      {/* Form thêm địa chỉ mới */}
                      {showAddressForm && (
                        <div className="border rounded-md p-4 mb-4">
                          <h3 className="font-medium mb-3">Thêm địa chỉ mới</h3>
                          <form onSubmit={handleAddAddress} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="addressFullName">Họ và tên</Label>
                                <Input id="addressFullName" name="addressFullName" required />
                              </div>
                              <div>
                                <Label htmlFor="addressPhone">Số điện thoại</Label>
                                <Input id="addressPhone" name="addressPhone" required />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="addressDetail">Địa chỉ chi tiết</Label>
                              <Input id="addressDetail" name="addressDetail" required />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setShowAddressForm(false)}>
                                Hủy
                              </Button>
                              <Button type="submit" className="bg-[#00335f] hover:bg-green-700">
                                Lưu địa chỉ
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Form chỉnh sửa địa chỉ */}
                      {editingAddress && (
                        <div className="border rounded-md p-4 mb-4">
                          <h3 className="font-medium mb-3">Chỉnh sửa địa chỉ</h3>
                          <form onSubmit={handleUpdateAddress} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="addressFullName">Họ và tên</Label>
                                <Input
                                  id="addressFullName"
                                  name="addressFullName"
                                  defaultValue={editingAddress.fullName}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="addressPhone">Số điện thoại</Label>
                                <Input
                                  id="addressPhone"
                                  name="addressPhone"
                                  defaultValue={editingAddress.phone}
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="addressDetail">Địa chỉ chi tiết</Label>
                              <Input
                                id="addressDetail"
                                name="addressDetail"
                                defaultValue={editingAddress.address}
                                required
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setEditingAddress(null)}>
                                Hủy
                              </Button>
                              <Button type="submit" className="bg-[#00335f] hover:bg-green-700">
                                Cập nhật
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Nút thêm địa chỉ mới */}
                      {!showAddressForm && !editingAddress && (
                        <Button
                          variant="outline"
                          className="w-full border-dashed"
                          onClick={() => setShowAddressForm(true)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Thêm địa chỉ mới
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
