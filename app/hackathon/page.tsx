import Image from "next/image";
import Link from "next/link";

export default function HackathonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <section className="w-full max-w-5xl mx-auto p-6 bg-card shadow-md border">
        {/* Hackathon Name */}
        <div className="flex justify-center mb-4">
          <div className="px-4 py-1 rounded-lg text-5xl font-extrabold bg-background/80">
            SmartCityX: The AIoT Hackathon
          </div>
        </div>
        {/* Top: Banner + Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          {/* Banner/Pic */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-56 md:h-72 bg-muted rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                src="/hackathon.png"
                alt="Hackathon banner"
                width={960}
                height={540}
                className="object-cover w-full h-full rounded-xl"
                priority
              />
            </div>
          </div>
          {/* Date, Location, Status */}
          <div className="flex flex-col gap-3 md:w-64">
            <div className="px-4 py-2 rounded-md bg-background/80 text-base">Registraion Closing: <span className="font-semibold">June 30 at 11:59 PM</span></div>
            <div className="px-4 py-2 rounded-md bg-background/80 text-base"><span className="font-semibold">Location: Amrita Vishwa Vidyapeetham, Coimbatore</span></div>
            <div className="px-4 py-2 rounded-md bg-background/80 text-base">Status: <span className="font-semibold">Open</span></div>
            <Link href="https://forms.office.com/r/ddTi3K1yNR" className="mt-2 w-full block">
              <button className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition">
                Register Now
              </button>
            </Link>
          </div>
        </div>
        {/* Tagline/One-liner */}
        <div className="mb-4">
          <div className="w-full px-4 py-2 rounded-md bg-background/80 text-2xl font-semibold">
            Build Smarter. Code Better. Hack the Future.
          </div>
        </div>
        {/* Description */}
        <div className="w-full min-h-[120px] px-4 py-6 rounded-xl bg-background/80 text-lg flex flex-col gap-6 shadow-md border border-primary/20">
          <div className="text-2xl font-bold text-primary mb-2">Why Join SmartCityX?</div>
          <p>
            Join us for <span className="font-semibold text-primary">SmartCityX</span>, an <span className="font-semibold">AIoT-powered hackathon</span> that invites innovators to shape the cities of tomorrow. This event challenges participants to deploy <span className="font-semibold">1D or 2D AIoT models</span> on ESP32 boards to solve real-world problems in the Smart City domain—ranging from child care, healthcare, to urban infrastructure.
          </p>
          <p>
            Whether you're a budding engineer or a seasoned techie, this is your chance to ideate, simulate, and build deployed hardware solutions that bring real change.
          </p>
          <div>
            <div className="text-xl font-semibold text-primary mb-1">What’s the Challenge?</div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Build and deploy either a:</li>
              <ul className="list-[circle] pl-6">
                <li><span className="font-semibold">1D Model</span> (Linear sensor-based solution)</li>
                <li><span className="font-semibold">2D Model</span> (More complex multi-dimensional systems)</li>
              </ul>
              <li>All solutions must run on the <span className="font-semibold">ESP32</span> platform, simulating real-world smart city problems and offering intelligent, scalable fixes.</li>
            </ul>
          </div>
          <div>
            <div className="text-xl font-semibold text-primary mb-1">Phases of the Hackathon</div>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <span className="font-semibold">Ideation Phase:</span> Submit your team’s idea—problem statement and solution. Selected teams move to Phase 2.
              </li>
              <li>
                <span className="font-semibold">Prototyping Phase:</span> Use <span className="font-semibold">Wokwi simulator</span> to demonstrate a basic working vision. Accuracy isn’t mandatory—just show the “what” and “how.”
              </li>
              <li>
                <span className="font-semibold">Deployment Phase:</span> Purchase hardware and begin hands-on implementation. Build, test, and deploy your final working prototype on ESP32.
              </li>
            </ol>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-muted/60 rounded-lg p-4 border border-primary/10">
              <div className="font-semibold text-primary">Team Size</div>
              <div>3 to 4 members per team</div>
              <div className="text-muted-foreground text-sm">Collaborate, brainstorm, and conquer the urban challenges!</div>
            </div>
            <div className="flex-1 bg-muted/60 rounded-lg p-4 border border-primary/10">
              <div className="font-semibold text-primary">What’s at Stake?</div>
              <ul className="list-disc pl-5">
                <li>Top 5 teams → <span className="font-semibold">Core Members</span> of the IoT Club</li>
                <li>Next 5 teams → <span className="font-semibold">Trainees</span> in the IoT Club</li>
              </ul>
              <div className="text-muted-foreground text-sm mt-1">Show us what you’ve got—and we’ll give you the platform to grow, build, and lead.</div>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold text-primary mb-1">Who Can Join?</div>
            <div>
              <span className="font-semibold">Open exclusively to 2nd and 3rd-year students</span> who are:<br/>
              <span className="text-muted-foreground">Tech enthusiasts, Hardware hackers, IoT builders.</span>
            </div>
            <div className="mt-2">
              If you’re passionate about solving real-world Smart City challenges using AIoT, and ready to bring ideas to life with ESP32 hardware, this hackathon is for you.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
