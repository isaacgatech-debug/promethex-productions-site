import React, { useEffect, useRef } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'

export default function Hero() {
  const waveRef = useRef(null)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/57D958D9-F337-49AA-8BCF-828E4A7C3689_1_105_c.jpeg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
      {/* Blue tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-transparent" />

      {/* Animated waveform SVG */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
          />
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <MapPin size={16} className="text-blue-400" />
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
            Nashville, Tennessee
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
          Where Sound
          <br />
          <span className="text-gradient">Becomes Legacy</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Professional music production, recording, mixing, and mastering — crafted with precision in the heart of Music City.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-base hover:opacity-90 transition-all duration-200 glow-blue tracking-wide"
          >
            Book a Session
          </a>
          <a
            href="#work"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:border-blue-400 hover:text-blue-400 transition-all duration-200 tracking-wide"
          >
            Hear Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown size={24} className="text-white/40" />
      </div>
    </section>
  )
}
