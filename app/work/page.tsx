import { Timeline } from "@/components/Timeline";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function Work() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
          <span className="text-4xl">📋</span>
          <Heading className="font-black">Work Experience</Heading>
          <Timeline
        items={[
          {
            title: "Student Facilitator/Mentor",
            company: "STEAMunity",
            period: "June 2024 - January 2025",
            description:[
              "Mentored a team of secondary school and polytechnic students in applying design and STEM methodologies to address air quality issues faced by elderly folks in their homes, collaborating with Sacred Grace Social Services.",
              "Led my team to win the Outstanding Presentation Award out of 30+ teams by guiding them in developing a functioning prototype using 3D printing and microcontroller programming for the prototype demo day.",
            ]
          },
          {
            title: "Fullstack Developer Intern",
            company: "GenVoice",
            period: "June 2024 - August 2024",
            description:[
              "Developed a secure token-based authentication system using Django REST API and Next.js frontend, enhancing session management, user data protection, and privacy.",
              "Reduced authentication response time by 30% by designing and integrating efficient RESTful APIs to optimize front-end to back-end communication.",
              "Utilized Next.js, React, Django, Next-Auth, TypeScript, JavaScript, and SQLite to develop and deploy web applications on Vercel, ensuring efficient and scalable solutions.",
            ]
          },
          {
            title: "Motion Designer & VFX Intern",
            company: "KRAFTW5RKZ, Pte Ltd.",
            period: "September 2020 - February 2021",
            description:[
              "Collaborated closely with creative teams and clients to develop compelling motion graphics, using mood boards, storyboards, and animatics to align visual narratives with brand goals and audience expectations.",
              "Presented design concepts and animation drafts to clients including Tiger Beer and DBS Bank, incorporating feedback to refine storytelling and ensure high-impact content delivery across social media platforms.",
            ]
          },
        ]}
      />
        </Container>
      </div>
    </main>
  );
}
