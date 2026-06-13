import { useEffect } from 'react'

export default function use3DTilt() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.target.closest('.interactive-tilt-card')
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const percentX = (x - centerX) / centerX
      const percentY = (y - centerY) / centerY

      const maxRotationX = 8 // Max rotation degrees on X axis
      const maxRotationY = 10 // Max rotation degrees on Y axis
      
      const rotateX = -percentY * maxRotationX
      const rotateY = percentX * maxRotationY

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015) translate3d(0, -2px, 0)`
      card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`)
      card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`)
      card.style.setProperty('--glare-opacity', '0.12')
    }

    const handleMouseLeave = (e) => {
      const card = e.target.closest('.interactive-tilt-card')
      if (!card) return

      // Do not reset if we transitioned into a child of the card
      if (e.relatedTarget && card.contains(e.relatedTarget)) {
        return
      }

      card.style.transform = ''
      card.style.setProperty('--glare-opacity', '0')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])
}
