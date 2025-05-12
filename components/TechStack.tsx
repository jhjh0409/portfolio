import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Heading } from "./ui/Heading";

export const TechStack = () => {
  const stack = [
    {
      title: "Java",
      src: "/images/java.png",

      className: "h-10 w-14",
    },
    {
      title: "Python",
      src: "/images/python.webp",

      className: "h-10 w-10",
    },
    {
      title: "JavaScript",
      src: "/images/javascript.svg",

      className: "h-10 w-10",
    },
    {
      title: "TypeScript",
      src: "/images/typescript.svg",

      className: "h-10 w-10",
    },
    {
      title: "C",
      src: "/images/c.png",

      className: "h-10 w-10",
    },
    {
      title: "C++",
      src: "/images/cpp.png",

      className: "h-10 w-10",
    },
    {
      title: "SQL",
      src: "/images/sql.webp",

      className: "h-10 w-12",
    },
    {
      title: "Tailwind",
      src: "/images/tailwind.png",

      className: "h-10 w-24",
    },
    {
      title: "Vercel",
      src: "/images/vercel.png",

      className: "h-10 w-24",
    },
  ];
  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <div className="flex flex-wrap">
        {stack.map((item) => (
          <Image
            src={item.src}
            key={item.src}
            width={`200`}
            height={`200`}
            alt={item.title}
            className={twMerge("object-contain mr-4 mb-4", item.className)}
          />
        ))}
      </div>
    </div>
  );
};
