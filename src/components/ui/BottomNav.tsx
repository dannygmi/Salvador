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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur-xl border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-stretch max-w-lg mx-auto">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center pt-3 pb-2 gap-1',
                'min-h-[60px] relative select-none',
                active ? 'text-gold' : 'text-muted active:text-white'
              )}
            >
              {/* Active indicator pill */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gold" />
              )}
              <Icon size={22} className={clsx(active && 'drop-shadow-[0_0_6px_rgba(232,168,75,0.6)]')} />
              <span className={clsx('text-[11px] font-semibold tracking-wide', active ? 'text-gold' : 'text-muted')}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
