import { useEffect, useState, useMemo, useCallback } from 'react'
import { feature } from 'topojson-client'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ShieldCheck } from 'lucide-react'

/* Mercator projection fitted to India's bounding box */
const BOUNDS = { minLng: 68, maxLng: 98, minLat: 6, maxLat: 38 }
const SVG_W = 500
const SVG_H = 620

function project(lng, lat) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * SVG_W
  const toRad = (d) => (d * Math.PI) / 180
  const mercY = (l) => Math.log(Math.tan(Math.PI / 4 + toRad(l) / 2))
  const yMin = mercY(BOUNDS.minLat)
  const yMax = mercY(BOUNDS.maxLat)
  const y = SVG_H - ((mercY(lat) - yMin) / (yMax - yMin)) * SVG_H
  return [x, y]
}

/* Parse geometry into SVG path and find bounding centroid */
function processGeometry(geometry) {
  let rings = []
  if (geometry.type === 'Polygon') {
    rings = geometry.coordinates
  } else if (geometry.type === 'MultiPolygon') {
    rings = geometry.coordinates.flat()
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity

  const path = rings.map(ring => {
    return ring.map((pt, i) => {
      const [x, y] = project(pt[0], pt[1])
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ') + 'Z'
  }).join(' ')

  return { path, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 }
}

/* Map from GeoJSON state names → our WORK_DATA IDs */
const NAME_TO_ID = {
  'Karnataka': 'INKA', 'Tamil Nadu': 'INTN', 'Kerala': 'INKL',
  'Andhra Pradesh': 'INAP', 'Telangana': 'INTG', 'Maharashtra': 'INMH',
  'Gujarat': 'INGJ', 'Rajasthan': 'INRJ', 'Madhya Pradesh': 'INMP',
  'Odisha': 'INOR', 'Orissa': 'INOR', 'West Bengal': 'INWB',
  'Uttar Pradesh': 'INUP', 'Punjab': 'INPB', 'Assam': 'INAS',
}

const GEOJSON_URL = 'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson'
const TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/indian-topojson@1.0.0/india.json'

export default function IndiaMap({ activeId, onStateClick, onStateHover, workDataIds }) {
  const [states, setStates] = useState([])
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function loadMap() {
      try {
        const res = await fetch(GEOJSON_URL)
        if (!res.ok) throw new Error('GeoJSON failed')
        const geo = await res.json()
        if (cancelled) return

        const parsed = (geo.features || []).map((f) => {
          const name = f.properties?.ST_NM || f.properties?.NAME_1 || f.properties?.name || ''
          const id = NAME_TO_ID[name] || name.toUpperCase().replace(/\s/g, '')
          const { path, cx, cy } = processGeometry(f.geometry)
          return { id, name, path, cx, cy }
        })
        setStates(parsed)
      } catch {
        try {
          const res = await fetch(TOPOJSON_URL)
          if (!res.ok) throw new Error('TopoJSON failed')
          const topo = await res.json()
          if (cancelled) return
          const key = Object.keys(topo.objects)[0]
          const geo = feature(topo, topo.objects[key])
          
          const parsed = geo.features.map((f) => {
            const name = f.properties?.ST_NM || f.properties?.NAME_1 || f.properties?.name || ''
            const id = NAME_TO_ID[name] || name.toUpperCase().replace(/\s/g, '')
            const { path, cx, cy } = processGeometry(f.geometry)
            return { id, name, path, cx, cy }
          })
          setStates(parsed)
        } catch {}
      }
    }
    loadMap()
    return () => { cancelled = true }
  }, [])

  const workSet = useMemo(() => new Set(workDataIds || []), [workDataIds])

  const handleClick = useCallback(
    (id) => { if (onStateClick) onStateClick(id) },
    [onStateClick]
  )

  const handleHover = useCallback(
    (id) => {
      setHoveredId(id)
      if (onStateHover) onStateHover(id)
    },
    [onStateHover]
  )

  if (!states.length) {
    return (
      <div className="india-map-loading">
        <div className="india-map-loading__spinner" />
        <span>Initializing Map Protocol…</span>
      </div>
    )
  }

  const hoveredState = states.find(s => s.id === hoveredId)

  return (
    <div className="india-map-master-container">
      
      {/* High-Tech Data Panel Overlay pinned to centroid */}
      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="india-map-data-panel"
            style={{
              left: `${(hoveredState.cx / SVG_W) * 100}%`,
              top: `${(hoveredState.cy / SVG_H) * 100}%`
            }}
          >
            <div className="india-map-data-panel__content">
              <h4>{hoveredState.name}</h4>
              {workSet.has(hoveredState.id) ? (
                <div className="status-row active-ops">
                  <Activity size={14} className="pulse-icon" />
                  <span>Active Operations</span>
                </div>
              ) : (
                <div className="status-row coverage">
                  <ShieldCheck size={14} />
                  <span>Coverage Area</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="india-map-vector"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="activeStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E8724" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#095917" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="idleStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1D24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#12141D" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="hoverStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12C83E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0E8724" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Global Drop Shadow for 2D map */}
        <g className="map-shadow-group">
          {states.map((s) => (
            <path key={`shadow-${s.id}`} d={s.path} className="state-base-shadow" />
          ))}
        </g>

        {/* States Layer */}
        {states.map((s, index) => {
          const hasWork = workSet.has(s.id)
          const isActive = activeId === s.id
          const isHovered = hoveredId === s.id

          return (
            <motion.path
              key={s.id}
              d={s.path}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.02, ease: "easeOut" }}
              whileHover={hasWork ? { scale: 1.02, x: -6, y: -8, transition: { duration: 0.2 } } : {}}
              className={[
                'india-map-state',
                hasWork && 'india-map-state--has-work',
                isHovered && 'india-map-state--hovered',
              ].filter(Boolean).join(' ')}
              fill={isHovered ? 'url(#hoverStateGrad)' : hasWork ? 'rgba(14,135,36,0.3)' : 'url(#idleStateGrad)'}
              stroke={isHovered ? '#12C83E' : hasWork ? 'rgba(14,135,36,0.5)' : 'rgba(255,255,255,0.1)'}
              strokeWidth={isHovered ? 2 : 1}
              onClick={() => hasWork && handleClick(s.id)}
              onMouseEnter={() => handleHover(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: hasWork ? 'pointer' : 'default' }}
            >
              <title>{s.name}</title>
            </motion.path>
          )
        })}

        {/* Dynamic Centroid Rings Layer (only rendered for hovered state) */}
        {hoveredState && (
          <g transform={`translate(${hoveredState.cx}, ${hoveredState.cy})`} style={{ pointerEvents: 'none' }}>
            <circle r="4" fill="#fff" filter="url(#neonGlow)" />
            <circle r="12" fill="none" stroke="#12C83E" strokeWidth="2" className="ping-ring" />
            <circle r="24" fill="none" stroke="#12C83E" strokeWidth="1" className="ping-ring-delayed" />
            {/* Connection line from centroid up to panel */}
            <path d="M 0,0 L -15,-20" stroke="#12C83E" strokeWidth="2" strokeDasharray="2,2" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  )
}
