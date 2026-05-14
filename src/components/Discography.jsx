import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const tracks = [
  {
    title: 'Everytime',
    artist: 'Selah Butcher',
    role: 'Producer / Mixer / Mastering',
    genre: 'Pop',
    audioUrl: '/assets/everytime.mp3',
    artwork: '/assets/shared-artwork.png',
  },
  {
    title: 'Pa (For Emmy)',
    artist: 'Sara Reyne',
    role: 'Producer / Mixer / Mastering',
    genre: 'Singer/Songwriter',
    audioUrl: '/assets/pa-for-emmy.mp3',
    artwork: '/assets/pa-for-emmy-artwork.png',
  },
  {
    title: 'Past Tense',
    artist: 'Selah Butcher',
    role: 'Producer / Mixer / Mastering',
    genre: 'Singer/Songwriter',
    audioUrl: '/assets/past-tense.mp3',
    artwork: '/assets/shared-artwork.png',
  },
  {
    title: 'Fire and Blood',
    artist: 'PiPELLA',
    role: 'Producer / Mixer / Mastering',
    genre: 'Cinematic',
    audioUrl: '/assets/fire-and-blood.mp3',
    artwork: '/assets/fire-and-blood-artwork.png',
  },
  {
    title: 'Blush (The Crush Song)',
    artist: 'Emily Grace',
    role: 'Producer / Mixer / Mastering',
    genre: 'Pop',
    audioUrl: '/assets/blush-the-crush-song.mp3',
    artwork: '/assets/blush-artwork.png',
  },
  {
    title: 'Blood on the Bottom Line',
    artist: 'Aaron Marlowe',
    role: 'Producer / Mixer / Mastering',
    genre: 'Rock',
    audioUrl: '/assets/blood-on-the-bottom-line.mp3',
    artwork: '/assets/blood-on-the-bottom-line-artwork.png',
  },
  {
    title: 'Seventeen',
    artist: 'Selah Butcher',
    role: 'Producer / Mixer / Mastering',
    genre: 'Singer/Songwriter',
    audioUrl: '/assets/seventeen.mp3',
    artwork: '/assets/shared-artwork.png',
  },
  {
    title: 'Small Town',
    artist: 'Victoria Barral',
    role: 'Production / Guitars',
    genre: 'Pop',
    audioUrl: '/assets/small-town.mp3',
    artwork: '/assets/small-town-artwork.png',
  },
  {
    title: 'Loving You',
    artist: 'Johnny Hawley',
    role: 'Producer / Mixer / Mastering',
    genre: 'Singer/Songwriter',
    audioUrl: '/assets/loving-you.mp3',
    artwork: '/assets/loving-you-artwork.png',
  },
  {
    title: 'Ride The Wave (WAVYS 2024)',
    artist: 'PiPELLA',
    role: 'Producer / Mixer / Mastering',
    genre: 'Pop',
    audioUrl: '/assets/ride-the-wave.mp3',
    artwork: '/assets/ride-the-wave-artwork.png',
  },
  {
    title: 'Queen of West Coast',
    artist: 'Navy Pier',
    role: 'Producer / Mixer / Mastering',
    genre: 'Rock',
    audioUrl: '/assets/queen-of-west-coast.mp3',
    artwork: '/assets/queen-of-west-coast-artwork.png',
  },
]

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function TrackCard({ track, index, currentPlayingIndex, setCurrentPlayingIndex }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const isCurrentlyPlaying = currentPlayingIndex === index && isPlaying

  const togglePlay = () => {
    if (audioRef.current) {
      if (isCurrentlyPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        setCurrentPlayingIndex(null)
      } else {
        setCurrentPlayingIndex(index)
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentPlayingIndex(null)
    setCurrentTime(0)
  }

  useEffect(() => {
    if (currentPlayingIndex !== index && isPlaying && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [currentPlayingIndex, index, isPlaying])

  return (
    <div className="shrink-0 w-72 rounded-2xl overflow-hidden border border-white/5 bg-[#111] flex flex-col">
      <div className="relative h-40 bg-black">
        <img
          src={track.artwork}
          alt={`${track.title} artwork`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform">
            {isCurrentlyPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </div>
        </button>
        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      </div>
      
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-8">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #374151 ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
          <span className="text-xs text-gray-500 w-8 text-right">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="p-4 pt-2">
        <p className="text-white font-semibold text-sm truncate">{track.title}</p>
        <p className="text-gray-400 text-xs mt-0.5">{track.artist}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-medium whitespace-nowrap">
            {track.role}
          </span>
          <span className="inline-block px-2 py-0.5 rounded-full bg-purple-600/15 border border-purple-500/20 text-purple-400 text-xs font-medium whitespace-nowrap">
            {track.genre}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Discography() {
  const scrollRef = useRef(null)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  return (
    <section id="work" className="py-28 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Discography</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Songs We've <span className="text-gradient">Worked On</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg text-base leading-relaxed">
              A growing catalog of records produced, mixed, and mastered at Promethex Productions.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tracks.map((track, i) => (
            <TrackCard 
              key={i} 
              track={track} 
              index={i} 
              currentPlayingIndex={currentPlayingIndex}
              setCurrentPlayingIndex={setCurrentPlayingIndex}
            />
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8 italic">
          More tracks coming soon — reach out to hear samples of our work.
        </p>
      </div>
    </section>
  )
}
