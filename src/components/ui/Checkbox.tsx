'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { clsx } from 'clsx'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, disabled, ...props }, ref) => {
    return (
      <label className={clsx(
        'flex items-center gap-2 cursor-pointer',
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
              'w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200',
              checked
                ? 'enso-gradient border-transparent text-white shadow-lg'
                : 'border-zinc-600 bg-zinc-800 hover:border-enso-cyan hover:shadow-sm hover:shadow-enso-cyan/20',
              disabled && 'cursor-not-allowed'
            )}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-3 h-3" />
              </motion.div>
            )}
          </motion.div>
        </div>
        {label && (
          <span className="text-sm font-medium leading-none text-zinc-300">{label}</span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'