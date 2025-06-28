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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString()
      },
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        toast("✅ Message sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      })
      .catch((error) => {
        console.error("EmailJS Error:", error)
        toast("❌ Something went wrong. Please try again later.")
      })
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you're curious about our club, want to collaborate, or have questions—reach out!
          </p>
        </div>

        {/* Contact Form */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-none bg-muted/40 mb-12">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Send a Message</CardTitle>
            <CardDescription>We usually respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={5}
                required
              />
              <Button
                type="submit"
                className="w-full rounded-full transition-all duration-300 bg-primary text-white hover:bg-primary/90 hover:shadow-lg"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-none bg-muted/40">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
            <CardDescription>Prefer reaching out directly? Here’s how:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-base">
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

            <div className="flex items-center gap-3 pt-4">
              <span className="text-sm font-medium text-muted-foreground">Follow us:</span>
              <div className="flex gap-4">
                <Link href="https://github.com/intel-iot-club" className="hover:text-primary transition">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://www.linkedin.com/company/intel-iot-club/" className="hover:text-primary transition">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="https://www.instagram.com/inteliotclub" className="hover:text-primary transition">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
