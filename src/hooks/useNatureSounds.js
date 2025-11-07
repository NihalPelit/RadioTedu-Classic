/**
 * useNatureSounds Hook
 * Doğa sesleri state yönetimi ve kontrolleri
 */

import { useState, useRef, useCallback } from 'react'
import { NATURE_SOUNDS } from '../constants'

export function useNatureSounds(crossfaderValue = 50) {
  // Aktif sesler
  const [activeSounds, setActiveSounds] = useState({
    rain: false,
    fire: false,
    wind: false,
    ocean: false,
    birds: false,
    thunder: false,
    crickets: false
  })

  // Her sesin volume değeri
  const [soundVolumes, setSoundVolumes] = useState({
    rain: 50,
    fire: 50,
    wind: 50,
    ocean: 50,
    birds: 50,
    thunder: 50,
    crickets: 50
  })

  // Audio referansları
  const audioRefs = useRef({
    rain: null,
    fire: null,
    wind: null,
    ocean: null,
    birds: null,
    thunder: null,
    crickets: null
  })

  // Audio element'i oluştur veya getir
  const getOrCreateAudio = useCallback((soundType) => {
    if (!audioRefs.current[soundType]) {
      const soundConfig = NATURE_SOUNDS[soundType]
      const audio = new Audio(soundConfig.path)
      audio.loop = true
      audio.preload = 'metadata'
      audioRefs.current[soundType] = audio
    }
    return audioRefs.current[soundType]
  }, [])

  // Sesi aç/kapat
  const toggleSound = useCallback(async (soundType) => {
    const wasActive = activeSounds[soundType]
    const audio = getOrCreateAudio(soundType)
    
    setActiveSounds(prev => ({
      ...prev,
      [soundType]: !prev[soundType]
    }))

    try {
      if (!wasActive) {
        // Ses açılıyor - her zaman default volume'den başla
        const soundConfig = NATURE_SOUNDS[soundType]
        const defaultVolume = soundConfig.defaultVolume
        const multiplier = soundConfig.volumeMultiplier
        const crossfaderEffect = crossfaderValue / 100

        audio.currentTime = 0
        audio.volume = Math.min(
          (defaultVolume / 100) * crossfaderEffect * multiplier,
          1.0
        )
        
        await audio.play()
        
        // Slider state'ini de default'a çek
        setSoundVolumes(prev => ({
          ...prev,
          [soundType]: defaultVolume
        }))
      } else {
        // Ses kapatılıyor
        audio.pause()
        audio.currentTime = 0
      }
    } catch (error) {
      console.error(`${soundType} playback error:`, error)
      // Hata durumunda state'i geri al
      setActiveSounds(prev => ({
        ...prev,
        [soundType]: wasActive
      }))
    }
  }, [activeSounds, crossfaderValue, getOrCreateAudio])

  // Volume değiştir
  const changeVolume = useCallback((soundType, newVolume) => {
    const audio = audioRefs.current[soundType]
    if (!audio) return

    const soundConfig = NATURE_SOUNDS[soundType]
    const multiplier = soundConfig.volumeMultiplier
    const crossfaderEffect = crossfaderValue / 100

    audio.volume = Math.min(
      (newVolume / 100) * crossfaderEffect * multiplier,
      1.0
    )

    setSoundVolumes(prev => ({
      ...prev,
      [soundType]: newVolume
    }))
  }, [crossfaderValue])

  // Tüm aktif seslerin volume'ünü crossfader'a göre güncelle
  const updateAllVolumes = useCallback(() => {
    Object.keys(activeSounds).forEach(soundType => {
      if (activeSounds[soundType]) {
        const audio = audioRefs.current[soundType]
        if (audio) {
          const soundConfig = NATURE_SOUNDS[soundType]
          const multiplier = soundConfig.volumeMultiplier
          const crossfaderEffect = crossfaderValue / 100
          const currentVolume = soundVolumes[soundType]

          audio.volume = Math.min(
            (currentVolume / 100) * crossfaderEffect * multiplier,
            1.0
          )
        }
      }
    })
  }, [activeSounds, soundVolumes, crossfaderValue])

  // Cleanup
  const cleanup = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    })
  }, [])

  return {
    activeSounds,
    soundVolumes,
    toggleSound,
    changeVolume,
    updateAllVolumes,
    cleanup
  }
}