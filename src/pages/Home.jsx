import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  { name: 'The Ritz-Carlton, Pune', type: 'Hospitality', desc: 'Delivered a fully integrated automation system for a 120-room luxury hotel improving energy efficiency by 30%.', usps: ['120+ Rooms', 'Energy Savings 30%', 'Full Integration'] },
  { name: 'Ambience Caitriona', type: 'Residential', desc: 'Ultra-premium residential automation across 200+ apartments with personalized scene control and whole-home integration.', usps: ['200+ Units', 'Scene Control', 'Custom UI'] },
  { name: 'DLF Cyber Hub', type: 'Commercial', desc: 'Smart building automation for one of India\'s largest commercial hubs — lighting, HVAC, and security unified.', usps: ['50,000 sq.ft', 'BMS Integration', 'IoT Ready'] },
  { name: 'ITC Grand Bharat', type: 'Hospitality', desc: 'Bespoke automation for India\'s only all-suite luxury resort, blending heritage with cutting-edge technology.', usps: ['All Suites', 'Heritage Design', 'Luxury Tech'] },
  { name: 'Lodha Altamount', type: 'Residential', desc: 'Mumbai\'s most premium address automated with Lutron, Crestron. Each residence uniquely engineered.', usps: ['Ultra Luxury', 'Bespoke Design', 'Premium Brands'] },
]

const centers = [
  { city: 'New Delhi', address: 'A-12, Green Park, New Delhi 110016', desc: 'Experience our flagship 3,000 sq.ft centre showcasing the latest in luxury automation.' },
  { city: 'Mumbai', address: 'Unit 5, Trade Centre, BKC, Mumbai 400051', desc: 'Our western hub featuring immersive lighting and AV demonstrations.' },
  { city: 'Bangalore', address: '2nd Floor, UB City, Vittal Mallya Rd, Bangalore', desc: 'South India\'s premier automation experience centre for designers and homeowners.' },
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const [activeProject, setActiveProject] = useState(0)

  /* Auto-rotate projects */
  useEffect(() => {
    const timer = setInterval(() => setActiveProject((p) => (p + 1) % projects.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>ATPL - Intelligent Automation for Luxury Living & Smart Spaces</title>
        <meta name="description" content="Transforming homes, hotels, and commercial spaces with cutting-edge automation since 2002. 20+ years, 1000+ projects, 50+ cities." />
      </Helmet>

      <CursorGlow />

      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef} id="hero">
        <motion.div className="hero__bg" style={{ scale: heroScale, opacity: heroOpacity }}>
          <div className="hero__gradient" />
          <div className="hero__grid-lines" />
          <div className="hero__particles">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="hero__particle"
                animate={{
                  y: [0, -30 - Math.random() * 40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                }}
              />
            ))}
          </div>
          {/* Floating accent orbs */}
          <motion.div
            className="hero__orb hero__orb--1"
            animate={{ y: [-20, 20, -20], x: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero__orb hero__orb--2"
            animate={{ y: [15, -25, 15], x: [-15, 5, -15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div className="hero__content container" style={{ y: heroY }}>
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Sparkles size={14} /> Since 2002
          </motion.div>

          <h1 className="hero__title">
            <CharReveal delay={0.4}>Intelligent Automation for</CharReveal>
            <br />
            <span className="gradient-text">
              <CharReveal delay={0.8}>Luxury Living</CharReveal>
            </span>
            <br />
            <CharReveal delay={1.1}>& Smart Spaces</CharReveal>
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
                <motion.div
                  className="shimmer-btn__shimmer"
                  animate={{ x: ['-100%', '250%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
                />
              </MagneticButton>
              <MagneticButton className="btn btn-secondary btn-lg" strength={0.15}>
                <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
                  Explore Our Projects
                </Link>
              </MagneticButton>
            </div>
          </BlurFade>
        </motion.div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span className="hero__scroll-text">Scroll</span>
          <motion.div
            className="hero__scroll-line"
            animate={{ scaleY: [0, 1, 0], y: [0, 0, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
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
                <div className="trust__marquee">
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
              { icon: HomeIcon, title: 'Residential', desc: 'Transform your home into an intelligent sanctuary. Personalized automation for lighting, climate, entertainment, and security — engineered for your lifestyle.' },
              { icon: Hotel, title: 'Hospitality', desc: 'Elevate guest experiences with seamless room automation, energy management, and intuitive controls that define five-star luxury.' },
              { icon: Building2, title: 'Commercial', desc: 'Smart building solutions for offices, retail, and co-working spaces. Boost productivity, reduce costs, and future-proof your infrastructure.' },
            ].map((s) => (
              <StaggerItem key={s.title}>
                <TiltCard maxTilt={6}>
                  <div className="solutions__card glass-card">
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
                  <motion.button
                    key={p.name}
                    className={`featured__tab ${activeProject === i ? 'featured__tab--active' : ''}`}
                    onClick={() => setActiveProject(i)}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="featured__tab-num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="featured__tab-info">
                      <span className="featured__tab-name">{p.name}</span>
                      <span className="featured__tab-type">{p.type}</span>
                    </div>
                    <ArrowUpRight size={16} className="featured__tab-arrow" />
                    {activeProject === i && (
                      <motion.div className="featured__tab-indicator" layoutId="project-indicator" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Active Project Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  className="featured__detail"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="featured__detail-image">
                    <div className="featured__detail-placeholder">
                      <Building2 size={64} strokeWidth={0.8} />
                    </div>
                    <span className="featured__type-badge">{projects[activeProject].type}</span>
                    <div className="featured__detail-overlay" />
                  </div>
                  <div className="featured__detail-info">
                    <motion.h3
                      className="featured__detail-name"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {projects[activeProject].name}
                    </motion.h3>
                    <div className="featured__usps">
                      {projects[activeProject].usps.map((u, j) => (
                        <motion.span
                          key={u}
                          className="featured__usp"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + j * 0.1 }}
                        >
                          <CheckCircle2 size={13} /> {u}
                        </motion.span>
                      ))}
                    </div>
                    <motion.p
                      className="featured__detail-desc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {projects[activeProject].desc}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link to="/projects" className="btn btn-secondary btn-sm" style={{ marginTop: 20 }}>
                        View Project <ArrowUpRight size={14} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

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

          <StaggerContainer className="centres__grid" staggerDelay={0.15}>
            {centers.map((c) => (
              <StaggerItem key={c.city}>
                <TiltCard maxTilt={4}>
                  <div className="centres__card glass-card">
                    <div className="centres__image-placeholder">
                      <MapPin size={32} strokeWidth={1} />
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
              <motion.div
                className="process__line-fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <StaggerContainer className="process__steps" staggerDelay={0.15}>
              {steps.map((s, i) => (
                <StaggerItem key={s.num}>
                  <div className="process__step">
                    <div className="process__step-dot">
                      <motion.div
                        className="process__step-dot-inner"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </div>
                    <div className="process__step-number">{s.num}</div>
                    <h3 className="process__step-title">{s.title}</h3>
                    <p className="process__step-desc">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS - CAROUSEL ===== */}
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
    </>
  )
}
