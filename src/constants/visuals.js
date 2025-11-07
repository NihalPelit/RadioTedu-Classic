/**
 * Visual Constants
 * Video background dosyaları
 */

// Video dosya yolları
export const VISUAL_BACKGROUNDS = [
  import.meta.env.BASE_URL + 'video.mp4',
  import.meta.env.BASE_URL + 'classical.mp4',
  import.meta.env.BASE_URL + 'VHS_Cassette_Player_Loop_Generation.mp4'
]

// Mobil için default video
export const MOBILE_VIDEO = '/classical.mp4'

// Mobil detection threshold
export const MOBILE_WIDTH_THRESHOLD = 768