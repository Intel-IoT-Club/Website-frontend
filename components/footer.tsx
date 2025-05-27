import Link from "next/link"
import { CircuitBoard, Github, Linkedin, Mail, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-8">

          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <CircuitBoard className="h-6 w-6" />
              <span className="text-xl font-semibold tracking-tight">Intel IoT Club</span>
            </Link>
            <p className="text-sm">
              Empowering innovation through Intel IoT technologies.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/intel-iot-club" aria-label="GitHub" className="hover:text-foreground transition">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/intel-iot-club/" aria-label="LinkedIn" className="hover:text-foreground transition">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:inteliotclub@gmail.com" aria-label="Email" className="hover:text-foreground transition">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm w-full">
              <div>
                <h4 className="mb-3 font-medium text-foreground">Explore</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-foreground transition">Home</Link></li>
                  <li><Link href="/about" className="hover:text-foreground transition">About</Link></li>
                  <li><Link href="/projects" className="hover:text-foreground transition">Projects</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-foreground">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/events" className="hover:text-foreground transition">Events</Link></li>
                  <li><Link href="/team" className="hover:text-foreground transition">Team</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground transition">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center md:items-end md:text-right space-y-4 text-sm">
            <h4 className="text-base font-semibold text-foreground">Join Our Community</h4>
            <p>Stay updated with our events, workshops, and project showcases.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
            >
              Become a Member
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {currentYear} Intel IoT Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
