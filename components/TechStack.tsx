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
      title: "React",
      src: "/images/react.png",

      className: "h-10 w-14",
    },
    {
      title: "Bootstrap",
      src: "/images/bootstrap.png",

      className: "h-10 w-10",
    },
    {
      title: "Git",
      src: "/images/git.png",

      className: "h-10 w-12",
    },
    {
      title: "NextJS",
      src: "/images/next.png",

      className: "h-10 w-12",
    },
    {
      title: "MongoDB",
      src: "/images/mongodb.png",

      className: "h-10 w-24",
    },
    {
      title: "Pandas",
      src: "/images/pandas.png",

      className: "h-10 w-24",
    },
    {
      title: "SpringBoot",
      src: "/images/springboot.png",

      className: "h-10 w-24",
    },
    {
      title: "FireBase",
      src: "/images/firebase.png",

      className: "h-10 w-24",
    },
    {
      title: "Docker",
      src: "/images/docker.png",

      className: "h-10 w-24",
    },
    {
      title: "Lucid",
      src: "/images/alchitry.png",

      className: "h-10 w-24",
    },
    {
      title: "Tailwind",
      src: "/images/tailwind.png",

      className: "h-10 w-24",
    },
    {
      title: "Gradle",
      src: "/images/gradle.png",

      className: "h-10 w-24",
    },
    {
      title: "Vercel",
      src: "/images/vercel.png",

      className: "h-10 w-24",
    },
    {
      title: "AWS",
      src: "/images/aws.png",

      className: "h-10 w-12",
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
