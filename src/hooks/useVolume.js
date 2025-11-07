/**
 * useVolume Hook
 * Volume kontrolü ve crossfader hesaplamaları
 */

import { useEffect } from 'react'

/**
 * Volume hesaplama ve uygulama
 * @param {Object} audioRef - Audio element ref'i
 * @param {number} baseVolume - Temel volume (0-1)
 * @param {number} crossfaderValue - Crossfader değeri (0-100)
 * @param {number} volumeMultiplier - Volume çarpanı (birds için 1.5)
 * @param {string} audioType - 'music' veya 'nature'
 */
export function useVolume(
  audioRef, 
  baseVolume, 
  crossfaderValue = 50, 
  volumeMultiplier = 1.0,
  audioType = 'music'
) {
  useEffect(() => {
    if (!audioRef?.current) return

    // Crossfader etkisini hesapla
    let crossfaderEffect
    if (audioType === 'music') {
      // Müzik için: crossfader sağa gittikçe azalır (0 = tam, 100 = kapalı)
      crossfaderEffect = (100 - crossfaderValue) / 100
    } else {
      // Nature için: crossfader sağa gittikçe artar (0 = kapalı, 100 = tam)
      crossfaderEffect = crossfaderValue / 100
    }

    // Final volume = baseVolume × crossfaderEffect × multiplier
    const finalVolume = Math.min(
      baseVolume * crossfaderEffect * volumeMultiplier, 
      1.0
    )

    audioRef.current.volume = finalVolume
  }, [audioRef, baseVolume, crossfaderValue, volumeMultiplier, audioType])
}

/**
 * Volume hesaplama (apply etmeden sadece hesapla)
 */
export function calculateVolume(
  baseVolume,
  crossfaderValue = 50,
  volumeMultiplier = 1.0,
  audioType = 'music'
) {
  let crossfaderEffect
  if (audioType === 'music') {
    crossfaderEffect = (100 - crossfaderValue) / 100
  } else {
    crossfaderEffect = crossfaderValue / 100
  }

  return Math.min(
    baseVolume * crossfaderEffect * volumeMultiplier,
    1.0
  )
}

/**
 * Crossfader yüzdeleri hesaplama
 */
export function calculateCrossfaderPercentages(crossfaderValue) {
  return {
    music: 100 - crossfaderValue,
    nature: crossfaderValue
  }
}