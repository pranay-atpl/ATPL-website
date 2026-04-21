import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, Lightbulb, Speaker, Blinds, Thermometer, ShieldCheck, Wrench,
  Building2, Hotel, Home as HomeIcon, MapPin, Star, ChevronRight, Phone,
  CheckCircle2, Sparkles, Award, Users, Globe, Zap, Settings, HeadphonesIcon,
  ArrowUpRight, Play
} from 'lucide-react'
import { TextReveal, BlurFade, CharReveal } from '../components/AnimatedText.jsx'
import {
  MagneticButton, NumberTicker, ShimmerButton, TiltCard,
  GradientBorder, StaggerContainer, StaggerItem, CursorGlow
} from '../components/MagicUI.jsx'
import './Home.css'

/* ===== Data ===== */
const brands = ['Lutron', 'Crestron', 'Savant', 'Control4', 'Sonos', 'Bang & Olufsen', 'Somfy', 'KNX', 'Daikin', 'Honeywell']

const services = [
  { icon: Lightbulb, title: 'Lighting Automation', desc: 'Precision lighting control that transforms ambiance. Scene-setting, daylight harvesting, and circadian lighting for every space.' },
  { icon: Speaker, title: 'Audio Video Automation', desc: 'Immersive AV experiences with distributed audio, home cinema, and seamless multi-room entertainment systems.' },
  { icon: Blinds, title: 'Shades Automation', desc: 'Motorized shading solutions that balance natural light, privacy, and energy efficiency — all at a touch.' },
  { icon: Thermometer, title: 'HVAC Automation', desc: 'Intelligent climate control with zone management, energy optimization, and seamless integration with BMS.' },
  { icon: ShieldCheck, title: 'Security Automation', desc: 'Comprehensive security with smart surveillance, access control, and intrusion detection systems.' },
  { icon: Wrench, title: 'AMC', desc: 'Annual maintenance contracts to keep your automation systems running at peak performance, 24/7 support included.' },
]

const projects = [
  { name: 'The Ritz-Carlton, Pune', type: 'Hospitality', desc: 'Delivered a fully integrated automation system for a 120-room luxury hotel improving energy efficiency by 30%.', usps: ['120+ Rooms', 'Energy Savings 30%', 'Full Integration'], img: '_PAB2918-HDR.jpg' },
  { name: 'Ambience Caitriona', type: 'Residential', desc: 'Ultra-premium residential automation across 200+ apartments with personalized scene control and whole-home integration.', usps: ['200+ Units', 'Scene Control', 'Custom UI'], img: '_PAB2943-HDR.jpg' },
  { name: 'DLF Cyber Hub', type: 'Commercial', desc: 'Smart building automation for one of India\'s largest commercial hubs — lighting, HVAC, and security unified.', usps: ['50,000 sq.ft', 'BMS Integration', 'IoT Ready'], img: '_PAB3085-HDR.jpg' },
  { name: 'ITC Grand Bharat', type: 'Hospitality', desc: 'Bespoke automation for India\'s only all-suite luxury resort, blending heritage with cutting-edge technology.', usps: ['All Suites', 'Heritage Design', 'Luxury Tech'], img: '_PAB2990-HDR.jpg' },
  { name: 'Lodha Altamount', type: 'Residential', desc: 'Mumbai\'s most premium address automated with Lutron, Crestron. Each residence uniquely engineered.', usps: ['Ultra Luxury', 'Bespoke Design', 'Premium Brands'], img: '_PAB2828-HDR.jpg' },
]

const centers = [
  { city: 'New Delhi', address: 'A-12, Green Park, New Delhi 110016', desc: 'Experience our flagship 3,000 sq.ft centre showcasing the latest in luxury automation.', img: '_PAB2838-HDR.jpg' },
  { city: 'Mumbai', address: 'Unit 5, Trade Centre, BKC, Mumbai 400051', desc: 'Our western hub featuring immersive lighting and AV demonstrations.', img: '_PAB2858-HDR.jpg' },
  { city: 'Bangalore', address: '2nd Floor, UB City, Vittal Mallya Rd, Bangalore', desc: 'South India\'s premier automation experience centre for designers and homeowners.', img: '_PAB3110-HDR.jpg' },
]

const usps = [
  { icon: Settings, title: 'End-to-End Solutions', desc: 'From consultation to commissioning, we handle every aspect of your automation journey.' },
  { icon: Sparkles, title: 'Custom Engineering', desc: 'Every project is uniquely engineered. No cookie-cutter solutions — only bespoke systems.' },
  { icon: Globe, title: 'Premium Global Partners', desc: 'Authorized partners of Lutron, Crestron, Savant, B&O, Sonos, and 30+ premium brands.' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Round-the-clock support team ensuring your systems are always performing flawlessly.' },
  { icon: Award, title: 'Proven Expertise', desc: '20+ years of delivering automation excellence across 1000+ projects in 50+ cities.' },
  { icon: Zap, title: 'Fast Execution', desc: 'Streamlined project delivery with defined milestones and on-time commissioning.' },
]

const steps = [
  { num: '01', title: 'Consultation', desc: 'We understand your vision, space, and lifestyle to craft the perfect automation blueprint.' },
  { num: '02', title: 'Design & Planning', desc: 'Detailed system design with equipment selection, wiring layouts, and integration architecture.' },
  { num: '03', title: 'Installation', desc: 'Expert installation by certified technicians with minimal disruption to your space.' },
  { num: '04', title: 'Integration', desc: 'Seamless integration of all systems — lighting, AV, shades, HVAC — into one unified control.' },
  { num: '05', title: 'Support', desc: 'Ongoing maintenance, software updates, and 24/7 support to keep everything running perfectly.' },
]

const testimonials = [
  { name: 'Rajiv Mehta', role: 'Homeowner, New Delhi', quote: 'ATPL transformed our home into a living, breathing space. The lighting scenes alone changed how we experience every room.', rating: 5 },
  { name: 'Priya Sharma', role: 'Interior Designer', quote: 'Working with ATPL is a dream for designers. They understand aesthetics as much as technology. Our clients are always amazed.', rating: 5 },
  { name: 'Vikram Patel', role: 'Hotel GM, Goa', quote: 'The automation system improved our guest satisfaction scores by 40% and cut energy costs by 25%. Exceptional ROI.', rating: 5 },
]

export default function Home() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const homeRef = useRef(null)
  const marqueeRef = useRef(null)
  const processLineRef = useRef(null)

  /* ===== Framer Motion: Canvas frame scrubber for global background ===== */
  const { scrollYProgress } = useScroll()
  const frameCount = 192
  const images = useRef([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const drawFrame = (index) => {
    if (!canvasRef.current || !images.current[index]) return
    const ctx = canvasRef.current.getContext('2d', { alpha: false })
    const img = images.current[index]
    const canvas = canvasRef.current
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
    const x = (canvas.width / 2) - (img.width / 2) * scale
    const y = (canvas.height / 2) - (img.height / 2) * scale
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
  }

  useEffect(() => {
    let loaded = 0
    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      const formattedIndex = String(i).padStart(4, '0')
      img.src = `${import.meta.env.BASE_URL}frames/frame-${formattedIndex}.jpg`
      img.onload = () => {
        loaded++
        if (loaded === frameCount) setImagesLoaded(true)
        if (i === 0) {
          if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = window.innerHeight
            drawFrame(0)
          }
        }
      }
      images.current.push(img)
    }

    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        const progress = scrollYProgress.get()
        const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)))
        if (images.current[frameIndex]?.complete) drawFrame(frameIndex)
      }
    }
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [scrollYProgress])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return
    const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(latest * frameCount)))
    drawFrame(frameIndex)
  })

  // Framer Motion transforms for the canvas background parallax
  const globalBgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const globalBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const globalBgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.4, 0.05])

  const [activeProject, setActiveProject] = useState(0)

  /* Auto-rotate projects */
  useEffect(() => {
    const timer = setInterval(() => setActiveProject((p) => (p + 1) % projects.length), 5000)
    return () => clearInterval(timer)
  }, [])

  /* ===== GSAP: All section animations ===== */
  useGSAP(() => {
    // =============================================
    // HERO — Entrance Timeline
    // =============================================
    const heroTl = gsap.timeline({ delay: 0.2 })

    // Badge entrance
    heroTl.from('.hero__badge', {
      autoAlpha: 0,
      scale: 0.8,
      y: 20,
      duration: 0.6,
      ease: 'back.out(1.7)',
    })

    // Particles float animation
    const particles = document.querySelectorAll('.hero__particle')
    particles.forEach((p, i) => {
      gsap.to(p, {
        y: `-=${30 + Math.random() * 40}`,
        x: `+=${Math.random() * 20 - 10}`,
        autoAlpha: 0.6,
        scale: 1,
        duration: 4 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3,
        ease: 'sine.inOut',
      })
    })

    // Floating orbs
    gsap.to('.hero__orb--1', {
      y: 20, x: -10, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
    gsap.to('.hero__orb--2', {
      y: -25, x: 5, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })

    // Scroll indicator
    gsap.from('.hero__scroll-indicator', {
      autoAlpha: 0, duration: 0.6, delay: 2.5,
    })
    gsap.to('.hero__scroll-line', {
      scaleY: [0, 1, 0],
      y: [0, 0, 20],
      duration: 2,
      repeat: -1,
      ease: 'sine.inOut',
      keyframes: [
        { scaleY: 0, y: 0, duration: 0.6 },
        { scaleY: 1, y: 0, duration: 0.6 },
        { scaleY: 0, y: 20, duration: 0.8 },
      ]
    })

    // Hero content parallax on scroll
    gsap.to('.hero__content', {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Hero overall fade on scroll
    gsap.to('.hero__bg', {
      scale: 1.15,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // =============================================
    // TRUST SIGNALS — Batch reveal + Marquee
    // =============================================
    gsap.from('.trust__stats', {
      autoAlpha: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.trust',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // GSAP-driven infinite marquee (replacing CSS animation)
    const marqueeInner = document.querySelector('.trust__marquee')
    if (marqueeInner) {
      // Calculate total width and set up infinite loop
      gsap.to(marqueeInner, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: 'none',
      })
    }

    // =============================================
    // SOLUTIONS — Parallax background + scroll entrance
    // =============================================
    gsap.to('.solutions', {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.solutions',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // =============================================
    // SERVICES — Section parallax + hover setup
    // =============================================
    gsap.from('.services', {
      backgroundPositionY: '-20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.services',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // =============================================
    // FEATURED PROJECTS — Project card image reveal
    // =============================================
    gsap.from('.featured__showcase', {
      autoAlpha: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.featured',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    // Tab entrance animations
    const tabs = document.querySelectorAll('.featured__tab')
    gsap.from(tabs, {
      autoAlpha: 0,
      x: -30,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.featured',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    // =============================================
    // AWARDS — Icon spin + batch entrance
    // =============================================
    const awardIcons = document.querySelectorAll('.awards__icon')
    awardIcons.forEach((icon) => {
      gsap.from(icon, {
        rotation: -180,
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: icon,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    // =============================================
    // EXPERIENCE CENTRES — Video section + photo parallax
    // =============================================
    const centreImages = document.querySelectorAll('.centres__image')
    centreImages.forEach((img) => {
      gsap.from(img, {
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    // Video playback tied to scroll
    const videoEl = document.querySelector('.centres__video')
    if (videoEl) {
      ScrollTrigger.create({
        trigger: '.centres__video-wrapper',
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => videoEl.play(),
        onLeave: () => videoEl.pause(),
        onEnterBack: () => videoEl.play(),
        onLeaveBack: () => videoEl.pause(),
      })
    }

    // =============================================
    // PROCESS TIMELINE — Scrub-linked line fill
    // =============================================
    gsap.from('.process__line-fill', {
      scaleX: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.process__timeline',
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 1,
      },
    })

    // Step-by-step reveal
    const processSteps = document.querySelectorAll('.process__step')
    gsap.from(processSteps, {
      autoAlpha: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process__timeline',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    // Dot pulse animations
    const dots = document.querySelectorAll('.process__step-dot-inner')
    dots.forEach((dot, i) => {
      gsap.to(dot, {
        scale: 1.5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
        ease: 'sine.inOut',
      })
    })

    // Step numbers: toggleClass on scroll
    processSteps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 70%',
        toggleClass: { targets: step, className: 'process__step--active' },
      })
    })

    // =============================================
    // TESTIMONIALS — Quote mark animation + batch
    // =============================================
    const quoteMarks = document.querySelectorAll('.testimonials__quote-mark')
    gsap.from(quoteMarks, {
      autoAlpha: 0,
      scale: 0,
      rotation: -20,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Star animations
    const stars = document.querySelectorAll('.testimonials__stars svg')
    gsap.from(stars, {
      autoAlpha: 0,
      scale: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Avatar scale
    const avatars = document.querySelectorAll('.testimonials__avatar')
    gsap.from(avatars, {
      scale: 0,
      duration: 0.5,
      stagger: 0.15,
      delay: 0.3,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // =============================================
    // FINAL CTA — Parallax glow + entrance timeline
    // =============================================
    gsap.to('.final-cta__glow', {
      y: -100,
      scale: 1.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.final-cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // CTA entrance
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.final-cta',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    ctaTl.from('.final-cta__card', {
      autoAlpha: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from('.final-cta__buttons .btn', {
      autoAlpha: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.3')

    // =============================================
    // RESPONSIVE — gsap.matchMedia
    // =============================================
    const mm = gsap.matchMedia()
    mm.add({
      isDesktop: '(min-width: 1024px)',
      isMobile: '(max-width: 1023px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const { isDesktop, reduceMotion } = context.conditions

      if (reduceMotion) {
        // Kill all ScrollTriggers and skip animations for a11y
        ScrollTrigger.getAll().forEach(st => st.kill())
        gsap.globalTimeline.clear()
        return
      }

      if (isDesktop) {
        // Desktop-only: Service card icon hover lift
        document.querySelectorAll('.services__card').forEach((card) => {
          const icon = card.querySelector('.services__icon')
          if (icon) {
            card.addEventListener('mouseenter', () => {
              gsap.to(icon, { y: -4, boxShadow: '0 8px 30px rgba(201, 169, 110, 0.15)', duration: 0.3, ease: 'power2.out' })
            })
            card.addEventListener('mouseleave', () => {
              gsap.to(icon, { y: 0, boxShadow: 'none', duration: 0.3, ease: 'power2.out' })
            })
          }
        })
      }
    })

  }, { scope: homeRef })

  // Handle project transition animations with GSAP
  const prevProjectRef = useRef(0)
  useEffect(() => {
    const detail = document.querySelector('.featured__detail')
    if (!detail) return

    const tl = gsap.timeline()
    tl.fromTo(detail,
      { autoAlpha: 0, y: 20, filter: 'blur(10px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
    )

    const detailName = detail.querySelector('.featured__detail-name')
    if (detailName) {
      tl.from(detailName, { autoAlpha: 0, x: 20, duration: 0.4, ease: 'power2.out' }, '-=0.3')
    }

    const uspItems = detail.querySelectorAll('.featured__usp')
    if (uspItems.length) {
      tl.from(uspItems, { autoAlpha: 0, y: 10, stagger: 0.08, duration: 0.3, ease: 'power2.out' }, '-=0.2')
    }

    const detailDesc = detail.querySelector('.featured__detail-desc')
    if (detailDesc) {
      tl.from(detailDesc, { autoAlpha: 0, duration: 0.3 }, '-=0.1')
    }

    prevProjectRef.current = activeProject
  }, [activeProject])

  return (
    <div ref={homeRef}>
      <Helmet>
        <title>ATPL - Intelligent Automation for Luxury Living & Smart Spaces</title>
        <meta name="description" content="Transforming homes, hotels, and commercial spaces with cutting-edge automation since 2002. 20+ years, 1000+ projects, 50+ cities." />
      </Helmet>

      <CursorGlow />

      {/* ===== GLOBAL CINEMATIC BACKGROUND (Framer Motion for canvas scrub) ===== */}
      <motion.div
        className="global-background"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -2,
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
        }}
      >
        <motion.canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '120vh',
            objectFit: 'cover',
            opacity: globalBgOpacity,
            scale: globalBgScale,
            y: globalBgY,
            filter: 'brightness(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, #0a0a0a 100%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef} id="hero">
        <div className="hero__bg">
          <div className="hero__glass-screen" />
          <div className="hero__grid-lines" />
          <div className="hero__particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="hero__particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
        </div>

        <div className="hero__content container">
          <div className="hero__badge" style={{ visibility: 'hidden' }}>
            <Sparkles size={14} /> Since 2002
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line"><CharReveal delay={0.4}>The Future of</CharReveal></span>
            <br />
            <span className="hero__title-line hero__title-glow">
              <CharReveal delay={0.8}>Smart Living.</CharReveal>
            </span>
          </h1>

          <BlurFade delay={1.4}>
            <p className="hero__subtitle">
              Transforming homes, hotels, and commercial spaces with cutting-edge automation since 2002.
            </p>
          </BlurFade>

          <BlurFade delay={1.6}>
            <div className="hero__cta-group">
              <MagneticButton className="btn btn-primary btn-lg shimmer-btn" strength={0.15}>
                <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                  Book a Free Consultation <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <MagneticButton className="btn btn-secondary btn-lg" strength={0.15}>
                <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                  Explore Our Projects
                </Link>
              </MagneticButton>
            </div>
          </BlurFade>
        </div>

        <div className="hero__scroll-indicator" style={{ visibility: 'hidden' }}>
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section className="trust section" id="trust-signals">
        <div className="container">
          <BlurFade>
            <div className="trust__stats">
              {[
                { end: 20, suffix: '+', label: 'Years Experience' },
                { end: 1000, suffix: '+', label: 'Projects Delivered' },
                { end: 50, suffix: '+', label: 'Cities' },
                { end: 5, suffix: '', label: 'Experience Centres' },
                { end: 200, suffix: '+', label: 'Premium Clients' },
              ].map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="trust__stat-divider" />}
                  <div className="trust__stat">
                    <span className="trust__stat-number">
                      <NumberTicker value={s.end} delay={0.3 + i * 0.15} />{s.suffix}
                    </span>
                    <span className="trust__stat-label">{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="trust__brands">
              <p className="trust__brands-label">Trusted by Top Brands</p>
              <div className="trust__marquee-container">
                <div className="trust__marquee" ref={marqueeRef}>
                  {[...brands, ...brands, ...brands].map((b, i) => (
                    <span key={i} className="trust__brand">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ===== SOLUTIONS BY SPACE ===== */}
      <section className="solutions section" id="solutions">
        <div className="container">
          <BlurFade>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">
              <TextReveal>Tailored Automation for Every Space</TextReveal>
            </h2>
          </BlurFade>

          <StaggerContainer className="solutions__grid" staggerDelay={0.15} delay={0.2}>
            {[
              { icon: HomeIcon, title: 'Residential', desc: 'Transform your home into an intelligent sanctuary. Personalized automation for lighting, climate, entertainment, and security — engineered for your lifestyle.', img: '_PAB2828-HDR.jpg' },
              { icon: Hotel, title: 'Hospitality', desc: 'Elevate guest experiences with seamless room automation, energy management, and intuitive controls that define five-star luxury.', img: '_PAB2918-HDR.jpg' },
              { icon: Building2, title: 'Commercial', desc: 'Smart building solutions for offices, retail, and co-working spaces. Boost productivity, reduce costs, and future-proof your infrastructure.', img: '_PAB3085-HDR.jpg' },
            ].map((s) => (
              <StaggerItem key={s.title}>
                <TiltCard maxTilt={6}>
                  <div className="solutions__card glass-card">
                    <div className="solutions__card-image">
                      <img
                        src={`${import.meta.env.BASE_URL}media/photos/${s.img}`}
                        alt={s.title}
                        loading="lazy"
                      />
                      <div className="solutions__card-image-overlay" />
                    </div>
                    <div className="solutions__icon-wrapper">
                      <s.icon size={28} />
                    </div>
                    <h3 className="solutions__card-title">{s.title}</h3>
                    <p className="solutions__card-desc">{s.desc}</p>
                    <Link to={`/projects/${s.title.toLowerCase()}`} className="solutions__card-link">
                      Explore <ArrowRight size={16} />
                    </Link>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <BlurFade delay={0.5}>
            <div className="solutions__cta-wrap">
              <MagneticButton className="btn btn-secondary" strength={0.12}>
                <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                  Explore All Solutions <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="services section" id="services">
        <div className="container">
          <BlurFade>
            <p className="section-label">Our Expertise</p>
            <h2 className="section-title">
              <TextReveal>Our Automation Expertise</TextReveal>
            </h2>
          </BlurFade>

          <StaggerContainer className="services__grid" staggerDelay={0.1} delay={0.15}>
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <TiltCard maxTilt={5}>
                  <div className="services__card glass-card">
                    <div className="services__icon">
                      <s.icon size={24} />
                    </div>
                    <h3 className="services__card-title">{s.title}</h3>
                    <p className="services__card-desc">{s.desc}</p>
                    <Link to="/disciplines" className="services__card-link">
                      Learn More <ChevronRight size={14} />
                    </Link>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS - INTERACTIVE SHOWCASE ===== */}
      <section className="featured section" id="projects">
        <div className="container">
          <BlurFade>
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">
              <TextReveal>Featured Projects</TextReveal>
            </h2>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="featured__showcase">
              {/* Project Tabs */}
              <div className="featured__tabs">
                {projects.map((p, i) => (
                  <button
                    key={p.name}
                    className={`featured__tab ${activeProject === i ? 'featured__tab--active' : ''}`}
                    onClick={() => setActiveProject(i)}
                  >
                    <span className="featured__tab-num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="featured__tab-info">
                      <span className="featured__tab-name">{p.name}</span>
                      <span className="featured__tab-type">{p.type}</span>
                    </div>
                    <ArrowUpRight size={16} className="featured__tab-arrow" />
                    {activeProject === i && (
                      <div className="featured__tab-indicator" />
                    )}
                  </button>
                ))}
              </div>

              {/* Active Project Detail */}
              <div className="featured__detail" key={activeProject}>
                <div className="featured__detail-image">
                  <img
                    src={`${import.meta.env.BASE_URL}media/photos/${projects[activeProject].img}`}
                    alt={projects[activeProject].name}
                    className="featured__detail-photo"
                  />
                  <span className="featured__type-badge">{projects[activeProject].type}</span>
                  <div className="featured__detail-overlay" />
                </div>
                <div className="featured__detail-info">
                  <h3 className="featured__detail-name">
                    {projects[activeProject].name}
                  </h3>
                  <div className="featured__usps">
                    {projects[activeProject].usps.map((u, j) => (
                      <span key={u} className="featured__usp">
                        <CheckCircle2 size={13} /> {u}
                      </span>
                    ))}
                  </div>
                  <p className="featured__detail-desc">
                    {projects[activeProject].desc}
                  </p>
                  <div style={{ marginTop: 20 }}>
                    <Link to="/projects" className="btn btn-secondary btn-sm">
                      View Project <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="featured__dots">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    className={`featured__dot ${activeProject === i ? 'featured__dot--active' : ''}`}
                    onClick={() => setActiveProject(i)}
                  />
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="solutions__cta-wrap">
              <MagneticButton className="btn btn-secondary" strength={0.12}>
                <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                  Explore All Projects <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="awards section" id="awards">
        <div className="container">
          <BlurFade>
            <p className="section-label">Recognition</p>
            <h2 className="section-title">
              <TextReveal>Awards & Recognition</TextReveal>
            </h2>
            <p className="section-subtitle">Recognized for innovation and excellence in smart automation.</p>
          </BlurFade>

          <StaggerContainer className="awards__grid" staggerDelay={0.08}>
            {['Lutron Excellence Award', 'Crestron Masters', 'CEDIA Best Project', 'Smart Home Innovation', 'Green Building Award', 'ISO 9001 Certified'].map((a) => (
              <StaggerItem key={a}>
                <div className="awards__item glass-card">
                  <Award size={28} className="awards__icon" />
                  <span className="awards__name">{a}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why section" id="why-us">
        <div className="container">
          <BlurFade>
            <p className="section-label">Our Edge</p>
            <h2 className="section-title">
              <TextReveal>Why Leading Brands Choose Us</TextReveal>
            </h2>
          </BlurFade>

          <StaggerContainer className="why__grid" staggerDelay={0.1}>
            {usps.map((u) => (
              <StaggerItem key={u.title}>
                <TiltCard maxTilt={4}>
                  <div className="why__card glass-card">
                    <div className="why__icon">
                      <u.icon size={24} />
                    </div>
                    <h3 className="why__card-title">{u.title}</h3>
                    <p className="why__card-desc">{u.desc}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== EXPERIENCE CENTRES ===== */}
      <section className="centres section" id="experience-centres">
        <div className="container">
          <BlurFade>
            <p className="section-label">Visit Us</p>
            <h2 className="section-title">
              <TextReveal>Experience Smart Living, Firsthand</TextReveal>
            </h2>
            <p className="section-subtitle">Visit our experience centres to explore automation in real environments.</p>
            <p className="centres__sub-stat">
              <NumberTicker value={1000} delay={0.5} />+ clients have experienced our solutions
            </p>
          </BlurFade>

          {/* Video Showcase */}
          <BlurFade delay={0.2}>
            <div className="centres__video-wrapper">
              <video
                className="centres__video"
                src={`${import.meta.env.BASE_URL}media/videos/experience-lights.mp4`}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="centres__video-overlay">
                <Play size={64} strokeWidth={1} />
                <span className="centres__video-caption">Mumbai Experience Centre</span>
              </div>
            </div>
          </BlurFade>

          <StaggerContainer className="centres__grid" staggerDelay={0.15}>
            {centers.map((c) => (
              <StaggerItem key={c.city}>
                <TiltCard maxTilt={4}>
                  <div className="centres__card glass-card">
                    <div className="centres__image-container">
                      <img
                        src={`${import.meta.env.BASE_URL}media/photos/${c.img}`}
                        alt={`${c.city} Experience Centre`}
                        className="centres__image"
                        loading="lazy"
                      />
                    </div>
                    <div className="centres__info">
                      <h3 className="centres__city">{c.city}</h3>
                      <p className="centres__desc">{c.desc}</p>
                      <p className="centres__address"><MapPin size={14} /> {c.address}</p>
                      <div className="centres__actions">
                        <Link to="/contact" className="btn btn-primary btn-sm">Book a Visit</Link>
                        <a href="#" className="btn btn-secondary btn-sm">Get Directions</a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== PROCESS - HORIZONTAL TIMELINE ===== */}
      <section className="process section" id="process">
        <div className="container">
          <BlurFade>
            <p className="section-label">How We Work</p>
            <h2 className="section-title">
              <TextReveal>Our Approach</TextReveal>
            </h2>
          </BlurFade>

          <div className="process__timeline">
            <div className="process__line">
              <div className="process__line-fill" ref={processLineRef} />
            </div>
            <div className="process__steps">
              {steps.map((s, i) => (
                <div key={s.num} className="process__step">
                  <div className="process__step-dot">
                    <div className="process__step-dot-inner" />
                  </div>
                  <div className="process__step-number">{s.num}</div>
                  <h3 className="process__step-title">{s.title}</h3>
                  <p className="process__step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <BlurFade>
            <p className="section-label">Client Love</p>
            <h2 className="section-title">
              <TextReveal>What Our Clients Say</TextReveal>
            </h2>
          </BlurFade>

          <StaggerContainer className="testimonials__grid" staggerDelay={0.15}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <TiltCard maxTilt={3}>
                  <div className="testimonials__card glass-card">
                    <div className="testimonials__quote-mark">"</div>
                    <div className="testimonials__stars">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                      ))}
                    </div>
                    <p className="testimonials__quote">{t.quote}</p>
                    <div className="testimonials__author">
                      <div className="testimonials__avatar">{t.name.charAt(0)}</div>
                      <div>
                        <p className="testimonials__name">{t.name}</p>
                        <p className="testimonials__role">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta section" id="cta">
        <div className="container">
          <BlurFade>
            <GradientBorder className="final-cta__border-wrap" borderWidth={1}>
              <div className="final-cta__card">
                <div className="final-cta__glow" />
                <h2 className="final-cta__title">
                  <TextReveal>Ready to Transform Your Space?</TextReveal>
                </h2>
                <p className="final-cta__subtitle">
                  Experience seamless automation designed around your lifestyle and business needs.
                </p>
                <div className="final-cta__buttons">
                  <ShimmerButton className="btn btn-primary btn-lg">
                    <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                      Book Consultation <ArrowRight size={18} />
                    </Link>
                  </ShimmerButton>
                  <MagneticButton className="btn btn-secondary btn-lg" strength={0.12}>
                    <a href="tel:+919999999999" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                      <Phone size={18} /> Call Now
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </GradientBorder>
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
