"use client"

import { useState, useEffect } from "react"
import { fishFoodData } from "@/data/fish-food"
import type { FishFood } from "@/types/fish-food"

export default function AdminFishFood() {
  const [food, setFood] = useState<FishFood[]>([])
  const [selectedFood, setSelectedFood] = useState<FishFood | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<FishFood>>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    description: "",
    discount: 0,
    category: "",
    inStock: true,
    featured: false,
  })

  useEffect(() => {
    // Load food data from localStorage or use initial data
    const storedFood = localStorage.getItem("fishFood")
    if (storedFood) {
      setFood(JSON.parse(storedFood))
    } else {
      setFood(fishFoodData)
      localStorage.setItem("fishFood", JSON.stringify(fishFoodData))
    }
  }, [])

  const handleAddFood = () => {
    setSelectedFood(null)
    setFormData({
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      description: "",
      discount: 0,
      category: "",
      inStock: true,
      featured: false,
    })
    setIsModalOpen(true)
  }

  const handleEditFood = (food: FishFood) => {
    setSelectedFood(food)
    setFormData(food)
    setIsModalOpen(true)
  }

  const handleDeleteFood = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thức ăn này?")) {
      const updatedFood = food.filter((f) => f.id !== id)
      setFood(updatedFood)
      localStorage.setItem("fishFood", JSON.stringify(updatedFood))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFood) {
      // Update existing food
      const updatedFood = food.map((f) =>
        f.id === selectedFood.id ? { ...f, ...formData, id: f.id } : f
      )
      setFood(updatedFood)
      localStorage.setItem("fishFood", JSON.stringify(updatedFood))
    } else {
      // Add new food
      const newFood = {
        ...formData,
        id: Date.now(),
      } as FishFood
      const updatedFood = [...food, newFood]
      setFood(updatedFood)
      localStorage.setItem("fishFood", JSON.stringify(updatedFood))
    }
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý thức ăn</h1>
        <button
          onClick={handleAddFood}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Thêm thức ăn mới
        </button>
      </div>

      {/* Food list */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {food.map((f) => (
              <tr key={f.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={f.image}
                        alt={f.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{f.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {f.price.toLocaleString("vi-VN")}đ
                  </div>
                  {f.discount > 0 && (
                    <div className="text-sm text-red-500">-{f.discount}%</div>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{f.category}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      f.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {f.inStock ? "Còn hàng" : "Hết hàng"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleEditFood(f)}
                    className="mr-2 text-blue-600 hover:text-blue-900"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteFood(f.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {selectedFood ? "Sửa thông tin thức ăn" : "Thêm thức ăn mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Giá
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Giá gốc
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Hình ảnh
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Danh mục
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Giảm giá (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border p-2"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full rounded-lg border p-2"
                    rows={3}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) =>
                          setFormData({ ...formData, inStock: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Còn hàng</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({ ...formData, featured: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Nổi bật</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  {selectedFood ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 