export interface Project {
  id: string
  title: string
  description: string
  detailedDescription: string
  technologies: string[]
  imageUrl: string
  images?: string[]
  videos?: {
    url: string
    title: string
    thumbnailUrl?: string
  }[]
  liveUrl?: string
  githubUrl?: string
  features?: string[]
  challenges?: string[]
  year?: number
}

export const projects: Project[] = [
  {
    id: "parceleye",
    title: "ParcelEye",
    description:
      "An Android application to streamline tracking of package deliveries within the university.",
    detailedDescription:
      "This e-commerce dashboard provides store owners with powerful tools to monitor and analyze their business performance. The dashboard includes real-time sales tracking, inventory management, customer analytics, and customizable reports. Built with performance and usability in mind, it helps store owners make data-driven decisions to grow their business.",
    technologies: ["Java", "AWS", "FireBase", "MongoDB", "SpringBoot", "Docker", "Gradle"],
    imageUrl: "/images/parceleyepic1.png",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    liveUrl: "https://example.com/ecommerce-dashboard",
    githubUrl: "https://github.com/yourusername/ecommerce-dashboard",
    features: [
      "Real-time sales analytics",
      "Inventory management system",
      "Customer behavior insights",
      "Customizable reporting tools",
      "Multi-platform support",
    ],
    challenges: [
      "Optimizing performance for large datasets",
      "Creating an intuitive user interface",
      "Implementing real-time data synchronization",
    ],
    year: 2025,
  },
  {
    id: "in-between",
    title: "In Between",
    description:
      "A 2-player game",
    detailedDescription:
      "This fitness tracking application empowers users to take control of their health journey. Users can create custom workout plans, track their nutrition intake, monitor progress with visual charts, and share achievements with friends. The app uses machine learning to provide personalized recommendations based on user performance and goals.",
    technologies: ["Lucid", "Alchitry Au"],
    imageUrl: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    liveUrl: "https://example.com/fitness-app",
    githubUrl: "https://github.com/yourusername/fitness-app",
    features: [
      "Custom workout planning",
      "Nutrition tracking and analysis",
      "Progress visualization",
      "Social sharing capabilities",
      "Personalized recommendations",
    ],
    challenges: [
      "Creating a seamless cross-platform experience",
      "Implementing accurate fitness tracking algorithms",
      "Designing an engaging user interface",
    ],
    year: 2022,
  },
  {
    id: "cropcast",
    title: "CropCast",
    description:
      "A web application that deploys a model to predict future crop production in Sub-Saharan Africa.",
    detailedDescription:
      "This AI-powered content generation platform helps marketers and content creators produce high-quality written content efficiently. The application can generate blog posts, social media captions, product descriptions, and marketing copy tailored to specific industries and tones. Advanced natural language processing ensures the content is engaging, relevant, and optimized for SEO.",
    technologies: ["Python", "Pandas", "Flask", "Bootstrap", "ML"],
    imageUrl: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    liveUrl: "https://example.com/ai-content-generator",
    githubUrl: "https://github.com/yourusername/ai-content-generator",
    features: [
      "Multi-format content generation",
      "Tone and style customization",
      "Industry-specific terminology",
      "SEO optimization suggestions",
      "Multilingual support",
    ],
    challenges: [
      "Training AI models on diverse content types",
      "Ensuring content quality and relevance",
      "Creating an intuitive editing interface",
    ],
    year: 2023,
  },
  {
    id: "educube",
    title: "EduCube",
    description: "EduCube is a smart cube designed to enhance student learning experiences and interactions.",
    detailedDescription:
      "EduCUBE is a revolutionary tool designed to transform the classroom environment, enhancing student learning experiences and interactions. With a focus on optimizing student-student, student-speaker, and student-teaching assistant interactions, EduCUBE addresses common challenges students face in maintaining attention and engagement in class.",
    technologies: ["C++", "Arduino", "ESP32"],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=aFoYQ53OEtc",
        title: "EduCube",
        thumbnailUrl: "/images/educubeexplode.jpg",
      },
    ],
    features: [
      "Touchscreen LCDs for Interaction & Engagement",
      "Multiple Classroom Modes",
      "Internet Connectivity for Synchronization Across Devices",
      "Tactile Surface for Smooth Touch",
    ],
    imageUrl: "/images/educube.png",
    images: [
      "/images/educubeproto.jpg",
      "/images/educubegroup.jpg",
      "/images/educubeposter.png",
    ],
    githubUrl: "https://github.com/jhjh0409/EduCube_SUTD",
    year: 2024,
  },
  {
    id: "mini-arcade",
    title: "Mini-Arcade Games",
    description: "A series of CLI-based classic games to allow students to distress.",
    detailedDescription:
      "This game is designed to allow students to distress through a series of mini-games created using our newfound knowledge of Python. This arcade program contains 4 different mini-games. Snake, Space Shooter, Lumberjack and Air Hockey.",
    technologies: ["Python", "CLI"],
    videos: [
      {
        url: "https://youtu.be/ABXWpkrjvSg?si=7daiV6ebE3EnA533",
        title: "Mini Arcade",
        thumbnailUrl: "/images/gxxd.png",
      },
    ],
    imageUrl: "/images/arcade.png",
    images: [
      "/images/lumber.png",
      "/images/space.png",
      "/images/hockey.png",
      "/images/snake.png",
    ],
    githubUrl: "https://github.com/jhjh0409/Mini_Arcade_SUTD",
    year: 2023,
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
