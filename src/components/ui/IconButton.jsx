/**
 * IconButton Component
 * Yeniden kullanılabilir icon buton component'i
 */

import React from 'react'

export default function IconButton({
  icon: Icon,
  onClick,
  active = false,
  disabled = false,
  size = 14,
  className = '',
  title,
  ariaLabel,
  variant = 'default' // 'default' | 'control' | 'nature-close'
}) {
  const variantClasses = {
    default: 'player-control',
    control: 'control-btn',
    'nature-close': 'nature-close-btn',
    'icon-btn': 'icon-btn'
  }

  const buttonClass = variantClasses[variant] || 'player-control'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${active ? 'active' : ''} ${className}`}
      title={title}
      aria-label={ariaLabel || title}
    >
      {typeof Icon === 'function' ? <Icon size={size} /> : Icon}
    </button>
  )
}