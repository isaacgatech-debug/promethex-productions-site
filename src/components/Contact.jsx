import React, { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    // Send email via Resend API
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Failed to send message. Please try again or email us directly at promethexproductions@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-28 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Ready to Make <span className="text-gradient">Your Record?</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Reach out to book a session, ask questions, or just say hello. We'd love to hear about your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info + Map */}
          <div className="space-y-8">
            <div className="space-y-5">
              {[
                { icon: MapPin, label: 'Location', value: '931 Twin Elms Ct, Nashville, TN' },
                { icon: Mail, label: 'Email', value: 'promethexproductions@gmail.com', href: 'mailto:promethexproductions@gmail.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white font-medium hover:text-blue-400 transition-colors duration-200">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-64">
              <iframe
                title="Promethex Productions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.0!2d-86.7816!3d36.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s931+Twin+Elms+Ct%2C+Nashville%2C+TN!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 rounded-2xl border border-white/5 bg-[#0f0f0f]">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-blue-400" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setSent(false); setError(null); }}
                  className="mt-6 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 text-sm mb-4">
                    {error}
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#222] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#222] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2" htmlFor="message">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="I'm working on a single and need recording + mixing..."
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-[#222] transition-all duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
