"use client"

import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type ToastFn = (props: Omit<ToasterToast, "id">) => {
  id: string
  dismiss: () => void
  update: (props: ToasterToast) => void
}

const ToastContext = React.createContext<{
  toast: ToastFn
  dismiss: (toastId?: string) => void
} | undefined>(undefined);

function useToast() {
  const context = React.useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a Toaster")
  }

  return context;
}

export { useToast, ToastContext };
export type { ToasterToast, ToastFn };
