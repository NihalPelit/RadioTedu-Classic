/**
 * Validator Utilities
 * Input validasyon ve kontrol fonksiyonları
 */

/**
 * Sayının belirli bir aralıkta olup olmadığını kontrol eder
 * @param {number} value - Kontrol edilecek değer
 * @param {number} min - Minimum değer
 * @param {number} max - Maksimum değer
 * @returns {boolean}
 */
export function isInRange(value, min, max) {
  return value >= min && value <= max
}

/**
 * Volume değerinin geçerli olup olmadığını kontrol eder
 * @param {number} volume - Volume değeri
 * @returns {boolean}
 */
export function isValidVolume(volume) {
  return typeof volume === 'number' && isInRange(volume, 0, 1)
}

/**
 * Yüzde değerinin geçerli olup olmadığını kontrol eder
 * @param {number} percentage - Yüzde değeri
 * @returns {boolean}
 */
export function isValidPercentage(percentage) {
  return typeof percentage === 'number' && isInRange(percentage, 0, 100)
}

/**
 * URL'in geçerli olup olmadığını kontrol eder
 * @param {string} url - URL string
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Email adresinin geçerli olup olmadığını kontrol eder
 * @param {string} email - Email adresi
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * String'in boş olup olmadığını kontrol eder
 * @param {string} str - String
 * @returns {boolean}
 */
export function isEmpty(str) {
  return !str || str.trim().length === 0
}

/**
 * Değerin number olup olmadığını kontrol eder
 * @param {any} value - Kontrol edilecek değer
 * @returns {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * Audio format'ının geçerli olup olmadığını kontrol eder
 * @param {string} filename - Dosya adı
 * @returns {boolean}
 */
export function isValidAudioFile(filename) {
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac']
  return audioExtensions.some(ext => filename.toLowerCase().endsWith(ext))
}

/**
 * Video format'ının geçerli olup olmadığını kontrol eder
 * @param {string} filename - Dosya adı
 * @returns {boolean}
 */
export function isValidVideoFile(filename) {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
  return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext))
}

/**
 * Pozitif tam sayı olup olmadığını kontrol eder
 * @param {any} value - Kontrol edilecek değer
 * @returns {boolean}
 */
export function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0
}

/**
 * Object'in boş olup olmadığını kontrol eder
 * @param {Object} obj - Object
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * Array'in boş olup olmadığını kontrol eder
 * @param {Array} arr - Array
 * @returns {boolean}
 */
export function isEmptyArray(arr) {
  return Array.isArray(arr) && arr.length === 0
}

/**
 * Value'nun null veya undefined olup olmadığını kontrol eder
 * @param {any} value - Kontrol edilecek değer
 * @returns {boolean}
 */
export function isNullOrUndefined(value) {
  return value === null || value === undefined
}

/**
 * Crossfader değerinin geçerli olup olmadığını kontrol eder
 * @param {number} value - Crossfader değeri
 * @returns {boolean}
 */
export function isValidCrossfaderValue(value) {
  return isValidPercentage(value)
}

/**
 * Timer süresinin geçerli olup olmadığını kontrol eder (dakika cinsinden)
 * @param {number} minutes - Dakika
 * @returns {boolean}
 */
export function isValidTimerDuration(minutes) {
  return isPositiveInteger(minutes) && minutes <= 180 // Max 3 saat
}