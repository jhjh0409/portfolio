import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";

export default function Contact() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Container>
          <span className="text-4xl">📫</span>
          <Heading className="font-black">Contact Me</Heading>
          <Paragraph className="max-w-2xl mt-4">
            I&apos;m always open to new opportunities, collaborations, or just a chat about tech, design, or ideas! Feel free to email me or fill up the form, I will reply ASAP!
          </Paragraph>
          <Paragraph className="max-w-2xl mt-4">
            Note: Form Function still in works.
          </Paragraph>
          <Paragraph className="max-w-xl mt-4">
            📧Email: jinghuan04@gmail.com
          </Paragraph>
          <div className="my-4">
            <ContactForm />
          </div>
        </Container>
      </div>
    </main>
  );
}
