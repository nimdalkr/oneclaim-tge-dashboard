'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, disabled, ...props }, ref) => {
    return (
      <label className={clsx(
        'flex items-center gap-3 cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            checked={checked}
            disabled={disabled}
            {...props}
          />
          <motion.div
            className={clsx(
              'w-11 h-6 rounded-full transition-colors duration-200',
              checked
                ? 'bg-gradient-to-r from-enso-cyan to-enso-purple'
                : 'bg-zinc-700 border border-zinc-600',
              disabled && 'cursor-not-allowed'
            )}
            initial={false}
            animate={{
              backgroundColor: checked ? undefined : '#3f3f46'
            }}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-lg"
              initial={false}
              animate={{
                x: checked ? 22 : 2,
                y: 2
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          </motion.div>
        </div>
        {label && (
          <span className="text-sm font-medium text-zinc-300">{label}</span>
        )}
      </label>
    )
  }
)

Switch.displayName = 'Switch'