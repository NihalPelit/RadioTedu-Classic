import React, { useState, useEffect, useRef } from 'react'

const MOBILE_VIDEO = '/classical.mp4'

export default function VideoBackground({ videoFile }) {
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()) || window.innerWidth <= 768)
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
