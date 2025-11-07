/**
 * useTimer Hook
 * Pomodoro zamanlayıcı logic'i
 */

import { useState, useEffect, useRef } from 'react'

export function useTimer(mode, modes) {
  const [phase, setPhase] = useState('focus') // 'focus' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(modes[mode].focus * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const prevModeRef = useRef(mode)

  // Mode değiştiğinde timer'ı sıfırla
  useEffect(() => {
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode
      setPhase('focus')
      setSecondsLeft(modes[mode].focus * 60)
      setRunning(false)
    }
  }, [mode, modes])

  // Zamanlayıcı logic'i
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          // Süre bittiğinde faza geç
          const nextPhase = phase === 'focus' ? 'break' : 'focus'
          const nextSeconds = modes[mode][nextPhase] * 60
          setPhase(nextPhase)
          
          // Vibration feedback (mobil cihazlar için)
          if (navigator.vibrate) {
            try {
              navigator.vibrate([120, 60, 120])
            } catch (_) {
              // Vibration desteklenmiyorsa sessizce devam et
            }
          }
          
          return nextSeconds
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [running, phase, mode, modes])

  // Toggle çalıştır/durdur
  const toggleRun = () => {
    setRunning(r => !r)
  }

  // Sıfırla
  const reset = () => {
    setPhase('focus')
    setSecondsLeft(modes[mode].focus * 60)
    setRunning(false)
  }

  // Progress hesaplama (0-1 arası)
  const totalSeconds = modes[mode][phase] * 60
  const progress = 1 - secondsLeft / totalSeconds

  // Formatlanmış süre
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const seconds = (secondsLeft % 60).toString().padStart(2, '0')
  const formattedTime = `${minutes}:${seconds}`

  return {
    phase,
    secondsLeft,
    running,
    progress,
    formattedTime,
    toggleRun,
    reset
  }
}