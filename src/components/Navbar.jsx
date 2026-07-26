import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getAssetPath } from '../utils/assetPath'
import gsap from 'gsap'
import './Navbar.css'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/products', label: 'Products' },
  { path: '/clients', label: 'Clients' },
  { path: '/our-work', label: 'Our Work' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const sliderRef = useRef(null)
  const linksRef = useRef([])
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  const moveSliderToLink = useCallback((link, animate = true) => {
    const slider = sliderRef.current
    const list = link?.closest('.navbar__links')
    if (!link || !slider || !list) return

    const linkRect = link.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    const vars = {
      x: linkRect.left - listRect.left,
      width: linkRect.width,
      autoAlpha: 1,
      duration: animate ? 0.32 : 0,
      ease: 'power3.out',
    }

    gsap.killTweensOf(slider)
    gsap.to(slider, vars)
  }, [])

  // Scroll listener for navbar morphing
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useLayoutEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex((item) =>
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
    )
    if (activeIndex >= 0) {
      moveSliderToLink(linksRef.current[activeIndex], false)
    }
  }, [location.pathname, moveSliderToLink])

  // Track window resize to re-align active slider when layout shifts
  useEffect(() => {
    const handleResize = () => {
      const activeIndex = NAV_ITEMS.findIndex((item) =>
        item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
      )
      if (activeIndex >= 0) {
        moveSliderToLink(linksRef.current[activeIndex], false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [location.pathname, moveSliderToLink])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Liquid hover slider animation
  const handleMouseEnter = useCallback((index) => {
    const link = linksRef.current[index]
    moveSliderToLink(link)
  }, [moveSliderToLink])

  const handleMouseLeave = useCallback(() => {
    const slider = sliderRef.current
    if (!slider) return
    const activeIndex = NAV_ITEMS.findIndex((item) =>
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
    )
    if (activeIndex >= 0) {
      moveSliderToLink(linksRef.current[activeIndex])
    } else {
      gsap.to(slider, { autoAlpha: 0, duration: 0.2, ease: 'power2.out' })
    }
  }, [location.pathname, moveSliderToLink])

  const scrollPageTop = useCallback(() => {
    setMobileOpen(false)
    window.setTimeout(() => {
      if (window.__lenis?.scrollTo) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }, 0)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        id="main-navigation"
      >
        <NavLink to="/" className="navbar__logo" aria-label="Induspic Engineers Home" onClick={scrollPageTop}>
          <img
            src={getAssetPath('/assets/logo.png')}
            alt="Induspic Engineers Logo"
            className="navbar__logo-img"
          />
        </NavLink>

        <ul className="navbar__links" onMouseLeave={handleMouseLeave}>
          <li ref={sliderRef} className="navbar__slider" aria-hidden="true" />
          {NAV_ITEMS.map((item, i) => (
            <li key={item.path}>
              <NavLink
                ref={(el) => (linksRef.current[i] = el)}
                to={item.path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                onMouseEnter={() => handleMouseEnter(i)}
                onClick={scrollPageTop}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light/dark theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          )}
        </button>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
            onClick={scrollPageTop}
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
        
        <button
          className="navbar__mobile-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light/dark theme"
        >
          {theme === 'light' ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
