'use client'

import { useState, useCallback } from 'react'
import { Toast } from '@/types'

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    description?: string,
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      type,
      title,
      description,
      duration
    }

    setToasts(prev => [...prev, newToast])

    // 자동으로 토스트 제거
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    removeToast,
    clearAllToasts
  }
}