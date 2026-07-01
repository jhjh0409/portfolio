export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    period: "Sep 2025 — Dec 2025",
    role: "Software Engineering Intern",
    company: "CPF Board — Frontier Products Team",
    location: "Singapore",
    description:
      "Accelerated frontline workflow by 35% by shipping a self-service template manager for an internal GenAI drafting platform — department leads can now upload, update, and manage templates without engineering help. Engineered the MVP backend for an internal Container-as-a-Service platform that automates PoC/PoV environment provisioning via GitHub and Azure DevOps APIs, and tightened CI/CD with automated code-quality checks, version tracking, and Terraform-based deployment.",
    tags: ["GenAI", "Azure DevOps", "Terraform", "CI/CD"],
  },
  {
    period: "Jun 2024 — Aug 2024",
    role: "Fullstack Developer Intern",
    company: "GenVoice",
    location: "Singapore",
    description:
      "Built a secure token-based authentication system using a Django REST API backend and a Next.js frontend, improving session management and user data protection. Designed efficient RESTful APIs that reduced authentication response time by 30%.",
    tags: ["Django", "Next.js", "REST API"],
  },
];
