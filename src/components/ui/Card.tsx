import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: string
}

export const Card = ({ className, children, glowColor, style, ...props }: CardProps) => (
  <div
    className={clsx(
      'bg-card border border-border rounded-2xl',
      className
    )}
    style={glowColor ? { ...style, boxShadow: `0 0 20px ${glowColor}20` } : style}
    {...props}
  >
    {children}
  </div>
)
