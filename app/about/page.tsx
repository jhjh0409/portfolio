import AboutMe from "@/components/about-me";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function About() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
            <span className="text-4xl">💬</span>
          <Heading className="font-black">About Me</Heading>
          <AboutMe />
        </Container>
      </div>
    </main>
  );
}
