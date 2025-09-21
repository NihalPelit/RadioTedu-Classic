import React, { useEffect, useRef, useState } from 'react'
import { FaTimes, FaPlay, FaPause, FaSync, FaClock } from 'react-icons/fa'

/*
 Pomodoro Component
 Modes:
  - 25/5 (default)
  - 50/10
 Minimal, fits existing retro-futuristic glow aesthetic.
*/

const MODES = {
  '25/5': { focus: 25, break: 5 },
  '50/10': { focus: 50, break: 10 }
}

export default function Pomodoro() {
  const [mode, setMode] = useState('25/5')
  const [phase, setPhase] = useState('focus') // 'focus' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(MODES[mode].focus * 60)
  const [running, setRunning] = useState(false)
  const [closed, setClosed] = useState(false)
  const intervalRef = useRef(null)
  const prevModeRef = useRef(mode)

  // Update time when mode changes
  useEffect(() => {
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode
      setPhase('focus')
      setSecondsLeft(MODES[mode].focus * 60)
      setRunning(false)
    }
  }, [mode])

  // Tick logic
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          const nextPhase = phase === 'focus' ? 'break' : 'focus'
          const nextSeconds = MODES[mode][nextPhase] * 60
          setPhase(nextPhase)
          if (navigator.vibrate) {
            try { navigator.vibrate([120, 60, 120]) } catch (_) {}
          }
          return nextSeconds
        }
        return prev - 1
      })
    }, 1000)
    return () => intervalRef.current && clearInterval(intervalRef.current)
  }, [running, phase, mode])

  // Track phase from secondsLeft rollover
  // Remove inference effect (phase now updated directly)

  const toggleRun = () => setRunning(r => !r)

  const reset = () => {
    setPhase('focus')
    setSecondsLeft(MODES[mode].focus * 60)
    setRunning(false)
  }

  const totalSeconds = MODES[mode][phase] * 60
  const progress = 1 - secondsLeft / totalSeconds
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const secs = (secondsLeft % 60).toString().padStart(2, '0')

  if (closed) {
    return (
      <button
        aria-label="Open Pomodoro"
        onClick={() => setClosed(false)}
        className="pomodoro-toggle text-xs"
      >
        <FaClock size={14} />
      </button>
    )
  }

  return (
    <div className="pomodoro-panel scale-[1.15] origin-bottom-right">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] tracking-wider uppercase opacity-90">{mode} {phase}</span>
        <button
          className="icon-btn"
          aria-label="Close"
          onClick={() => setClosed(true)}
        >
          <FaTimes size={10} />
        </button>
      </div>
      <div className="flex items-end gap-3">
        <div className="relative">
          <svg width="74" height="74" viewBox="0 0 36 36" className="-rotate-90">
            <circle cx="18" cy="18" r="16" stroke="var(--icon-color)" strokeWidth="2" fill="none" opacity="0.25" />
            <circle
              cx="18" cy="18" r="16"
              stroke="var(--glow-ui)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 16}
              style={{ filter: 'drop-shadow(0 0 4px rgba(209,209,248,0.6))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[15px] font-mono select-none">
            {minutes}:{secs}
          </div>
        </div>
        <div className="flex flex-col gap-1">          
          <div className="flex gap-1">
            {Object.keys(MODES).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`mode-chip ${m === mode ? 'active' : ''}`}
              >{m}</button>
            ))}
          </div>
          <div className="flex gap-1">
            <button onClick={toggleRun} className="control-btn" aria-label={running ? 'Pause' : 'Start'}>
              {running ? <FaPause size={10} /> : <FaPlay size={10} />}
            </button>
            <button onClick={reset} className="control-btn" aria-label="Reset">
              <FaSync size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
