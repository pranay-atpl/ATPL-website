import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__logo">ATPL</span>
            <p className="footer__tagline">
              Intelligent Automation for Luxury Living & Smart Spaces. Transforming spaces since 2002.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="LinkedIn" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Solutions</h4>
            <Link to="/projects/residential" className="footer__link">Residential</Link>
            <Link to="/projects/hospitality" className="footer__link">Hospitality</Link>
            <Link to="/projects/commercial" className="footer__link">Commercial</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <Link to="/disciplines/lighting" className="footer__link">Lighting Automation</Link>
            <Link to="/disciplines/av" className="footer__link">Audio Video</Link>
            <Link to="/disciplines/shades" className="footer__link">Shades</Link>
            <Link to="/disciplines/hvac" className="footer__link">HVAC</Link>
            <Link to="/disciplines/security" className="footer__link">Security</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Company</h4>
            <Link to="/about" className="footer__link">About Us</Link>
            <Link to="/experience-centre" className="footer__link">Experience Centres</Link>
            <Link to="/awards" className="footer__link">Awards</Link>
            <Link to="/careers" className="footer__link">Careers</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <a href="mailto:info@anushagroup.com" className="footer__link footer__contact-link">
              <Mail size={14} /> info@anushagroup.com
            </a>
            <a href="tel:+919999999999" className="footer__link footer__contact-link">
              <Phone size={14} /> +91 99999 99999
            </a>
            <span className="footer__link footer__contact-link">
              <MapPin size={14} /> New Delhi, India
            </span>
          </div>
        </div>

        <hr className="divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Anusha Technovision Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy" className="footer__bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
