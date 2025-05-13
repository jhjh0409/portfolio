import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";

export default function About() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
            <span className="text-4xl">💬</span>
          <Heading className="font-black">About Me</Heading>
          <Paragraph className="max-w-xl mt-4">
            I am currently a Year 2 student at Singapore University of Design & Technology, 
            majoring in Computer Science and Design, specializing in Software Engineering.
          </Paragraph>
        </Container>
      </div>
    </main>
  );
}
