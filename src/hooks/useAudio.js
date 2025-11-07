/**
 * useAudio Hook
 * Audio element oluşturma ve temel kontrollerini sağlar
 */

import { useRef, useEffect } from 'react'

export function useAudio(audioSrc, options = {}) {
  const {
    loop = true,
    autoPlay = false,
    preload = 'metadata',
    initialVolume = 0.5
  } = options

  const audioRef = useRef(null)

  // Audio element'i oluştur
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(audioSrc)
      audio.loop = loop
      audio.preload = preload
      audio.volume = initialVolume
      audioRef.current = audio
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [audioSrc, loop, preload, initialVolume])

  // Play fonksiyonu
  const play = async () => {
    if (!audioRef.current) return false
    
    try {
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      return true
    } catch (error) {
      console.error('Audio play error:', error)
      return false
    }
  }

  // Pause fonksiyonu
  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  // Volume ayarlama
  const setVolume = (volume) => {
    if (!audioRef.current) return
    audioRef.current.volume = Math.min(Math.max(volume, 0), 1)
  }

  // Audio element'e direkt erişim
  const getAudioElement = () => audioRef.current

  return {
    audioRef,
    play,
    pause,
    setVolume,
    getAudioElement
  }
}