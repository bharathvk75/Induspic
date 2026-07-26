import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/assetPath'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InteractiveServiceSelector from '../components/InteractiveServiceSelector'
import { Flame, Zap, Snowflake, FlaskConical, Factory, Beaker, Wrench, Ruler, RefreshCw, Settings, Box, Droplet } from 'lucide-react'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const EQUIPMENT_CATEGORIES = [
  { 
    title: 'Analyzer Columns', icon: <FlaskConical size={20} />, 
    images: ['/assets/uploads/Analyzer Columns 1.jpg', '/assets/uploads/Analyzer Columns 2.jpg', '/assets/uploads/Analyzer Columns 3.jpg'] 
  },
  { 
    title: 'Aseptic Ammonia Chiller Condensers', icon: <Box size={20} />, 
    images: ['/assets/uploads/Aseptic Ammonia Chiller Condensers 1.jpg', '/assets/uploads/Aseptic Ammonia Chiller Condensers 2.jpg', '/assets/uploads/Aseptic Ammonia Chiller Condensers.jpg'] 
  },
  { 
    title: 'Boilers', icon: <Flame size={20} />, 
    images: ['/assets/uploads/Boiler 1.jpg', '/assets/uploads/Boiler 2.jpg', '/assets/uploads/Boiler 3.jpg'] 
  },
  { 
    title: 'Cement Plant Slurry & Water Pipelines', icon: <Droplet size={20} />, 
    images: ['/assets/uploads/Cement Plant Slurry & Water Pipelines 1.jpg', '/assets/uploads/Cement Plant Slurry & Water Pipelines 2.jpg'] 
  },
  { 
    title: 'Chillers & Cold Water Pipelines', icon: <Snowflake size={20} />, 
    images: ['/assets/uploads/Chillers & Cold Water Pipelines 1.jpg', '/assets/uploads/Chillers & Cold Water Pipelines 2.jpg', '/assets/uploads/Chillers & Cold Water Pipelines 3.jpg'] 
  },
  { 
    title: 'Falling Film Evaporator', icon: <Factory size={20} />, 
    images: ['/assets/uploads/Falling Film Evaporator 1.jpg', '/assets/uploads/Falling Film Evaporator 2.jpg', '/assets/uploads/Falling Film Evaporator 3.jpg', '/assets/uploads/Falling Film Evaporator 4.jpg'] 
  },
  { 
    title: 'Plate Heat Exchangers', icon: <RefreshCw size={20} />, 
    images: ['/assets/uploads/Plate Heat Exchangers 1.jpg', '/assets/uploads/Plate Heat Exchangers 2.jpg', '/assets/uploads/Plate Heat Exchangers 3.jpg'] 
  },
  { 
    title: 'RS Plant & ENA Plant Condensers', icon: <Beaker size={20} />, 
    images: ['/assets/uploads/RS Plant & ENA Plant Condensers 1.jpg', '/assets/uploads/RS Plant & ENA Plant Condensers 2.jpg'] 
  },
  { 
    title: 'Radiators, Compressors & Utility Piping', icon: <Wrench size={20} />, 
    images: ['/assets/uploads/Radiators, Compressors & Utility Piping 2.jpg', '/assets/uploads/Radiators, Compressors & Utility Piping 3.jpg', '/assets/uploads/Radiators, Compressors & Utility Piping.jpg'] 
  },
  { 
    title: 'Reactor Vessels, Kettles & Steam Turbines', icon: <Settings size={20} />, 
    images: ['/assets/uploads/Reactor Vessels, Kettles & Steam Turbines 1.jpg', '/assets/uploads/Reactor Vessels, Kettles & Steam Turbines 2.jpg', '/assets/uploads/Reactor Vessels, Kettles & Steam Turbines 3.jpg'] 
  },
  { 
    title: 'Semikestners & Vertical Crystallizers', icon: <Ruler size={20} />, 
    images: ['/assets/uploads/Semikestners & Vertical Crystallizers 1.jpg', '/assets/uploads/Semikestners & Vertical Crystallizers 2.jpg', '/assets/uploads/Semikestners & Vertical Crystallizers 3.jpg'] 
  },
  { 
    title: 'Steam Jacketed Process Equipment', icon: <Settings size={20} />, 
    images: ['/assets/uploads/Steam Jacketed Process Equipment  1.jpg', '/assets/uploads/Steam Jacketed Process Equipment 2.jpg'] 
  },
  { 
    title: 'Juice Heaters & Pan Vapour Cells', icon: <Box size={20} />, 
    images: ['/assets/uploads/uice Heaters & Pan Vapour Cells 1.jpg', '/assets/uploads/uice Heaters & Pan Vapour Cells 2.jpg', '/assets/uploads/uice Heaters & Pan Vapour Cells 3.jpg'] 
  },
]

function EquipmentCategoryCard({ category, onClick }) {
  const cardRef = useRef(null)
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate tilt (max 15 degrees)
    const tiltX = ((y - centerY) / centerY) * -10
    const tiltY = ((x - centerX) / centerX) * 10
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
  }
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }

  // Determine collage layout class based on number of images
  const collageClass = `collage-count-${category.images.length}`

  return (
    <div 
      className="viewcard-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="viewcard-tilt" ref={cardRef}>
        <div className={`viewcard-collage ${collageClass}`}>
          {category.images.map((img, i) => (
            <div key={i} className={`collage-img-wrapper item-${i + 1}`}>
              <img src={getAssetPath(img)} alt={`${category.title} - ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        
        <div className="viewcard-overlay"></div>
        
        <div className="viewcard-content">
          <div className="viewcard-icon">{category.icon}</div>
          <h3 className="viewcard-title">{category.title}</h3>
        </div>
      </div>
    </div>
  )
}

function EquipmentGalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (!selectedCategory || selectedCategory.images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % selectedCategory.images.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [selectedCategory, currentImageIndex])

  // Lock scroll and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (selectedCategory) {
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
  }, [selectedCategory])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCategory(null)
    }
    if (selectedCategory) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCategory])

  const handleSelect = (cat) => {
    setSelectedCategory(cat)
    setCurrentImageIndex(0)
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    if (!selectedCategory) return
    setCurrentImageIndex(prev => (prev === 0 ? selectedCategory.images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    if (!selectedCategory) return
    setCurrentImageIndex(prev => (prev + 1) % selectedCategory.images.length)
  }

  return (
    <>
      <div className="equipment-gallery-grid">
        {EQUIPMENT_CATEGORIES.map((cat, i) => (
          <EquipmentCategoryCard key={cat.title} category={cat} onClick={(e) => { e.preventDefault(); handleSelect(cat); }} />
        ))}
      </div>

      {selectedCategory && createPortal(
        <div className="equipment-modal" onClick={() => setSelectedCategory(null)}>
          <div className="equipment-modal__content" onClick={e => e.stopPropagation()}>
            <button className="equipment-modal__close" onClick={() => setSelectedCategory(null)} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="equipment-modal__visual slideshow-container">
                {selectedCategory.images.map((img, i) => (
                    <img 
                      key={img} 
                      src={getAssetPath(img)} 
                      alt={`${selectedCategory.title} image ${i + 1}`} 
                      className={`slideshow-img ${i === currentImageIndex ? 'active' : ''}`}
                      loading="lazy" 
                    />
                ))}

                <span className="slideshow-badge">
                  Image {currentImageIndex + 1} of {selectedCategory.images.length}
                </span>

                {selectedCategory.images.length > 1 && (
                  <>
                    <button className="slideshow-nav slideshow-nav--prev" onClick={handlePrev} aria-label="Previous image">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="slideshow-nav slideshow-nav--next" onClick={handleNext} aria-label="Next image">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </>
                )}
                
                <div className="slideshow-indicators">
                   {selectedCategory.images.map((_, i) => (
                      <button 
                        type="button"
                        key={i} 
                        className={`slideshow-dot ${i === currentImageIndex ? 'active' : ''}`} 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }} 
                        aria-label={`Go to slide ${i + 1}`}
                      />
                   ))}
                </div>
            </div>
            <div className="equipment-modal__info">
              <div className="equipment-modal__icon">{selectedCategory.icon}</div>
              <h2>{selectedCategory.title}</h2>
              <p>
                Turnkey chemical descaling, scale removal analysis, metallurgy inspection, 
                and passivation treatment specialized for <strong>{selectedCategory.title}</strong>.
              </p>
              <div className="equipment-modal__actions">
                <Link to="/contact" className="btn btn-primary" onClick={() => setSelectedCategory(null)}>
                  Request Assessment
                </Link>
                <button className="btn btn-secondary" onClick={() => setSelectedCategory(null)}>
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default function Services() {
  const equipmentRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  return (
    <div className="services-page page-transition-enter">
      <section className="services-hero" id="services-hero">
        <span className="services-hero__label">Industrial Solutions</span>
        <h1 className="services-hero__title text-gradient-mixed">Turnkey Chemical Descaling Solutions</h1>
        <p className="services-hero__subtitle">
          Comprehensive service coverage for boilers, evaporators, chillers,
          distilleries, reactors and heat-transfer equipment with controlled
          chemistry and near zero parent-metal erosion technology.
        </p>
        <div className="services-hero__stats">
          <div className="services-hero__stat">
            <strong>98%+</strong>
            <span>Scale removal efficiency</span>
          </div>
          <div className="services-hero__stat">
            <strong>0%</strong>
            <span>Metal erosion index</span>
          </div>
          <div className="services-hero__stat">
            <strong>26-30+</strong>
            <span>On-site specialists</span>
          </div>
        </div>
      </section>

      <InteractiveServiceSelector />

      <section className="services-equipment" id="equipment-serviced" ref={equipmentRef}>
        <div className="services-equipment__intro">
          <span>Equipment Coverage</span>
          <h2>Industrial descaling across heavy process machinery</h2>
          <p>
            Our team handles chemical descaling for sugar, distillery, cooling,
            boiler, process utility and manufacturing equipment with controlled
            chemistry, metallurgy checks and proper flushing protocols.
          </p>
        </div>
        <EquipmentGalleryGrid />
      </section>



      <section className="services-cta" id="services-cta">
        <h2 className="services-cta__title text-gradient-green">Ready to Restore Peak Performance?</h2>
        <p className="services-cta__subtitle">
          Our field process covers inspection, circulation, neutralization,
          flushing and handover documentation for critical industrial equipment.
          Schedule your plant assessment today.
        </p>
        <div className="services-cta__actions">
          <Link to="/contact" className="btn btn-primary">Request Assessment</Link>
          <Link to="/products" className="btn btn-secondary">View Products</Link>
        </div>
      </section>
    </div>
  )
}