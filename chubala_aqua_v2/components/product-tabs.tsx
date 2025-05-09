"use client"

import type React from "react"

import { useState } from "react"
import type { FishFood } from "@/types/fish-food"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-context"
import { useReviews } from "@/context/review-context"
import { useToast } from "@/components/ui/use-toast"
import StarRating from "./star-rating"

interface ProductTabsProps {
  product: FishFood
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const { isAuthenticated, user } = useAuth()
  const { getProductReviews, getUserReview, addReview, getAverageRating } = useReviews()
  const { toast } = useToast()

  const productReviews = getProductReviews(product.id)
  const userReview = getUserReview(product.id)
  const averageRating = getAverageRating(product.id)

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(userReview?.rating || 5)
  const [comment, setComment] = useState(userReview?.comment || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !user) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để đánh giá sản phẩm.",
        variant: "destructive",
      })
      return
    }

    if (rating < 1) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn số sao đánh giá.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const success = await addReview(product.id, rating, comment)

      if (success) {
        toast({
          title: "Thành công",
          description: userReview ? "Đã cập nhật đánh giá của bạn." : "Đã thêm đánh giá của bạn.",
        })
        setShowReviewForm(false)
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi đánh giá.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
      <Tabs defaultValue="description">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Mô tả sản phẩm</TabsTrigger>
          <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá ({productReviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-bold mb-4">{product.name}</h3>

            <p className="mb-4">{product.description}</p>

            <p className="mb-4">
              Thức ăn cá cảnh là một yếu tố quan trọng trong việc nuôi cá cảnh. Việc lựa chọn thức ăn phù hợp sẽ giúp cá
              phát triển khỏe mạnh, màu sắc tươi sáng và tăng tuổi thọ. Thức ăn cá cảnh có nhiều loại khác nhau, phù hợp
              với từng loại cá và môi trường sống của chúng.
            </p>

            <h4 className="text-md font-bold mb-2">Đặc điểm nổi bật:</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>Giàu dinh dưỡng, cung cấp đầy đủ protein, vitamin và khoáng chất cần thiết</li>
              <li>Tăng cường màu sắc tự nhiên của cá</li>
              <li>Dễ tiêu hóa, không gây đục nước</li>
              <li>Phù hợp với nhiều loại cá cảnh khác nhau</li>
              <li>Bảo quản dễ dàng, thời gian sử dụng lâu</li>
            </ul>

            <h4 className="text-md font-bold mb-2">Hướng dẫn sử dụng:</h4>
            <p className="mb-4">
              Cho cá ăn 2-3 lần mỗi ngày, mỗi lần một lượng vừa đủ trong khoảng 2-3 phút. Không cho cá ăn quá nhiều để
              tránh thức ăn thừa làm ô nhiễm nước. Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.
            </p>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
              <p className="text-sm italic">
                Lưu ý: Thông tin sản phẩm có thể thay đổi tùy theo đợt nhập hàng. Vui lòng liên hệ với chúng tôi để biết
                thêm chi tiết.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="pt-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50 w-1/3">Tên sản phẩm</td>
                <td className="py-2 px-4">{product.name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50">Thương hiệu</td>
                <td className="py-2 px-4">Cá Cảnh Chubala Aqua</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50">Xuất xứ</td>
                <td className="py-2 px-4">Chubala Aqua</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50">Trọng lượng</td>
                <td className="py-2 px-4">100g</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50">Thành phần</td>
                <td className="py-2 px-4">Bột cá, bột tôm, bột gạo, vitamin, khoáng chất</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50">Đối tượng sử dụng</td>
                <td className="py-2 px-4">Các loại cá cảnh</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium bg-gray-50">Hạn sử dụng</td>
                <td className="py-2 px-4">12 tháng kể từ ngày sản xuất</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium bg-gray-50">Bảo quản</td>
                <td className="py-2 px-4">Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp</td>
              </tr>
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="reviews" className="pt-6">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                <StarRating rating={averageRating} size="lg" />
              </div>
              <span className="text-lg font-medium">{averageRating}/5</span>
              <span className="text-sm text-gray-500 ml-2">({productReviews.length} đánh giá)</span>
            </div>

            {/* Form đánh giá */}
            {isAuthenticated ? (
              showReviewForm ? (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">
                    {userReview ? "Cập nhật đánh giá của bạn" : "Viết đánh giá của bạn"}
                  </h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Đánh giá của bạn</label>
                      <StarRating rating={rating} interactive={true} onRatingChange={setRating} size="lg" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium mb-1">
                        Nhận xét của bạn
                      </label>
                      <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-[#00335f] hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? "Đang gửi..." : userReview ? "Cập nhật đánh giá" : "Gửi đánh giá"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                        disabled={isSubmitting}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mb-6">
                  <Button onClick={() => setShowReviewForm(true)} className="bg-[#00335f] hover:bg-green-700">
                    {userReview ? "Chỉnh sửa đánh giá của bạn" : "Viết đánh giá"}
                  </Button>
                </div>
              )
            ) : (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-6">
                <p>
                  Vui lòng{" "}
                  <a href="/account/login" className="font-medium underline">
                    đăng nhập
                  </a>{" "}
                  để đánh giá sản phẩm này.
                </p>
              </div>
            )}

            {/* Danh sách đánh giá */}
            <div className="space-y-4">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">Chưa có đánh giá nào cho sản phẩm này.</div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
