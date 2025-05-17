"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProjectById } from "@/lib/projects"
import { motion } from "framer-motion"
import { ChevronLeft, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"

export default function ProjectPage() {
  const { id } = useParams()
  const project = getProjectById(id as string)

  if (!project) {
    notFound()
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="container relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all projects
        </Link>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-normal">
                  {tech}
                </Badge>
              ))}
            </div>

            <p className="text-lg mb-6">{project.detailedDescription}</p>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {project.features && (
          <motion.section className="mb-12" variants={stagger}>
            <motion.h2 className="text-2xl font-bold mb-4" variants={fadeIn}>
              Key Features
            </motion.h2>
            <motion.ul className="grid gap-3 md:grid-cols-2" variants={stagger}>
              {project.features.map((feature, index) => (
                <motion.li key={index} className="flex items-start" variants={fadeIn}>
                  <div className="mr-2 mt-1 flex h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {project.challenges && (
          <motion.section className="mb-12" variants={stagger}>
            <motion.h2 className="text-2xl font-bold mb-4" variants={fadeIn}>
              Challenges & Solutions
            </motion.h2>
            <motion.ul className="space-y-3" variants={stagger}>
              {project.challenges.map((challenge, index) => (
                <motion.li key={index} className="flex items-start" variants={fadeIn}>
                  <div className="mr-2 mt-1 flex h-2 w-2 rounded-full bg-primary" />
                  <span>{challenge}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {project.images && project.images.length > 1 && (
          <motion.section variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
      </div>
    </main>
  )
}
