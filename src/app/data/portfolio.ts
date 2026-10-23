import content from './portfolio.json';

export interface Project {
  id: string; name: string; eyebrow: string; category: string; summary: string;
  description: string; problem: string; contribution: string; decisions: string[];
  highlights: string[]; technologies: string[]; url: string; image: string;
  imageAlt: string; imageCaption: string; status: string; statusNote: string;
  featured: boolean; number: string; accent: string; year: string;
}

export interface Education {
  id: string; title: string; issuer: string; category: string; year: string;
  asset: string; preview: string; sourceFile: string; verified: boolean;
  issuedAt?: string; hours?: number | null; primary?: boolean; featured?: boolean;
}

// La portada, las fichas y el CV consumen este mismo registro.
export const portfolio = content;
export const projects: Project[] = content.projects;
export const education: Education[] = content.education;
