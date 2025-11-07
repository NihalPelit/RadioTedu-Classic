/**
 * App Component (Refactored)
 * Ana uygulama component'i - refactor edilmiş hali
 */

import React, { useState } from 'react'
import { VideoBackground } from './components/video'
import { Header, Footer } from './components/layout'
import { NaturePanel, Crossfader } from './components/audio'
import { Pomodoro } from './components/timer'
import { VISUAL_BACKGROUNDS, DEFAULT_CROSSFADER_VALUE } from './constants'

export default function App() {
  // Visual background state
  const [visualIndex, setVisualIndex] = useState(0)
  
  // Nature sounds panel state
  const [showNatureSounds, setShowNatureSounds] = useState(false)
  
  // Crossfader state
  const [crossfaderValue, setCrossfaderValue] = useState(DEFAULT_CROSSFADER_VALUE)

  // Cycle through visual backgrounds
  const cycleVisual = () => {
    setVisualIndex(i => (i + 1) % VISUAL_BACKGROUNDS.length)
  }

  // Show nature sounds panel
  const handleShowNatureSounds = () => {
    setShowNatureSounds(true)
  }

  return (
    <div className="relative min-h-full bg-bg-dark font-pixel text-glow-ui">
      {/* Video Background */}
      <VideoBackground videoFile={VISUAL_BACKGROUNDS[visualIndex]} />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-dark/60"></div>

      {/* Header */}
      <Header 
        onChangeVisual={cycleVisual}
        onShowNatureSounds={handleShowNatureSounds}
      />

      {/* Nature Sounds Panel */}
      <div className="relative z-10 p-4 sm:p-6">
        <NaturePanel 
          showNatureSounds={showNatureSounds} 
          setShowNatureSounds={setShowNatureSounds} 
          crossfaderValue={crossfaderValue}
        />
      </div>

      {/* Footer (Player Area) */}
      <Footer crossfaderValue={crossfaderValue} />

      {/* Bottom-center Crossfader */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <Crossfader 
          crossfaderValue={crossfaderValue}
          setCrossfaderValue={setCrossfaderValue}
        />
      </div>

      {/* Bottom-right Pomodoro */}
      <div className="fixed bottom-4 right-4 z-20">
        <Pomodoro />
      </div>

      {/* CRT effect overlay */}
      <div className="pointer-events-none fixed inset-0 crt"></div>
    </div>
  )
}