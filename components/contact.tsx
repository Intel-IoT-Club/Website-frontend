"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import emailjs from "emailjs-com"
import { toast } from "sonner"

// EmailJS environment variables
const EMAILJS_SERVICE_ID = "service_bg55nmd"
const EMAILJS_TEMPLATE_ID = "template_dl7if3n"
const EMAILJS_PUBLIC_KEY = "q0OlBKnc-NmZqukqE"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY
      )
      toast.success("✅ Message sent successfully! Will try to reach to you shortly!")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("EmailJS Error:", error)
      toast.error("❌ Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background min-h-[80vh] flex items-center rounded-lg">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary drop-shadow-lg">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you're curious about our club, want to collaborate, or have questions—reach out!
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info Card */}
          <Card className="shadow-xl border-none bg-gradient-to-br from-muted/60 to-muted/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" /> Contact Information
              </CardTitle>
              <CardDescription>Reach us through the following details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-base">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Amrita Vishwa Vidyapeetham, Coimbatore</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <Link href="mailto:inteliotclub@cb.amrita.edu" className="hover:underline">
                  inteliotclub@cb.amrita.edu
                </Link>
              </div>
              <div className="pt-6 border-t border-border">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <Link href="https://github.com/intel-iot-club" className="hover:text-primary transition-all">
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link href="https://www.linkedin.com/company/intel-iot-club/" className="hover:text-primary transition-all">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href="https://www.instagram.com/inteliotclub" className="hover:text-primary transition-all">
                    <Instagram className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Contact Form Card */}
          <Card className="shadow-xl border-none bg-gradient-to-br from-muted/60 to-muted/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" /> Send a Message
              </CardTitle>
              <CardDescription>We usually respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-1 text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    required
                    className="rounded-md"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full transition-all duration-300 bg-primary text-white hover:bg-primary/90 hover:shadow-lg text-lg font-semibold py-3 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
                  ) : null}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}