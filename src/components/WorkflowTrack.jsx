import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './WorkflowTrack.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: 1,
    title: 'Research & Assessment',
    desc: 'Comprehensive analysis of scale deposits, parent metal composition, and system architecture to engineer the optimal solution.',
  },
  {
    number: 2,
    title: 'Blending Chemicals',
    desc: 'Precision formulation of proprietary descaling compounds tailored for target scale hardness with near 0% erosion index.',
  },
  {
    number: 3,
    title: 'Descaling Process',
    desc: 'On-site execution by 26-30+ trained specialists using controlled chemical application with real-time process monitoring.',
  },
  {
    number: 4,
    title: 'Process Completion',
    desc: 'Thorough neutralization, flushing, and quality validation ensuring restored equipment performance and extended service life.',
  },
]

export default function WorkflowTrack() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)
      
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="workflow-track" ref={sectionRef} id="operational-workflow">
      <div className="workflow-track__title">
        <h2>Our <span>Operational Workflow</span></h2>
      </div>
      <p className="workflow-track__subtitle">
        A precision-engineered 4-step process that delivers exceptional results with zero compromise on equipment integrity.
      </p>
      <div className="workflow-track__grid">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="workflow-track__card"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className="workflow-track__step">{step.number}</div>
            <h3 className="workflow-track__card-title">{step.title}</h3>
            <p className="workflow-track__card-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
