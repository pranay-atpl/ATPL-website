import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Projects',
    path: '/projects',
    sub: [
      { label: 'Hospitality', path: '/projects/hospitality' },
      { label: 'Residential', path: '/projects/residential' },
      { label: 'Commercial', path: '/projects/commercial' },
    ],
  },
  {
    label: 'Disciplines',
    path: '/disciplines',
    sub: [
      { label: 'Lighting', path: '/disciplines/lighting' },
      { label: 'AV', path: '/disciplines/av' },
      { label: 'Shades', path: '/disciplines/shades' },
      { label: 'HVAC', path: '/disciplines/hvac' },
      { label: 'Security', path: '/disciplines/security' },
    ],
  },
  { label: 'Experience Centre', path: '/experience-centre' },
  { label: 'Awards', path: '/awards' },
  { label: 'Careers', path: '/careers' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const headerRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const dropdownRefs = useRef({})

  // GSAP scroll-based navbar show/hide + background blur
  useGSAP(() => {
    let lastScroll = 0
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        const currentScroll = self.scroll()
        const isScrolledDown = currentScroll > lastScroll && currentScroll > 100
        
        // Hide/show navbar based on scroll direction
        gsap.to(headerRef.current, {
          y: isScrolledDown ? -100 : 0,
          duration: 0.4,
          ease: 'power2.inOut',
          overwrite: true,
        })

        // Add/remove scroll background
        if (currentScroll > 50) {
          headerRef.current.classList.add('navbar--scrolled')
        } else {
          headerRef.current.classList.remove('navbar--scrolled')
        }

        lastScroll = currentScroll
      },
    })

    // Entrance animation for nav links
    const links = headerRef.current.querySelectorAll('.navbar__link')
    gsap.from(links, {
      autoAlpha: 0,
      y: -10,
      duration: 0.5,
      stagger: 0.05,
      delay: 0.3,
      ease: 'power2.out',
    })

    // Logo entrance
    const logo = headerRef.current.querySelector('.navbar__logo')
    gsap.from(logo, {
      autoAlpha: 0,
      x: -20,
      duration: 0.6,
      delay: 0.1,
      ease: 'power3.out',
    })

    // CTA button entrance
    const cta = headerRef.current.querySelector('.navbar__cta')
    if (cta) {
      gsap.from(cta, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.5,
        delay: 0.6,
        ease: 'back.out(1.7)',
      })
    }
  }, { scope: headerRef })

  // Animated dropdown open/close
  const openDropdown = useCallback((label) => {
    setActiveDropdown(label)
    const el = dropdownRefs.current[label]
    if (el) {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 10, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      )
    }
  }, [])

  const closeDropdown = useCallback(() => {
    if (activeDropdown && dropdownRefs.current[activeDropdown]) {
      gsap.to(dropdownRefs.current[activeDropdown], {
        autoAlpha: 0,
        y: 10,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => setActiveDropdown(null),
      })
    } else {
      setActiveDropdown(null)
    }
  }, [activeDropdown])

  // Mobile menu toggle with GSAP timeline
  const toggleMobile = useCallback(() => {
    if (!mobileOpen) {
      setMobileOpen(true)
      // Animate in on next frame after state set
      requestAnimationFrame(() => {
        if (!mobileMenuRef.current) return
        const links = mobileMenuRef.current.querySelectorAll('.navbar__mobile-link, .btn')
        const tl = gsap.timeline()
        tl.fromTo(mobileMenuRef.current,
          { autoAlpha: 0, height: 0 },
          { autoAlpha: 1, height: 'auto', duration: 0.3, ease: 'power2.out' }
        )
        .from(links, {
          autoAlpha: 0,
          x: -20,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }, '-=0.1')
      })
    } else {
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 0,
          height: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => setMobileOpen(false),
        })
      } else {
        setMobileOpen(false)
      }
    }
  }, [mobileOpen])

  return (
    <header ref={headerRef} className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="ATPL Home">
          <span className="navbar__logo-text">ATPL</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="navbar__item"
              onMouseEnter={() => link.sub && openDropdown(link.label)}
              onMouseLeave={() => link.sub && closeDropdown()}
            >
              <Link to={link.path} className="navbar__link">
                {link.label}
                {link.sub && <ChevronDown size={14} />}
              </Link>
              {link.sub && (
                <div
                  ref={(el) => { dropdownRefs.current[link.label] = el }}
                  className="navbar__dropdown"
                  style={{ visibility: 'hidden', opacity: 0 }}
                >
                  {link.sub.map((s) => (
                    <Link key={s.label} to={s.path} className="navbar__dropdown-link">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary navbar__cta">
          Book Consultation
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="navbar__mobile-menu"
          style={{ visibility: 'hidden', opacity: 0, height: 0, overflow: 'hidden' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="navbar__mobile-link"
              onClick={() => {
                gsap.to(mobileMenuRef.current, {
                  autoAlpha: 0, height: 0, duration: 0.2,
                  onComplete: () => setMobileOpen(false),
                })
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  )
}
