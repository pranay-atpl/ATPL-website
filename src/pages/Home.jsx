import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, Lightbulb, Speaker, Blinds, Thermometer, ShieldCheck, Wrench,
  Building2, Hotel, Home as HomeIcon, MapPin, Star, ChevronRight, Phone,
  Play, CheckCircle2, Clock, Settings, HeadphonesIcon, Sparkles,
  Award, Users, Globe, Zap
} from 'lucide-react'
import './Home.css'

/* ===== Fade-in wrapper ===== */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ===== Counter Animation ===== */
function Counter({ end, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const dur = 2000
    const step = end / (dur / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ===== Brand Logos Marquee ===== */
const brands = ['Lutron', 'Crestron', 'Savant', 'Control4', 'Sonos', 'Bang & Olufsen', 'Somfy', 'KNX', 'Daikin', 'Honeywell']

/* ===== Services Data ===== */
const services = [
  { icon: Lightbulb, title: 'Lighting Automation', desc: 'Precision lighting control that transforms ambiance. Scene-setting, daylight harvesting, and circadian lighting for every space.' },
  { icon: Speaker, title: 'Audio Video Automation', desc: 'Immersive AV experiences with distributed audio, home cinema, and seamless multi-room entertainment systems.' },
  { icon: Blinds, title: 'Shades Automation', desc: 'Motorized shading solutions that balance natural light, privacy, and energy efficiency — all at a touch.' },
  { icon: Thermometer, title: 'HVAC Automation', desc: 'Intelligent climate control with zone management, energy optimization, and seamless integration with BMS.' },
  { icon: ShieldCheck, title: 'Security Automation', desc: 'Comprehensive security with smart surveillance, access control, and intrusion detection systems.' },
  { icon: Wrench, title: 'AMC', desc: 'Annual maintenance contracts to keep your automation systems running at peak performance, 24/7 support included.' },
]

/* ===== Featured Projects ===== */
const projects = [
  { name: 'The Ritz-Carlton, Pune', type: 'Hospitality', desc: 'Delivered a fully integrated automation system for a 120-room luxury hotel improving energy efficiency by 30%.', usps: ['120+ Rooms', 'Energy Savings 30%', 'Full Integration'] },
  { name: 'Ambience Caitriona', type: 'Residential', desc: 'Ultra-premium residential automation across 200+ apartments with personalized scene control and whole-home integration.', usps: ['200+ Units', 'Scene Control', 'Custom UI'] },
  { name: 'DLF Cyber Hub', type: 'Commercial', desc: 'Smart building automation for one of India\'s largest commercial hubs — lighting, HVAC, and security unified.', usps: ['50,000 sq.ft', 'BMS Integration', 'IoT Ready'] },
  { name: 'ITC Grand Bharat', type: 'Hospitality', desc: 'Bespoke automation for India\'s only all-suite luxury resort, blending heritage with cutting-edge technology.', usps: ['All Suites', 'Heritage Design', 'Luxury Tech'] },
  { name: 'Lodha Altamount', type: 'Residential', desc: 'Mumbai\'s most premium address automated with Lutron, Crestron. Each residence uniquely engineered.', usps: ['Ultra Luxury', 'Bespoke Design', 'Premium Brands'] },
]

/* ===== Experience Centers ===== */
const centers = [
  { city: 'New Delhi', address: 'A-12, Green Park, New Delhi 110016', desc: 'Experience our flagship 3,000 sq.ft centre showcasing the latest in luxury automation.' },
  { city: 'Mumbai', address: 'Unit 5, Trade Centre, BKC, Mumbai 400051', desc: 'Our western hub featuring immersive lighting and AV demonstrations.' },
  { city: 'Bangalore', address: '2nd Floor, UB City, Vittal Mallya Rd, Bangalore', desc: 'South India\'s premier automation experience centre for designers and homeowners.' },
]

/* ===== USPs ===== */
const usps = [
  { icon: Settings, title: 'End-to-End Solutions', desc: 'From consultation to commissioning, we handle every aspect of your automation journey.' },
  { icon: Sparkles, title: 'Custom Engineering', desc: 'Every project is uniquely engineered. No cookie-cutter solutions — only bespoke systems.' },
  { icon: Globe, title: 'Premium Global Partners', desc: 'Authorized partners of Lutron, Crestron, Savant, B&O, Sonos, and 30+ premium brands.' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Round-the-clock support team ensuring your systems are always performing flawlessly.' },
  { icon: Award, title: 'Proven Expertise', desc: '20+ years of delivering automation excellence across 1000+ projects in 50+ cities.' },
  { icon: Zap, title: 'Fast Execution', desc: 'Streamlined project delivery with defined milestones and on-time commissioning.' },
]

/* ===== Steps ===== */
const steps = [
  { num: '01', title: 'Consultation', desc: 'We understand your vision, space, and lifestyle to craft the perfect automation blueprint.' },
  { num: '02', title: 'Design & Planning', desc: 'Detailed system design with equipment selection, wiring layouts, and integration architecture.' },
  { num: '03', title: 'Installation', desc: 'Expert installation by certified technicians with minimal disruption to your space.' },
  { num: '04', title: 'Integration', desc: 'Seamless integration of all systems — lighting, AV, shades, HVAC — into one unified control.' },
  { num: '05', title: 'Support', desc: 'Ongoing maintenance, software updates, and 24/7 support to keep everything running perfectly.' },
]

/* ===== Testimonials ===== */
const testimonials = [
  { name: 'Rajiv Mehta', role: 'Homeowner, New Delhi', quote: 'ATPL transformed our home into a living, breathing space. The lighting scenes alone changed how we experience every room.', rating: 5 },
  { name: 'Priya Sharma', role: 'Interior Designer', quote: 'Working with ATPL is a dream for designers. They understand aesthetics as much as technology. Our clients are always amazed.', rating: 5 },
  { name: 'Vikram Patel', role: 'Hotel GM, Goa', quote: 'The automation system improved our guest satisfaction scores by 40% and cut energy costs by 25%. Exceptional ROI.', rating: 5 },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <>
      <Helmet>
        <title>ATPL - Intelligent Automation for Luxury Living & Smart Spaces</title>
        <meta name="description" content="Transforming homes, hotels, and commercial spaces with cutting-edge automation since 2002. 20+ years, 1000+ projects, 50+ cities." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef} id="hero">
        <motion.div className="hero__bg" style={{ scale: heroScale, opacity: heroOpacity }}>
          <div className="hero__gradient" />
          <div className="hero__particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="hero__particle"
                animate={{ y: [-20, 20], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div className="hero__content container" style={{ y: heroY }}>
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles size={14} /> Since 2002
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Intelligent Automation for{' '}
            <span className="gradient-text">Luxury Living</span>
            <br />& Smart Spaces
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transforming homes, hotels, and commercial spaces with cutting-edge automation since 2002.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book a Free Consultation <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-lg">
              Explore Our Projects
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero__scroll-indicator">
          <motion.div
            className="hero__scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section className="trust section" id="trust-signals">
        <div className="container">
          <FadeIn>
            <div className="trust__stats">
              <div className="trust__stat">
                <span className="trust__stat-number"><Counter end={20} suffix="+" /></span>
                <span className="trust__stat-label">Years Experience</span>
              </div>
              <div className="trust__stat-divider" />
              <div className="trust__stat">
                <span className="trust__stat-number"><Counter end={1000} suffix="+" /></span>
                <span className="trust__stat-label">Projects Delivered</span>
              </div>
              <div className="trust__stat-divider" />
              <div className="trust__stat">
                <span className="trust__stat-number"><Counter end={50} suffix="+" /></span>
                <span className="trust__stat-label">Cities</span>
              </div>
              <div className="trust__stat-divider" />
              <div className="trust__stat">
                <span className="trust__stat-number"><Counter end={5} /></span>
                <span className="trust__stat-label">Experience Centres</span>
              </div>
              <div className="trust__stat-divider" />
              <div className="trust__stat">
                <span className="trust__stat-number"><Counter end={200} suffix="+" /></span>
                <span className="trust__stat-label">Premium Clients</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="trust__brands">
              <p className="trust__brands-label">Trusted by Top Brands</p>
              <div className="trust__marquee-container">
                <div className="trust__marquee">
                  {[...brands, ...brands].map((b, i) => (
                    <span key={i} className="trust__brand">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SOLUTIONS BY SPACE ===== */}
      <section className="solutions section" id="solutions">
        <div className="container">
          <FadeIn>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Tailored Automation for Every Space</h2>
          </FadeIn>

          <div className="solutions__grid">
            {[
              { icon: HomeIcon, title: 'Residential', desc: 'Transform your home into an intelligent sanctuary. Personalized automation for lighting, climate, entertainment, and security — engineered for your lifestyle.' },
              { icon: Hotel, title: 'Hospitality', desc: 'Elevate guest experiences with seamless room automation, energy management, and intuitive controls that define five-star luxury.' },
              { icon: Building2, title: 'Commercial', desc: 'Smart building solutions for offices, retail, and co-working spaces. Boost productivity, reduce costs, and future-proof your infrastructure.' },
            ].map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.15}>
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
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="solutions__cta-wrap">
              <Link to="/projects" className="btn btn-secondary">
                Explore All Solutions <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="services section" id="services">
        <div className="container">
          <FadeIn>
            <p className="section-label">Our Expertise</p>
            <h2 className="section-title">Our Automation Expertise</h2>
          </FadeIn>

          <div className="services__grid">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="featured section" id="projects">
        <div className="container">
          <FadeIn>
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">Featured Projects</h2>
          </FadeIn>

          <div className="featured__list">
            {projects.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}>
                <div className="featured__item">
                  <div className="featured__image">
                    <div className="featured__image-placeholder">
                      <Building2 size={48} strokeWidth={1} />
                    </div>
                    <span className="featured__type-badge">{p.type}</span>
                  </div>
                  <div className="featured__info">
                    <h3 className="featured__name">{p.name}</h3>
                    <div className="featured__usps">
                      {p.usps.map((u) => (
                        <span key={u} className="featured__usp">
                          <CheckCircle2 size={12} /> {u}
                        </span>
                      ))}
                    </div>
                    <p className="featured__desc">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="solutions__cta-wrap">
              <Link to="/projects" className="btn btn-secondary">
                Explore More Projects <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="awards section" id="awards">
        <div className="container">
          <FadeIn>
            <p className="section-label">Recognition</p>
            <h2 className="section-title">Awards & Recognition</h2>
            <p className="section-subtitle">Recognized for innovation and excellence in smart automation.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="awards__grid">
              {['Lutron Excellence Award', 'Crestron Masters', 'CEDIA Best Project', 'Smart Home Innovation', 'Green Building Award', 'ISO 9001 Certified'].map((a, i) => (
                <div key={a} className="awards__item glass-card">
                  <Award size={28} className="awards__icon" />
                  <span className="awards__name">{a}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why section" id="why-us">
        <div className="container">
          <FadeIn>
            <p className="section-label">Our Edge</p>
            <h2 className="section-title">Why Leading Brands Choose Us</h2>
          </FadeIn>

          <div className="why__grid">
            {usps.map((u, i) => (
              <FadeIn key={u.title} delay={i * 0.1}>
                <div className="why__card glass-card">
                  <div className="why__icon">
                    <u.icon size={24} />
                  </div>
                  <h3 className="why__card-title">{u.title}</h3>
                  <p className="why__card-desc">{u.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE CENTRES ===== */}
      <section className="centres section" id="experience-centres">
        <div className="container">
          <FadeIn>
            <p className="section-label">Visit Us</p>
            <h2 className="section-title">Experience Smart Living, Firsthand</h2>
            <p className="section-subtitle">Visit our experience centres to explore automation in real environments.</p>
            <p className="centres__sub-stat">1,000+ clients have experienced our solutions before making a decision</p>
          </FadeIn>

          <div className="centres__grid">
            {centers.map((c, i) => (
              <FadeIn key={c.city} delay={i * 0.15}>
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="process section" id="process">
        <div className="container">
          <FadeIn>
            <p className="section-label">How We Work</p>
            <h2 className="section-title">Our Approach</h2>
          </FadeIn>

          <div className="process__timeline">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <div className="process__step">
                  <div className="process__step-number">{s.num}</div>
                  <div className="process__step-content">
                    <h3 className="process__step-title">{s.title}</h3>
                    <p className="process__step-desc">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && <div className="process__connector" />}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <FadeIn>
            <p className="section-label">Client Love</p>
            <h2 className="section-title">What Our Clients Say</h2>
          </FadeIn>

          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.15}>
                <div className="testimonials__card glass-card">
                  <div className="testimonials__stars">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                    ))}
                  </div>
                  <p className="testimonials__quote">"{t.quote}"</p>
                  <div className="testimonials__author">
                    <div className="testimonials__avatar">{t.name.charAt(0)}</div>
                    <div>
                      <p className="testimonials__name">{t.name}</p>
                      <p className="testimonials__role">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta section" id="cta">
        <div className="container">
          <FadeIn>
            <div className="final-cta__card">
              <div className="final-cta__glow" />
              <h2 className="final-cta__title">Ready to Transform Your Space?</h2>
              <p className="final-cta__subtitle">
                Experience seamless automation designed around your lifestyle and business needs.
              </p>
              <div className="final-cta__buttons">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Book Consultation <ArrowRight size={18} />
                </Link>
                <a href="tel:+919999999999" className="btn btn-secondary btn-lg">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
