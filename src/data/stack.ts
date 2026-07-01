export interface StackInfo {
  label: string;
  value: string;
  accent: string;
}

export interface StackItem {
  name: string;
  /** devicon logo URL; omit when no logo exists */
  icon?: string;
  /** logo is near-black (e.g. Next.js) — keep it light and invert on hover */
  dark?: boolean;
}

export interface StackGroup {
  label: string;
  accent: string;
  items: StackItem[];
}

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const catArt = `      /\\__/\\
     ( o.o  )
      > ^ <
   ___/   \\___
  /  jinghuan  \\
 /______________\\
 [  CS · DESIGN  ]`;

export const stackInfo: StackInfo[] = [
  { label: "OS", value: "siteOS 2.6", accent: "#3ddc91" },
  { label: "Role", value: "SWE · ex-Motion Designer", accent: "#b08cff" },
  { label: "School", value: "SUTD — CS & Design", accent: "#6ea8fe" },
  { label: "Uptime", value: "building since 2018", accent: "#f2b65c" },
  { label: "Shell", value: "curiosity + caffeine", accent: "#34d3c8" },
];

export const stackGroups: StackGroup[] = [
  {
    label: "languages",
    accent: "#f2b65c",
    items: [
      { name: "Python", icon: `${DI}/python/python-original.svg` },
      { name: "Java", icon: `${DI}/java/java-original.svg` },
      { name: "C++", icon: `${DI}/cplusplus/cplusplus-original.svg` },
      { name: "TypeScript", icon: `${DI}/typescript/typescript-original.svg` },
      { name: "JavaScript", icon: `${DI}/javascript/javascript-original.svg` },
      { name: "Lucid HDL" },
    ],
  },
  {
    label: "frameworks",
    accent: "#b08cff",
    items: [
      { name: "React", icon: `${DI}/react/react-original.svg` },
      { name: "Next.js", icon: `${DI}/nextjs/nextjs-original.svg`, dark: true },
      { name: "Django", icon: `${DI}/django/django-plain.svg` },
      { name: "Spring Boot", icon: `${DI}/spring/spring-original.svg` },
    ],
  },
  {
    label: "tools & infra",
    accent: "#34d3c8",
    items: [
      { name: "Docker", icon: `${DI}/docker/docker-original.svg` },
      { name: "AWS", icon: `${DI}/amazonwebservices/amazonwebservices-original.svg` },
      { name: "Firebase", icon: `${DI}/firebase/firebase-plain.svg` },
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg` },
      { name: "Git", icon: `${DI}/git/git-original.svg` },
      { name: "Arduino", icon: `${DI}/arduino/arduino-original.svg` },
      { name: "ESP32" },
    ],
  },
];
