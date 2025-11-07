/**
 * Formatter Utilities
 * Veri formatlama yardımcı fonksiyonları
 */

/**
 * Saniyeyi MM:SS formatına çevirir
 * @param {number} seconds - Toplam saniye
 * @returns {string} Formatlanmış zaman (örn: "05:30")
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Saniyeyi HH:MM:SS formatına çevirir
 * @param {number} seconds - Toplam saniye
 * @returns {string} Formatlanmış zaman (örn: "01:05:30")
 */
export function formatTimeWithHours(seconds) {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Sayıyı yüzde formatına çevirir
 * @param {number} value - Değer (0-1 arası)
 * @param {number} decimals - Ondalık basamak sayısı (default: 0)
 * @returns {string} Formatlanmış yüzde (örn: "75%")
 */
export function formatPercentage(value, decimals = 0) {
  const percentage = (value * 100).toFixed(decimals)
  return `${percentage}%`
}

/**
 * Büyük sayıları kısaltır (1000 → 1K)
 * @param {number} num - Sayı
 * @returns {string} Kısaltılmış sayı
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Byte'ı okunabilir formata çevirir
 * @param {number} bytes - Byte sayısı
 * @returns {string} Formatlanmış boyut (örn: "1.5 MB")
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Tarihi okunabilir formata çevirir
 * @param {Date|string|number} date - Tarih
 * @returns {string} Formatlanmış tarih
 */
export function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Zamanı okunabilir formata çevirir
 * @param {Date|string|number} date - Tarih
 * @returns {string} Formatlanmış saat
 */
export function formatClock(date) {
  const d = new Date(date)
  return d.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * String'i capitalize eder (ilk harf büyük)
 * @param {string} str - String
 * @returns {string} Capitalize edilmiş string
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * String'i truncate eder (kısaltır)
 * @param {string} str - String
 * @param {number} maxLength - Maksimum uzunluk
 * @returns {string} Kısaltılmış string
 */
export function truncate(str, maxLength = 50) {
  if (!str || str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}