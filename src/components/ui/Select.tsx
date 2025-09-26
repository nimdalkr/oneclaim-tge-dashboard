'use client'

import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  children: ReactNode
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, placeholder, disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            'w-full h-10 px-3 py-2 text-sm bg-zinc-800 border border-zinc-600 rounded-md',
            'text-zinc-100 placeholder:text-zinc-500',
            'focus:outline-none focus:ring-2 focus:ring-enso-cyan focus:border-transparent',
            'hover:border-enso-cyan/50 transition-colors duration-200',
            'appearance-none pr-10',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
      </div>
    )
  }
)

Select.displayName = 'Select'