import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/assets/0CD2A627-A6B3-45A8-9654-63FE1F3B055C_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/4E10AF4F-B4A7-43D5-B760-77EE5E91866B_1_201_a.jpeg', alt: 'Studio photo' },
  { src: '/assets/57D958D9-F337-49AA-8BCF-828E4A7C3689_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/75A26BB0-145A-463C-8E48-4096A4A0E96A_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/919A00E0-8C75-4BFA-B251-FDF35409D550_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/9497AD25-D344-4D01-8B19-E5B9A3D30190_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/17701CC3-3D7E-4215-851F-0DD08487BCB2_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/24596766-F5A5-4F10-B1DD-ADFA823C3275_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/AF3FBF1E-ECF5-490F-A3D3-9A284CCA95DA_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/C04CFD36-B035-41DE-AADB-19B42B689C93_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/CEBD0474-EED8-4693-8E49-2EBEF8FA1A5A_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/D4F15824-08D2-49D7-8D34-FA45DCDD1550_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/D7458BE8-BE3A-4363-9933-544C6838D73C_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/DB241713-B069-463F-A994-DF4F41BE343A_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/E3863FCC-D28D-4FC0-9F59-C50BB98F3293_1_105_c.jpeg', alt: 'Studio photo' },
  { src: '/assets/IMG_7319.jpeg', alt: 'Studio photo' },
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const openLightbox = (index) => {
    setActivePhoto(index)
    setLightboxOpen(true)
  }

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  // Handle touch/swipe events for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // minimum distance for a swipe

    if (diff > minSwipeDistance) {
      // Swiped left, go to next photo
      nextPhoto()
    } else if (diff < -minSwipeDistance) {
      // Swiped right, go to previous photo
      prevPhoto()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section id="gallery" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">The Studio</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Where Music<br />
            <span className="text-gradient">Comes to Life</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            A look inside Promethex Productions — designed for creativity, built for quality.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="relative rounded-xl overflow-hidden aspect-square border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Button */}
          <button 
            className="absolute left-6 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all hidden md:block"
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
          >
            <ChevronLeft size={48} />
          </button>

          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Image */}
          <img 
            src={photos[activePhoto].src} 
            alt={photos[activePhoto].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          {/* Photo Counter */}
          <div className="absolute bottom-6 text-white/60 text-sm">
            {activePhoto + 1} / {photos.length}
          </div>

          {/* Next Button */}
          <button 
            className="absolute right-6 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all hidden md:block"
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
          >
            <ChevronRight size={48} />
          </button>

          {/* Mobile swipe hint */}
          <div className="absolute bottom-16 text-white/40 text-xs md:hidden">
            Swipe to navigate
          </div>
        </div>
      )}
    </section>
  )
}
