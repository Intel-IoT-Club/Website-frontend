export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Hero Text */}
          <div className="animate-fadeInUp">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Empowering Innovation through Intel IoT
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Build the future at the <span className="text-brand-300">intersection</span> of hardware, software, and connectivity
            </h1>
            <p className="mt-4 max-w-xl text-white/80">
              Learn, prototype, and launch real-world IoT projects with mentorship, workshops, and hackathons on campus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-xl bg-brand-500 px-6 py-3 font-semibold hover:bg-brand-400 drop-shadow-glow">Explore Projects</a>
              <a href="#hackathon" className="rounded-xl glass px-6 py-3 font-semibold hover:bg-white/10">Hackathon</a>
              <a href="#brochure" className="rounded-xl glass px-6 py-3 font-semibold hover:bg-white/10">Brochure</a>
            </div>
            <ul className="mt-8 grid grid-cols-3 gap-4 text-sm text-white/80">
              <li className="glass rounded-xl p-3">Workshops</li>
              <li className="glass rounded-xl p-3">Kits & Labs</li>
              <li className="glass rounded-xl p-3">Industry Mentors</li>
            </ul>
          </div>

          {/* Device Card */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-brand-500/40 via-accent/30 to-transparent blur-2xl"></div>
            <div className="relative glass rounded-3xl p-6">
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 border border-white/10 flex items-center justify-center">
                <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float">
                  <rect x="20" y="40" width="180" height="80" rx="12" fill="#0ea5e9" fillOpacity=".15" stroke="#22d3ee" strokeOpacity=".35"/>
                  <rect x="60" y="62" width="100" height="36" rx="6" fill="#22d3ee" fillOpacity=".25"/>
                  <g stroke="#22d3ee" strokeOpacity=".6">
                    <path d="M20 60H6M200 60h14M20 100H6M200 100h14M60 40V26M160 40V26M60 120v14M160 120v14"/>
                  </g>
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Next Event</p>
                  <p className="font-semibold">IoT Hack Night • Oct 12</p>
                </div>
                <a href="#events" className="text-brand-300 hover:text-brand-200 font-medium">View details →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
