/**
 * App Component (Refactored)
 * Ana uygulama component'i - refactor edilmiş hali
 */

import React, { useState } from 'react'
import { VideoBackground } from './components/video'
import { Navbar, Header, Footer } from './components/layout'
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
    <div className="relative min-h-screen bg-bg-dark font-pixel text-glow-ui flex flex-col">
      {/* Navbar (White, Fixed Top) */}
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="navbar-spacer"></div>

      {/* Video Background */}
      <VideoBackground videoFile={VISUAL_BACKGROUNDS[visualIndex]} />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-dark/60"></div>

      {/* Main Content Area */}
      <div className="flex-1 relative min-h-screen">
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

        {/* Player Area */}
        <div className="absolute bottom-24 left-0 right-0 z-10 p-4 sm:p-6">
          {/* Channel Info */}
          <div className="mb-3 sm:mb-4 text-left flex items-center gap-3">
            <span className="text-glow-subtle text-lg sm:text-xl">
              radiotedu / classical
            </span>
            <span 
              className="text-yellow-400 text-sm sm:text-base font-pixel animate-pulse" 
              style={{ textShadow: '0 0 8px rgba(255, 255, 0, 0.8), 0 0 16px rgba(255, 255, 0, 0.4)' }}
            >
              on-air
            </span>
          </div>
        </div>

        {/* Bottom-center Crossfader */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <Crossfader 
            crossfaderValue={crossfaderValue}
            setCrossfaderValue={setCrossfaderValue}
          />
        </div>

        {/* CRT effect overlay */}
        <div className="pointer-events-none fixed inset-0 crt"></div>
      </div>

      {/* Pomodoro Timer Bar - Bottom */}
      <Pomodoro />

      {/* Static Footer at Bottom */}
      <Footer />
    </div>
  )
}