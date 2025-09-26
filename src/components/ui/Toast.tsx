'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { Toast as ToastType } from '@/types'

interface ToastProps {
  toast: ToastType
  onClose: (id: string) => void
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const colorMap = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-800',
    description: 'text-green-700'
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-800',
    description: 'text-red-700'
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    title: 'text-yellow-800',
    description: 'text-yellow-700'
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-800',
    description: 'text-blue-700'
  }
}

export const ToastItem = ({ toast, onClose }: ToastProps) => {
  const Icon = iconMap[toast.type]
  const colors = colorMap[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.3 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`max-w-sm w-full border rounded-lg shadow-lg backdrop-blur-sm ${colors.bg}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${colors.icon}`} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${colors.title}`}>
              {toast.title}
            </p>
            {toast.description && (
              <p className={`mt-1 text-sm ${colors.description}`}>
                {toast.description}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`inline-flex rounded-md ${colors.bg} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              onClick={() => onClose(toast.id)}
            >
              <span className="sr-only">닫기</span>
              <X className={`h-4 w-4 ${colors.icon} hover:opacity-70`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: ToastType[]
  onClose: (id: string) => void
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}