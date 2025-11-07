/**
 * Device Detection Utilities
 * Cihaz tespiti ve responsive yardımcı fonksiyonlar
 */

/**
 * Kullanıcının mobil cihazda olup olmadığını kontrol eder
 * @returns {boolean}
 */
export function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  
  return (
    mobileRegex.test(userAgent.toLowerCase()) || 
    window.innerWidth <= 768
  )
}

/**
 * Kullanıcının tablet'te olup olmadığını kontrol eder
 * @returns {boolean}
 */
export function isTabletDevice() {
  const userAgent = navigator.userAgent.toLowerCase()
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent)
  
  return isTablet
}

/**
 * Ekran boyutunu döndürür
 * @returns {Object} { width: number, height: number, isMobile: boolean }
 */
export function getScreenSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024
  }
}

/**
 * Touch destekli cihaz mı kontrol eder
 * @returns {boolean}
 */
export function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

/**
 * Orientation değişikliklerini dinler
 * @param {Function} callback - Orientation değiştiğinde çağrılacak fonksiyon
 * @returns {Function} Cleanup fonksiyonu
 */
export function onOrientationChange(callback) {
  const handleOrientationChange = () => {
    const orientation = window.screen?.orientation?.type || 
                       (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')
    callback(orientation)
  }

  window.addEventListener('orientationchange', handleOrientationChange)
  window.addEventListener('resize', handleOrientationChange)

  return () => {
    window.removeEventListener('orientationchange', handleOrientationChange)
    window.removeEventListener('resize', handleOrientationChange)
  }
}

/**
 * iOS cihazı mı kontrol eder
 * @returns {boolean}
 */
export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

/**
 * Android cihazı mı kontrol eder
 * @returns {boolean}
 */
export function isAndroid() {
  return /Android/.test(navigator.userAgent)
}

/**
 * Safari tarayıcısı mı kontrol eder
 * @returns {boolean}
 */
export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

/**
 * Cihaz bilgilerini döndürür
 * @returns {Object}
 */
export function getDeviceInfo() {
  return {
    isMobile: isMobileDevice(),
    isTablet: isTabletDevice(),
    isTouch: isTouchDevice(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isSafari: isSafari(),
    screenSize: getScreenSize()
  }
}