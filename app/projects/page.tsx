import { ProjectList } from "@/components/project-list";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { projects } from "@/lib/projects";

export default function Project() {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
          <span className="text-4xl">💼</span>
          <Heading className="font-black mb-4">What I&apos;ve been working on</Heading>
          <div className="max-w-3xl">
          <ProjectList projects={projects} />
          </div>
        </Container>
      </div>
    </main>
  );
}
