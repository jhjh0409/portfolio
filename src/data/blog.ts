export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    date: "2026.02.18",
    title: "What CS50 taught me about sitting with hard problems",
    excerpt:
      "Spending days on a single problem set, and why that was the most fun I've had learning.",
  },
  {
    date: "2025.11.02",
    title: "From motion graphics to merge conflicts",
    excerpt: "How a design background quietly makes me a better engineer.",
  },
  {
    date: "2025.07.21",
    title: "Building ParcelEye: lessons from my first real backend",
    excerpt: "Spring Boot, Docker, and everything that broke along the way.",
  },
];
