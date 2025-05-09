"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Quản lý cá", path: "/admin/fish", icon: "🐠" },
  { name: "Quản lý thức ăn", path: "/admin/fish-food", icon: "🍽️" },
  { name: "Quản lý đơn hàng", path: "/admin/orders", icon: "🛒" },
  { name: "Quản lý người dùng", path: "/admin/users", icon: "👥" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const { user } = useAuth()

  // Kiểm tra quyền admin
  if (!user || user.email !== "admin@example.com") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Không có quyền truy cập</h1>
          <p className="mt-2">Bạn cần đăng nhập với tài khoản admin để truy cập trang này.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          >
            <span className="sr-only">Close sidebar</span>
            ✕
          </button>
        </div>
        <nav className="mt-4 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`mb-2 flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                pathname === item.path ? "bg-gray-100" : ""
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>
          <div className="flex items-center">
            <span className="mr-4">Xin chào, {user.fullName}</span>
            <Link
              href="/"
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Thoát
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
} 