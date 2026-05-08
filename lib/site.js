export const siteConfig = {
  name: "Aniket Satish Bhagwat",
  siteName: "Aniket Bhagwat Portfolio",
  title: "Aniket Satish Bhagwat | Senior MERN Stack Developer",
  description:
    "Senior MERN Stack Developer with 7+ years of experience building scalable React, Next.js, Node.js, Express.js, and MongoDB applications.",
  summary:
    "Portfolio of Aniket Satish Bhagwat featuring MERN stack projects, frontend engineering expertise, REST API development, and production-ready full-stack delivery.",
  image: "/aniket-bhagwat-profile.png",
  logo: "/logo.png",
  email: "aniketbhagwat95@gmail.com",
  phone: "+91 95884 81017",
  location: "India",
  keywords: [
    "Aniket Satish Bhagwat",
    "Aniket Bhagwat portfolio",
    "Senior MERN Stack Developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "MongoDB developer",
    "Full stack developer India",
  ],
};

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  return rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
}
