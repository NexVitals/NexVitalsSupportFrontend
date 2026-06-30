import { motion, useReducedMotion } from "motion/react"
import { FrameIcon } from "lucide-react"
import myLogo from "../assets/nvlogo.svg";


const footerLinks = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "" },
      { title: "Pricing", href: "https://nexvitals.vercel.app/" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "https://nexvitals.blogspot.com" },
      { title: "Usage Manuals", href: "" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "Twitter", href: "https://x.com/NexVitals", icon: TwitterSvg },
      { title: "Instagram", href: "https://www.instagram.com/nexvitals/", icon: InstagramSvg },
      { title: "YouTube", href: "https://www.youtube.com/@NexVitals-official", icon: YouTubeSvg },
      { title: "LinkedIn", href: "https://www.linkedin.com/company/nexvitals/", icon: LinkedInSvg },
    ],
  },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" />

      <div className="site-footer__grid">
        <AnimatedContainer className="site-footer__brand">
          <img src={myLogo} alt="NexVitals Logo" className="site-footer__logo"/>
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} NexVitals. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="site-footer__links">
          {footerLinks.map((section, index) => (
            <AnimatedContainer
              key={section.label}
              delay={0.1 + index * 0.1}
              className="site-footer__section"
            >
              <div>
                <h3 className="site-footer__heading">{section.label}</h3>
                <ul className="site-footer__list">
                  {section.links.map((link) => {
                    const Icon = link.icon
                    const hasHref = typeof link.href === "string" && link.href.trim() !== ""
                    const isExternal =
                      hasHref &&
                      /^(https?:)?\/\//i.test(link.href)

                    return (
                      <li key={link.title}>
                        <a
                          href={hasHref ? link.href : "#"}
                          className={`site-footer__link ${!hasHref ? "site-footer__link--disabled" : ""}`}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          aria-disabled={!hasHref}
                          onClick={!hasHref ? (e) => e.preventDefault() : undefined}
                        >
                          {Icon && <Icon className="site-footer__link-icon" />}
                          <span>{link.title}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  )
}

function AnimatedContainer({ className = "", delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function TwitterSvg({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramSvg({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function YouTubeSvg({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  )
}

function LinkedInSvg({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 12.45c0-3.47-1.85-5.08-4.33-5.08-2 0-2.9 1.1-3.4 1.87V8.5H9.34c.04.49 0 11.5 0 11.5h3.37v-6.42c0-.34.02-.68.13-.92.27-.68.89-1.39 1.93-1.39 1.36 0 1.91 1.04 1.91 2.57V20h3.37v-7.55Z" />
    </svg>
  )
}