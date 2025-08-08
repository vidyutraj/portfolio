import { Suspense, useEffect, useState } from 'react'
import { NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Certifications from './components/Certifications'
import ResumeButton from './components/ResumeButton'
import Projects from './components/Projects'

function Layout() {
  const location = useLocation()
  const [theme, setTheme] = useState<'dark' | 'light'>(() => 'dark')
  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light')
  }, [theme])
  return (
    <div className="site">
      <header className="nav">
        <div className="container nav-inner">
          <NavLink to="/" className="brand">Cloud Portfolio</NavLink>
          <div className="nav-links">
            <NavLink to="/certifications" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Certifications</NavLink>
            <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Projects</NavLink>
            <NavLink to="/resume" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Resume</NavLink>
            <a href="https://medium.com/@vidyut.rajagopal2006" target="_blank" rel="noreferrer" className="nav-link">Writing</a>
            <button onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))} className="btn btn-outline" style={{padding: '8px 12px'}}>Toggle {theme === 'dark' ? 'Light' : 'Dark'}</button>
          </div>
        </div>
      </header>

      <main key={location.pathname} className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">© {new Date().getFullYear()} Cloud Portfolio. All rights reserved.</div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <>
    <section className="hero">
      <div className="hero-card">
        <div className="hero-top">
          <div className="avatar">V</div>
          <div>
            <h1 className="hero-title">Hey, I’m Vidyut</h1>
            <p>Sophomore @ Georgia Tech — Cybersecurity • Cloud • Software</p>
          </div>
        </div>
        <p style={{marginTop: 14}}>Exploring cybersecurity, cloud computing, and software development. I love applying tech in finance, leadership, and client-facing roles.</p>
        <div className="hero-actions">
          <NavLink to="/certifications" className="btn btn-primary">View Certifications</NavLink>
          <NavLink to="/projects" className="btn btn-outline">See Projects</NavLink>
        </div>
        <div className="socials">
          <a className="icon-btn" href="https://medium.com/@vidyut.rajagopal2006" target="_blank" rel="noreferrer">M</a>
          <a className="icon-btn" href="mailto:vrajagopal9@gatech.edu">@</a>
          <a className="icon-btn" href="mailto:vidyut.rajagopal2006@gmail.com">@</a>
        </div>
      </div>
      <div className="hero-art card">
        <div style={{padding: 22}}>
        <h3>Quick Resume Access</h3>
        <p style={{marginTop: 6}}>Get a presigned URL to my latest resume.</p>
        <div style={{marginTop: 14}}><ResumeButton /></div>
        </div>
      </div>
    </section>
    
    <div style={{ height: 22 }} />
    
    <section className="card">
      <h2>About</h2>
      <p style={{ marginTop: 10 }}>I’m a sophomore at Georgia Tech exploring cybersecurity, cloud computing, and software development. I enjoy bringing technology into finance, leadership, and client-facing contexts.</p>
      <p style={{ marginTop: 10 }}>Well-versed in networking and infrastructure services (DHCP/DNS/NTP), AWS/Azure/GCP, Data-Centers, LAN/WAN, VPNs, and firewalls.</p>
      <div style={{ marginTop: 14 }}>
        <a className="btn btn-outline" href="https://medium.com/@vidyut.rajagopal2006" target="_blank" rel="noreferrer">Read my writing</a>
        <span style={{ marginLeft: 10, color: 'var(--muted)' }}>Contact: <a href="mailto:vrajagopal9@gatech.edu">vrajagopal9@gatech.edu</a> · <a href="mailto:vidyut.rajagopal2006@gmail.com">vidyut.rajagopal2006@gmail.com</a></span>
      </div>
    </section>
    </>
  )
}

function CertificationsPage() {
  return (
    <section>
      <h2>Certifications</h2>
      <div style={{height: 12}} />
      <Suspense fallback={<div className="notice">Loading certifications…</div>}>
        <Certifications />
      </Suspense>
    </section>
  )
}

function ResumePage() {
  return (
    <section className="card">
      <h2>Resume</h2>
      <p style={{marginTop: 6}}>Generate a secure link to download my resume.</p>
      <div style={{marginTop: 14}}><ResumeButton /></div>
    </section>
  )
}

function ProjectsPage() {
  return (
    <section>
      <h2>Projects</h2>
      <div style={{ height: 12 }} />
      <Projects />
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="certifications" element={<CertificationsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="resume" element={<ResumePage />} />
      </Route>
    </Routes>
  )
}

export default App
