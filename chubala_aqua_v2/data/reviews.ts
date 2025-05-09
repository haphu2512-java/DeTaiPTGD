import type { Review } from "@/types/review"

export const reviewsData: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: "1",
    userName: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, cá nhà mình ăn rất thích. Giao hàng nhanh, đóng gói cẩn thận.",
    date: "12/05/2023",
  },
  {
    id: 2,
    productId: 1,
    userId: "2",
    userName: "Trần Thị B",
    rating: 4,
    comment: "Thức ăn chất lượng, cá ăn khỏe, màu sắc đẹp hơn. Sẽ mua lại.",
    date: "28/04/2023",
  },
  {
    id: 3,
    productId: 1,
    userId: "3",
    userName: "Lê Văn C",
    rating: 3,
    comment: "Sản phẩm tạm ổn, cá ăn được nhưng không nhiều như mong đợi.",
    date: "15/04/2023",
  },
  {
    id: 4,
    productId: 2,
    userId: "1",
    userName: "Nguyễn Văn A",
    rating: 5,
    comment: "Cá La Hán nhà mình rất thích loại thức ăn này, màu sắc đẹp hơn hẳn.",
    date: "10/05/2023",
  },
  {
    id: 5,
    productId: 3,
    userId: "2",
    userName: "Trần Thị B",
    rating: 4,
    comment: "Thức ăn tốt cho cá Koi, giúp cá phát triển nhanh.",
    date: "05/05/2023",
  },
]
