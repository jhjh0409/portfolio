export interface AboutFact {
  label: string;
  value: string;
  /** render the value in the "online" green */
  online?: boolean;
}

export interface BioSegment {
  text: string;
  accent?: "blue" | "amber";
  /** when set, the segment opens that app window on click */
  opens?: "contact";
}

export interface About {
  name: string;
  tagline: string;
  facts: AboutFact[];
  /** each entry is a paragraph made of inline segments */
  bio: BioSegment[][];
}

export const about: About = {
  name: "Tok Jing Huan",
  tagline: "// aspiring software engineer · former motion designer",
  facts: [
    { label: "location", value: "Singapore" },
    { label: "studying", value: "B.Eng — Computer Science & Design @ SUTD" },
    { label: "prev", value: "Dip. Visual Effects & Motion Graphics @ SP" },
    { label: "status", value: "● open to internships & collabs", online: true },
  ],
  bio: [
    [
      {
        text: "Hey! I'm Jing Huan. I started in design — three years deep into VFX and motion graphics, fascinated by the visuals I saw on screen. Somewhere along the way the pull of ",
      },
      { text: "logic, problem-solving and system building", accent: "blue" },
      { text: " took over." },
    ],
    [
      {
        text: "During National Service I found Harvard's CS50x and had the time of my life — spending days on a single problem set and loving every minute. That sealed it. I'm now at SUTD chasing the logic, innovation and endless possibilities of tech.",
      },
    ],
    [
      {
        text: "Off-screen you'll find me building side-projects, joining hackathons, and keeping fit. ",
      },
      { text: "Feel free to reach out for a chat →", accent: "amber" },
      { text: " " },
      { text: "contact", accent: "blue", opens: "contact" },
    ],
  ],
};
