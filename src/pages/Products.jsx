import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Product Data ── */
const products = [
  {
    code: 'DC',
    name: "INDUSPIC 'DC' — Heavy-Duty Industrial Descaling Blend",
    desc: 'For industrial boilers, evaporators, and large-scale heat transfer equipment. Maximum scale dissolution power.',
    tag: 'Descaling',
    color: 'green',
  },
  {
    code: 'DCQ',
    name: "INDUSPIC 'DCQ' — High-Efficiency Quick Descaling",
    desc: 'Rapid-action formulation for time-critical maintenance schedules. Accelerated reaction kinetics.',
    tag: 'Descaling',
    color: 'green',
  },
  {
    code: 'DCS',
    name: "INDUSPIC 'DCS' — Non-Ferrous Specialist Cleaner",
    desc: 'Gentle yet effective cleaning for delicate non-ferrous components. pH-balanced for aluminum and copper alloys.',
    tag: 'Cleaning',
    color: 'amber',
  },
  {
    code: 'DCSJ',
    name: "INDUSPIC 'DCSJ' — Radiator & Cooling System Specialist",
    desc: 'Targeted formulation for automotive and industrial radiator systems. Complete deposit removal.',
    tag: 'Cleaning',
    color: 'amber',
  },
  {
    code: 'GC',
    name: "INDUSPIC 'GC' — General Purpose Cleaning Agent",
    desc: 'Versatile multi-surface scale extraction and general cleaning. Broad-spectrum effectiveness.',
    tag: 'Cleaning',
    color: 'blue',
  },
  {
    code: 'LS',
    name: "INDUSPIC 'LS' — Line Flushing & System Clearing Agent",
    desc: 'Post-descaling system flushing for complete residue removal and line clearing.',
    tag: 'Cleaning',
    color: 'blue',
  },
  {
    code: 'NC',
    name: "INDUSPIC 'NC' — Neutralizing Compound",
    desc: 'Critical post-process neutralization ensuring safe pH restoration and metal surface protection.',
    tag: 'Treatment',
    color: 'green',
  },
  {
    code: 'RC',
    name: "INDUSPIC 'RC' — Rust & Carbon Removal Treatment",
    desc: 'Advanced restorative treatment for rust and carbon buildup. Deep penetration cleaning.',
    tag: 'Treatment',
    color: 'amber',
  },
  {
    code: 'RR',
    name: "INDUSPIC 'RR' — Surface Reconditioning & Protection",
    desc: 'Final-stage metal conditioning and protective coating for extended equipment life.',
    tag: 'Treatment',
    color: 'green',
  },
]

export default function Products() {
  const gridRef = useRef(null)
  const fillRefs = useRef([])

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* GSAP ScrollTrigger entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.product-card')
      if (!cards?.length) return

      gsap.set(cards, { opacity: 0, y: 60 })

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  /* Liquid fill hover handlers */
  const handleMouseEnter = useCallback((index) => {
    const fillEl = fillRefs.current[index]
    if (!fillEl) return
    gsap.to(fillEl, {
      height: '100%',
      duration: 0.6,
      ease: 'power3.out',
    })
  }, [])

  const handleMouseLeave = useCallback((index) => {
    const fillEl = fillRefs.current[index]
    if (!fillEl) return
    gsap.to(fillEl, {
      height: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [])

  return (
    <main className="page-transition-enter" id="products-page">
      {/* ── Hero Section ── */}
      <section className="products-hero container" id="products-hero">
        <h1 className="products-hero__title">
          Product Catalog{' '}
          <span className="products-hero__title-gradient">Formulations</span>
        </h1>
        <p className="products-hero__subtitle">
          Precision-engineered chemical compounds designed for maximum descaling
          efficiency with near 0% erosion index on parent metals.
        </p>
      </section>

      {/* ── Products Grid ── */}
      <section className="container" id="products-catalog">
        <div className="products-grid" ref={gridRef}>
          {products.map((product, i) => (
            <article
              key={product.code}
              className={`product-card product-card--${product.color} interactive-tilt-card`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {/* Liquid fill overlay */}
              <div
                className="product-card__fill"
                ref={(el) => {
                  fillRefs.current[i] = el
                }}
              />

              <div className="product-card__can" aria-hidden="true">
                <span className="product-card__can-cap" />
                <span className="product-card__can-handle" />
                <span className="product-card__can-label">
                  <strong>{product.code}</strong>
                  <em>HDPE 40 Kgs Can</em>
                </span>
              </div>
              <div className="product-card__body">
                <span className="product-card__badge">{product.code}</span>
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__desc">{product.desc}</p>
                <span className="product-card__tag">{product.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
