"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { reviewsData } from "@/data/reviews"
import type { Review } from "@/types/review"
import { useAuth } from "@/context/auth-context"

interface ReviewContextType {
  reviews: Review[]
  addReview: (productId: number, rating: number, comment: string) => Promise<boolean>
  getProductReviews: (productId: number) => Review[]
  getUserReview: (productId: number) => Review | undefined
  getAverageRating: (productId: number) => number
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  // Load reviews from localStorage on client-side
  useEffect(() => {
    setMounted(true)
    const storedReviews = localStorage.getItem("reviews")
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews))
      } catch (e) {
        console.error("Failed to parse reviews from localStorage", e)
        // Fallback to initial data
        setReviews(reviewsData)
      }
    } else {
      // Use initial data if no stored reviews
      setReviews(reviewsData)
    }
  }, [])

  // Save reviews to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("reviews", JSON.stringify(reviews))
    }
  }, [reviews, mounted])

  // Add a new review
  const addReview = async (productId: number, rating: number, comment: string): Promise<boolean> => {
    if (!user) return false

    // Check if user already reviewed this product
    const existingReviewIndex = reviews.findIndex(
      (review) => review.productId === productId && review.userId === user.id,
    )

    const newReview: Review = {
      id: existingReviewIndex >= 0 ? reviews[existingReviewIndex].id : Date.now(),
      productId,
      userId: user.id,
      userName: user.fullName,
      rating,
      comment,
      date: new Date().toLocaleDateString("vi-VN"),
    }

    setReviews((prevReviews) => {
      if (existingReviewIndex >= 0) {
        // Update existing review
        const updatedReviews = [...prevReviews]
        updatedReviews[existingReviewIndex] = newReview
        return updatedReviews
      } else {
        // Add new review
        return [...prevReviews, newReview]
      }
    })

    return true
  }

  // Get reviews for a specific product
  const getProductReviews = (productId: number): Review[] => {
    return reviews.filter((review) => review.productId === productId)
  }

  // Get the current user's review for a product
  const getUserReview = (productId: number): Review | undefined => {
    if (!user) return undefined
    return reviews.find((review) => review.productId === productId && review.userId === user.id)
  }

  // Calculate average rating for a product
  const getAverageRating = (productId: number): number => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0

    const sum = productReviews.reduce((total, review) => total + review.rating, 0)
    return Math.round((sum / productReviews.length) * 10) / 10 // Round to 1 decimal place
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getUserReview,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}
