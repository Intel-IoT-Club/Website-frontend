"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { toast } from "sonner";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

// Icons
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  Loader2,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// API endpoint for contact form submission
const CONTACT_API_URL = 'http://localhost:5000/api/contact';

// Animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export const metadata = {
  title: "Contact Us | Intel IoT Club",
  description:
    "Get in touch with the Intel IoT Club for collaborations, queries, and networking opportunities.",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form validation schema
  const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" })
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            errorMap[err.path[0]] = err.message;
          }
        });
        setErrors(errorMap);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/contact", formData);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(response.data?.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again later.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-background min-h-[80vh] flex items-center rounded-lg overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-primary/5 to-blue-400/5 -skew-y-3 -translate-y-1/2"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>

      {/* Main container */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> Let's Connect
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you're curious about our club, want to collaborate, or have
            questions—we'd love to hear from you!
          </p>
        </motion.div>

        {/* Grid section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Contact Info Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="h-full shadow-2xl border-none bg-card/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" /> Contact
                  Information
                </CardTitle>
                <CardDescription>
                  Reach us through the following details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 text-base">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span>Amrita Vishwa Vidyapeetham, Coimbatore</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <Link
                    href="mailto:inteliotclub@cb.amrita.edu"
                    className="hover:underline hover:text-primary"
                  >
                    inteliotclub@cb.amrita.edu
                  </Link>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Follow Us
                  </h3>

                  <div className="flex gap-3">
                    <Link
                      href="https://github.com/intel-iot-club"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-white"
                      title="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </Link>

                    <Link
                      href="https://www.linkedin.com/company/intel-iot-club/"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-white"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>

                    <Link
                      href="https://www.instagram.com/inteliotclub"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-white"
                      title="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full shadow-2xl border-none bg-card/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" /> Send us a Message
                </CardTitle>
                <CardDescription>
                  We usually respond within 24 hours
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-primary" /> Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={errors.name ? 'border-red-500' : ''}
                        suppressHydrationWarning
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" /> Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className={errors.email ? 'border-red-500' : ''}
                        suppressHydrationWarning
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={errors.subject ? 'border-red-500' : ''}
                      suppressHydrationWarning
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={loading}
                      suppressHydrationWarning
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
