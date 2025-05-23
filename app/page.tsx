import { TechStack } from "@/components/TechStack";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";

export default function Home() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
          <span className="text-4xl">👋</span>
          <Heading className="font-black">Hello! I&apos;m Jing Huan.</Heading>
          <Paragraph className="max-w-xl mt-4">
            Welcome to my web portfolio, where I showcase my work, past experiences and talk about things I&apos;m interested in.😀
          </Paragraph>
          <Paragraph className="max-w-xl mt-4">
            I&apos;m a Computer Science and Design Junior at<br />
            Singapore University of Technology and Design (SUTD).
          </Paragraph>
          <Paragraph className="max-w-xl mt-4">
            As an aspiring Software Engineer, I&apos;m passionate about innovating and developing technology to improve lives.
          </Paragraph>
          <TechStack />
        </Container>
      </div>
    </main>
  );
}
