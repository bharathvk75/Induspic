import { getAssetPath } from '../utils/assetPath'
import './ClientLogoCloud.css'

const CLIENT_LOGOS = [
  { name: 'Bannari Amman Sugars', img: '/assets/Clients/Bannari Amman Sugars Ltd.svg' },
  { name: 'Rajshree Sugars', img: '/assets/Clients/Rajshree Sugars and Chemicals Ltd.png' },
  { name: 'E.I.D. Parry', img: '/assets/Clients/EID Parry India Ltd.jpg' },
  { name: 'Indo-MIM', img: '/assets/Clients/Indo-MIM Pvt Ltd.jpg' },
  { name: 'Greenesol Power', img: '/assets/Clients/Greenesol Power Systems Pvt Ltd.png' },
  { name: 'Stove Kraft', img: '/assets/Clients/Stove Kraft Limited.png' },
  { name: 'Apotex Pharmachem', img: '/assets/Clients/Apotex Pharmachem India Pvt Ltd.svg' },
  { name: 'Prudential Sugar', img: '/assets/Clients/Prudential Sugar Corporation Ltd.png' },
  { name: 'KPR Sugars', img: '/assets/Clients/KPR Sugars Mills Pvt Ltd.png' },
  { name: 'Madhucon Sugar', img: '/assets/Clients/Madhucon Sugar and Power Industries Ltd.png' },
  { name: 'RMZ Infinity', img: '/assets/Clients/RMZ Infinity Pvt Ltd.jpg' },
  { name: 'Bombay Rayon Fashions', img: '/assets/Clients/Bombay Rayon Fashions Ltd.png' },
  { name: 'Excel Foods', img: '/assets/Clients/Excel Foods Private Ltd.png' },
  { name: 'Modtech Engineering', img: '/assets/Clients/Modtech Engineering.jpg' },
]

function LogoItem({ logo }) {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.style.display = 'block';
    }
  }

  return (
    <div className="client-logo-cloud__item" aria-label={logo.name}>
      <div className="client-logo-cloud__svg-wrapper">
        <img 
          src={getAssetPath(logo.img)} 
          alt={`${logo.name} logo`} 
          className="client-logo-marquee-img"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="client-logo-cloud__fallback" style={{ display: 'none' }}>
          {logo.name.substring(0, 2).toUpperCase()}
        </div>
      </div>
      <span className="client-logo-cloud__name">{logo.name}</span>
    </div>
  )
}

export default function ClientLogoCloud() {
  return (
    <section className="client-logo-cloud" aria-label="Trusted client logos">
      <div className="client-logo-cloud__header">
        <span>Trusted by industrial teams</span>
        <strong>Client partners across sugar, distillery, engineering and pharma</strong>
      </div>
      <div className="client-logo-cloud__divider" />
      <div className="client-logo-cloud__viewport">
        <div className="client-logo-cloud__track">
          {CLIENT_LOGOS.map((logo, index) => (
            <LogoItem key={`track1-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
        <div className="client-logo-cloud__track" aria-hidden="true">
          {CLIENT_LOGOS.map((logo, index) => (
            <LogoItem key={`track2-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
      <div className="client-logo-cloud__divider" />
    </section>
  )
}
