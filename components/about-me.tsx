import Image from "next/image"
import { Paragraph } from "./ui/Paragraph"

export default function AboutMe() {
  // You can replace these placeholder images with your actual images
  const images = [
    "/images/FinalOutput.png",
    "/placeholder.svg?height=600&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ]

  return (
    <section className="py-10 text-secondary">

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative h-65 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Image src={src || "/placeholder.svg"} alt={`About me image ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Text Content Area */}
      <div>
        <Paragraph className="mt-4">
            Hey! I&apos;m Jing Huan. I&apos;m an aspiring software engineer and former motion designer.
        </Paragraph>

        <Paragraph className="mt-4">
            I&apos;m currently pursuing a Bachelor&lsquo;s of Engineering, majoring in Computer Science and Design at Singapore University of Design and Technology (SUTD).
            Prior to University, I was at Singapore Polytechnic doing a diploma in Visual Effects and Motion Graphics. This is my journey.
        </Paragraph>

        <Paragraph className="mt-4">
            Before starting my diploma in 2018, I was considering between venturing into the technology sector or the design sector. Back then, I was watching
            too many movies and shows for my own good, and was fascinated with the visuals I saw on screen - the 3D graphics, animations, effects. These
            led me to lean towards the design industry, and thus began my diploma journey for the next 3 years.
        </Paragraph>

        <Paragraph className="mt-4">
            I had a wonderful time learning about the different aspects of design, and even though I was not the best at it I tried to learn more on my own,
            brush up my skills and even went into freelancing here and there. At the same time, I also enjoyed doing 3D renders on my own to practice and
            learn more about lighting, rendering and compositing.
        </Paragraph>

        <Paragraph className="mt-4">
            But over time, I found myself drifting away from it - not because I stopped liking it, but because something else started to take over.
            I began spending more time diving into the technology sector. I was fascinated with the latest news and development of tools, and
            dipped my toes into the world of programming. As I delved deeper into coding, problem-solving, and system building, I realized my true passion 
            lay in the logic, innovation, and endless possibilities of tech.
        </Paragraph>

        <Paragraph className="mt-4">
            After graduating with my diploma, I realised I wanted to pursue a career in the technology sector. During my 2 years in National Service, I dabbled more
            with programming and eventually found out about Harvard&lsquo;s CS50x, which was an introductory course to Computer Science. The course was fascinating.
            Although it was difficult, I was having the time of my life learning and attempting the problem sets. I would spend days trying to solve a single
            question and had a blast doing so.
        </Paragraph>

        <Paragraph className="mt-4">
            Once I was done with National Service, it then came time for University. Luckily for me, during that same year I managed to get an offer into
            SUTD, and I officially began my Bachelors. In my spare time, I enjoy exploring new technologies, building projects and joining hackathons. I also
            love keeping fit and do sports regularly. Feel free to reach out to have a chat!
        </Paragraph>
      </div>
    </section>
  )
}
