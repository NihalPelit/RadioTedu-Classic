import React, { useState, useEffect } from 'react'
import VideoBackground from './components/VideoBackground'
import Player from './components/Player'
import { FaTimes,FaFacebookF, FaTwitter, FaYoutube, FaHeart, FaHome } from 'react-icons/fa'
import Pomodoro from './components/Pomodoro'
import Nature from './components/Nature'
import Crossfader from './components/Crossfader'



export default function App() {
  // Visual backgrounds list; can expand easily
  // Add new visual assets here (ensure files exist in /public)
  const visuals = ['/video.mp4', '/classical.mp4', '/VHS_Cassette_Player_Loop_Generation.mp4']
  const [visualIndex, setVisualIndex] = useState(0)
  const [showLove, setShowLove] = useState(false)
  const[showNatureSounds,setShowNatureSounds]= useState(false)
  const [crossfaderValue, setCrossfaderValue] = useState(50)
  

  

  
  // Auto hide love message after a few seconds
  useEffect(() => {
    if (!showLove) return
    const t = setTimeout(() => setShowLove(false), 3000)
    return () => clearTimeout(t)
  }, [showLove])

  const cycleVisual = () => setVisualIndex(i => (i + 1) % visuals.length)

  return (
    <div className="relative min-h-full bg-bg-dark font-pixel text-glow-ui">
      <VideoBackground videoFile={visuals[visualIndex]} />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-dark/60"></div>

      {/* Top header */}
      <header className="relative z-10 flex justify-between items-start p-4 sm:p-6">
        {/* Top left - change visual button */}
        <div className="flex flex-col items-start gap-2">
          <button onClick={cycleVisual} className="player-control text-xs sm:text-sm px-3 py-1"
                  title="Change background visual">
            change visual
          </button>

          {/* ⬇️ YENİ BUTONU BURAYA EKLEYİN */}
          <button
            onClick={() => setShowNatureSounds(true)}
            className="player-control text-xs sm:text-sm px-3 py-1"
            title="Add nature sounds">
            add nature sound
          </button>

          <Nature 
            showNatureSounds={showNatureSounds} 
            setShowNatureSounds={setShowNatureSounds} 
            crossfaderValue={crossfaderValue}   // 🔹 crossfaderValue ekleme
          />
        </div>
        
        {/* Top right - social icons */}
        <div className="flex flex-col items-end gap-1 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
            <a href="https://facebook.com/radiotedu" target="_blank" rel="noreferrer" className="icon-glow">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/radiotedu" target="_blank" rel="noreferrer" className="icon-glow">
              <FaTwitter />
            </a>
            <a href="https://youtube.com/radiotedu" target="_blank" rel="noreferrer" className="icon-glow">
              <FaYoutube />
            </a>
            <button
              type="button"
              onClick={() => setShowLove(true)}
              aria-label="We love you too"
              className="icon-glow focus:outline-none"
            >
              <FaHeart />
            </button>
          </div>
          {/* Homepage button */}
          <a href="https://radiotedu.com" target="_blank" rel="noreferrer" 
             className="player-control flex items-center gap-2 text-sm"
             title="Visit RadioTEDU Homepage">
            <FaHome size={14} />
            <span className="hidden sm:inline">Home</span>
          </a>
          </div>
          {showLove && (
            <div className="mt-1 text-pink-300 text-[11px] sm:text-xs tracking-wide flex items-center gap-1 animate-pulse" style={{textShadow:'0 0 6px rgba(255,192,203,0.7)'}}>
              <span className="inline-block">we love you too!</span>
              <span className="pulse-dot">❤</span>
            </div>
          )}
          {/* Beta notice */}
          <div className="text-[11px] sm:text-sm leading-snug text-right opacity-90 max-w-[260px] font-mono">
            <span className="uppercase tracking-widest text-yellow-300 mr-2 text-[12px] sm:text-sm font-bold">beta</span>
            <div className="inline text-glow-subtle">any recommendations? send an email us! <a href="mailto:radio@tedu.edu.tr" className="underline hover:text-glow-ui">radio@tedu.edu.tr</a></div>
          </div>
        </div>
      </header>

      {/* Bottom player area */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
        <div className="mb-3 sm:mb-4 text-left flex items-center gap-3">
          <span className="text-glow-subtle text-lg sm:text-xl">radiotedu / classical</span>
          <span className="text-yellow-400 text-sm sm:text-base font-pixel animate-pulse" 
                style={{ textShadow: '0 0 8px rgba(255, 255, 0, 0.8), 0 0 16px rgba(255, 255, 0, 0.4)' }}>
            on-air
          </span>
        </div>
        <div className="mb-3 sm:mb-4">
        <Player crossfaderValue={crossfaderValue} /> {/* 🔹 crossfaderValue ekleme */}
        </div>
      </footer>

      {/* Bottom-center crossfader */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <Crossfader 
          crossfaderValue={crossfaderValue}
          setCrossfaderValue={setCrossfaderValue}
        />
      </div>

      {/* Bottom-right utilities */}
      <div className="fixed bottom-4 right-4 z-20">
        <Pomodoro />
      </div>

      {/* CRT effect overlay */}
      <div className="pointer-events-none fixed inset-0 crt"></div>
    </div>
        
      )  
    }    
