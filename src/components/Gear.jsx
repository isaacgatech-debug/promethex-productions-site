import React, { useState } from 'react'

const photos = [
  { src: '/assets/studio-main.jpg', alt: 'Main studio setup with monitors and workstation' },
  { src: '/assets/gear-rack.jpg', alt: 'Analog rack gear — Furman, SCL2, Grace Design' },
  { src: '/assets/vocal-booth.jpg', alt: 'Condenser microphone in vocal booth' },
  { src: '/assets/drums-room.jpg', alt: 'Drum room with full kit and overhead mics' },
  { src: '/assets/control-room.jpg', alt: 'Promethex Productions control room' },
]

const gearList = [
  { category: 'Monitors', items: ['KRK Rokit Studio Monitors (x2 pairs)'] },
  { category: 'Outboard Gear', items: ['Furman Power Conditioner', 'SCL2 Stereo Compressor/Limiter', 'Grace Design Preamp', 'Parametric EQ Rack Unit'] },
  { category: 'Microphones', items: ['Large-Diaphragm Condenser Mic', 'Dynamic Microphones', 'Overhead Drum Mics'] },
  { category: 'Instruments', items: ['Full Drum Kit (Pearl)', 'Electric Guitars', 'Bass Guitar', 'MIDI Keyboard / Synth'] },
  { category: 'Software', items: ['Ableton Live (DAW)', 'Industry-Standard Plugin Suite'] },
  { category: 'Acoustics', items: ['Full Acoustic Treatment', 'Foam Panels & Bass Traps', 'Isolated Tracking Room'] },
]

export default function Gear() {
  const [activePhoto, setActivePhoto] = useState(0)

  return (
    <section id="gear" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">The Studio</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Professional Gear,<br />
            <span className="text-gradient">Professional Results</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Every piece of equipment in our studio was chosen to serve the music — from the acoustic treatment to the analog outboard chain.
          </p>
        </div>

        {/* Photo gallery */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-white/5 mb-4" style={{ height: '480px' }}>
            <img
              src={photos[activePhoto].src}
              alt={photos[activePhoto].alt}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 text-white/60 text-sm">{photos[activePhoto].alt}</p>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all duration-200 ${
                  activePhoto === i ? 'border-blue-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Gear list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gearList.map((section) => (
            <div
              key={section.category}
              className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-blue-500/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{section.category}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
