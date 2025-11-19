/**
 * Navbar Component
 * İki katmanlı navbar - Üstte email/sosyal medya, altta logo/menü
 */

import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import headerLogo from '../../assets/headerLogo.png'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'ANA SAYFA', href: 'https://radiotedu.com' },
    { label: 'CANLI YAYINLAR', href: 'https://radiotedu.edu.tr/canli-yayinlar' },
    { label: 'PODCASTLER', href: 'https://radiotedu.com/category/podcastler/' },
    { label: 'HABERLER', href: 'https://radiotedu.com/haberler/' },
    { label: 'MOSAIC', href: 'https://radiotedu.edu.tr/mosaic' },
    { label: 'HAKKIMIZDA', href: 'https://radiotedu.com/hakkimizda/' }
  ]

  return (
    <nav className="navbar-container">
      {/* Top Bar - Email & Social Media */}
      <div className="navbar-top-bar">
        <div className="navbar-top-content">
          {/* Email - Left */}
          <a 
            href="mailto:radio@tedu.edu.tr" 
            className="navbar-email"
          >
            <MdEmail size={16} />
            <span>radio@tedu.edu.tr</span>
          </a>

          {/* Social Media Icons - Right */}
          <div className="navbar-social-icons">
            <a 
              href="https://www.facebook.com/RADIOTEDU/?locale=tr_TR" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://x.com/RadioTEDU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-social-icon"
              aria-label="X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <a 
              href="https://www.instagram.com/radiotedu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.youtube.com/@RadioTEDU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-social-icon"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a 
              href="https://www.linkedin.com/company/radiotedu/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navbar-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - Logo & Links */}
      <div className="navbar-main">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="https://radiotedu.edu.tr" target="_blank" rel="noopener noreferrer">
              <img 
                src={headerLogo} 
                alt="RadioTEDU Logo" 
                className="h-16 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
