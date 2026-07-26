import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/assetPath'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={getAssetPath('/assets/logo.png')} alt="Induspic Engineers Logo" />
            <span className="footer__logo-text">INDUSPIC</span>
          </div>
          <p className="footer__tagline">
            Elite industrial leader in turnkey descaling contracting and specialized 
            water treatment chemical blending. Near 0% erosion index on parent metals since 2013.
          </p>
        </div>

        <div>
          <h4 className="footer__column-title">Navigation</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/solutions">Turnkey Solutions</Link></li>
            <li><Link to="/products">Product Catalog</Link></li>
            <li><Link to="/clients">Client Ledger</Link></li>
            <li><Link to="/our-work">Our Work</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__column-title">Solutions</h4>
          <ul className="footer__links">
            <li><Link to="/solutions">Evaporators & Heaters</Link></li>
            <li><Link to="/solutions">Boilers & Exchangers</Link></li>
            <li><Link to="/solutions">Chillers & Pipelines</Link></li>
            <li><Link to="/solutions">Distilleries & Reactors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__column-title">Contact</h4>
          <div className="footer__contact-item">
            <span className="footer__contact-icon">📍</span>
            <span>#11 Geddalahalli Village, Hennur Main Road, Bangalore — 560043</span>
          </div>
          <div className="footer__contact-item">
            <span className="footer__contact-icon">📞</span>
            <span>+91 9449983601</span>
          </div>
          <div className="footer__contact-item">
            <span className="footer__contact-icon">✉️</span>
            <span>induspic@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2013–{new Date().getFullYear()} <span>Induspic Engineers</span> (Chemicals Division). All rights reserved.
        </p>
      </div>
    </footer>
  )
}
