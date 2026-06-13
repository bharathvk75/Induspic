import { useState, useEffect, useRef, useCallback, useLayoutEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Clients.css'

gsap.registerPlugin(ScrollTrigger)
import { ClipboardList, Box, FlaskConical, Settings, Wheat, Snowflake, Microscope, Search } from 'lucide-react'

const TABS = [
  { id: 'all', label: 'All Clients', icon: <ClipboardList size={18} /> },
  { id: 'sugar', label: 'Sugar Mills', icon: <Box size={18} /> },
  { id: 'distilleries', label: 'Distilleries', icon: <FlaskConical size={18} /> },
  { id: 'engineering', label: 'Engineering', icon: <Settings size={18} /> },
  { id: 'food', label: 'Food & Agro', icon: <Wheat size={18} /> },
  { id: 'iceplants', label: 'Cold Storage', icon: <Snowflake size={18} /> },
  { id: 'other', label: 'Other Industries', icon: <Microscope size={18} /> },
]

const CLIENTS_DATA = {
  sugar: [
    { name: 'M/s Bannari Amman Sugars Ltd. Unit 1', location: 'Sathyamangalam, Tamil Nadu', detail: 'Sugar factory descaling support', sector: 'Sugar Factory', website: 'https://www.bannari.com/sugar_bannari.html', icon: 'SG', img: '/assets/Clients/Bannari Amman Sugars Ltd.svg' },
    { name: 'M/s Bannari Amman Sugars Ltd. Unit 2', location: 'Nanjangud, Mysore, Karnataka', detail: 'Sugar factory descaling support', sector: 'Sugar Factory', website: 'https://www.bannari.com/sugar_bannari.html', icon: 'SG', img: '/assets/Clients/Bannari Amman Sugars Ltd.svg' },
    { name: 'M/s Bannari Amman Sugars Ltd. Unit 3', location: 'Kollegal, Chamarajanagar, Karnataka', detail: 'Sugar factory descaling support', sector: 'Sugar Factory', website: 'https://www.bannari.com/sugar_bannari.html', icon: 'SG', img: '/assets/Clients/Bannari Amman Sugars Ltd.svg' },
    { name: 'M/s Bannari Amman Sugars Ltd. Unit 4', location: 'Sathanur, Tiruvannamalai, Tamil Nadu', detail: 'Sugar factory descaling support', sector: 'Sugar Factory', website: 'https://www.bannari.com/sugar_bannari.html', icon: 'SG', img: '/assets/Clients/Bannari Amman Sugars Ltd.svg' },
    { name: 'M/s Bannari Amman Sugars Ltd. Unit 5', location: 'Tirukovilur, Villupuram, Tamil Nadu', detail: 'Sugar factory descaling support', sector: 'Sugar Factory', website: 'https://www.bannari.com/sugar_bannari.html', icon: 'SG', img: '/assets/Clients/Bannari Amman Sugars Ltd.svg' },
    { name: 'M/s Rajashree Sugars and Chemicals Ltd.', location: 'Tamil Nadu', detail: 'Sugar, power and alcohol production', sector: 'Sugar Factory', website: 'https://www.rajshreesugars.com/', icon: 'SG', img: '/assets/Clients/Rajshree Sugars and Chemicals Ltd.png' },
    { name: 'M/s Rajashree Sugars and Chemicals Ltd. Gingee Unit', location: 'Tamil Nadu', detail: 'Sugar and chemical plant support', sector: 'Sugar Factory', website: 'https://www.rajshreesugars.com/', icon: 'SG', img: '/assets/Clients/Rajshree Sugars and Chemicals Ltd.png' },
    { name: 'M/s Kothari Sugars and Chemicals Ltd.', location: 'Tamil Nadu', detail: 'Sugar, cogeneration and industrial alcohol', sector: 'Sugar Factory', website: 'https://www.hckotharigroup.com/kscl/', icon: 'SG' },
    { name: 'M/s Dhanalakshmi Srinivasan Sugars Pvt. Ltd.', location: 'Tamil Nadu', detail: 'Sugar plant descaling support', sector: 'Sugar Factory', website: 'https://dssugars.com/products', icon: 'SG' },
    { name: 'M/s KPR Sugars Mills Pvt. Ltd.', location: 'Karnataka', detail: 'Sugar process equipment maintenance', sector: 'Sugar Factory', website: '', icon: 'SG', img: '/assets/Clients/KPR Sugars Mills Pvt Ltd.png' },
    { name: 'M/s Maruti Khandsari Sugars', location: 'Karnataka', detail: 'Khandsari sugar process support', sector: 'Sugar Factory', website: '', icon: 'SG' },
    { name: 'M/s SNJ Sugars and Allied Products Ltd.', location: 'Andhra Pradesh', detail: 'Sugar and allied process support', sector: 'Sugar Factory', website: '', icon: 'SG' },
    { name: 'M/s Prudential Sugar Corporation Ltd.', location: 'Andhra Pradesh', detail: 'Integrated sugar complex', sector: 'Sugar Factory', website: 'https://www.prudentialsugar.com/', icon: 'SG', img: '/assets/Clients/Prudential Sugar Corporation Ltd.png' },
    { name: 'M/s Jai Bharth Khandsari Sugar Mill', location: 'Karnataka', detail: 'Khandsari sugar process support', sector: 'Sugar Factory', website: '', icon: 'SG' },
    { name: 'M/s The Salem Co-operative Sugar Mills Ltd.', location: 'Tamil Nadu', detail: 'Co-operative sugar mill', sector: 'Sugar Factory', website: '', icon: 'SG' },
    { name: 'M/s Trident Sugar Mills Ltd.', location: 'Telangana', detail: 'Sugar factory support', sector: 'Sugar Factory', website: 'https://www.prudentialsugar.com/about-us.php', icon: 'SG', img: '/assets/Clients/Trident Sugar Mills Ltd.jpg' },
    { name: 'M/s Gayathri Sugars Pvt. Ltd.', location: 'Andhra Pradesh', detail: 'Sugar process plant', sector: 'Sugar Factory', website: '', icon: 'SG', img: '/assets/Clients/Gayatri Sugars Ltd.png' },
    { name: 'M/s E.I.D. Parry India Ltd. Haliyal', location: 'Karnataka', detail: 'Murugappa Group sugar business', sector: 'Sugar Factory', website: 'https://www.eidparry.com/', icon: 'SG', img: '/assets/Clients/EID Parry India Ltd.jpg' },
    { name: 'M/s Madhucon Sugar and Power Industries Limited', location: 'Telangana', detail: 'Sugar and power process support', sector: 'Sugar Factory', website: '', icon: 'SG', img: '/assets/Clients/Madhucon Sugar and Power Industries Ltd.png' },
    { name: 'M/s Amaravathi Co-operative Sugar Mills Ltd.', location: 'Tamil Nadu', detail: 'Distillery plant', sector: 'Sugar Factory', website: '', icon: 'SG' },
  ],
  distilleries: [
    { name: 'M/s O. R. Distilleries Ltd.', location: 'Andhra Pradesh', detail: 'Industrial alcohol process systems', sector: 'Distillery', website: '', icon: 'DS' },
    { name: 'M/s The Salem Co-operative Sugar Mills Ltd.', location: 'Tamil Nadu', detail: 'Distillery plant cleaning support', sector: 'Distillery', website: '', icon: 'DS' },
  ],
  engineering: [
    { name: 'M/s Bill Forge Pvt Ltd. Unit 2', location: 'Jigani, Bangalore, Karnataka', detail: 'Automotive forging and components', sector: 'Engineering', website: '', icon: 'EN', img: '/assets/Clients/Bill Forge Pvt Ltd.jpg' },
    { name: 'M/s RMZ Infinity Pvt. Ltd.', location: 'Karnataka', detail: 'Commercial and infrastructure utilities', sector: 'Engineering', website: 'https://www.rmzcorp.com/', icon: 'EN', img: '/assets/Clients/RMZ Infinity Pvt Ltd.jpg' },
    { name: 'M/s Modtech Engineering', location: 'Karnataka', detail: 'Industrial engineering systems', sector: 'Engineering', website: '', icon: 'EN', img: '/assets/Clients/Modtech Engineering.jpg' },
    { name: 'M/s Greenesol Power Systems Pvt. Ltd.', location: 'Karnataka', detail: 'Power systems engineering', sector: 'Engineering', website: 'https://www.greenesolpower.com/index.html', icon: 'EN', img: '/assets/Clients/Greenesol Power Systems Pvt Ltd.png' },
    { name: 'M/s Indo-MIM Pvt. Ltd.', location: 'Karnataka', detail: 'Precision metal injection molding', sector: 'Engineering', website: 'https://www.indo-mim.com/', icon: 'EN', img: '/assets/Clients/Indo-MIM Pvt Ltd.jpg' },
    { name: 'M/s Stove Kraft Limited', location: 'Karnataka', detail: 'Manufacturing utilities and cooling loops', sector: 'Engineering', website: 'https://www.stovekraft.com/', icon: 'EN', img: '/assets/Clients/Stove Kraft Limited.png' },
  ],
  food: [
    { name: 'M/s Excel Foods Private Ltd.', location: 'Karnataka', detail: 'Food processing utilities', sector: 'Food & Agro', website: '', icon: 'FA', img: '/assets/Clients/Excel Foods Private Ltd.png' },
    { name: 'M/s Tropical Food Products Pvt. Ltd.', location: 'Karnataka', detail: 'Food process support systems', sector: 'Food & Agro', website: '', icon: 'FA', img: '/assets/Clients/Tropical Food Products Pvt Ltd.png' },
    { name: 'M/s Anandam Agro Products Pvt. Ltd.', location: 'Tamil Nadu', detail: 'Agro processing equipment', sector: 'Food & Agro', website: '', icon: 'FA' },
    { name: 'M/s Sri Devaraj Agro Industries Pvt. Ltd.', location: 'Tamil Nadu', detail: 'Agro industrial utilities', sector: 'Food & Agro', website: '', icon: 'FA', img: '/assets/Clients/Sri Devaraj Agro Industries Pvt Ltd.png' },
  ],
  iceplants: [
    { name: 'M/s Sri Siddhi Freezers & Exporters Pvt. Ltd.', location: 'Karnataka', detail: 'Freezer and export cold systems', sector: 'Ice Plant', website: '', icon: 'CS', img: '/assets/Clients/Sri Siddhi Freezers and Exporters Pvt Ltd.png' },
    { name: 'M/s Mangalore Yathrika Meenugara Parathmika Sahakari Sangha', location: 'Karnataka', detail: 'Fishery cold storage support', sector: 'Ice Plant', website: '', icon: 'CS', img: '/assets/Clients/Mangalore Yathrika Meenugara Parathmika Sahakari Sangha.png' },
    { name: 'M/s Mathsya Raja Ice Plant and Cold Storage', location: 'Karnataka', detail: 'Ice plant and cold storage utilities', sector: 'Ice Plant', website: '', icon: 'CS', img: '/assets/Clients/Mathsya Raja Ice Plant and Cold Storage.png' },
    { name: 'M/s Vyasa Mathsya Samskarana Sangha ICE Plant and Storage', location: 'Karnataka', detail: 'Ice plant and storage systems', sector: 'Ice Plant', website: '', icon: 'CS' },
    { name: 'M/s National Ice and Cold Storage', location: 'Karnataka', detail: 'Cold storage utilities', sector: 'Ice Plant', website: '', icon: 'CS', img: '/assets/Clients/National Ice and Cold Storage.svg' },
    { name: 'M/s Tolar Ocean Products Pvt Ltd', location: 'Kota, Udupi, Karnataka', detail: 'Seafood processing and cold chain', sector: 'Ice Plant', website: '', icon: 'CS', img: '/assets/Clients/Tolar Ocean Products Pvt Ltd.png' },
  ],
  other: [
    { name: 'M/s Apotex Pharmachem India Pvt. Ltd.', location: 'Karnataka', detail: 'API and pharmaceutical manufacturing', sector: 'Pharmaceuticals', website: 'https://www.apotex.com/in/', icon: 'OT', img: '/assets/Clients/Apotex Pharmachem India Pvt Ltd.svg' },
    { name: 'M/s Bombay Rayon Fashions Ltd. Trims Division', location: 'Doddaballapur, Bangalore, Karnataka', detail: 'Textile and trims manufacturing', sector: 'Other Industry', website: '', icon: 'OT', img: '/assets/Clients/Bombay Rayon Fashions Ltd.png' },
    { name: 'M/s Ecof Industries Private Limited', location: 'Hoskote, Karnataka', detail: 'Industrial manufacturing support', sector: 'Other Industry', website: '', icon: 'OT', img: '/assets/Clients/Ecof Industries Private Limited.png' },
    { name: 'M/s Arishina Life Sciences Pvt. Ltd.', location: 'Chamarajnagar, Karnataka', detail: 'Life sciences process utilities', sector: 'Life Sciences', website: '', icon: 'OT' },
    { name: 'M/s Habib Solvex Private Limited', location: 'Bangalore, Karnataka', detail: 'Industrial solvent processing support', sector: 'Other Industry', website: '', icon: 'OT', img: '/assets/Clients/Habib Solvex Private Limited.png' },
  ],
}

export default function Clients() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedClient, setExpandedClient] = useState(null)
  const tabsRef = useRef(null)
  const tabBtnsRef = useRef([])
  const sliderRef = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef(null)
  const statsRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const positionSlider = useCallback((index, animate = true) => {
    const btn = tabBtnsRef.current[index]
    const slider = sliderRef.current
    const container = tabsRef.current
    if (!btn || !slider || !container) return

    const btnRect = btn.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    if (animate) {
      gsap.to(slider, {
        x: btnRect.left - containerRect.left,
        width: btnRect.width,
        duration: 0.38,
        ease: 'power3.out',
      })
    } else {
      gsap.set(slider, {
        x: btnRect.left - containerRect.left,
        width: btnRect.width,
      })
    }
  }, [])

  useLayoutEffect(() => {
    positionSlider(activeTab, false)
  }, [positionSlider, activeTab])

  useEffect(() => {
    const handleResize = () => positionSlider(activeTab, false)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [activeTab, positionSlider])

  // Aggregate stats
  const stats = useMemo(() => {
    const total = Object.values(CLIENTS_DATA).flat().length
    const states = new Set()
    Object.values(CLIENTS_DATA).flat().forEach(c => {
      const stateMatch = c.location.match(/(?:Tamil Nadu|Karnataka|Andhra Pradesh|Telangana|Kerala|Maharashtra|Gujarat|Rajasthan|Madhya Pradesh|Uttar Pradesh|Punjab|West Bengal|Odisha|Assam)/)
      if (stateMatch) states.add(stateMatch[0])
    })
    return { total, states: states.size, sectors: Object.keys(CLIENTS_DATA).length }
  }, [])

  const currentTab = TABS[activeTab]
  const allClients = useMemo(() => {
    if (currentTab.id === 'all') {
      return Object.values(CLIENTS_DATA).flat()
    }
    return CLIENTS_DATA[currentTab.id] || []
  }, [currentTab])

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return allClients
    const q = searchQuery.toLowerCase()
    return allClients.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.location.toLowerCase().includes(q) || 
      c.detail.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q)
    )
  }, [allClients, searchQuery])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      const rows = cardsRef.current?.children
      if (rows?.length) {
        gsap.fromTo(rows, { opacity: 0, x: -26 }, { opacity: 1, x: 0, duration: 0.42, stagger: 0.035, ease: 'power3.out' })
      }
      return
    }

    const panel = contentRef.current
    if (!panel) return

    const tl = gsap.timeline()
    tl.to(panel, { opacity: 0, y: 16, duration: 0.18, ease: 'power2.in' })
      .set(panel, { y: -16 })
      .to(panel, {
        opacity: 1,
        y: 0,
        duration: 0.34,
        ease: 'power2.out',
        onStart: () => {
          const rows = cardsRef.current?.children
          if (rows?.length) {
            gsap.fromTo(rows, { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.34, stagger: 0.028, ease: 'power3.out' })
          }
        },
      })

    return () => tl.kill()
  }, [activeTab, searchQuery])

  useEffect(() => {
    const statsEl = statsRef.current
    if (!statsEl) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(statsEl.children, { opacity: 0, y: 25, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' })
          observer.disconnect()
        }
      })
    }, { threshold: 0.3 })

    observer.observe(statsEl)
    return () => observer.disconnect()
  }, [])

  const handleTabClick = (index) => {
    if (index === activeTab) return
    setActiveTab(index)
    setSearchQuery('')
    setExpandedClient(null)
    positionSlider(index, true)
  }

  const toggleExpandClient = (index) => {
    setExpandedClient(expandedClient === index ? null : index)
  }

  return (
    <main className="page-transition-enter" id="clients-page">
      <div className="container">
        <section className="clients-hero" id="clients-hero">
          <h1 className="clients-hero__title">
            Client Ledger <span className="clients-hero__title-gradient">& Footprint</span>
          </h1>
          <p className="clients-hero__subtitle">
            Induspic Engineers supports sugar mills, distilleries, heavy industries,
            pharmaceutical plants and cold storage facilities with dependable
            descaling and chemical treatment work across India.
          </p>
          <div className="clients-search">
            <svg className="clients-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="clients-search__input"
              placeholder="Search clients by name, location, or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        <nav className="clients-tabs" ref={tabsRef} aria-label="Client industry tabs">
          <div ref={sliderRef} className="clients-tab-slider" />
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => (tabBtnsRef.current[i] = el)}
              className={`clients-tab-btn ${i === activeTab ? 'clients-tab-btn--active' : ''}`}
              onClick={() => handleTabClick(i)}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              <span className="clients-tab-btn__icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <section
          className="clients-content"
          ref={contentRef}
          id={`panel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentTab.id}`}
        >
          <div className="clients-content__panel">
            {filteredClients.length === 0 ? (
              <div className="clients-empty">
                <span className="clients-empty__icon"><Search size={48} className="text-primary-catalyst" /></span>
                <h3>No clients found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="clients-count">
                  <span>{filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} in <strong>{currentTab.label}</strong></span>
                </div>
                <div className="clients-list" ref={cardsRef}>
                  {filteredClients.map((client, i) => (
                    <article 
                      className={`client-row gpu-accelerated ${expandedClient === i ? 'client-row--expanded' : ''}`} 
                      key={`${currentTab.id}-${i}`}
                      onClick={() => toggleExpandClient(i)}
                    >
                      <div className="client-row__index">{String(i + 1).padStart(2, '0')}</div>
                      <div className="client-row__main">
                        <div className="client-row__topline">
                          {client.img ? (
                            <img src={client.img} alt={`${client.name} logo`} className="client-row__logo" loading="lazy" />
                          ) : (
                            <span className="client-row__icon" aria-hidden="true">{client.icon}</span>
                          )}
                          <span className="client-row__sector">{client.sector}</span>
                          {client.website && <span className="client-row__has-website">✓ Online</span>}
                        </div>
                        <h3 className="client-row__name">{client.name}</h3>
                        <p className="client-row__detail">{client.detail}</p>
                        <div className="client-row__meta">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{client.location}</span>
                        </div>
                      </div>
                      {client.website ? (
                        <a className="client-row__link" href={client.website} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                          Visit Website
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      ) : (
                        <span className="client-row__link client-row__link--disabled">Reference unavailable</span>
                      )}
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="clients-insights clients-insights--compact" id="client-intelligence">
          <div className="clients-insights__panel">
            <div className="clients-insights__left">
              <span className="clients-insights__kicker">Client Intelligence</span>
              <h2>From location data to faster plant support</h2>
              <p>
                We track plant type, location, equipment context and repeat service
                needs so our team can plan chemistry, manpower and dispatch faster.
              </p>
              <Link to="/our-work" className="clients-insights__map-link">
                Explore our interactive India work map
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9H13.5M9.5 5L14 9.5L9.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="clients-insights__right">
              <div className="clients-insights__mini-stats">
                <div className="clients-insights__mini-stat">
                  <strong>43+</strong>
                  <span>Professional Clients</span>
                </div>
                <div className="clients-insights__mini-stat">
                  <strong>150+</strong>
                  <span>Normal Clients</span>
                </div>
                <div className="clients-insights__mini-stat">
                  <strong>{stats.sectors}</strong>
                  <span>Sectors Served</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="clients-stats" id="clients-stats">
          <div className="clients-stats__panel" ref={statsRef}>
            <div className="clients-stat">
              <div className="clients-stat__value">{stats.total}+</div>
              <div className="clients-stat__label">Major Clients</div>
            </div>
            <div className="clients-stat">
              <div className="clients-stat__value">{stats.sectors}</div>
              <div className="clients-stat__label">Industry Sectors</div>
            </div>
            <div className="clients-stat">
              <div className="clients-stat__value">Pan-India</div>
              <div className="clients-stat__label">Coverage</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}