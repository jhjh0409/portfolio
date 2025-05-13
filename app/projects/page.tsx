import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";

export default function Project() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
          <span className="text-4xl">💼</span>
          <Heading className="font-black">Projects</Heading>
          <Paragraph className="max-w-xl mt-4">
            This is my web portfolio, where you can learn more about me!😀
          </Paragraph>
        </Container>
      </div>
    </main>
  );
}
