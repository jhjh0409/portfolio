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
      "ParcelEye is an Android application designed to help users, mainly SUTD students and faculty to track and manage their parcels efficiently, as there is a common problem of parcels being stolen in the hostel area.",
    technologies: ["Java", "AWS", "FireBase", "MongoDB", "SpringBoot", "Docker", "Gradle"],
    imageUrl: "/images/parceleyepic1.png",
    images: [
      "/images/showcase5.JPG",
      "/images/showcase4.JPG",
      "/images/parceleyelogin.png",
      "/images/parceleyeposter.png",
      "/images/parceleyelogin.png",
      "/images/parceleyehome.png",
      "/images/parceleyehistory.png",
      "/images/parceleyeprofile.png",
    ],
    videos: [
      {
        url: "https://youtu.be/cZLDq7wUCWM",
        title: "ParcelEye",
        thumbnailUrl: "/images/parceleyepic1.png",
      },
    ],
    githubUrl: "https://github.com/jhjh0409/ParcelEye_SUTD",
    features: [
      "Real-time push notifications",
      "Real-time parcel surveillance",
      "User authentication with school email",
      "AI tracking using SAM2 by Meta",
    ],
    year: 2025,
  },
  {
    id: "in-between",
    title: "In Between",
    description:
      "A two-player guessing game on the Alchitry Au (Artix-7 FPGA), built using Lucid HDL",
    detailedDescription:
      "In-Between is a two-player guessing game implemented on an FPGA platform. Players compete to guess the position of a randomly generated number relative to a given range, testing both luck and quick decision-making skills.",
    technologies: ["Lucid", "Alchitry Au"],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=EJyl4Bt45qQ",
        title: "In Between",
        thumbnailUrl: "/images/showcase1.JPG",
      },
    ],
    imageUrl: "/images/inbetween.jpg",
    images: [
      "/images/showcase1.JPG",
      "/images/showcase2.JPG",
      "/images/showcase3.JPG",
      "/images/inbetweenposter.png",
      "/images/inbetweendiagram.png",
    ],
    githubUrl: "https://github.com/jhjh0409/In_Between_SUTD",
    features: [
      "Custom designed finite state machine (FSM) and datapath for game logic",
      "Hexadecimals encoded to increase difficulty",
      "Tactile buttons for improved user experience",
    ],
    year: 2025,
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
