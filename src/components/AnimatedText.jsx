import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/* ===== Text Reveal - each word fades/slides up with GSAP ===== */
export function TextReveal({ children, className = '', delay = 0 }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const words = containerRef.current.querySelectorAll('.tr-word')
    if (!words.length) return

    gsap.from(words, {
      y: '100%',
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.04,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: containerRef })

  const words = children.split(' ')

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <span className="tr-word" style={{ display: 'inline-block' }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

/* ===== Character Stagger - letter by letter with GSAP ===== */
export function CharReveal({ children, className = '', delay = 0, stagger = 0.02 }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const chars = containerRef.current.querySelectorAll('.cr-char')
    if (!chars.length) return

    gsap.from(chars, {
      autoAlpha: 0,
      y: 20,
      filter: 'blur(8px)',
      duration: 0.5,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: containerRef })

  const chars = children.split('')

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline' }}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="cr-char"
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

/* ===== Blur Fade - content fades in with blur using GSAP ===== */
export function BlurFade({ children, delay = 0, className = '', direction = 'up' }) {
  const ref = useRef(null)

  const dirMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  useGSAP(() => {
    gsap.from(ref.current, {
      autoAlpha: 0,
      filter: 'blur(12px)',
      ...dirMap[direction],
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}

/* ===== Typewriter Effect with GSAP ===== */
export function Typewriter({ text, className = '', speed = 40, delay = 0 }) {
  const ref = useRef(null)
  const cursorRef = useRef(null)

  useGSAP(() => {
    const chars = ref.current.querySelectorAll('.tw-char')
    if (!chars.length) return

    // Set all characters invisible initially
    gsap.set(chars, { autoAlpha: 0 })

    // Reveal one-by-one
    gsap.to(chars, {
      autoAlpha: 1,
      duration: 0.01,
      stagger: speed / 1000,
      delay,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Blinking cursor
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
  }, { scope: ref })

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="tw-char" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal', visibility: 'hidden' }}>
          {char}
        </span>
      ))}
      <span ref={cursorRef} style={{ borderRight: '2px solid var(--color-accent)', marginLeft: '2px' }} />
    </span>
  )
}
