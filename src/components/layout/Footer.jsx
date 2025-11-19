/**
 * Footer Component
 * Alt kısım - copyright bilgisi ve sosyal medya linkleri
 */

import React from 'react'
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="footer-copyright">
      <div className="footer-content">
        {/* Copyright Text - Left */}
        <p className="footer-text">
          RadioTEDU bir TED Üniversitesi kuruluşudur. © Copyright {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}