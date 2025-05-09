"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user type
type User = {
  id: string
  email: string
  fullName: string
  phone: string
  avatar?: string
  birthday?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: { email: string; fullName: string; phone: string; password: string }) => Promise<boolean>
  logout: () => void
  updateUserProfile: (updatedUser: User) => void
  updatePassword: (currentPassword: string, newPassword: string) => boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider props
type AuthProviderProps = {
  children: ReactNode
}

// Default password for demo
const DEFAULT_PASSWORD = "password123"

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        // Khởi tạo users nếu chưa có
        if (!localStorage.getItem("users")) {
          localStorage.setItem(
            "users",
            JSON.stringify([
              {
                id: "demo",
                email: "demo@example.com",
                fullName: "Demo User",
                phone: "0123456789",
                password: DEFAULT_PASSWORD,
              },
            ]),
          )
        }

        const authData = localStorage.getItem("auth")
        if (authData) {
          const parsedData = JSON.parse(authData)
          setUser(parsedData.user)
          setIsAuthenticated(parsedData.isAuthenticated)
        }
      } catch (error) {
        console.error("Failed to load auth state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAuthState()
  }, [])

  // Register function
  const register = async (userData: {
    email: string
    fullName: string
    phone: string
    password: string
  }): Promise<boolean> => {
    setIsLoading(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Get existing users
          const usersJSON = localStorage.getItem("users") || "[]"
          const users = JSON.parse(usersJSON)

          // Check if email already exists
          const existingUser = users.find((u: any) => u.email === userData.email)
          if (existingUser) {
            setIsLoading(false)
            resolve(false)
            return
          }

          // Create new user
          const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            fullName: userData.fullName,
            phone: userData.phone,
            password: userData.password,
          }

          // Add to users array
          users.push(newUser)
          localStorage.setItem("users", JSON.stringify(users))

          setIsLoading(false)
          resolve(true)
        } catch (error) {
          console.error("Registration error:", error)
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  // Login function
  const login = async (email: string, inputPassword: string): Promise<boolean> => {
    setIsLoading(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Get users from localStorage
          const usersJSON = localStorage.getItem("users") || "[]"
          const users = JSON.parse(usersJSON)

          // Find user by email
          const foundUser = users.find((u: any) => u.email === email)

          // If user not found or password doesn't match
          if (!foundUser || foundUser.password !== inputPassword) {
            setIsLoading(false)
            resolve(false)
            return
          }

          // Create user object (without password)
          const loggedInUser: User = {
            id: foundUser.id,
            email: foundUser.email,
            fullName: foundUser.fullName,
            phone: foundUser.phone,
            birthday: foundUser.birthday,
          }

          setUser(loggedInUser)
          setIsAuthenticated(true)

          // Save to localStorage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: loggedInUser,
              isAuthenticated: true,
            }),
          )

          setIsLoading(false)
          resolve(true)
        } catch (error) {
          console.error("Login error:", error)
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("auth")
  }

  // Update user profile
  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser)

    // Update localStorage auth
    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: updatedUser,
        isAuthenticated: true,
      }),
    )

    // Also update in users array
    try {
      const usersJSON = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJSON)

      const updatedUsers = users.map((u: any) => {
        if (u.id === updatedUser.id) {
          return { ...u, ...updatedUser, password: u.password }
        }
        return u
      })

      localStorage.setItem("users", JSON.stringify(updatedUsers))
    } catch (error) {
      console.error("Error updating user profile in users array:", error)
    }
  }

  // Update password
  const updatePassword = (currentPassword: string, newPassword: string) => {
    if (!user) return false

    try {
      const usersJSON = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJSON)

      const userIndex = users.findIndex((u: any) => u.id === user.id)

      if (userIndex === -1 || users[userIndex].password !== currentPassword) {
        return false
      }

      // Update password
      users[userIndex].password = newPassword
      localStorage.setItem("users", JSON.stringify(users))

      return true
    } catch (error) {
      console.error("Error updating password:", error)
      return false
    }
  }

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUserProfile,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
