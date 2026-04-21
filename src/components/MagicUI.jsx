import React, { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/* ===== Magnetic Button - cursor-following with gsap.quickTo ===== */
export function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useGSAP(() => {
    xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: 'power3.out' })
    yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: 'power3.out' })
  }, { scope: ref })

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect || !xTo.current || !yTo.current) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    xTo.current(dx * strength)
    yTo.current(dy * strength)
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    if (xTo.current) xTo.current(0)
    if (yTo.current) yTo.current(0)
  }, [])

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}

/* ===== Number Ticker - smooth animated count with GSAP ===== */
export function NumberTicker({ value, className = '', duration = 2, delay = 0 }) {
  const ref = useRef(null)
  const counterObj = useRef({ val: 0 })

  useGSAP(() => {
    gsap.to(counterObj.current, {
      val: value,
      duration,
      delay,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(counterObj.current.val)
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return <span ref={ref} className={className}>0</span>
}

/* ===== Shimmer Button with GSAP ===== */
export function ShimmerButton({ children, className = '', shimmerColor = 'rgba(201, 169, 110, 0.3)', ...props }) {
  const btnRef = useRef(null)
  const shimmerRef = useRef(null)

  useGSAP(() => {
    if (!shimmerRef.current) return
    gsap.to(shimmerRef.current, {
      x: '300%',
      duration: 2,
      repeat: -1,
      repeatDelay: 1.5,
      ease: 'none',
    })
  }, { scope: btnRef })

  return (
    <button
      ref={btnRef}
      className={`shimmer-btn ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      <div
        ref={shimmerRef}
        className="shimmer-btn__shimmer"
        style={{
          position: 'absolute',
          top: 0,
          left: '-50%',
          width: '50%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
    </button>
  )
}

/* ===== Tilt Card - 3D perspective tilt with gsap.quickTo ===== */
export function TiltCard({ children, className = '', maxTilt = 8 }) {
  const ref = useRef(null)
  const rotXTo = useRef(null)
  const rotYTo = useRef(null)

  useGSAP(() => {
    rotXTo.current = gsap.quickTo(ref.current, 'rotationX', { duration: 0.4, ease: 'power3.out' })
    rotYTo.current = gsap.quickTo(ref.current, 'rotationY', { duration: 0.4, ease: 'power3.out' })
    gsap.set(ref.current, { transformPerspective: 1000, transformStyle: 'preserve-3d' })
  }, { scope: ref })

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect || !rotXTo.current || !rotYTo.current) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const px = (e.clientX - cx) / (rect.width / 2)
    const py = (e.clientY - cy) / (rect.height / 2)
    rotYTo.current(px * maxTilt)
    rotXTo.current(-py * maxTilt)
  }, [maxTilt])

  const handleMouseLeave = useCallback(() => {
    if (rotXTo.current) rotXTo.current(0)
    if (rotYTo.current) rotYTo.current(0)
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

/* ===== Animated Gradient Border with GSAP rotation ===== */
export function GradientBorder({ children, className = '', borderWidth = 1 }) {
  const wrapperRef = useRef(null)
  const gradRef = useRef(null)

  useGSAP(() => {
    if (!gradRef.current) return
    gsap.to(gradRef.current, {
      rotation: 360,
      duration: 6,
      repeat: -1,
      ease: 'none',
    })
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className={`gradient-border-wrapper ${className}`} style={{ position: 'relative', padding: borderWidth }}>
      <div
        ref={gradRef}
        className="gradient-border-anim"
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          background: 'conic-gradient(from 0deg, var(--color-accent), transparent 40%, transparent 60%, var(--color-accent-dark))',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'var(--color-bg-secondary)',
          borderRadius: 'inherit',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ===== Stagger Container - children animate via ScrollTrigger.batch ===== */
export function StaggerContainer({ children, className = '', staggerDelay = 0.08, delay = 0 }) {
  const ref = useRef(null)

  useGSAP(() => {
    const items = ref.current.querySelectorAll('.gsap-stagger-item')
    if (!items.length) return

    gsap.set(items, { autoAlpha: 0, y: 40, filter: 'blur(6px)' })

    ScrollTrigger.batch(items, {
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: staggerDelay,
          delay,
          ease: 'power3.out',
          overwrite: true,
        })
      },
      start: 'top 88%',
      once: true,
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <div className={`gsap-stagger-item ${className}`} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}

/* ===== Cursor Glow - follows cursor globally with gsap.quickTo ===== */
export function CursorGlow() {
  const ref = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.6, ease: 'power3.out' })
    yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.6, ease: 'power3.out' })

    function move(e) {
      if (xTo.current) xTo.current(e.clientX - 250)
      if (yTo.current) yTo.current(e.clientY - 250)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-250px, -250px)',
      }}
    />
  )
}

/* ===== Spotlight Card - cursor-following radial gradient ===== */
export function SpotlightCard({ children, className = '', spotlightColor = 'rgba(201, 169, 110, 0.12)' }) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--spot-x', `${x}px`)
    ref.current.style.setProperty('--spot-y', `${y}px`)
  }, [])

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        '--spot-x': '50%',
        '--spot-y': '50%',
      }}
    >
      <div
        className="spotlight-card__glow"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(400px circle at var(--spot-x) var(--spot-y), ${spotlightColor}, transparent 70%)`,
          transition: 'background 0.15s ease',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

/* ===== Parallax Float - subtle floating with GSAP ScrollTrigger ===== */
export function ParallaxFloat({ children, className = '', speed = 0.5 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.to(ref.current, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
