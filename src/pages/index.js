import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Projects from '../components/projects'
import CTA from '../components/CTA'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="gradient-bg min-h-screen text-white antialiased">
      {/* Floating Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <span className="orb absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-accent/60 animate-float"></span>
        <span className="orb absolute right-[12%] top-[18%] h-28 w-28 rounded-full bg-brand-500/60 animate-float" style={{animationDelay: '.8s'}}></span>
        <span className="orb absolute left-[20%] bottom-[12%] h-16 w-16 rounded-full bg-accent/50 animate-float" style={{animationDelay: '1.3s'}}></span>
        <span className="orb absolute right-[25%] bottom-[20%] h-20 w-20 rounded-full bg-brand-400/60 animate-float" style={{animationDelay: '2s'}}></span>
      </div>

      <Navbar />
      <Hero />
      <Projects />
      <CTA />
      <Footer />
    </div>
  )
}
