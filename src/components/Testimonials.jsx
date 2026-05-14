import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      "Isaac is one of the best producers I've had the pleasure of working with, he's hardworking, knows his craft and produces quality songs! I would highly highly recommend!",
    name: 'Aaron Marlowe',
    role: 'Recording Artist',
  },
  {
    quote:
      "It has been an absolute pleasure working with Isaac at Promethex Productions. He has fully embraced my madcap vision, no small feat, considering my artist persona is a psychedelic space pirate with a rock opera at the heart of my sound. Isaac not only makes room for that wild energy in co-production and mastering, but does so with remarkable ease. He listens deeply, stays in lockstep with the vision, and makes me feel truly heard and seen.",
    name: 'Alan Hatcher',
    role: 'Ghostship Groggy',
  },
  {
    quote:
      "This industry is pertinent on building and maintaining close friendships while merging creativity. Isaac Middendorf has been living proof of this narrative for me both musically & personally. He is a man who stands on business & delivers top tier production & mixes at very reasonable prices. His vision for music & sonic pallet never falls short of how he sees life, and that's what I admire most about working with him on a consistent basis.",
    name: 'Grant Bentinganan',
    role: 'Studio & Touring Drummer',
  },
  {
    quote:
      "Isaac has a great ear for music and is super creative! He makes the whole production process easy and fun, and he always finds a way to bring my song ideas to life in the best way.",
    name: 'Emilly Surak',
    role: 'Recording Artist',
  },
  {
    quote:
      "He is supportive, a genuine soul, and works hard to reach for the stars in his music to help artists. I couldn't have asked for a better producer. I feel God blessed me with crossing paths with Isaac.",
    name: 'Gemma Madrid',
    role: 'Recording Artist',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDragging = useRef(false)
  const lastSwipeTime = useRef(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
    touchEndX.current = touchStartX.current
    isDragging.current = true
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 10000)
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    handleTouchStart(e)
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    handleTouchMove(e)
  }

  const handleMouseUp = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    handleTouchEnd()
  }

  const handleWheel = (e) => {
    // Only handle horizontal swipes
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    
    const now = Date.now()
    const cooldownPeriod = 800 // 800ms between swipes
    
    // Check if enough time has passed since last swipe
    if (now - lastSwipeTime.current < cooldownPeriod) return
    
    // Require more deliberate swipe (higher threshold)
    if (e.deltaX > 20) {
      // Swipe left (next)
      nextSlide()
      lastSwipeTime.current = now
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 10000)
    } else if (e.deltaX < -20) {
      // Swipe right (previous)
      prevSlide()
      lastSwipeTime.current = now
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 10000)
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 10000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="py-28 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            What Artists <span className="text-gradient">Are Saying</span>
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Testimonial Cards */}
          <div 
            className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 p-8 md:p-12"
                >
                  <div className="relative p-8 rounded-2xl border border-white/5 bg-[#0f0f0f] h-full flex flex-col">
                    <div className="absolute top-0 left-8 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent" />
                    <Quote size={28} className="text-blue-600/40 mb-4 shrink-0" />
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic flex-grow">
                      "{t.quote}"
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <p className="text-white font-semibold text-base">{t.name}</p>
                      <p className="text-gray-500 text-sm mt-0.5 uppercase tracking-wide">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-200 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-200 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-blue-500 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
