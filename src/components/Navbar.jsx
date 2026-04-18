import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
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
              onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to={link.path} className="navbar__link">
                {link.label}
                {link.sub && <ChevronDown size={14} />}
              </Link>
              <AnimatePresence>
                {link.sub && activeDropdown === link.label && (
                  <motion.div
                    className="navbar__dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.sub.map((s) => (
                      <Link key={s.label} to={s.path} className="navbar__dropdown-link">
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary navbar__cta">
          Book Consultation
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="navbar__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              Book Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
