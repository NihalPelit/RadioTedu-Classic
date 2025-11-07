/**
 * Header Component
 * Üst kısım - sosyal medya linkleri, butonlar, beta notice
 */

import React, { useState, useEffect } from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaHeart, FaHome } from 'react-icons/fa'
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
      
      {/* Right Side - Social Icons */}
      <div className="flex flex-col items-end gap-1 sm:gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
            <a 
              href={SOCIAL_LINKS.facebook} 
              target="_blank" 
              rel="noreferrer" 
              className="icon-glow"
            >
              <FaFacebookF />
            </a>
            <a 
              href={SOCIAL_LINKS.twitter} 
              target="_blank" 
              rel="noreferrer" 
              className="icon-glow"
            >
              <FaTwitter />
            </a>
            <a 
              href={SOCIAL_LINKS.youtube} 
              target="_blank" 
              rel="noreferrer" 
              className="icon-glow"
            >
              <FaYoutube />
            </a>
            <button
              type="button"
              onClick={() => setShowLove(true)}
              aria-label="We love you too"
              className="icon-glow focus:outline-none"
            >
              <FaHeart />
            </button>
          </div>
          
          {/* Homepage Button */}
          <a 
            href={SOCIAL_LINKS.homepage} 
            target="_blank" 
            rel="noreferrer" 
            className="player-control flex items-center gap-2 text-sm"
            title="Visit RadioTEDU Homepage"
          >
            <FaHome size={14} />
            <span className="hidden sm:inline">Home</span>
          </a>
        </div>

        {/* Love Message */}
        {showLove && (
          <div 
            className="mt-1 text-pink-300 text-[11px] sm:text-xs tracking-wide flex items-center gap-1 animate-pulse" 
            style={{textShadow:'0 0 6px rgba(255,192,203,0.7)'}}
          >
            <span className="inline-block">we love you too!</span>
            <span className="pulse-dot">❤</span>
          </div>
        )}

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