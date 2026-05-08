import HomePageClient from "../components/HomePageClient";
import { getSiteUrl, siteConfig } from "../lib/site";

const siteUrl = getSiteUrl();
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata = {
  metadataBase,
  title: siteConfig.title,
  description: siteConfig.summary,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.name }],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.siteName,
    title: siteConfig.title,
    description: siteConfig.summary,
    images: [
      {
        url: siteConfig.image,
        alt: `${siteConfig.name} profile photo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.summary,
    images: [siteConfig.image],
  },
};

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Senior MERN Stack Developer",
    description: siteConfig.description,
    image: siteUrl ? `${siteUrl}${siteConfig.image}` : siteConfig.image,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location,
    },
    url: siteUrl || undefined,
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API Development",
      "Frontend Engineering",
      "MERN Stack Development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    description: siteConfig.summary,
    url: siteUrl || undefined,
    image: siteUrl ? `${siteUrl}${siteConfig.image}` : siteConfig.image,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema]),
        }}
        type="application/ld+json"
      />
      <HomePageClient />
    </>
  );
}

