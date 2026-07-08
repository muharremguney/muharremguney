export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
};

export type EducationItem = {
  school: string;
  program: string;
  period: string;
  detail?: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  updatedAt?: string;
  isPlaceholder?: boolean;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  date: string;
  isPlaceholder?: boolean;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string[]>>;
};
