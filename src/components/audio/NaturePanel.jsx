/**
 * NaturePanel Component (Refactored)
 * Doğa sesleri paneli - hooks ve NatureSound kullanarak refactor edildi
 */

import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CloudRain, Wind, Flame, Waves, Bird, Zap, Moon } from 'lucide-react'
import { useNatureSounds } from '../../hooks'
import { IconButton } from '../ui'
import NatureSound from './NatureSound'

// Sound konfigürasyonu
const SOUND_CONFIG = [
  { id: 'rain', icon: CloudRain, label: 'rain', iconSize: 24 },
  { id: 'fire', icon: Flame, label: 'fire', iconSize: 24 },
  { id: 'wind', icon: Wind, label: 'wind', iconSize: 20 },
  { id: 'ocean', icon: Waves, label: 'ocean', iconSize: 20 },
  { id: 'birds', icon: Bird, label: 'birds', iconSize: 20 },
  { id: 'thunder', icon: Zap, label: 'thunder', iconSize: 20 },
  { id: 'crickets', icon: Moon, label: 'crickets', iconSize: 24 }
]

export default function NaturePanel({ 
  showNatureSounds, 
  setShowNatureSounds, 
  crossfaderValue 
}) {
  const {
    activeSounds,
    soundVolumes,
    toggleSound,
    changeVolume,
    updateAllVolumes,
    cleanup
  } = useNatureSounds(crossfaderValue)

  // Crossfader değiştiğinde tüm volume'leri güncelle
  useEffect(() => {
    updateAllVolumes()
  }, [crossfaderValue, updateAllVolumes])

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  // Panel kapalıysa hiçbir şey gösterme
  if (!showNatureSounds) return null

  const handleClose = () => {
    setShowNatureSounds(false)
    // NOT: Sesleri DURDURMUYORUZ - çalmaya devam etsinler
  }

  return (
    <div className="nature-sounds-panel">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[12px] tracking-wider uppercase opacity-90">
          Nature Sounds
        </span>
        <IconButton
          icon={FaTimes}
          onClick={handleClose}
          size={10}
          variant="nature-close"
          title="Close"
        />
      </div>

      {/* Sound List */}
      <div className="space-y-4">
        {SOUND_CONFIG.map((sound) => (
          <NatureSound
            key={sound.id}
            icon={sound.icon}
            label={sound.label}
            active={activeSounds[sound.id]}
            volume={soundVolumes[sound.id]}
            onToggle={() => toggleSound(sound.id)}
            onVolumeChange={(vol) => changeVolume(sound.id, vol)}
            iconSize={sound.iconSize}
          />
        ))}
      </div>
    </div>
  )
}