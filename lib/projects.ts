export interface Project {
  id: string
  title: string
  description: string
  detailedDescription: string
  technologies: string[]
  imageUrl: string
  images?: string[]
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
    id: "fitness-app",
    title: "Fitness Tracking App",
    description:
      "A mobile application that helps users track their workouts, nutrition, and progress towards fitness goals.",
    detailedDescription:
      "This fitness tracking application empowers users to take control of their health journey. Users can create custom workout plans, track their nutrition intake, monitor progress with visual charts, and share achievements with friends. The app uses machine learning to provide personalized recommendations based on user performance and goals.",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "Node.js"],
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
    id: "ai-content-generator",
    title: "AI Content Generator",
    description:
      "A web application that uses artificial intelligence to generate high-quality content for blogs, social media, and marketing materials.",
    detailedDescription:
      "This AI-powered content generation platform helps marketers and content creators produce high-quality written content efficiently. The application can generate blog posts, social media captions, product descriptions, and marketing copy tailored to specific industries and tones. Advanced natural language processing ensures the content is engaging, relevant, and optimized for SEO.",
    technologies: ["Vue.js", "Python", "FastAPI", "TensorFlow", "Docker"],
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
      "This personal finance application helps users take control of their financial health by providing tools to track expenses, monitor income, set budget goals, and visualize spending patterns. The application includes features for categorizing transactions, generating financial reports, and receiving insights on spending habits to help users make better financial decisions.",
    technologies: ["C++", "Arduino", "ESP32"],
    imageUrl: "/images/educube.png",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    liveUrl: "https://example.com/finance-tracker",
    githubUrl: "https://github.com/yourusername/finance-tracker",
    features: [
      "Expense categorization",
      "Budget planning tools",
      "Financial goal setting",
      "Spending pattern visualization",
      "Secure bank account integration",
    ],
    challenges: [
      "Ensuring data security and privacy",
      "Creating intuitive data visualization",
      "Implementing accurate financial calculations",
    ],
    year: 2022,
  },
  {
    id: "mini-arcade",
    title: "Mini-Arcade Games",
    description: "EduCube is a smart cube designed to enhance student learning experiences and interactions.",
    detailedDescription:
      "This personal finance application helps users take control of their financial health by providing tools to track expenses, monitor income, set budget goals, and visualize spending patterns. The application includes features for categorizing transactions, generating financial reports, and receiving insights on spending habits to help users make better financial decisions.",
    technologies: ["Python", "CLI"],
    imageUrl: "/images/educube.png",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    liveUrl: "https://example.com/finance-tracker",
    githubUrl: "https://github.com/yourusername/finance-tracker",
    features: [
      "Expense categorization",
      "Budget planning tools",
      "Financial goal setting",
      "Spending pattern visualization",
      "Secure bank account integration",
    ],
    challenges: [
      "Ensuring data security and privacy",
      "Creating intuitive data visualization",
      "Implementing accurate financial calculations",
    ],
    year: 2022,
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
