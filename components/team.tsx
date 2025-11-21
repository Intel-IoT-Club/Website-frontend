"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import api from "@/lib/api"
import { Github, Linkedin, Mail, Sparkles, Users, Search, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
}

const ROLE_ORDER = [
  "faculty coordinator", "student mentor", "president", "co head", "iot", "aiot",
  "iort", "iiot", "team lead", "project lead", "core member", "trainee",
  "web/app dev", "marketing team"
]

const ROLE_LABELS: Record<string, string> = {
  "faculty coordinator": "Faculty Coordinators",
  "student mentor": "Student Mentors",
  "president": "President",
  "co head": "Co-Heads",
  "iot": "IoT Team",
  "aiot": "AIoT Team",
  "iort": "IoRT Team",
  "iiot": "IIoT Team",
  "team lead": "Team Leads",
  "project lead": "Project Leads",
  "core member": "Core Members",
  "trainee": "Trainees",
  "web/app dev": "Web/App Development",
  "marketing team": "Marketing Team"
}

const ROLE_COLORS: Record<string, string> = {
  "faculty coordinator": "from-purple-500 via-purple-600 to-fuchsia-600",
  "student mentor": "from-blue-500 via-cyan-500 to-teal-500",
  "president": "from-red-500 via-rose-500 to-pink-600",
  "co head": "from-orange-500 via-amber-500 to-yellow-500",
  "iot": "from-green-500 via-emerald-500 to-teal-600",
  "aiot": "from-teal-500 via-cyan-500 to-blue-500",
  "iort": "from-cyan-500 via-blue-500 to-indigo-500",
  "iiot": "from-indigo-500 via-purple-500 to-violet-600",
  "team lead": "from-pink-500 via-rose-500 to-red-500",
  "project lead": "from-rose-500 via-pink-500 to-fuchsia-500",
  "core member": "from-amber-500 via-orange-500 to-red-500",
  "trainee": "from-lime-500 via-green-500 to-emerald-500",
  "web/app dev": "from-emerald-500 via-teal-500 to-cyan-500",
  "marketing team": "from-violet-500 via-purple-500 to-fuchsia-500"
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Array<{
    _id: string
    name: string
    role: string[]
    bio: string
    image: string
    linkedin: string
    github?: string
    email: string
  }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeRole, setActiveRole] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    api.get("/members")
      .then(res => {
        setTeamMembers(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load team members.")
        setLoading(false)
      })
  }, [])

  const memberToHighestRole = (member: any) => {
    if (!Array.isArray(member.role)) return member.role
    for (const role of ROLE_ORDER) {
      if (member.role.includes(role)) return role
    }
    return member.role[0] || ""
  }

  const membersWithHighestRole = teamMembers.map(m => ({
    ...m,
    highestRole: memberToHighestRole(m)
  }))

  const groupedMembers = ROLE_ORDER.map(role => ({
    role,
    members: membersWithHighestRole.filter(m => m.highestRole === role),
    color: ROLE_COLORS[role] || "from-gray-500 to-gray-700"
  })).filter(group => group.members.length > 0)

  const allRoles = groupedMembers.map(group => group.role)

  const filteredGroups = groupedMembers.map(group => ({
    ...group,
    members: group.members.filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }))

  return (
    <section id="team" className="relative py-24 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          viewport={{ once: true }} 
          className="mb-20 text-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-primary mb-8 border border-primary/20 shadow-lg"
          >
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Meet the Innovators</span>
            <Star className="h-4 w-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              Our Amazing Team
            </span>
          </h2>
          
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Passionate innovators, creative thinkers, and dedicated builders shaping the future of IoT
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="relative w-full max-w-xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full border-2 border-border focus:border-primary bg-background/80 backdrop-blur-sm text-foreground shadow-xl focus:shadow-2xl transition-all duration-300 focus:outline-none text-base"
              />
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          viewport={{ once: true }} 
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              activeRole === "all"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30"
                : "bg-muted/80 backdrop-blur-sm text-muted-foreground hover:bg-muted border border-border"
            }`}
            onClick={() => setActiveRole("all")}
          >
            <Users className="h-4 w-4" />
            <span>All Members</span>
            <span className="bg-background/20 px-2 py-0.5 rounded-full text-xs">
              {teamMembers.length}
            </span>
          </motion.button>
          
          {allRoles.map(role => {
            const count = groupedMembers.find(g => g.role === role)?.members.length || 0
            return (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeRole === role
                    ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30"
                    : "bg-muted/80 backdrop-blur-sm text-muted-foreground hover:bg-muted border border-border"
                }`}
                onClick={() => setActiveRole(role)}
              >
                {ROLE_LABELS[role] || role}
                <span className="bg-background/20 px-2 py-0.5 rounded-full text-xs">{count}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted/50 h-80 rounded-2xl w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[280px]" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 text-lg">{error}</div>
        ) : (
          <div className="space-y-20">
            {filteredGroups
              .filter(group => (activeRole === "all" || activeRole === group.role) && group.members.length > 0)
              .map(group => (
                <motion.div 
                  key={group.role} 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  transition={{ duration: 0.6 }} 
                  viewport={{ once: true }}
                >
                  {/* Role Header */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center mb-12"
                  >
                    <div className="relative group">
                      <div className={`absolute -inset-2 bg-gradient-to-r ${group.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition duration-300`}></div>
                      <h3 className={`relative text-2xl md:text-3xl font-bold px-8 py-4 rounded-full bg-gradient-to-r ${group.color} text-white shadow-2xl`}>
                        {ROLE_LABELS[group.role] || group.role}
                      </h3>
                    </div>
                  </motion.div>

                  {/* Member Cards */}
                  <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "-100px" }} 
                    className="flex flex-wrap justify-center gap-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {group.members.map((member, index) => (
                        <motion.div 
                          key={member._id || index} 
                          variants={itemVariants}
                          layout
                          className="w-full sm:w-[280px] lg:w-[300px]"
                        >
                          <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-full aspect-square"
                          >
                            <Card className="group relative w-full h-full overflow-hidden border-2 border-border/50 hover:border-primary/50 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl flex flex-col">
                              {/* Gradient Overlay */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                              
                              {/* Shine Effect */}
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                              <CardHeader className="text-center flex flex-col items-center pb-3 pt-6 relative z-10 flex-shrink-0">
                                {/* Avatar with enhanced effects */}
                                <motion.div 
                                  className="relative mb-3"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                  <div className={`absolute -inset-3 bg-gradient-to-r ${group.color} rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                                  <div className={`absolute -inset-1 bg-gradient-to-r ${group.color} rounded-full animate-spin-slow opacity-50`}></div>
                                  <Avatar className="h-20 w-20 relative ring-4 ring-background shadow-2xl">
                                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                    <AvatarFallback className={`bg-gradient-to-br ${group.color} text-white font-bold text-lg`}>
                                      {member.name?.split(" ").map((n: string) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                </motion.div>

                                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                                  {member.name}
                                </CardTitle>
                                
                                <CardDescription className="text-xs font-medium">
                                  <span className={`inline-block px-2 py-1 rounded-full bg-gradient-to-r ${group.color} text-white text-[10px] font-semibold`}>
                                    {Array.isArray(member.role)
                                      ? member.role.map(r => ROLE_LABELS[r] || r).join(", ")
                                      : (ROLE_LABELS[member.role] || member.role)}
                                  </span>
                                </CardDescription>
                              </CardHeader>

                              <CardContent className="text-center px-4 pb-4 relative z-10 flex flex-col justify-between flex-grow">
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors mb-3">
                                  {member.bio}
                                </p>

                                {/* Social Links with enhanced styling */}
                                <div className="flex justify-center gap-2 mt-auto">
                                  {member.linkedin && (
                                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                                      <Link 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500 hover:to-blue-600 text-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                      >
                                        <Linkedin className="h-4 w-4" />
                                      </Link>
                                    </motion.div>
                                  )}
                                  {member.github && (
                                    <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                                      <Link 
                                        href={member.github} 
                                        target="_blank" 
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-600/20 hover:from-gray-700 hover:to-gray-900 text-gray-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                      >
                                        <Github className="h-4 w-4" />
                                      </Link>
                                    </motion.div>
                                  )}
                                  {member.email && (
                                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                                      <Link 
                                        href={`mailto:${member.email}`} 
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 hover:from-primary hover:to-purple-600 text-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                      >
                                        <Mail className="h-4 w-4" />
                                      </Link>
                                    </motion.div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}