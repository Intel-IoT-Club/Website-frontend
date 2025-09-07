"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import clsx from "clsx";
import { Github, Star, ArrowRight, Sparkles, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const hoverVariants: Variants = {
  hover: {
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

export default function Projects({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState<any[]>(initialProjects || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));

  useEffect(() => {
    if (!initialProjects || initialProjects.length === 0) {
      setLoading(true);
      api
        .get("/projects")
        .then((res) => {
          setProjects(res.data);
          setFilteredProjects(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load projects.");
          setLoading(false);
        });
    } else {
      setFilteredProjects(initialProjects);
    }
  }, [initialProjects]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.tags && p.tags.includes(activeFilter))
      );
    }
  }, [activeFilter, projects]);

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-b from-background to-muted rounded-lg overflow-hidden"
    >
      {/* Decorative glowing shapes */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-primary/5 to-blue-400/5 -skew-y-3 -translate-y-1/2"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> Innovative Builds
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore cutting-edge IoT solutions built by our talented members —
            from smart wearables to scalable city systems.
          </p>
        </motion.div>

        {/* Filter buttons */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-full transition-all"
              onClick={() => setActiveFilter("all")}
            >
              All Projects
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                size="sm"
                className="rounded-full transition-all"
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Loading, error or projects grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading innovative projects...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <motion.div variants={hoverVariants} whileHover="hover">
                    <Card
                      className={clsx(
                        "relative overflow-hidden bg-card/70 backdrop-blur-md border border-border/50 shadow-lg transition-all duration-300 group",
                        project.featured && "border-primary/50 shadow-primary/10"
                      )}
                    >
                      {project.featured && (
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur">
                          <Star className="h-4 w-4 fill-primary" />
                          Featured
                        </div>
                      )}

                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                              onClick={() => setActiveFilter(tag)}
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
                          className="rounded-full text-sm font-medium group/btn"
                          asChild
                        >
                          <Link href={project.github || "#"}>
                            <Github className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                            Code
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-sm font-medium group/btn"
                          asChild
                        >
                          <Link href={project.demo || "#"}>
                            <Eye className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                            Live Demo
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {activeFilter === "all"
                ? "We're currently working on new projects. Check back soon!"
                : `No projects found with the ${activeFilter} tag. Try another filter.`}
            </p>
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            <ArrowRight className="h-4 w-4 mr-1" /> Want to see your project here?
          </div>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join our club and start building innovative IoT solutions with industry experts and
            cutting-edge technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
