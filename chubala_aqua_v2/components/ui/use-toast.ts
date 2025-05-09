"use client"

import type React from "react"

import { useState, useEffect } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 3000

type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  open?: boolean
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: string
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: string
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        if (toastTimeouts.has(toastId)) {
          clearTimeout(toastTimeouts.get(toastId))
          toastTimeouts.delete(toastId)
        }
      } else {
        for (const [id, timeout] of toastTimeouts.entries()) {
          clearTimeout(timeout)
          toastTimeouts.delete(id)
        }
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Tạo một singleton state để lưu trữ toasts
let TOAST_STATE: State = { toasts: [] }

// Tạo các hàm để thao tác với toast state
function addToast(toast: Omit<ToasterToast, "id">) {
  const id = generateId()
  const newToast = { id, ...toast, open: true }

  TOAST_STATE = reducer(TOAST_STATE, {
    type: "ADD_TOAST",
    toast: newToast,
  })

  // Tự động dismiss toast sau một khoảng thời gian
  setTimeout(() => {
    dismissToast(id)
  }, TOAST_REMOVE_DELAY)

  return id
}

function dismissToast(toastId?: string) {
  TOAST_STATE = reducer(TOAST_STATE, {
    type: "DISMISS_TOAST",
    toastId,
  })

  // Xóa toast sau khi animation kết thúc
  setTimeout(() => {
    TOAST_STATE = reducer(TOAST_STATE, {
      type: "REMOVE_TOAST",
      toastId,
    })
  }, 300)
}

// Export toast function để sử dụng bên ngoài hook
export const toast = {
  /**
   * Hiển thị một toast notification
   */
  default(props: Omit<ToasterToast, "id" | "variant">) {
    return addToast({ ...props, variant: "default" })
  },

  /**
   * Hiển thị một toast notification với variant destructive
   */
  destructive(props: Omit<ToasterToast, "id" | "variant">) {
    return addToast({ ...props, variant: "destructive" })
  },

  /**
   * Đóng một toast notification
   */
  dismiss(toastId?: string) {
    dismissToast(toastId)
  },
}

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  const toast = (props: Omit<ToasterToast, "id">) => {
    const id = generateId()

    const newToast = {
      id,
      ...props,
      open: true,
    }

    setState((prevState) => reducer(prevState, { type: "ADD_TOAST", toast: newToast }))

    return id
  }

  const update = (props: ToasterToast) => {
    setState((prevState) => reducer(prevState, { type: "UPDATE_TOAST", toast: props }))
  }

  const dismiss = (toastId?: string) => {
    setState((prevState) => reducer(prevState, { type: "DISMISS_TOAST", toastId }))
  }

  useEffect(() => {
    const timeouts = new Map<string, ReturnType<typeof setTimeout>>()

    state.toasts.forEach((toast) => {
      if (!toast.id) return

      const timeout = setTimeout(() => {
        dismiss(toast.id)
        setTimeout(() => {
          setState((prevState) => reducer(prevState, { type: "REMOVE_TOAST", toastId: toast.id }))
        }, 300)
      }, TOAST_REMOVE_DELAY)

      timeouts.set(toast.id, timeout)
    })

    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [state.toasts])

  return {
    ...state,
    toast,
    dismiss,
    update,
  }
}

export type { ToasterToast }
