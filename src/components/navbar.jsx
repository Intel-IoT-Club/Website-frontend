export default function Navbar() {
  return (
    <nav className="mt-4 glass rounded-2xl px-4 py-3 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2 group">
        <span className="h-3 w-3 rounded-full bg-accent drop-shadow-glow"></span>
        <span className="text-lg font-semibold tracking-tight">Intel IoT Club</span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm">
        <a href="#about" className="opacity-80 hover:opacity-100 transition">About</a>
        <a href="#projects" className="opacity-80 hover:opacity-100 transition">Projects</a>
        <a href="#events" className="opacity-80 hover:opacity-100 transition">Events</a>
        <a href="#team" className="opacity-80 hover:opacity-100 transition">Team</a>
        <a href="#contact" className="opacity-80 hover:opacity-100 transition">Contact</a>
      </div>
      <div className="flex items-center gap-2">
        <button id="themeToggle" className="glass rounded-xl px-3 py-2 text-sm opacity-90 hover:opacity-100">
          Toggle Theme
        </button>
        <a href="#join" className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold hover:bg-brand-400 drop-shadow-glow">
          Join the Club
        </a>
      </div>
    </nav>
  )
}
