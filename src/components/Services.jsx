import React from 'react'
import { Mic2, Sliders, Disc3, Music4 } from 'lucide-react'

const services = [
  {
    icon: Music4,
    title: 'Production',
  },
  {
    icon: Mic2,
    title: 'Recording',
  },
  {
    icon: Sliders,
    title: 'Mixing',
  },
  {
    icon: Disc3,
    title: 'Mastering',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Services Built for <span className="text-gradient">Serious Artists</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Whether you're tracking your first single or finishing an album, we have the tools, space, and expertise to make it happen.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-blue-500/40 hover:bg-blue-950/10 transition-all duration-300 cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-blue-600/5 to-transparent" />
                <div className="relative text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/20 group-hover:border-blue-500/40 transition-all duration-300 mx-auto">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-base hover:opacity-90 transition-opacity duration-200 glow-blue tracking-wide"
          >
            Book a Session
          </a>
        </div>
      </div>
    </section>
  )
}
