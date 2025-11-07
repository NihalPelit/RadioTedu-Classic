/**
 * Crossfader Component (Refactored)
 * Müzik ve nature ses karıştırıcı
 */

import React from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateCrossfaderPercentages } from '../../hooks'
import { DEFAULT_CROSSFADER_VALUE } from '../../constants'

export default function Crossfader({ crossfaderValue, setCrossfaderValue }) {
  const handleChange = (e) => {
    const value = parseInt(e.target.value)
    setCrossfaderValue(value)
  }

  const resetToCenter = () => {
    setCrossfaderValue(DEFAULT_CROSSFADER_VALUE)
  }

  // Yüzdeleri hesapla
  const { music, nature } = calculateCrossfaderPercentages(crossfaderValue)

  return (
    <div className="crossfader-container">
      {/* Labels */}
      <div className="crossfader-labels">
        <span className="crossfader-label left">Just Music</span>
        <span className="crossfader-label right">Just Nature</span>
      </div>
      
      {/* Slider */}
      <div className="crossfader-slider-wrapper">
        <input
          type="range"
          min="0"
          max="100"
          value={crossfaderValue}
          onChange={handleChange}
          className="crossfader-slider"
        />
        
        {/* Center indicator */}
        <div className="crossfader-center-mark"></div>
      </div>
      
      {/* Percentages and Reset */}
      <div className="crossfader-percentages">
        <span className="crossfader-percentage music">
          {music}%
        </span>
        
        <button 
          onClick={resetToCenter}
          className="crossfader-reset-btn"
          title="Reset to 50/50"
        >
          <RotateCcw size={12} />
          <span className="reset-text">reset</span>
        </button>
        
        <span className="crossfader-percentage nature">
          {nature}%
        </span>
      </div>
    </div>
  )
}