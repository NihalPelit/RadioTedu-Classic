import React from 'react'

export default function Crossfader({ crossfaderValue, setCrossfaderValue }) {
  const handleCrossfaderChange = (e) => {
    const value = parseInt(e.target.value)
    setCrossfaderValue(value)
  }

  // Yüzde hesaplamaları
  const musicPercentage = 100-crossfaderValue
  const naturePercentage = crossfaderValue

  return (
    <div className="crossfader-container">
      {/* Labels */}
      <div className="crossfader-labels">
        <span className="crossfader-label left">Just Music</span>
        <span className="crossfader-label right">Just Nature</span>
      </div>
      
      {/* Crossfader Slider */}
      <div className="crossfader-slider-wrapper">
        <input
          type="range"
          min="0"
          max="100"
          value={crossfaderValue}
          onChange={handleCrossfaderChange}
          className="crossfader-slider"
        />
        
        {/* Center indicator */}
        <div className="crossfader-center-mark"></div>
      </div>
      
      {/* Percentage Display */}
      <div className="crossfader-percentages">
        <span className="crossfader-percentage music">
          {musicPercentage}%
        </span>
        <span className="crossfader-percentage nature">
          {naturePercentage}%
        </span>
      </div>
    </div>
  )
}