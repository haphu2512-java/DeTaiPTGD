"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { fishData } from "@/data/fish-data"
import { fishFoodData } from "@/data/fish-food"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFish: 0,
    totalFood: 0,
    totalUsers: 0,
    totalOrders: 0,
  })

  useEffect(() => {
    // Lấy số lượng người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    // Lấy đơn hàng từ localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")

    setStats({
      totalFish: fishData.length,
      totalFood: fishFoodData.length,
      totalUsers: users.length,
      totalOrders: orders.length,
    })
  }, [])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3">
              <span className="text-2xl">🐠</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tổng số cá</p>
              <p className="text-2xl font-semibold">{stats.totalFish}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3">
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tổng số thức ăn</p>
              <p className="text-2xl font-semibold">{stats.totalFood}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tổng số người dùng</p>
              <p className="text-2xl font-semibold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3">
              <span className="text-2xl">🛒</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Tổng số đơn hàng</p>
              <p className="text-2xl font-semibold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 