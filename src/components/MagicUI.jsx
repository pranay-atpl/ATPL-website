import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ===== Spotlight Card - cursor-following radial gradient ===== */
export function SpotlightCard({ children, className = '', spotlightColor = 'rgba(201, 169, 110, 0.12)' }) {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <motion.div
        className="spotlight-card__glow"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: useMotionValue(`radial-gradient(400px circle at 0px 0px, ${spotlightColor}, transparent 70%)`),
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(400px circle at var(--mx) var(--my), ${spotlightColor}, transparent 70%)`,
          '--mx': useSpring(useTransform(mouseX, (v) => `${v}px`), { stiffness: 300, damping: 30 }),
          '--my': useSpring(useTransform(mouseY, (v) => `${v}px`), { stiffness: 300, damping: 30 }),
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

/* ===== Magnetic Button - button follows cursor slightly ===== */
export function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/* ===== Number Ticker - smooth animated count with spring ===== */
export function NumberTicker({ value, className = '', duration = 2, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { duration: duration * 1000 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => motionVal.set(value), delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [inView, value, delay])

  useEffect(() => {
    const unsub = springVal.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [springVal])

  return <span ref={ref} className={className}>{display}</span>
}

/* ===== Shimmer Button ===== */
export function ShimmerButton({ children, className = '', shimmerColor = 'rgba(201, 169, 110, 0.3)', ...props }) {
  return (
    <motion.button
      className={`shimmer-btn ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
      {...props}
    >
      <motion.div
        className="shimmer-btn__shimmer"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
    </motion.button>
  )
}

/* ===== Tilt Card - 3D perspective tilt on hover ===== */
export function TiltCard({ children, className = '', maxTilt = 8 }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const px = (e.clientX - cx) / (rect.width / 2)
    const py = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(px * maxTilt)
    rotateX.set(-py * maxTilt)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
}

/* ===== Animated Gradient Border ===== */
export function GradientBorder({ children, className = '', borderWidth = 1 }) {
  return (
    <div className={`gradient-border-wrapper ${className}`} style={{ position: 'relative', padding: borderWidth }}>
      <motion.div
        className="gradient-border-anim"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
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

/* ===== Parallax Float - subtle floating on scroll ===== */
export function ParallaxFloat({ children, className = '', speed = 0.5 }) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      setOffset((center - viewportCenter) * speed * 0.1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: offset }}
    >
      {children}
    </motion.div>
  )
}

/* ===== Stagger Container - children animate in sequence ===== */
export function StaggerContainer({ children, className = '', staggerDelay = 0.08, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ===== Cursor Glow - follows cursor globally ===== */
export function CursorGlow() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 200, damping: 30 })
  const springY = useSpring(y, { stiffness: 200, damping: 30 })

  useEffect(() => {
    function move(e) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
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
        x: useTransform(springX, (v) => v - 250),
        y: useTransform(springY, (v) => v - 250),
      }}
    />
  )
}
