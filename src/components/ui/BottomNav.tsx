'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, TrendingUp, Settings } from 'lucide-react'
import { clsx } from 'clsx'

const tabs = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/workout', label: 'Workout', Icon: Dumbbell },
  { href: '/progress', label: 'Progress', Icon: TrendingUp },
  { href: '/settings', label: 'Settings', Icon: Settings },
]

export const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border pb-safe">
      <div className="flex items-stretch max-w-lg mx-auto">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center py-3 gap-0.5 min-h-[60px] text-xs font-medium transition-colors',
                active ? 'text-gold' : 'text-muted hover:text-white'
              )}
            >
              <Icon
                size={22}
                className={clsx(
                  'transition-transform',
                  active && 'scale-110'
                )}
              />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
