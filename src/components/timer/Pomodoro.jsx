/**
 * Pomodoro Component (Refactored)
 * Pomodoro zamanlayıcı - useTimer hook ile refactor edildi
 */

import React, { useState } from 'react'
import { FaTimes, FaPlay, FaPause, FaSync, FaClock } from 'react-icons/fa'
import { useTimer } from '../../hooks'
import { POMODORO_MODES, DEFAULT_POMODORO_MODE } from '../../constants'
import { IconButton } from '../ui'

export default function Pomodoro() {
  const [mode, setMode] = useState(DEFAULT_POMODORO_MODE)
  const [closed, setClosed] = useState(false)

  const {
    phase,
    running,
    progress,
    formattedTime,
    toggleRun,
    reset
  } = useTimer(mode, POMODORO_MODES)

  if (closed) {
    return (
      <IconButton
        icon={FaClock}
        onClick={() => setClosed(false)}
        size={14}
        className="pomodoro-toggle text-xs"
        title="Open Pomodoro"
        ariaLabel="Open Pomodoro"
      />
    )
  }

  return (
    <div className="pomodoro-panel scale-[1.15] origin-bottom-right">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] tracking-wider uppercase opacity-90">
          {mode} {phase}
        </span>
        <IconButton
          icon={FaTimes}
          onClick={() => setClosed(true)}
          size={10}
          variant="icon-btn"
          title="Close"
        />
      </div>

      <div className="flex items-end gap-3">
        {/* Timer Circle */}
        <div className="relative">
          <svg width="74" height="74" viewBox="0 0 36 36" className="-rotate-90">
            {/* Background Circle */}
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              stroke="var(--icon-color)" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.25" 
            />
            {/* Progress Circle */}
            <circle
              cx="18" 
              cy="18" 
              r="16"
              stroke="var(--glow-ui)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 16}
              style={{ 
                filter: 'drop-shadow(0 0 4px rgba(209,209,248,0.6))',
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center text-[15px] font-mono select-none">
            {formattedTime}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-1">
          {/* Mode Selection */}
          <div className="flex gap-1">
            {Object.keys(POMODORO_MODES).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`mode-chip ${m === mode ? 'active' : ''}`}
              >
                {m}
              </button>
            ))}
          </div>
          
          {/* Play/Pause and Reset */}
          <div className="flex gap-1">
            <IconButton
              icon={running ? FaPause : FaPlay}
              onClick={toggleRun}
              size={10}
              variant="control"
              title={running ? 'Pause' : 'Start'}
            />
            <IconButton
              icon={FaSync}
              onClick={reset}
              size={10}
              variant="control"
              title="Reset"
            />
          </div>
        </div>
      </div>
    </div>
  )
}