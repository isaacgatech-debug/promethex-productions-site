import React from 'react'

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text - Left Side */}
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">About</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Isaac <span className="text-gradient">Middendorf</span>
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                Isaac Middendorf is a Producer, audio engineer, and multi-instrumentalist from Nashville, TN with a strong background in crafting captivating instrumentals in all genres of music.
              </p>
              <p>
                With over ten years of experience working in the Singer/Songwriter, R&B, Pop, Rock/Metal, and Orchestral genres, he has built a name for himself in the Nashville scene.
              </p>
              <p>
                He is passionate about collaboration and loves giving artists a safe space to showcase their art while giving them the freedom to shape the song as they desire.
              </p>
              <p className="text-white font-medium italic">
                I look forward to welcoming you to the Promethex Family!
              </p>
            </div>
          </div>

          {/* Photo - Right Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img 
                src="/assets/IMG_6486.jpeg" 
                alt="Isaac Middendorf" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
