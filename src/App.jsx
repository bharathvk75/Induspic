import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ChemicalCanvas from './components/ChemicalCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import useLenis from './hooks/useLenis'
import use3DTilt from './hooks/use3DTilt'

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Products = lazy(() => import('./pages/Products'))
const Clients = lazy(() => import('./pages/Clients'))
const OurWork = lazy(() => import('./pages/OurWork'))
const Contact = lazy(() => import('./pages/Contact'))

function LoadingFallback() {
  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-muted)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <img src="/assets/logo.png" alt="" style={{ width: 48, height: 48, animation: 'float-gentle 2s ease-in-out infinite' }} />
        <span>Loading...</span>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  useLenis()
  use3DTilt()



  useEffect(() => {
    const resetScroll = () => {
      if (window.__lenis?.scrollTo) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    resetScroll()
    window.setTimeout(resetScroll, 0)
  }, [location.pathname])

  return (
    <>
      <ChemicalCanvas />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
