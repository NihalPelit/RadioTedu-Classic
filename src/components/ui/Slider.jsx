/**
 * Slider Component
 * Yeniden kullanılabilir slider component'i
 */

import React from 'react'

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  className = '',
  showPercentage = false,
  disabled = false
}) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`nature-slider ${className}`}
      />
      {showPercentage && (
        <span className="text-xs opacity-70 min-w-[35px]">
          {value}%
        </span>
      )}
    </div>
  )
}