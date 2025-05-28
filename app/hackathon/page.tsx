import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin, CheckCircle } from "lucide-react"

export default function HackathonPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0e0e0e] text-white px-4 py-10">
      <section className="w-full max-w-5xl bg-[#1a1a1a] border border-[#2c2c2c] rounded-3xl shadow-2xl p-8 space-y-8">

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100">
            InnovateX Hackathon 2025
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Code with purpose. Build with impact.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 h-64 md:h-80 overflow-hidden rounded-xl border border-[#2c2c2c]">
            <Image
              src="/hackathon.png"
              alt="Hackathon Banner"
              width={1200}
              height={800}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="flex flex-col gap-3 md:w-1/3">
            <div className="bg-[#111111] border border-[#2c2c2c] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <CalendarDays className="w-5 h-5 text-gray-400" />
                <span>Date: August 15, 2024</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>Location: Main Auditorium</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>
                  Status: <strong className="text-green-500">Open</strong>
                </span>
              </div>
            </div>
            <Link href="/hackathon/register">
              <button className="w-full mt-2 py-3 bg-[#2c2c2c] text-white rounded-xl font-semibold hover:bg-[#3c3c3c] transition duration-300 shadow-md">
                Register Now
              </button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-300">
            Code. Create. Contribute.
          </h2>
        </div>

        <div className="bg-[#111111] border border-[#2c2c2c] rounded-2xl p-6 text-gray-300 text-lg leading-relaxed">
          <p>
            InnovateX Hackathon 2025 is a 24-hour tech sprint where innovation meets collaboration. Whether you're a coder, designer, or entrepreneur, this is your space to shine. Solve real-world problems, meet industry experts, and push your limits.
          </p>
          <br />
          <p>
            Expect hands-on mentoring, team building, fun events, and the chance to win amazing prizes. Come with ideas, leave with experience.
          </p>
        </div>
      </section>
    </main>
  )
}
