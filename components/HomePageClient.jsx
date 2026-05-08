"use client";

import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";
import ContactForm from "./ContactForm";
import {
  ArrowUp,
  Atom,
  Blocks,
  Bot,
  Cable,
  Component,
  Database,
  FileCode2,
  GitBranch,
  KeyRound,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  PanelTop,
  PhoneCall,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Waypoints,
  Workflow,
  X,
} from "lucide-react";

const services = [
  {
    title: "MERN Stack Development",
    projects: "React.js, Next.js, Node.js, Express.js, MongoDB",
    icon: Blocks,
  },
  {
    title: "Frontend Engineering",
    projects: "Responsive UI, Redux, reusable components, performance",
    icon: LayoutGrid,
  },
  {
    title: "REST API Systems",
    projects: "API integration, modular backend flows, secure endpoints",
    icon: Waypoints,
  },
  {
    title: "RBAC and Security",
    projects: "JWT auth, role-based access control, admin workflows",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: "7+", label: "Years in Web Development" },
  { value: "2+", label: "Years Focused on MERN Stack" },
  { value: "4", label: "Highlighted Resume Projects" },
  { value: "Immediate", label: "Joining Availability" },
];

const toolkit = [
  { label: "React.js", icon: Atom },
  { label: "Next.js", icon: Send },
  { label: "Redux", icon: Workflow },
  { label: "JavaScript ES6+", icon: FileCode2 },
  { label: "Node.js", icon: Server },
  { label: "Express.js", icon: Waypoints },
  { label: "NestJS", icon: Blocks },
  { label: "MongoDB", icon: Database },
  { label: "Mongoose", icon: Database },
  { label: "REST APIs", icon: Cable },
  { label: "JWT", icon: KeyRound },
  { label: "RBAC", icon: ShieldCheck },
  { label: "Bootstrap", icon: PanelTop },
  { label: "Material UI", icon: Component },
  { label: "GitHub", icon: GitBranch },
  { label: "Postman", icon: Send },
  { label: "Agile Scrum", icon: Users },
  { label: "Vercel AI", icon: Bot },
];

const projects = [
  {
    title: "Godhan",
    subtitle: "E-commerce platform with master data and order management",
    stack: "React.js, Redux, Next.js, Node.js, Express.js, MongoDB, Bootstrap",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDcjyizlPhCChBGHKTRqfMGPMBYGRTnnq3DYTTpMLto0eThskGfb3YdTFnhFtoqdnZvaC4bPJZqu2aUDlNjBc4d-73CBUoFxm95FW0xcWwJz3ivdG6jZRo3Bqi4TSPm4OaZTQT6iJbamYp5PADoy5hBFAKOxyensC22sXsoDdOiIQQsTAy9GY8eOr_HYpJ6sO-sMHtoFkhiypGA-zQoUQCoVNRTQK5z-seifXMdVBo77m_4lku9l5hjlwTI-Ukseh4kLuv_6QmO4",
    size: "large",
  },
  {
    title: "Emotorad",
    subtitle: "Order and inventory management with role-based dashboards",
    stack: "React.js, Redux, Bootstrap, JavaScript, CSS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXtyvAGmUD57bUyKuZVbxh_UHHo2dpB3RanFFli_6oqwIxyDBiL5-U4K41-_IF_vUfdLDK2viDC7uo7iZdeN8SykhAlGP9vo8h9OdB1NzEclMmWjUgGKyEnG70Ya90Lhvq_B7JpUvv9TQS-gHzYQswNa7JOD7UFZLZCPyGM8PeIZvkt8mMgNjIJ3iB2TGBRKK1YHJ2l99LGsNi7ypxp1VisX7XdpaaZiLCrHVN32AZYnfDAKALnHbVJSpM8KQ_Kda5TIRhWb-LVzs",
    size: "small",
  },
  {
    title: "Sweepcoins",
    subtitle: "Cash gaming wallet and redemption flow with secure APIs",
    stack: "React.js, Redux, Bootstrap",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj0XKW7hFXT7mcNHc_oDb7nPDnqAehPIx6S4_9yDykOSGn4LtszdfAb58vzAxxS6__5qH2jiCcQoJR5E2DaDp9GuoHxDXS9CGdtWV0_kngQUhoM9KEUPiAvR-7ah0Mb2NZAk28jbqb1gJtyRdYA4KpuaCnzTM4sAea33hFGMsAPI42tkQBxfmEcyPIhH55qO_G590pzUgYLfpiw5YfY_kIpt2Yk_DqtlKQpuZW7KK0DbAT0_jxY9QlZXLFkiBMb6QogcAZleIeqtk",
    size: "small",
  },
  {
    title: "Nationwide",
    subtitle: "Real-time chat with one-to-one, group, and broadcast messaging",
    stack: "React.js, Redux, Next.js, jQuery, HTML5, CSS3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBN8kSoNaqXTtc1pJ2--WvCoyIt6-gBJwu8bvOK4W2RXyvHe0FqmTuXCe_mBx9aOJm3o10n4ES-JeDt_Wp16E5xkWkJ_1i2MGkf8rDLdrgsrUqDD4lrSH_hVrWvzBZDb0KHFezZLTUTeTAjaPSz9KeHI6_SECtTPt46vkWK5DzNn_MxbJxj9tZ7UwdqvyZsblIW-KqD-k3ztLmhBI4ADLo-GcaHRYgZhf8AoHVRxOkyinimbHYYkkUzxvylg5hyIAIHg48MYohbnqw",
    size: "tall",
  },
];

const experiences = [
  {
    company: "Appristine Technology Pvt. Ltd.",
    role: "MERN Stack Developer",
    period: "Feb 2021 - Present",
    points: [
      "Designed, developed, and maintained scalable full-stack applications using React.js, Next.js, Node.js, Express.js, and MongoDB.",
      "Implemented authentication, authorization, and role-based access control to improve application security and access management.",
      "Built complete order management and master data flows for e-commerce platforms.",
      "Optimized backend logic and database queries for faster response times and improved application performance.",
    ],
  },
  {
    company: "Exceptionaire Technology Pvt. Ltd.",
    role: "Front-End Developer",
    period: "Sep 2018 - Jul 2020",
    points: [
      "Developed dynamic and responsive user interfaces using React.js and Redux.",
      "Improved page load performance and user experience through reusable components and clean UI implementation.",
      "Worked closely with backend developers to integrate REST APIs into production-ready frontend flows.",
    ],
  },
];

const credentials = [
  {
    title: "Certification",
    text: "Professional Certification - Frontend Developer, CNS Web World, 1 year program",
  },
  {
    title: "Additional",
    text: "Strong in scalable application architecture, Agile delivery, clean code practices, and continuous learning.",
  },
];

const contactMethods = [
  {
    label: "Email",
    value: "aniketbhagwat95@gmail.com",
    href: "mailto:aniketbhagwat95@gmail.com",
    icon: Mail,
  },
  {
    label: "Primary Phone",
    value: "+91 95884 81017",
    href: "tel:+919588481017",
    icon: PhoneCall,
  },
  {
    label: "Alternate Phone",
    value: "+91 87968 54983",
    href: "tel:+918796854983",
    icon: Smartphone,
  },
  {
    label: "Location",
    value: "India",
    href: "#contact",
    icon: MapPin,
  },
];

const navigationLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Skills" },
  { href: "#portfolio", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function QuickLink({ href, label }) {
  return (
    <a className="social-link" href={href}>
      {label}
    </a>
  );
}

export default function HomePageClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featuredProject = projects.find((project) => project.size === "large");
  const smallProjects = projects.filter((project) => project.size === "small");
  const tallProject = projects.find((project) => project.size === "tall");

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#home">
          <img alt="Aniket Bhagwat logo" className="brand__logo" src="/logo.png" />
        </a>

        <nav className="site-nav site-nav--desktop">
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <div className="site-header__meta site-header__meta--desktop">
            <span>MERN</span>
            <span>NEXT</span>
            <span>API</span>
          </div>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="site-menu-toggle"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" size={20} strokeWidth={2.2} />
            ) : (
              <Menu aria-hidden="true" size={20} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <button
          aria-label="Close menu"
          className="mobile-nav-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          type="button"
        />
      ) : null}

      <nav
        className={
          isMobileMenuOpen
            ? "mobile-nav-panel mobile-nav-panel--open"
            : "mobile-nav-panel"
        }
        id="mobile-navigation"
      >
        <div className="mobile-nav-panel__header">
          <a className="brand" href="#home" onClick={() => setIsMobileMenuOpen(false)}>
            <img alt="Aniket Bhagwat logo" className="brand__logo" src="/logo.png" />
          </a>
          <button
            aria-label="Close menu"
            className="site-menu-toggle"
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
          >
            <X aria-hidden="true" size={20} strokeWidth={2.2} />
          </button>
        </div>

        <div className="site-nav site-nav--mobile">
          {navigationLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="site-header__meta site-header__meta--mobile">
          <span>MERN</span>
          <span>NEXT</span>
          <span>API</span>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero__content">
          <div className="hero__left">
            <p className="eyebrow">Senior MERN Stack Developer</p>
            <h1>
              Aniket Satish Bhagwat
              <span>.</span>
            </h1>
            <p className="hero__summary">
              Senior MERN Stack Developer with 7+ years of experience in
              front-end and full-stack web development, including 2+ years of
              focused MERN Stack delivery across e-commerce, gaming, and
              real-time applications.
            </p>
            <div className="hero__socials">
              <QuickLink href="mailto:aniketbhagwat95@gmail.com" label="Email" />
              <QuickLink href="tel:+919588481017" label="Call" />
              <QuickLink href="#contact" label="India" />
            </div>
            <div className="hero__actions">
              <a className="button button--primary" href="/Aniket-Bhagwat-Resume.pdf">
                Download Resume
              </a>
              <a className="button button--ghost" href="#contact">
                Contact Me
              </a>
            </div>
          </div>

          <div className="hero__portrait">
            <div className="hero__glow" />
            <img
              alt="Aniket Satish Bhagwat portrait"
              src="/aniket-bhagwat-profile.png"
            />
          </div>

          <div className="hero__right glass-card">
            <p className="eyebrow">Professional Summary</p>
            <h2>Scalable MERN applications with strong ownership from UI to APIs</h2>
            <p>
              Proven expertise in secure web application development, REST API
              integration, role-based access control, database optimization,
              and end-to-end feature ownership.
            </p>
            <a className="text-link" href="#portfolio">
              Explore projects
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <SectionHeading
          description="A focused toolkit shaped by real product work in React, Next.js, Node.js, MongoDB, secure APIs, and performance-conscious frontend delivery."
          eyebrow="Core Technical Skills"
          title="What I Build Best"
        />

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="glass-card service-card" key={service.title}>
                <span className="service-card__icon">
                  <Icon aria-hidden="true" size={30} strokeWidth={1.8} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.projects}</p>
              </article>
            );
          })}
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="skills-cloud">
          {toolkit.map((item) => {
            const Icon = item.icon;

            return (
              <span key={item.label}>
                <Icon aria-hidden="true" size={15} strokeWidth={2} />
                {item.label}
              </span>
            );
          })}
        </div>
      </section>

      <section className="section section--muted" id="portfolio">
        <SectionHeading
          eyebrow="Key Projects"
          title="Resume Projects Turned Into Portfolio Highlights"
          description="Selected work across e-commerce, real-time communication, and transaction-driven product flows."
        />

        <div className="filter-row">
          <button className="filter-row__active" type="button">
            All
          </button>
          <button type="button">E-commerce</button>
          <button type="button">Gaming</button>
          <button type="button">Real-time Chat</button>
          <button type="button">RBAC</button>
        </div>

        <div className="portfolio-grid">
          <div className="portfolio-column">
            {smallProjects.map((project) => (
              <article className="portfolio-card" key={project.title}>
                <img alt={project.title} src={project.image} />
                <div className="portfolio-card__overlay portfolio-card__overlay--compact">
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <span>{project.stack}</span>
                </div>
              </article>
            ))}
          </div>

          <article className="portfolio-card portfolio-card--feature">
            <img alt={featuredProject.title} src={featuredProject.image} />
            <div className="portfolio-card__overlay">
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.subtitle}</p>
              <span>{featuredProject.stack}</span>
            </div>
          </article>

          <article className="portfolio-card portfolio-card--tall">
            <img alt={tallProject.title} src={tallProject.image} />
            <div className="portfolio-card__overlay portfolio-card__overlay--compact">
              <h3>{tallProject.title}</h3>
              <p>{tallProject.subtitle}</p>
              <span>{tallProject.stack}</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="experience">
        <SectionHeading
          description="Hands-on product work across two companies, with strengths in scalable architecture, reusable UI systems, secure API flows, and cross-team delivery."
          eyebrow="Professional Experience"
          title="Career Journey and Credentials"
        />

        <div className="experience-grid">
          <div className="experience-list">
            {experiences.map((item) => (
              <article className="glass-card experience-card" key={item.company}>
                <div className="experience-card__header">
                  <div>
                    <p className="eyebrow">{item.period}</p>
                    <h3>{item.role}</h3>
                  </div>
                  <strong>{item.company}</strong>
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="credentials-stack">
            {credentials.map((item) => (
              <article className="glass-card credential-card" key={item.title}>
                <p className="eyebrow">{item.title}</p>
                <h3>{item.text}</h3>
              </article>
            ))}

            <article className="glass-card credential-card credential-card--accent">
              <p className="eyebrow">Resume Ready</p>
              <h3>Immediate joining and ready for React, Next.js, and MERN-focused opportunities.</h3>
              <a className="text-link" href="/Aniket-Bhagwat-Resume.pdf">
                View PDF resume
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--muted" id="contact">
        <div className="contact-layout">
          <div className="contact-copy">
            <SectionHeading
              align="left"
              description="Reach out for MERN development, frontend engineering, API work, admin dashboards, or full product builds."
              eyebrow="Contact"
              title="Let's Build Something Production Ready"
            />

            <div className="contact-cards">
              {contactMethods.map((item) => {
                const Icon = item.icon;

                return (
                  <a className="glass-card contact-card" href={item.href} key={item.label}>
                    <span className="contact-card__icon">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                    </span>
                    <div className="contact-card__content">
                      <span className="eyebrow">{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="contact-actions">
              <a className="button button--primary" href="mailto:aniketbhagwat95@gmail.com">
                Email Me
              </a>
              <a className="button button--ghost" href="/Aniket-Bhagwat-Resume.pdf">
                Open Resume
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <img alt="Aniket Bhagwat logo" className="brand__logo" src="/logo.png" />
        </a>
        <div className="site-footer__links">
          <a href="/Aniket-Bhagwat-Resume.pdf">Resume</a>
          <a href="mailto:aniketbhagwat95@gmail.com">Email</a>
        </div>
        <p>&copy; 2026 Aniket Satish Bhagwat. All rights reserved.</p>
      </footer>

      <a aria-label="Scroll to top" className="scroll-top" href="#home">
        <ArrowUp aria-hidden="true" size={20} strokeWidth={2.4} />
      </a>
      <Chatbot />
    </main>
  );
}

