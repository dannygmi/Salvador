'use client'

import { clsx } from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all active:scale-95 select-none ripple',
        size === 'sm' && 'px-3 py-2 text-sm min-h-[36px]',
        size === 'md' && 'px-5 py-3 text-base min-h-[48px]',
        size === 'lg' && 'px-6 py-4 text-lg min-h-[56px]',
        variant === 'primary' && 'bg-gold text-[#0D0D0D] hover:brightness-110 shadow-lg shadow-gold/20',
        variant === 'secondary' && 'bg-card border border-border text-white hover:border-white/30',
        variant === 'ghost' && 'bg-transparent text-muted hover:text-white hover:bg-white/5',
        variant === 'danger' && 'bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20',
        fullWidth && 'w-full',
        disabled && 'opacity-40 cursor-not-allowed active:scale-100',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
