"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import api from "@/lib/api"
import { Github, Linkedin, Mail, Sparkles, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"

const containerVariants :Variants= {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants :Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const hoverVariants :Variants= {
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const ROLE_ORDER = [
  "faculty coordinator",
  "student mentor",
  "president",
  "co head",
  "iot",
  "aiot",
  "iort",
  "iiot",
  "team lead",
  "project lead",
  "core member",
  "trainee",
  "web/app dev",
  "marketing team"
];

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
  "faculty coordinator": "from-purple-500 to-purple-700",
  "student mentor": "from-blue-500 to-blue-700",
  "president": "from-red-500 to-red-700",
  "co head": "from-orange-500 to-orange-700",
  "iot": "from-green-500 to-green-700",
  "aiot": "from-teal-500 to-teal-700",
  "iort": "from-cyan-500 to-cyan-700",
  "iiot": "from-indigo-500 to-indigo-700",
  "team lead": "from-pink-500 to-pink-700",
  "project lead": "from-rose-500 to-rose-700",
  "core member": "from-amber-500 to-amber-700",
  "trainee": "from-lime-500 to-lime-700",
  "web/app dev": "from-emerald-500 to-emerald-700",
  "marketing team": "from-violet-500 to-violet-700"
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Array<{_id: string; name: string; role: string[]; bio: string; image: string; linkedin: string; email: string;}>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeRole, setActiveRole] = useState("all")

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
    if (!Array.isArray(member.role)) return member.role;
    for (const role of ROLE_ORDER) {
      if (member.role.includes(role)) return role;
    }
    return member.role[0] || "";
  };
  
  const membersWithHighestRole = teamMembers.map(m => ({ ...m, highestRole: memberToHighestRole(m) }));
  
  
  const groupedMembers = ROLE_ORDER.map(role => ({
    role,
    members: membersWithHighestRole.filter(m => m.highestRole === role),
    color: ROLE_COLORS[role] || "from-gray-500 to-gray-700"
  })).filter(group => group.members.length > 0)

 
  const allRoles = groupedMembers.map(group => group.role)

  return (
    <section id="team" className="relative py-20 bg-gradient-to-b from-background to-muted/50 rounded-lg overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-primary/5 to-blue-400/5 -skew-y-3 -translate-y-1/2"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> Amazing People
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            The passionate minds driving the Intel IoT Club forward
          </p>
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeRole === "all" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            onClick={() => setActiveRole("all")}
          >
            <Users className="h-4 w-4 mr-1" />
            All Members
          </button>
          {allRoles.map(role => (
            <button
              key={role}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeRole === role 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setActiveRole(role)}
            >
              {ROLE_LABELS[role] || role}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading team members...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="space-y-16">
            {groupedMembers
              .filter(group => activeRole === "all" || activeRole === group.role)
              .map((group) => (
                <motion.div 
                  key={group.role}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-8">
                    <h3 className={`text-2xl md:text-3xl font-bold text-center px-6 py-2 rounded-full bg-gradient-to-r ${group.color} text-white shadow-md`}>
                      {ROLE_LABELS[group.role] || group.role}
                    </h3>
                  </div>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    <AnimatePresence>
                      {group.members.map((member, index) => (
                        <motion.div
                          key={member._id || index}
                          variants={itemVariants}
                          whileHover="hover"
                        >
                          <motion.div
                            variants={hoverVariants}
                            className="h-full"
                          >
                            <Card className="group h-full overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-md rounded-xl">
                              <CardHeader className="text-center flex flex-col items-center pb-3">
                                <div className="relative mb-4">
                                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <Avatar className="h-20 w-20 relative ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                    <AvatarFallback className="bg-gradient-to-r from-primary to-blue-500 text-white font-semibold">
                                      {member.name?.split(" ").map((n: string) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                                  {member.name}
                                </CardTitle>
                                <CardDescription className="text-sm">
                                  {Array.isArray(member.role)
                                    ? member.role.map(r => ROLE_LABELS[r] || r).join(", ")
                                    : (ROLE_LABELS[member.role] || member.role)}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-center px-4 pb-4">
                                <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground transition-colors">
                                  {member.bio}
                                </p>
                              </CardContent>
                              <CardFooter className="flex justify-center gap-4 pt-0 pb-4">
                                <Link 
                                  href={member.linkedin} 
                                  className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all p-2 rounded-full bg-muted/50 hover:bg-primary/10"
                                  title="LinkedIn"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </Link>
                                <Link 
                                  href={`mailto:${member.email}`} 
                                  className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all p-2 rounded-full bg-muted/50 hover:bg-primary/10"
                                  title="Email"
                                >
                                  <Mail className="h-4 w-4" />
                                </Link>
                              </CardFooter>
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