'use client'

import { useState, useEffect } from 'react'
import { X, Share, Plus } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already installed or dismissed
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      localStorage.getItem('pwa-dismissed')
    ) return

    // Android / Chrome — native install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // iOS Safari — no native prompt, show manual guide
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (isIOS && isSafari) {
      setShowIOSGuide(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = () => {
    localStorage.setItem('pwa-dismissed', '1')
    setDismissed(true)
    setDeferredPrompt(null)
    setShowIOSGuide(false)
  }

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') dismiss()
    setDeferredPrompt(null)
  }

  if (dismissed || (!deferredPrompt && !showIOSGuide)) return null

  return (
    <div className="fixed bottom-[var(--nav-h)] left-0 right-0 z-40 px-4 pb-3 max-w-lg mx-auto animate-fade-in">
      <div className="bg-[#1E1E1E] border border-gold/30 rounded-2xl p-4 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 text-xl">
            🏋️
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">Add SpineQuest to your home screen</p>
            {showIOSGuide ? (
              <p className="text-xs text-muted mt-0.5">
                Tap <Share size={11} className="inline mx-0.5 text-blue-400" /> then{' '}
                <span className="text-white font-medium">"Add to Home Screen"</span>
              </p>
            ) : (
              <p className="text-xs text-muted mt-0.5">
                Install for offline access and full-screen experience
              </p>
            )}
          </div>
          <button onClick={dismiss} className="text-muted p-1 -mt-1 -mr-1 shrink-0">
            <X size={16} />
          </button>
        </div>

        {deferredPrompt && (
          <button
            onClick={install}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-[#0D0D0D] font-bold text-sm active:scale-95 transition-transform"
          >
            <Plus size={16} /> Install App
          </button>
        )}
      </div>
    </div>
  )
}
