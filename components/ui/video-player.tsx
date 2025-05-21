"use client"

import { Play } from "lucide-react"
import { useState } from "react"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  thumbnailUrl?: string
}

export function VideoPlayer({ videoUrl, title, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Check if it's a YouTube URL
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = isYouTube ? getYouTubeId(videoUrl) : null
  const youtubeEmbedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1` : ""

  const handlePlay = () => {
    setIsPlaying(true)
  }

  if (isPlaying) {
    if (isYouTube && youtubeEmbedUrl) {
      return (
        <div className="aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            src={youtubeEmbedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )
    } else {
      // Direct video file
      return (
        <div className="aspect-video w-full rounded-lg overflow-hidden border">
          <video src={videoUrl} controls autoPlay className="w-full h-full" title={title}>
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }
  }

  // Thumbnail with play button
  return (
    <div
      className="aspect-video w-full rounded-lg overflow-hidden border relative cursor-pointer group"
      onClick={handlePlay}
    >
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
        <div className="rounded-full bg-background/80 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
          <Play className="h-8 w-8 text-primary" />
        </div>
      </div>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={`${title} video thumbnail`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">{title}</span>
        </div>
      )}
    </div>
  )
}
