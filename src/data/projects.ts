export interface Project {
  id: string;
  ref: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "hotelease",
    ref: "PRJ_001",
    title: "HotelEase",
    category: "FULL-STACK",
    description:
      "A full-stack hotel booking platform built in partnership with Ascenda — search, browse, book, and pay end-to-end.",
    longDescription:
      "HotelEase was built as a partnership project with Ascenda, integrating their hotel and destination APIs into a complete consumer-facing booking experience. The frontend is a responsive React + TypeScript application; the backend is a Node.js + MongoDB stack exposing scalable REST APIs with JWT-based authentication backed by secure cookies.\n\nStripe powers the payment flow, with deployments split across Railway (backend) and Vercel (frontend). Reliability mattered a lot here — there was real money moving through the system — so I wired up a comprehensive testing layer using Jest and Vitest for unit/integration coverage, plus Playwright for end-to-end flows across the most important user journeys.\n\nThe project taught me how to design API boundaries that hold up under real third-party data, how to think about session security in a payment context, and how to build the kind of test confidence that lets you ship a release without holding your breath.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Stripe", "Jest", "Playwright"],
    images: [],
    links: [
      { label: "Live Site", href: "https://esc-c2g2.vercel.app" },
      { label: "GitHub", href: "https://github.com/jhjh0409/HotelEase_SUTD" },
    ],
  },
  {
    id: "cseshell",
    ref: "PRJ_002",
    title: "CSEShell",
    category: "SYSTEMS",
    description:
      "A lightweight Unix-like shell in C with 13 built-in commands and per-command resource usage reporting.",
    longDescription:
      "CSEShell is a from-scratch Unix-like shell written in C. It supports external process execution alongside thirteen built-in commands covering filesystem navigation (cd, ld, ldr, find), environment management (env, setenv, unsetenv), system introspection (sys, dcheck), background daemons (dspawn), directory archiving (backup), and a friendly help system (help, usage).\n\nThe design has two opinionated threads. The first is sustainability: after each external command, the shell reports CPU time, memory usage, and disk I/O so users see the cost of what they're running — small encouragement toward mindful computing. The second is inclusivity: error messages are written in plain language with actionable next steps, and the built-in help is designed for users at any technical level.\n\nThis was my first serious dive into systems programming. Getting the prompt to render correctly, wiring up process spawning safely, and laying out a coherent set of built-ins all came with a lot of segfaults along the way — exactly the kind of learning curve I was hoping for.",
    tags: ["C", "Unix", "Systems Programming"],
    images: [],
    links: [{ label: "GitHub", href: "https://github.com/jhjh0409/CSEShell_SUTD" }],
  },
  {
    id: "in-between",
    ref: "PRJ_003",
    title: "In-Between",
    category: "HARDWARE",
    description:
      "A two-player guessing game on an FPGA board, with custom finite state machine designed in Lucid HDL.",
    longDescription:
      "In-Between is a two-player guessing game implemented in hardware on an Alchitry Au FPGA board, written in the Lucid HDL. The core of the game is a custom finite state machine that handles dealing, betting, revealing, and round transitions — every input and output runs through the FSM rather than through software, which made correctness a much more deliberate exercise.\n\nI/O is wired up to the board's physical interface: LEDs as indicators, 7-segment displays for game state, and buttons as the only input. Debugging meant a mix of simulation tooling for logic verification and a lot of on-board testing for timing — watching the displays carefully and reasoning backward from what they showed when something didn't behave.\n\nWorking this close to the metal reframed how I think about state. Software lets you be sloppy in ways that don't survive on hardware, and that constraint turned out to be a great teacher.",
    tags: ["FPGA", "Lucid", "Verilog", "Digital Logic"],
    images: [
      "/images/inbetweenposter.png",
      "/images/inbetween.jpg",
      "/images/inbetweendiagram.png",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jhjh0409/In_Between_SUTD" }],
  },
  {
    id: "parceleye",
    ref: "PRJ_004",
    title: "ParcelEye",
    category: "MOBILE",
    description:
      "An Android app for university parcel tracking with AI-powered object detection and real-time push notifications.",
    longDescription:
      "ParcelEye is an Android application built to streamline how packages get tracked, claimed, and handed off within a university setting. The standout feature is AI-powered parcel identification using Meta's Segment Anything Model (SAM2) — the app automates the visual side of recognizing parcels rather than relying on hand-typed tracking numbers, and pushes real-time updates to recipients through Firebase Cloud Messaging.\n\nThe backend runs Spring Boot with a MongoDB data layer, deployed on AWS EC2 inside Docker containers. It handles authentication, parcel state transitions, and notification dispatch. The Android client (Java) talks to it over a REST interface with sensible offline handling so the app degrades gracefully when network is patchy around the parcel rooms.\n\nThis was the first project where I had to coordinate a fully decoupled mobile + cloud stack end-to-end, including the unglamorous parts: deployment, certificates, container builds, and figuring out where bugs were actually living when something broke.",
    tags: ["Java", "Android", "Spring Boot", "MongoDB", "AWS", "Firebase", "Docker"],
    images: [
      "/images/parceleyeposter.png",
      "/images/parceleyehome.png",
      "/images/parceleyelogin.png",
      "/images/parceleyepic1.png",
      "/images/parceleyehistory.png",
      "/images/parceleyeprofile.png",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jhjh0409/ParcelEye_SUTD" }],
  },
  {
    id: "educube",
    ref: "PRJ_005",
    title: "EduCube",
    category: "DESIGN",
    description:
      "A cube-shaped classroom tool with six displays and a motion sensor — designed to bring quieter students into the conversation.",
    longDescription:
      'EduCube was a Design Thinking and Innovation project tackling five real classroom pain points: students struggling to follow material, the fear of asking questions in front of peers, low instructor engagement, distraction, and front-of-room visibility issues. The team of five framed the problem with a structured "How Might We" process before going anywhere near hardware.\n\nThe build is a six-faced cube driven by three ESP32-S3 microcontrollers, six 2.4-inch ILI9341 TFT displays, and an MPU6050 motion sensor for orientation and gesture input. We used Bodmer\'s TFT_eSPI and TFT_eWidgets libraries for the display layer and Adafruit\'s MPU6050 driver for sensor integration. Each face can show different content — questions, polls, slide companions — and the orientation sensor decides which face is "active" based on how the cube sits on a desk.\n\nThe project pushed me to balance the engineering side with research, user testing, and iterating on what genuinely helps a classroom rather than what\'s clever to build.',
    tags: ["C++", "ESP32", "Embedded", "Design Thinking"],
    images: [
      "/images/educubeposter.png",
      "/images/educube.png",
      "/images/educubeproto.jpg",
      "/images/educubeexplode.jpg",
      "/images/educubegroup.jpg",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jhjh0409/EduCube_SUTD" }],
  },
  {
    id: "mini-arcade",
    ref: "PRJ_006",
    title: "Mini Arcade",
    category: "GAMES",
    description:
      "A collection of four Python mini-games — Snake, Space Shooter, Lumberjack, and Air Hockey — for stressed students.",
    longDescription:
      "Mini Arcade is a small Python game collection built for the Computational Thinking module at SUTD. The brief was open-ended; our team of six chose to build something that would actually live somewhere on campus — a four-game arcade aimed at SUTD students looking for a five-minute break, with the intent of installing it near the vending machines above the Indoor Sports Hall.\n\nFour games made the final cut: Snake, Space Shooter, Lumberjack, and Air Hockey. Each one was prototyped independently before being unified under a single arcade shell (Arcade.py) that handles game selection, scoring, and the transition between modes. Splitting the work this way let everyone iterate on their game's mechanics without stepping on each other, then meet at well-defined interfaces for the combined launcher.\n\nThis was an early project where I learned how much smoother things go when you agree on contracts and entry points up-front — small decisions about the launcher's API saved hours of integration pain later.",
    tags: ["Python", "Pygame", "Computational Thinking"],
    images: [
      "/images/arcade.png",
      "/images/snake.png",
      "/images/space.png",
      "/images/lumber.png",
      "/images/hockey.png",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jhjh0409/Mini_Arcade_SUTD" }],
  },
  {
    id: "cropcast",
    ref: "PRJ_007",
    title: "CropCast",
    category: "MACHINE LEARNING",
    description:
      "A Flask-based crop yield forecasting tool using polynomial regression on climate data — 88.5% prediction accuracy.",
    longDescription:
      "CropCast is a web application for real-time crop yield forecasting. Users enter climate parameters and the app returns a yield prediction grounded in historical data, with the goal of giving farmers and researchers a fast, accessible way to reason about planting decisions.\n\nThe model is a polynomial regression trained on historical climate-and-yield data; after tuning, it lands at 88.5% accuracy on the held-out set. The application layer is a Flask backend serving a Bootstrap frontend, with Pandas powering the data preparation pipeline that feeds both training and inference.\n\nThis was a Design Thinking Project where the modelling and the product had to land together — a slightly more accurate model that nobody can actually use is worse than a slightly worse one that's behind a clean, honest interface. That framing stuck with me.",
    tags: ["Python", "Flask", "Pandas", "Bootstrap", "Machine Learning"],
    images: [],
    links: [{ label: "GitHub", href: "https://github.com/jhjh0409/CropCast" }],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Accent palette shared by project cards, their windows, and detail titles. */
export const PROJECT_ACCENTS = ["#b08cff", "#34d3c8", "#f2b65c", "#fb7aa0", "#6ea8fe", "#3ddc91"];

/** Deterministic accent for a project, by its index in the list. */
export function projectAccent(id: string): string {
  const i = projects.findIndex((p) => p.id === id);
  return PROJECT_ACCENTS[(i < 0 ? 0 : i) % PROJECT_ACCENTS.length];
}
