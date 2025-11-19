/**
 * Header Component
 * Üst kısım - butonlar, beta notice
 */

import React, { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { SOCIAL_LINKS } from '../../constants'

export default function Header({ onChangeVisual, onShowNatureSounds }) {
  const [showLove, setShowLove] = useState(false)

  // Auto hide love message
  useEffect(() => {
    if (!showLove) return
    const timer = setTimeout(() => setShowLove(false), 3000)
    return () => clearTimeout(timer)
  }, [showLove])

  return (
    <header className="relative z-10 flex justify-between items-start p-4 sm:p-6">
      {/* Left Side - Action Buttons */}
      <div className="flex flex-col items-start gap-2">
        <button 
          onClick={onChangeVisual} 
          className="player-control text-xs sm:text-sm px-3 py-1"
          title="Change background visual"
        >
          change visual
        </button>

        <button
          onClick={onShowNatureSounds}
          className="player-control text-xs sm:text-sm px-3 py-1"
          title="Add nature sounds"
        >
          add nature sound
        </button>
      </div>
      
      {/* Right Side - Beta Notice and Home Button */}
      <div className="flex flex-col items-end gap-1 sm:gap-2">

        {/* Beta Notice */}
        <div className="text-[11px] sm:text-sm leading-snug text-right opacity-90 max-w-[260px] font-mono">
          <span className="uppercase tracking-widest text-yellow-300 mr-2 text-[12px] sm:text-sm font-bold">
            beta
          </span>
          <div className="inline text-glow-subtle">
            any recommendations? send an email us!{' '}
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`} 
              className="underline hover:text-glow-ui"
            >
              {SOCIAL_LINKS.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}