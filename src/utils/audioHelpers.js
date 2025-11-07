/**
 * Audio Helper Functions
 * Audio ile ilgili yardımcı fonksiyonlar ve hesaplamalar
 */

/**
 * Volume değerini normalize eder (0-1 arası)
 * @param {number} volume - Volume değeri (0-100 veya 0-1)
 * @returns {number} Normalize edilmiş volume (0-1)
 */
export function normalizeVolume(volume) {
  if (volume > 1) {
    // 0-100 arası geliyorsa 0-1'e çevir
    return Math.min(Math.max(volume / 100, 0), 1)
  }
  // Zaten 0-1 arası
  return Math.min(Math.max(volume, 0), 1)
}

/**
 * Volume değerini yüzdeye çevirir
 * @param {number} volume - Volume değeri (0-1)
 * @returns {number} Yüzde değeri (0-100)
 */
export function volumeToPercentage(volume) {
  return Math.round(volume * 100)
}

/**
 * Yüzde değerini volume'e çevirir
 * @param {number} percentage - Yüzde değeri (0-100)
 * @returns {number} Volume değeri (0-1)
 */
export function percentageToVolume(percentage) {
  return Math.min(Math.max(percentage / 100, 0), 1)
}

/**
 * İki volume değerini crossfade eder
 * @param {number} volume1 - İlk ses seviyesi (0-1)
 * @param {number} volume2 - İkinci ses seviyesi (0-1)
 * @param {number} crossfadePosition - Crossfade pozisyonu (0-100)
 * @returns {Object} { volume1: number, volume2: number }
 */
export function crossfadeVolumes(volume1, volume2, crossfadePosition) {
  const position = Math.min(Math.max(crossfadePosition, 0), 100)
  
  return {
    volume1: volume1 * ((100 - position) / 100),
    volume2: volume2 * (position / 100)
  }
}

/**
 * Audio element'in hazır olup olmadığını kontrol eder
 * @param {HTMLAudioElement} audio - Audio element
 * @returns {boolean}
 */
export function isAudioReady(audio) {
  return audio && audio.readyState >= 2 // HAVE_CURRENT_DATA
}

/**
 * Audio formatının desteklenip desteklenmediğini kontrol eder
 * @param {string} mimeType - MIME type (örn: 'audio/mpeg')
 * @returns {boolean}
 */
export function isAudioFormatSupported(mimeType) {
  const audio = document.createElement('audio')
  return audio.canPlayType(mimeType) !== ''
}

/**
 * Ses dosyası yolunu BASE_URL ile birleştirir
 * @param {string} path - Dosya yolu
 * @returns {string} Tam URL
 */
export function getAudioUrl(path) {
  const baseUrl = import.meta.env.BASE_URL || '/'
  return baseUrl + path
}

/**
 * Audio element için hata mesajını formatlar
 * @param {Error} error - Hata objesi
 * @returns {string} Kullanıcı dostu hata mesajı
 */
export function formatAudioError(error) {
  if (!error) return 'Unknown audio error'
  
  if (error.name === 'NotAllowedError') {
    return 'Audio playback was blocked. Please interact with the page first.'
  }
  
  if (error.name === 'NotSupportedError') {
    return 'Audio format is not supported by your browser.'
  }
  
  if (error.name === 'AbortError') {
    return 'Audio playback was aborted.'
  }
  
  return error.message || 'Audio playback failed'
}

/**
 * Vibration API'yi güvenli şekilde kullanır
 * @param {number|number[]} pattern - Vibration pattern
 */
export function safeVibrate(pattern) {
  if (!navigator.vibrate) return false
  
  try {
    return navigator.vibrate(pattern)
  } catch (error) {
    console.warn('Vibration failed:', error)
    return false
  }
}