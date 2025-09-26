'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    const Component = hoverable ? motion.div : 'div'

    const motionProps = hoverable
      ? {
          whileHover: { y: -2, scale: 1.01 },
          transition: { duration: 0.2 }
        }
      : {}

    return (
      <Component
        ref={ref}
        className={clsx(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          className
        )}
        {...(hoverable ? motionProps : {})}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('p-6 pt-0', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'