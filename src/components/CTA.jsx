export default function CTA() {
  return (
    <section id="join" className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold">Ready to build with Intel IoT?</h2>
          <p className="mt-3 text-white/80">Join the community, access hardware kits, and ship impactful projects.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a className="rounded-xl bg-brand-500 px-6 py-3 font-semibold hover:bg-brand-400 drop-shadow-glow">Join the Club</a>
            <a className="rounded-xl glass px-6 py-3 font-semibold hover:bg-white/10">Contact</a>
          </div>
        </div>
      </div>
    </section>
  )
}
