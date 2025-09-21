import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

const STREAM_URL = 'https://stream.radiotedu.com/classic'

export default function Player({ crossfaderValue=50 }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(0.7)

  const VOLUME_BARS = 10

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.volume = volume
    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch (e) {
        setPlaying(false)
      }
    }
    tryPlay()
  }, [])

  // 🔹 Crossfader veya kullanıcı volume değiştiğinde gerçek çıkış volumesını uygula
  useEffect(() => {
    if (audioRef.current){
      const audio = audioRef.current
      if (!audio) return
      // Player için crossfader etkisi: (100 - crossfaderValue) / 100
      audio.volume = volume * ((100 - crossfaderValue) / 100) // 🔹 Crossfader ekleme
    } 
  }, [volume, crossfaderValue])

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
      } catch {
        // ignore
      }
    }
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
      <audio ref={audioRef} src={STREAM_URL} autoPlay />
      
      {/* Controls group */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Play/Pause */}
        <button 
          onClick={togglePlay} 
          className={`player-control ${playing ? 'active' : ''}`}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>
      </div>

      {/* Volume bars */}
      <div className="flex items-end gap-1 ml-2 sm:ml-4">
        {Array.from({ length: VOLUME_BARS }).map((_, i) => {
          const barVolume = (i + 1) / VOLUME_BARS
          const isActive = volume >= barVolume
          return (
            <div
              key={i}
              className={`volume-bar cursor-pointer ${isActive ? 'active' : ''}`}
              style={{ height: `${10 + i * 1.5}px` }}
              onClick={() => setVolume(barVolume)}
              title={`Set volume to ${Math.round(barVolume * 100)}%`}
            />
          )
        })}
      </div>
    </div>
  )
}
