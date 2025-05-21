"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageLightbox } from "@/components/ui/image-lightbox"
import { VideoPlayer } from "@/components/ui/video-player"
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
        <Link href="/projects" className="inline-flex items-center text-sm my-6 text-emerald-400 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all projects
        </Link>

        <div className="grid gap-8 md:grid-cols-2 mb-6">
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
            <h1 className="text-3xl font-bold tracking-tight mb-4 text-emerald-400">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-normal">
                  {tech}
                </Badge>
              ))}
            </div>

            <p className="text-lg mb-6 text-secondary">{project.detailedDescription}</p>

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

        {project.videos && project.videos.length > 0 && (
          <motion.section className="mb-12" variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-4 text-primary">Project Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.videos.map((video, index) => (
                <VideoPlayer key={index} videoUrl={video.url} title={video.title} thumbnailUrl={video.thumbnailUrl} />
              ))}
            </div>
          </motion.section>
        )}

        {project.features && (
          <motion.section className="mb-12" variants={stagger}>
            <motion.h2 className="text-2xl font-bold mb-4 text-primary" variants={fadeIn}>
              Key Features
            </motion.h2>
            <motion.ul className="grid gap-3 md:grid-cols-2" variants={stagger}>
              {project.features.map((feature, index) => (
                <motion.li key={index} className="flex items-start" variants={fadeIn}>
                  <div className="mr-2 mt-1 flex h-2 w-2 rounded-full bg-primary" />
                  <span className="text-secondary">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {project.challenges && (
          <motion.section className="mb-12" variants={stagger}>
            <motion.h2 className="text-2xl font-bold mb-4 text-primary" variants={fadeIn}>
              Challenges & Solutions
            </motion.h2>
            <motion.ul className="space-y-3" variants={stagger}>
              {project.challenges.map((challenge, index) => (
                <motion.li key={index} className="flex items-start" variants={fadeIn}>
                  <div className="mr-2 mt-1 flex h-2 w-2 rounded-full bg-primary" />
                  <span className="text-secondary">{challenge}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {project.images && project.images.length > 0 && (
          <motion.section variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-4 text-primary">Project Gallery</h2>
            <ImageLightbox images={project.images} title={project.title} />
          </motion.section>
        )}
      </motion.div>
      </div>
    </main>
  )
}
