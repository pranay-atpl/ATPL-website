import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker instead of manual rAF for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // GSAP ticker is in seconds, Lenis expects ms
    })
    gsap.ticker.lagSmoothing(0) // Disable lag smoothing for smooth scroll

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return children
}
