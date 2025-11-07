/**
 * Audio Constants
 * Tüm ses ile ilgili sabit değerler
 */

// Radio stream URL
export const STREAM_URL = 'https://stream.radiotedu.com/classic'

// Nature sound dosya yolları
export const NATURE_SOUNDS = {
  rain: {
    path: import.meta.env.BASE_URL + 'sounds/rain.mp3',
    label: 'rain',
    defaultVolume: 50,
    volumeMultiplier: 1.0
  },
  fire: {
    path: import.meta.env.BASE_URL + 'sounds/fire.mp3',
    label: 'fire',
    defaultVolume: 50,
    volumeMultiplier: 1.0
  },
  wind: {
    path: import.meta.env.BASE_URL + 'sounds/wind.mp3',
    label: 'wind',
    defaultVolume: 50,
    volumeMultiplier: 1.0
  },
  ocean: {
    path: import.meta.env.BASE_URL + 'sounds/ocean.mp3',
    label: 'ocean',
    defaultVolume: 50,
    volumeMultiplier: 1.0
  },
  birds: {
    path: import.meta.env.BASE_URL + 'sounds/birds.mp3',
    label: 'birds',
    defaultVolume: 50,
    volumeMultiplier: 1.5 // Birds için boost
  },
  thunder: {
    path: import.meta.env.BASE_URL + 'sounds/thunder.mp3',
    label: 'thunder',
    defaultVolume: 50,
    volumeMultiplier: 1.0
  },
  crickets: {
    path: import.meta.env.BASE_URL + 'sounds/crickets.mp3',
    label: 'crickets',
    defaultVolume: 50,
    volumeMultiplier: 1.0
  }
}

// Default audio ayarları
export const DEFAULT_VOLUME = 0.7
export const VOLUME_BARS = 10
export const DEFAULT_CROSSFADER_VALUE = 50