"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  // Xác định kích thước sao dựa trên prop size
  const starSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size]

  // Xử lý khi click vào sao (chỉ khi interactive = true)
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index)
    }
  }

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = interactive ? starValue <= (hoverRating || rating) : starValue <= rating

        return (
          <span
            key={index}
            className={`${interactive ? "cursor-pointer" : ""}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          >
            <Star className={`${starSize} ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </span>
        )
      })}
    </div>
  )
}
