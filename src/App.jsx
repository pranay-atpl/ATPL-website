import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <>
      <Helmet>
        <title>ATPL - Intelligent Automation for Luxury Living & Smart Spaces</title>
        <meta name="description" content="Transforming homes, hotels, and commercial spaces with cutting-edge automation since 2002." />
      </Helmet>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
