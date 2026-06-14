import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkflowTrack from '../components/WorkflowTrack'
import ClientLogoCloud from '../components/ClientLogoCloud'
import { Factory, FlaskConical, HardHat } from 'lucide-react'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const GALLERY = [
  { src: '/assets/gallery-1.jpg', title: 'On-Site Descaling Operation', desc: 'Precision chemical treatment at sugar factory evaporators' },
  { src: '/assets/gallery-2.jpg', title: 'Chemical Blending Facility', desc: 'State-of-the-art mixing and formulation laboratory' },
  { src: '/assets/gallery-3.jpg', title: 'Heat Exchangers', desc: 'Post-treatment metallic surfaces with zero erosion' },
  { src: '/assets/gallery-4.jpg', title: 'Specialist Team Deployment', desc: 'Trained maintenance engineers at industrial facility' },
]

export default function Home() {
  const introRef = useRef(null)
  const logoRef = useRef(null)
  const heroRef = useRef(null)
  const watermarkRef = useRef(null)
  const heroContentRef = useRef(null)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const actionsRef = useRef(null)
  const parallaxRef = useRef(null)
  const parallaxLogoRef = useRef(null)
  const parallaxCardsRef = useRef([])
  const metricsRef = useRef([])
  const galleryRef = useRef([])
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // --- Intro Sequence ---
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true)
        document.body.style.overflow = ''
        window.__lenis?.start()
        ScrollTrigger.refresh()
      }
    })

    tl.fromTo(logoRef.current,
      { scale: 1.8, rotate: -10, filter: 'blur(18px)', opacity: 0 },
      { scale: 1, rotate: 0, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    .to(logoRef.current,
      { scale: 1.08, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      '-=0.25'
    )
    .to({}, { duration: 0.35 })
    // Fade out intro overlay
    .to(introRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        if (introRef.current) {
          introRef.current.style.display = 'none'
        }
      }
    })

    return () => { 
      tl.kill()
      document.body.style.overflow = '' 
      window.__lenis?.start()
    }
  }, [])

  // --- Hero Entrance & Parallax ---
  useEffect(() => {
    if (!introComplete) return

    const ctx = gsap.context(() => {
      // Hero content entrance
      const heroTl = gsap.timeline()
      heroTl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')

      // Set initial states
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, actionsRef.current], { y: 30 })

      // Parallax: watermark tilts back in 3D perspective and casts glowing green/orange brand shadows
      gsap.to(watermarkRef.current, {
        transform: 'translate3d(-50%, -50%, -150px) rotateX(28deg) rotateY(-18deg)',
        opacity: 0.16,
        filter: 'drop-shadow(25px 25px 50px rgba(18,200,62,0.22)) drop-shadow(-25px -25px 50px rgba(255,144,0,0.18))',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Hero content moves up faster (parallax separation)
      gsap.to(heroContentRef.current, {
        y: -120,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      gsap.fromTo(parallaxLogoRef.current,
        { y: 110, scale: 0.82, rotate: -18, opacity: 0.35 },
        {
          y: -120,
          scale: 1.15,
          rotate: 16,
          opacity: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      parallaxCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 120 + i * 24, opacity: 0, scale: 0.92 },
          {
            y: -40 - i * 26,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxRef.current,
              start: 'top 82%',
              end: 'bottom 22%',
              scrub: true,
            },
          }
        )
      })

      // Metrics entrance
      metricsRef.current.forEach((metric, i) => {
        if (!metric) return
        gsap.fromTo(metric,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: metric,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Gallery items — swing-in on viewport entry
      galleryRef.current.forEach((item) => {
        if (!item) return
        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => item.classList.add('home-gallery__item--visible'),
          once: true,
        })
      })
    })

    return () => ctx.revert()
  }, [introComplete])

  return (
    <div className="page-transition-enter">
      {/* Intro Overlay */}
      <div ref={introRef} className="home-intro" aria-hidden="true">
        <img
          ref={logoRef}
          src="/assets/logo.png"
          alt="Induspic Engineers Logo"
          className="home-intro__logo"
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="home-hero" id="hero">
        <img
          ref={watermarkRef}
          src="/assets/logo.png"
          alt=""
          className="home-hero__watermark"
          aria-hidden="true"
        />
        <div ref={heroContentRef} className="home-hero__content">
          <div ref={badgeRef} className="home-hero__badge">
            <span className="home-hero__badge-dot" />
            Chemicals Division — Established 2013
          </div>
          <h1 ref={titleRef} className="home-hero__title">
            Precision Industrial{' '}
            <span className="text-gradient-green">Descaling</span>{' '}
            & Water Treatment{' '}
            <span className="text-gradient-green">Solutions</span>
          </h1>
          <p ref={subtitleRef} className="home-hero__subtitle">
            Elite turnkey descaling contractors specializing in removing soft and hard scale 
            with a near <strong>0% erosion index</strong> on parent metals. Trusted by South India's 
            leading sugar mills, distilleries, and industrial facilities.
          </p>
          <div ref={actionsRef} className="home-hero__actions">
            <Link to="/solutions" className="btn btn-primary" id="hero-cta-solutions">
              Explore Solutions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/contact" className="btn btn-secondary" id="hero-cta-contact">
              Request Assessment
            </Link>
          </div>
        </div>
      </section>

      <section className="home-welcome" id="welcome">
        <div className="home-welcome__heading">
          <span>Welcome to</span>
          <h2>Induspic Engineers <strong>Chemicals Division</strong></h2>
        </div>
        <div className="home-welcome__body">
          <p>
            We at Induspic Engineers are leading turnkey contractors for descaling
            sugar mill industrial equipment such as rising film and falling film
            evaporators, boilers, ferrous and non-ferrous heat exchangers, steam
            and water steel pipes, reactor vessels, kettles, steam jacketed
            equipment, steam turbines, radiators, pan floor equipment, condensers,
            arc furnaces, continuous casting machines, cement plant pipelines,
            coils and injection moulding machines.
          </p>
          <p>
            Induspic Engineers blends chemical products specially developed to
            remove both soft scale and hard scale. Our passivation chemicals can
            be used along with descaling chemicals to passivate the surface and
            form a thin film coating from inside. Our compounds help enhance
            system performance by removing scales and undesired deposits across
            sugar mills, ice plants, agro products, pharmaceuticals and other
            industrial segments.
          </p>
        </div>
      </section>

      <section ref={parallaxRef} className="home-parallax" id="chemical-parallax">
        <div className="home-parallax__stage" aria-hidden="true">
          <img ref={parallaxLogoRef} src="/assets/logo.png" alt="" className="home-parallax__logo" />
          <span className="home-parallax__rail home-parallax__rail--one" />
          <span className="home-parallax__rail home-parallax__rail--two" />
        </div>
        <div className="home-parallax__content">
          <h2>From scale deposit to restored industrial flow</h2>
          <p>
            Our chemical treatment teams move from inspection to circulation,
            neutralization and safe handover with controlled chemistry for boilers,
            evaporators, chillers, heat exchangers and plant utility lines.
          </p>
        </div>
        <div className="home-parallax__cards">
          {['Inspect', 'Descale', 'Neutralize'].map((label, i) => (
            <div
              key={label}
              className="home-parallax__card interactive-tilt-card"
              ref={(el) => (parallaxCardsRef.current[i] = el)}
            >
              <strong>{label}</strong>
              <span>{['Survey scale thickness', 'Circulate chemical blend', 'Flush and protect metal'][i]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="home-clients relative z-20" id="clients">
        <ClientLogoCloud />
      </section>
      <section className="home-metrics" id="metrics">
        <div className="home-metrics__grid">
          <div className="home-metric" ref={(el) => (metricsRef.current[0] = el)}>
            <span className="home-metric__icon"><Factory size={32} className="text-primary-catalyst" /></span>
            <div className="home-metric__value">Est. 2013</div>
            <div className="home-metric__label">Years of Industrial Excellence in Bengaluru</div>
          </div>
          <div className="home-metric" ref={(el) => (metricsRef.current[1] = el)}>
            <span className="home-metric__icon"><FlaskConical size={32} className="text-primary-catalyst" /></span>
            <div className="home-metric__value">50,000+</div>
            <div className="home-metric__label">Carboys of Chemical Solutions Dispatched</div>
          </div>
          <div className="home-metric" ref={(el) => (metricsRef.current[2] = el)}>
            <span className="home-metric__icon"><HardHat size={32} className="text-primary-catalyst" /></span>
            <div className="home-metric__value">26–30+</div>
            <div className="home-metric__label">On-Site Maintenance Specialists Deployed</div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <WorkflowTrack />

      {/* Gallery Section */}
      <section className="home-gallery" id="gallery">
        <div className="home-gallery__title">
          <h2>On-Site <span>Operations</span></h2>
        </div>
        <p className="home-gallery__subtitle">
          A glimpse into our precision chemical treatment operations across industrial facilities.
        </p>
        <div className="home-gallery__grid">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className="home-gallery__item"
              ref={(el) => (galleryRef.current[i] = el)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="home-gallery__img"
                loading={i > 1 ? 'lazy' : 'eager'}
              />
              <div className="home-gallery__overlay">
                <h4>{img.title}</h4>
                <p>{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
