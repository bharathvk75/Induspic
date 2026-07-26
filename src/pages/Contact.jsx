import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { getAssetPath } from '../utils/assetPath'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, User, Phone, Map, IdCard, Mail, CheckCircle2, Factory, Copy, Check, X, Send } from 'lucide-react'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_INFO = [
  {
    icon: <MapPin className="text-primary-catalyst" size={24} />,
    title: 'Corporate Headquarters',
    lines: [
      '#11 Geddalahalli Village, Hennur Main Road,',
      'Kalyan Nagar Post, Bangalore, Karnataka, 560043, India',
    ],
    action: { label: 'View on Maps', url: 'https://maps.app.goo.gl/4TsZwD8hX1V3Jnhu7', icon: <Map size={16} /> },
  },
  {
    icon: <User className="text-primary-catalyst" size={24} />,
    title: 'Management',
    lines: [
      { type: 'image', url: '/assets/Profile1.png' },
      'Mr. Anbu Soman', 
      'Managing Director'
    ],
    action: { label: 'View Profile', url: '#profileModal', icon: <IdCard size={16} /> },
  },
  {
    icon: <Phone className="text-primary-catalyst" size={24} />,
    title: 'Communications',
    lines: [
      { type: 'phone', label: 'Mobile', value: '+91 9449983601' },
      { type: 'phone', label: 'Alternate', value: '+91 6363447946' },
      { type: 'email', label: 'Email', value: 'induspic@gmail.com' },
    ],
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Lock body scroll while profile modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [isModalOpen])

  // Handle Escape key to close profile modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const cardsRef = useRef([])
  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.set(heroRef.current, { opacity: 0, y: 40 })
        gsap.to(heroRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      const cards = cardsRef.current.filter(Boolean)
      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.12,
              ease: 'power3.out',
            })
          },
        })
      })

      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: () => {
            gsap.to(formRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'message') setCharacterCount(value.length)
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    
    setIsSubmitting(true)
    const btn = e.currentTarget.querySelector('.contact-submit-btn')
    if (btn) {
      gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' })
    }

    try {
      await fetch("https://formsubmit.co/ajax/induspic@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      })
      setSubmitted(true)
    } catch (error) {
      console.error(error)
      alert("Failed to send inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm({ name: '', company: '', email: '', phone: '', message: '' })
    setErrors({})
    setSubmitted(false)
    setCharacterCount(0)
  }

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.from(successRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
    }
  }, [submitted])

  return (
    <div className="contact-page page-transition-enter" id="contact-page" ref={pageRef}>
      <div className="container">
        <header className="contact-hero" ref={heroRef}>
          <span className="contact-hero__badge">Get In Touch</span>
          <h1 className="contact-hero__title">
            Let's discuss your <span className="text-gradient-green">industrial descaling</span> needs
          </h1>
          <p className="contact-hero__subtitle">
            Connect with our team of specialists for assessments, consultations,
            and chemical solutions. We respond within 24 business hours.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info">
            {CONTACT_INFO.map((info, i) => {
              const isProfileCard = info.action?.url === '#profileModal'
              return (
                <article
                  key={i}
                  className={`contact-card crystal-surface shadow-glow-crystal interactive-tilt-card${isProfileCard ? ' contact-card--clickable' : ''}`}
                  ref={(el) => (cardsRef.current[i] = el)}
                  onClick={isProfileCard ? () => setIsModalOpen(true) : undefined}
                  style={isProfileCard ? { cursor: 'pointer' } : undefined}
                >
                <div className="contact-card__header">
                  <span className="contact-card__icon">{info.icon}</span>
                  <h2 className="contact-card__title">{info.title}</h2>
                </div>
                <div className="contact-card__body">
                  {info.lines.map((line, j) => {
                    if (typeof line === 'string') {
                      return <p key={j} className="contact-card__text">{line}</p>
                    }
                    if (line.type === 'image') {
                      return (
                        <div 
                          key={j} 
                          className="contact-card__profile-img" 
                          style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-md)', cursor: 'pointer' }}
                          onClick={() => setIsModalOpen(true)}
                          title="Click to view profile details"
                        >
                          <img src={getAssetPath(line.url)} alt="Mr. Anbu Soman" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-catalyst)' }} />
                        </div>
                      )
                    }
                    return (
                      <div key={j} className="contact-card__row">
                        <span className="contact-card__row-label">{line.label}</span>
                        {line.type === 'phone' ? (
                          <a href={`tel:${line.value.replace(/\s/g, '')}`} className="contact-card__row-value">
                            {line.value}
                          </a>
                        ) : (
                          <a href={`mailto:${line.value}`} className="contact-card__row-value">
                            {line.value}
                          </a>
                        )}
                      </div>
                    )
                  })}
                  {info.action && (
                    info.action.url === '#profileModal' ? (
                      <button 
                        type="button" 
                        className="contact-card__action"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{info.action.icon}</span>
                        {info.action.label}
                      </button>
                    ) : (
                      <a href={info.action.url} className="contact-card__action" target="_blank" rel="noreferrer">
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{info.action.icon}</span>
                        {info.action.label}
                      </a>
                    )
                  )}
                </div>
              </article>
            )
          })}
          </div>

          <div className="contact-form-wrapper" ref={formRef}>
            {!submitted ? (
              <>
                <div className="contact-form-header">
                  <h2>Send an Inquiry</h2>
                  <p>Fill in the details below and our team will respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="contact-form">
                  <div className="contact-form__row">
                    <div className={`contact-form__group${errors.name ? ' has-error' : ''}`}>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        className="contact-form__input"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      <label htmlFor="contact-name" className="contact-form__label">Name *</label>
                      {errors.name && <span className="contact-form__error">{errors.name}</span>}
                    </div>
                    <div className="contact-form__group">
                      <input
                        type="text"
                        id="contact-company"
                        name="company"
                        className="contact-form__input"
                        placeholder="Company Name"
                        value={form.company}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                      <label htmlFor="contact-company" className="contact-form__label">Company</label>
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className={`contact-form__group${errors.email ? ' has-error' : ''}`}>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        className="contact-form__input"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      <label htmlFor="contact-email" className="contact-form__label">Email *</label>
                      {errors.email && <span className="contact-form__error">{errors.email}</span>}
                    </div>
                    <div className={`contact-form__group${errors.phone ? ' has-error' : ''}`}>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        className="contact-form__input"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                      <label htmlFor="contact-phone" className="contact-form__label">Phone *</label>
                      {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className={`contact-form__group${errors.message ? ' has-error' : ''}`}>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact-form__input contact-form__textarea"
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      rows="5"
                      maxLength="1000"
                    />
                    <label htmlFor="contact-message" className="contact-form__label">Message *</label>
                    <div className="contact-form__char-count">
                      <span>{characterCount}/1000</span>
                    </div>
                    {errors.message && <span className="contact-form__error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                    <Send size={20} />
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              </>
            ) : (
              <div className="contact-success" ref={successRef}>
                <div className="contact-success__icon">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Inquiry Received!</h3>
                <p>
                  Thank you for reaching out. Our specialists will review your
                  inquiry and get back to you within 24 business hours.
                </p>
                <div className="contact-success__details">
                  <div className="contact-success__detail">
                    <span>Name</span>
                    <strong>{form.name}</strong>
                  </div>
                  {form.company && (
                    <div className="contact-success__detail">
                      <span>Company</span>
                      <strong>{form.company}</strong>
                    </div>
                  )}
                  <div className="contact-success__detail">
                    <span>Email</span>
                    <strong>{form.email}</strong>
                  </div>
                  <div className="contact-success__detail">
                    <span>Phone</span>
                    <strong>{form.phone}</strong>
                  </div>
                </div>
                <button type="button" className="contact-success__btn" onClick={handleReset}>
                  <Check size={18} />
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="contact-established">
          <div className="contact-established__inner crystal-surface-light">
            <span className="contact-established__icon"><Factory size={20} /></span>
            <span>Serving Industry Since 2013</span>
            <span className="contact-established__divider" aria-hidden="true" />
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>

      {isModalOpen && createPortal(
        <div className="equipment-modal" onClick={() => setIsModalOpen(false)}>
          <div className="equipment-modal__content" onClick={e => e.stopPropagation()}>
            <button className="equipment-modal__close" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="equipment-modal__visual slideshow-container">
              <img 
                src={getAssetPath('/assets/Profile1.png')} 
                alt="Mr. Anbu Soman - Profile Preview" 
                className="slideshow-img active" 
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <span className="slideshow-badge">
                Managing Director Profile
              </span>
            </div>
            <div className="equipment-modal__info">
              <div className="equipment-modal__icon"><User size={24} /></div>
              <h2>Mr. Anbu Soman</h2>
              <p>
                Managing Director of <strong>Induspic Engineers</strong> (Chemicals Division). 
                Leading turnkey chemical descaling operations across South India since 2013 with 
                controlled chemistry, metallurgy checks, and near 0% parent-metal erosion index for 
                sugar mills, boilers, evaporators, chillers, and heavy industrial machinery.
              </p>
              <div className="equipment-modal__actions">
                <a href="tel:+919449983601" className="btn btn-primary">
                  <Phone size={16} /> Call Direct (+91 9449983601)
                </a>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}