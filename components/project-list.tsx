"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
}

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className="space-y-8" initial="hidden" animate="visible" variants={containerVariants}>
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <Link href={`/projects/${project.id}`} className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={`Preview of ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <h3 className="text-2xl font-bold tracking-tight mb-2 text-emerald-400">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-normal transition-all duration-300  hover:bg-emerald-500 hover:text-primary-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-secondary">{project.description}</p>
                </CardContent>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
