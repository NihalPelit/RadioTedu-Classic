/**
 * VideoBackground Component (Refactored)
 * Video arka plan - device detection ile refactor edildi
 */

import React, { useState, useEffect, useRef } from 'react'
import { MOBILE_VIDEO } from '../../constants'
import { isMobileDevice } from '../../utils'

export default function VideoBackground({ videoFile }) {
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice())
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const src = isMobile ? MOBILE_VIDEO : videoFile

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 w-full h-full object-cover video-filter"
      src={src}
      autoPlay
      muted
      playsInline
      loop
      key={src}
    />
  )
}