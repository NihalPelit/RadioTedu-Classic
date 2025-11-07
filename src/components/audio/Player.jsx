/**
 * Player Component (Refactored)
 * Müzik çalar - hooks kullanarak refactor edildi
 */

import React, { useRef, useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { STREAM_URL, DEFAULT_VOLUME, VOLUME_BARS } from '../../constants'
import { useVolume } from '../../hooks'
import { IconButton } from '../ui'

export default function Player({ crossfaderValue = 50 }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)

  // Audio element'i oluştur
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL)
      audioRef.current.autoPlay = true
      audioRef.current.volume = volume
    }

    const tryPlay = async () => {
      try {
        await audioRef.current.play()
        setPlaying(true)
      } catch (e) {
        console.error('Audio autoplay failed:', e)
        setPlaying(false)
      }
    }

    tryPlay()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Crossfader ve volume değişikliklerini uygula
  useVolume(audioRef, volume, crossfaderValue, 1.0, 'music')

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch (error) {
        console.error('Play failed:', error)
      }
    }
  }

  const handleVolumeClick = (barVolume) => {
    setVolume(barVolume)
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
      {/* Play/Pause Button */}
      <IconButton
        icon={playing ? FaPause : FaPlay}
        onClick={togglePlay}
        active={playing}
        title={playing ? 'Pause' : 'Play'}
        ariaLabel={playing ? 'Pause' : 'Play'}
      />

      {/* Volume Bars */}
      <div className="flex items-end gap-1 ml-2 sm:ml-4">
        {Array.from({ length: VOLUME_BARS }).map((_, i) => {
          const barVolume = (i + 1) / VOLUME_BARS
          const isActive = volume >= barVolume
          return (
            <div
              key={i}
              className={`volume-bar cursor-pointer ${isActive ? 'active' : ''}`}
              style={{ height: `${10 + i * 1.5}px` }}
              onClick={() => handleVolumeClick(barVolume)}
              title={`Set volume to ${Math.round(barVolume * 100)}%`}
            />
          )
        })}
      </div>
    </div>
  )
}