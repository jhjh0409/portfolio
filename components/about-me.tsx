import Image from "next/image"
import { Paragraph } from "./ui/Paragraph"

export default function AboutMe() {
  // You can replace these placeholder images with your actual images
  const images = [
    "/images/FinalOutput.png",
    "/placeholder.svg?height=300&width=300",
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
            className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Image src={src || "/placeholder.svg"} alt={`About me image ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Text Content Area */}
      <div>
        <Paragraph className="mt-4">
            I&apos;m passionate about creating meaningful experiences through design and technology. With a background in both
            creative and technical fields, I bring a unique perspective to every project. When I&apos;m not working, you can
            find me exploring the outdoors, experimenting with new recipes, or diving into a good book.
        </Paragraph>

        <Paragraph className="mt-4">
            I&apos;m passionate about creating meaningful experiences through design and technology. With a background in both
            creative and technical fields, I bring a unique perspective to every project. When I&apos;m not working, you can
            find me exploring the outdoors, experimenting with new recipes, or diving into a good book.
        </Paragraph>
      </div>
    </section>
  )
}
