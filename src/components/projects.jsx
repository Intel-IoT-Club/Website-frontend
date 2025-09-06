export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <a href="#projects" className="text-brand-300 hover:text-brand-200">Browse all →</a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="glass rounded-2xl p-5 hover:bg-white/10 transition">
            <div className="aspect-[16/10] rounded-xl bg-white/5 border border-white/10"></div>
            <h3 className="mt-4 font-semibold">Smart Campus Air Quality</h3>
            <p className="text-sm text-white/75">LoRa sensors + dashboard with alerts and historical trends.</p>
          </article>
          <article className="glass rounded-2xl p-5 hover:bg-white/10 transition">
            <div className="aspect-[16/10] rounded-xl bg-white/5 border border-white/10"></div>
            <h3 className="mt-4 font-semibold">Vision-based Line Follower</h3>
            <p className="text-sm text-white/75">Raspberry Pi, OpenCV, and PID tuning for autonomous laps.</p>
          </article>
          <article className="glass rounded-2xl p-5 hover:bg-white/10 transition">
            <div className="aspect-[16/10] rounded-xl bg-white/5 border border-white/10"></div>
            <h3 className="mt-4 font-semibold">Smart Irrigation Node</h3>
            <p className="text-sm text-white/75">ESP32, soil-moisture sensing, and cloud telemetry.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
