/**
 * Pomodoro Component (Refactored)
 * Pomodoro zamanlayıcı - yatay tasarım
 */

import React, { useState } from 'react'
import { FaTimes, FaPlay, FaPause, FaSync, FaClock } from 'react-icons/fa'
import { useTimer } from '../../hooks'
import { POMODORO_MODES, DEFAULT_POMODORO_MODE } from '../../constants'

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
    return null // Kapalıysa hiçbir şey gösterme
  }

  return (
    <div className="pomodoro-bar">
      <div className="pomodoro-bar-content">
        {/* Left Side - Timer Info */}
        <div className="pomodoro-info">
          <div className="pomodoro-timer-display">
            {/* Timer Circle */}
            <div className="relative">
              <svg width="50" height="50" viewBox="0 0 36 36" className="-rotate-90">
                {/* Background Circle */}
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  stroke="#e5e5e5"
                  strokeWidth="2.5" 
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="18" 
                  cy="18" 
                  r="16"
                  stroke="#e74c3c"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={(1 - progress) * 2 * Math.PI * 16}
                  style={{ 
                    transition: 'stroke-dashoffset 0.5s ease'
                  }}
                />
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                {formattedTime}
              </div>
            </div>
          </div>

          <div className="pomodoro-phase-info">
            <span className="pomodoro-phase-label">{phase === 'focus' ? 'Focus Time' : 'Break Time'}</span>
            <span className="pomodoro-mode-text">{mode} Mode</span>
          </div>
        </div>

        {/* Center - Mode Selection */}
        <div className="pomodoro-modes">
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

        {/* Right Side - Controls */}
        <div className="pomodoro-controls">
          <button
            onClick={toggleRun}
            className="control-btn control-btn-primary"
            title={running ? 'Pause' : 'Start'}
          >
            {running ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
          <button
            onClick={reset}
            className="control-btn control-btn-secondary"
            title="Reset"
          >
            <FaSync size={13} />
          </button>
          <button
            onClick={() => setClosed(true)}
            className="control-btn control-btn-close"
            title="Close"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}