/**
 * Footer Component
 * Alt kısım - player ve now playing
 */

import React from 'react'
import { Player } from '../audio'
import { APP_CHANNEL } from '../../constants'

export default function Footer({ crossfaderValue }) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
      {/* Channel Info */}
      <div className="mb-3 sm:mb-4 text-left flex items-center gap-3">
        <span className="text-glow-subtle text-lg sm:text-xl">
          {APP_CHANNEL}
        </span>
        <span 
          className="text-yellow-400 text-sm sm:text-base font-pixel animate-pulse" 
          style={{ textShadow: '0 0 8px rgba(255, 255, 0, 0.8), 0 0 16px rgba(255, 255, 0, 0.4)' }}
        >
          on-air
        </span>
      </div>

      {/* Player */}
      <div className="mb-3 sm:mb-4">
        <Player crossfaderValue={crossfaderValue} />
      </div>
    </footer>
  )
}