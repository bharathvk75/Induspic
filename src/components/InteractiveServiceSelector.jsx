import { useState } from 'react'
import { getAssetPath } from '../utils/assetPath'
import './InteractiveServiceSelector.css'

const OPTIONS = [
  {
    title: 'Evaporators & Juice Heaters',
    description: 'Falling film, pan-vacuum, calandria and juice heater descaling.',
    image: '/assets/services/evaporators.jpg',
    code: 'EV',
  },
  {
    title: 'Boilers & Heat Exchangers',
    description: 'Controlled circulation for boilers, re-boilers and exchangers.',
    image: '/assets/services/boilers.jpg',
    code: 'BX',
  },
  {
    title: 'Chillers & Cold Pipelines',
    description: 'Cold water lines, ammonia condensers and utility loops.',
    image: '/assets/services/chillers.jpg',
    code: 'CH',
  },
  {
    title: 'Distilleries & Reactors',
    description: 'Analyzer columns, reactor vessels and process heat transfer.',
    image: '/assets/services/distilleries.jpg',
    code: 'DR',
  },
  {
    title: 'Cooling Towers & Pipe Lines',
    description: 'Industrial pipework flushing, neutralization and cleaning.',
    image: '/assets/gallery-3.jpg',
    code: 'CT',
  },
]

export default function InteractiveServiceSelector() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="service-selector" aria-label="Interactive solution image selector">
      <div className="service-selector__copy">
        <span>Interactive Solution Preview</span>
        <h2>Choose a system to view the cleaning approach</h2>
        <p>
          Click each service image to expand the preview. The interaction is CSS-first
          and lightweight so it stays smooth on older computers.
        </p>
      </div>

      <div className="service-selector__options">
        {OPTIONS.map((option, index) => {
          const active = index === activeIndex
          return (
            <button
              type="button"
              key={option.title}
              className={`service-selector__option${active ? ' service-selector__option--active' : ''}`}
              onClick={(e) => {
                setActiveIndex(index)
                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
              }}
              style={{ backgroundImage: `url(${getAssetPath(option.image)})` }}
              aria-pressed={active}
              aria-label={`${option.title}: ${option.description}`}
            >
              <span className="service-selector__shade" />
              <span className="service-selector__icon">{option.code}</span>
              <span className="service-selector__label">
                <span className="service-selector__info">
                  <strong>{option.title}</strong>
                  <em>{option.description}</em>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

