/**
 * NatureSound Component
 * Tek bir doğa sesi item'ı (yeniden kullanılabilir)
 */

import React from 'react'
import { Slider } from '../ui'

export default function NatureSound({
  icon: Icon,
  label,
  active,
  volume,
  onToggle,
  onVolumeChange,
  iconSize = 24
}) {
  return (
    <div className="nature-sound-item">
      {/* Icon ve Label */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggle}
          className={`nature-icon-container ${active ? 'active' : ''}`}
          title={`Toggle ${label}`}
        >
          <Icon size={iconSize} />
        </button>
        <span className="nature-label">{label}</span>
      </div>

      {/* Volume Slider (sadece aktifse göster) */}
      {active && (
        <div className="nature-slider-container gap-2">
          <Slider
            value={volume}
            onChange={onVolumeChange}
            showPercentage
            className="w-32"
          />
        </div>
      )}
    </div>
  )
}