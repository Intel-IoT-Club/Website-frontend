"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"
import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function Projects({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState<any[]>(initialProjects || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!initialProjects || initialProjects.length === 0) {
      setLoading(true)
      api.get("/projects")
        .then(res => {
          setProjects(res.data)
          setLoading(false)
        })
        .catch(() => {
          setError("Failed to load projects.")
          setLoading(false)
        })
    }
  }, [initialProjects])

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted rounded-lg">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">Our Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore cutting-edge IoT solutions built by our talented members — from smart wearables to scalable city systems.
          </p>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card
                key={project._id || index}
                className={clsx(
                  "relative overflow-hidden bg-background/70 backdrop-blur border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-0.5",
                  project.featured && "border-primary/30"
                )}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    <Star className="h-4 w-4" />
                    Featured
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground bg-muted hover:bg-primary/10 hover:text-primary transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-sm font-medium"
                    asChild
                  >
                    <Link href={project.github}>
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-sm font-medium"
                    asChild
                  >
                    <Link href={project.demo}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
