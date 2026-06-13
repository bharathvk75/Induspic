import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IndiaMap from '../components/IndiaMap'
import '../components/IndiaMap.css'
import Testimonials from './testimonials'
import './OurWork.css'

gsap.registerPlugin(ScrollTrigger)

const WORK_DATA = [
  { id: 'INKA', state: 'Karnataka', short: 'KA', work: 18, sector: 'Manufacturing & Sugar', note: 'Bengaluru base with sugar mills, engineering plants and cold storage support.', fact: 'Scale Fact: Recurring cooling-line scale reduces heat rejection and increases pump load.', chemical: 'DC, DCQ, NC and cooling-line treatment chemicals', companies: 12, color: '#0E8724' },
  { id: 'INTN', state: 'Tamil Nadu', short: 'TN', work: 12, sector: 'Sugar & Distillery', note: 'Sugar, distillery, evaporator and heat exchanger descaling work.', fact: 'Scale Fact: Evaporator scale can reduce heat transfer before flow is visibly blocked.', chemical: 'Evaporator, boiler and distillery descaling support', companies: 8, color: '#E67F0A' },
  { id: 'INKL', state: 'Kerala', short: 'KL', work: 1, sector: 'Cold Systems', note: 'Coastal process plants, chillers and industrial utilities.', fact: 'Scale Fact: Condenser cleanliness directly affects refrigeration compressor load.', chemical: 'Chiller, condenser and utility loop cleaning', companies: 2, color: '#81CDD7' },
  { id: 'INAP', state: 'Andhra Pradesh', short: 'AP', work: 4, sector: 'Sugar & Utilities', note: 'Boilers, cooling loops and plant maintenance support.', fact: 'Scale Fact: Boiler scale acts like insulation and increases fuel demand.', chemical: 'Boiler and heat-exchanger descaling formulations', companies: 4, color: '#0E8724' },
  { id: 'INTG', state: 'Telangana', short: 'TS', work: 2, sector: 'Industrial Utilities', note: 'Industrial boilers, reactors and line flushing support.', fact: 'Scale Fact: Neutralization after descaling protects downstream metallurgy.', chemical: 'Line flushing, neutralization and reactor cleaning', companies: 2, color: '#81CDD7' },
  { id: 'INMH', state: 'Maharashtra', short: 'MH', work: 3, sector: 'Sugar & Power', note: 'Sugar factories, power auxiliaries and treatment chemicals.', fact: 'Scale Fact: Controlled circulation gives chemicals fresh contact with scale surfaces.', chemical: 'Bulk HDPE can dispatch and onsite circulation', companies: 3, color: '#E67F0A' },
  { id: 'INGJ', state: 'Gujarat', short: 'GJ', work: 2, sector: 'Chemical Processing', note: 'Chemical supply and non-ferrous cleaning applications.', fact: 'Scale Fact: Copper and aluminium alloys need gentler chemistry than carbon steel.', chemical: 'Non-ferrous safe DCS and general cleaning blends', companies: 2, color: '#0E8724' },
  { id: 'INRJ', state: 'Rajasthan', short: 'RJ', work: 1, sector: 'Industrial Supply', note: 'Industrial treatment chemical dispatch coverage.', fact: 'Scale Fact: High-TDS water can speed deposit formation in hot utility loops.', chemical: 'Chemical supply for industrial utility maintenance', companies: 1, color: '#E67F0A' },
  { id: 'INMP', state: 'Madhya Pradesh', short: 'MP', work: 1, sector: 'Boilers & Exchangers', note: 'Boiler, exchanger and process equipment descaling.', fact: 'Scale Fact: Passivation helps create a protective surface film after cleaning.', chemical: 'Boiler tube and exchanger descaling chemistry', companies: 1, color: '#81CDD7' },
  { id: 'INOR', state: 'Odisha', short: 'OD', work: 1, sector: 'Plant Utilities', note: 'Plant utility cleaning and corrosion-safe maintenance.', fact: 'Scale Fact: Flushing removes loosened deposits before systems return to service.', chemical: 'Descaling, flushing and neutralizing compounds', companies: 1, color: '#0E8724' },
  { id: 'INWB', state: 'West Bengal', short: 'WB', work: 1, sector: 'Chemical Supply', note: 'Eastern dispatch support for treatment formulations.', fact: 'Scale Fact: A small heat-exchanger fouling layer can create a large thermal penalty.', chemical: 'Chemical supply and remote process guidance', companies: 1, color: '#E67F0A' },
  { id: 'INUP', state: 'Uttar Pradesh', short: 'UP', work: 1, sector: 'Sugar & Boiler', note: 'Sugar and boiler descaling support for northern plants.', fact: 'Scale Fact: Juice heater deposits are a frequent sugar plant efficiency bottleneck.', chemical: 'Sugar mill and boiler descaling chemical supply', companies: 2, color: '#0E8724' },
  { id: 'INPB', state: 'Punjab', short: 'PB', work: 1, sector: 'Chemical Dispatch', note: 'Northern India chemical supply coverage.', fact: 'Scale Fact: Descaling chemistry is selected by scale type, metal and circulation path.', chemical: 'HDPE can chemical dispatch for utility systems', companies: 1, color: '#81CDD7' },
  { id: 'INAS', state: 'Assam', short: 'AS', work: 1, sector: 'Technical Support', note: 'Northeast supply and technical consultation coverage.', fact: 'Scale Fact: Pre-cleaning inspection reduces unnecessary chemical exposure time.', chemical: 'Chemical treatment supply with application guidance', companies: 1, color: '#E67F0A' },
]

const maxWork = Math.max(...WORK_DATA.map((item) => item.work))
const workDataIds = WORK_DATA.map((item) => item.id)

function getWorkItem(id) {
  return WORK_DATA.find((item) => item.id === id)
}

export default function OurWork() {
  const [activeWork, setActiveWork] = useState(WORK_DATA[0])
  const mapRef = useRef(null)
  const statsRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current?.children,
        { opacity: 0, y: 28, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.65,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
          },
        }
      )
    }, mapRef)

    return () => ctx.revert()
  }, [])

  const totalWork = WORK_DATA.reduce((sum, item) => sum + item.work, 0)

  const handleStateClick = useCallback((id) => {
    const item = getWorkItem(id)
    if (item) setActiveWork(item)
  }, [])

  const handleStateHover = useCallback((id) => {
    const item = getWorkItem(id)
    if (item) setActiveWork(item)
  }, [])

  // Create floating particle effects
  useEffect(() => {
    if (!particlesRef.current || !activeWork) return
    const particles = particlesRef.current.querySelectorAll('.our-map__particle')
    
    particles.forEach((p, i) => {
      gsap.set(p, {
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.2 + Math.random() * 0.8,
        opacity: 0.1 + Math.random() * 0.3,
      })
      
      gsap.to(p, {
        y: `-=${30 + Math.random() * 60}`,
        x: `-=${20 + Math.random() * 40}`,
        opacity: 0,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        delay: i * 0.3,
        ease: 'power1.out',
      })
    })
  }, [activeWork])

  return (
    <main className="our-work-page page-transition-enter" id="our-work-page">
      <section className="our-work-hero container">
        <span className="our-work-hero__kicker">Our Work</span>
        <h1 className="our-work-hero__title">
          State-wise industrial work mapped from <span>client addresses</span>
        </h1>
        <p className="our-work-hero__subtitle">
          Explore Induspic Engineers' manufacturing, sugar, chemical and cold-system work across India.
          Tap or hover over states to view sector insights and chemical cleaning facts.
        </p>
      </section>

      <section className="our-work-stats" ref={statsRef}>
        <div className="container our-work-stats__grid">
          <article>
            <strong>{totalWork}</strong>
            <span>Address-linked work records</span>
          </article>
          <article>
            <strong>Majority</strong>
            <span>States Descaled</span>
          </article>
          <article>
            <strong>43+</strong>
            <span>Professional Clients</span>
          </article>
          <article>
            <strong>150+</strong>
            <span>Normal Clients</span>
          </article>
        </div>
      </section>

      <section className="container our-work-map-section">
        <div className="our-work-layout">
          <div className="our-map-panel crystal-surface-deep" ref={mapRef}>
            <div className="our-map-panel__header">
              <span>India Coverage Map</span>
              <strong className="our-map-panel__active-state">{activeWork.short}</strong>
            </div>

            <div className="our-map-stage">
              <IndiaMap
                activeId={activeWork.id}
                onStateClick={handleStateClick}
                onStateHover={handleStateHover}
                workDataIds={workDataIds}
              />
              
              <div className="our-map__particles" ref={particlesRef}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="our-map__particle" />
                ))}
              </div>
            </div>
          </div>

          <aside className="our-work-detail crystal-surface-deep">
            <div className="our-work-detail__badge" style={{ background: `linear-gradient(135deg, ${activeWork.color}, ${activeWork.color}88)` }}>
              {activeWork.short}
            </div>
            <h2>{activeWork.state}</h2>
            <p>{activeWork.note}</p>
            <div className="our-work-detail__metrics">
              <span>
                <strong>{activeWork.work}</strong>
                <span>Work records</span>
              </span>
              <span>
                <strong>{activeWork.companies}</strong>
                <span>Companies Descaled</span>
              </span>
            </div>
            <div className="our-work-detail__bar" aria-hidden="true">
              <span style={{ 
                width: `${(activeWork.work / maxWork) * 100}%`,
                background: `linear-gradient(90deg, ${activeWork.color}, ${activeWork.color}88)`,
              }} />
            </div>
            <article className="our-work-detail__fact">
              <span>{activeWork.sector} Fact</span>
              <p>{activeWork.fact}</p>
            </article>
            <article className="our-work-detail__fact our-work-detail__fact--chemical">
              <span>Chemical Support & Formulas</span>
              <p>{activeWork.chemical}</p>
            </article>
          </aside>
        </div>
      </section>

      <section className="container our-work-process">
        <span>How client addresses become smarter work planning</span>
        <h2>From location data to faster plant support</h2>
        <div className="our-work-process__grid">
          <article>
            <strong>01</strong>
            <h3>Address parsing</h3>
            <p>Client addresses are normalized into state and city context for deployment visibility.</p>
          </article>
          <article>
            <strong>02</strong>
            <h3>Sector tagging</h3>
            <p>Each work record is grouped by sugar, manufacturing, chemicals, cold systems or utilities.</p>
          </article>
          <article>
            <strong>03</strong>
            <h3>Chemistry planning</h3>
            <p>Scale type, metallurgy and circulation path guide chemical selection and safety steps.</p>
          </article>
          <article>
            <strong>04</strong>
            <h3>Field execution</h3>
            <p>Teams prepare manpower, cans, flushing and neutralization before reaching the plant.</p>
          </article>
        </div>
        <Link to="/contact" className="btn btn-primary our-work-process__cta">
          Plan Your Plant Assessment
        </Link>
      </section>

      <Testimonials />
    </main>
  )
}