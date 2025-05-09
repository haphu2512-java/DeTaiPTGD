"use client"

import { useState, useEffect } from "react"
import { fishData } from "@/data/fish-data"
import type { Fish } from "@/data/fish-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function AdminFish() {
  const [fish, setFish] = useState<Fish[]>([])
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Fish>>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    description: "",
    category: "",
    inStock: true,
    featured: false,
  })

  useEffect(() => {
    // Load fish data from localStorage or use initial data
    const storedFish = localStorage.getItem("fish")
    if (storedFish) {
      setFish(JSON.parse(storedFish))
    } else {
      setFish(fishData)
      localStorage.setItem("fish", JSON.stringify(fishData))
    }
  }, [])

  const handleAddFish = () => {
    setSelectedFish(null)
    setFormData({
      name: "",
      price: 0,
      originalPrice: 0,
      image: "",
      description: "",
      category: "",
      inStock: true,
      featured: false,
    })
    setIsModalOpen(true)
  }

  const handleEditFish = (fish: Fish) => {
    setSelectedFish(fish)
    setFormData(fish)
    setIsModalOpen(true)
  }

  const handleDeleteFish = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cá này?")) {
      const updatedFish = fish.filter((f) => f.id !== id)
      setFish(updatedFish)
      localStorage.setItem("fish", JSON.stringify(updatedFish))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const newFish: Fish = {
      id: selectedFish?.id || Date.now(),
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      originalPrice: Number(formData.get("originalPrice")),
      discount: Number(formData.get("discount")),
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      inStock: formData.get("inStock") === "on",
      featured: formData.get("featured") === "on",
      description: formData.get("description") as string,
    }

    if (selectedFish) {
      // Update existing fish
      const updatedFish = fish.map((f) => (f.id === selectedFish.id ? newFish : f))
      setFish(updatedFish)
      localStorage.setItem("fish", JSON.stringify(updatedFish))
    } else {
      // Add new fish
      const updatedFish = [...fish, newFish]
      setFish(updatedFish)
      localStorage.setItem("fish", JSON.stringify(updatedFish))
    }

    setIsModalOpen(false)
    setSelectedFish(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý cá</h1>
        <button
          onClick={handleAddFish}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Thêm cá mới
        </button>
      </div>

      {/* Fish list */}
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
            {fish.map((f) => (
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
                    onClick={() => handleEditFish(f)}
                    className="mr-2 text-blue-600 hover:text-blue-900"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteFish(f.id)}
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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedFish ? "Chỉnh sửa cá" : "Thêm cá mới"}</DialogTitle>
              <DialogDescription>
                {selectedFish ? "Chỉnh sửa thông tin cá" : "Điền thông tin cá mới"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên cá</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedFish?.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Giá</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={selectedFish?.price}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Giá gốc</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    defaultValue={selectedFish?.originalPrice}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Giảm giá (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={selectedFish?.discount}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Hình ảnh</Label>
                  <Input
                    id="image"
                    name="image"
                    defaultValue={selectedFish?.image}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select name="category" defaultValue={selectedFish?.category} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca-koi">Cá Koi</SelectItem>
                      <SelectItem value="ca-rong">Cá Rồng</SelectItem>
                      <SelectItem value="ca-dia">Cá Đĩa</SelectItem>
                      <SelectItem value="ca-vang">Cá Vàng</SelectItem>
                      <SelectItem value="ca-la-han">Cá La Hán</SelectItem>
                      <SelectItem value="ca-betta">Cá Betta</SelectItem>
                      <SelectItem value="ca-neon">Cá Neon</SelectItem>
                      <SelectItem value="ca-thuy-sinh">Cá Thủy Sinh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={selectedFish?.description}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    name="inStock"
                    defaultChecked={selectedFish?.inStock}
                  />
                  <Label htmlFor="inStock">Còn hàng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    name="featured"
                    defaultChecked={selectedFish?.featured}
                  />
                  <Label htmlFor="featured">Sản phẩm nổi bật</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false)
                    setSelectedFish(null)
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {selectedFish ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 