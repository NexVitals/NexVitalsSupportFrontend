import { useEffect, useRef, useState } from "react"
import Loader from "./components/Loader"
import Threads from "./components/Threads"
import Shuffle from "./components/Shuffle"
import TextType from "./components/TextType"
import SplitText from "./components/SplitText"
import BlurText from "./components/BlurText"
import ClickSpark from "./components/ClickSpark"
import { Footer } from "./components/Footer"
import CircularText from "./components/CircularText"
import PillNav from "./components/PillNav"
import ContactUsButton from "./components/Button"
import "./App.css"

const logo = "/NEX VITALS LOGO.svg"

const LOADER_DURATION = 14000
const FADE_DURATION = 900
const LOADER_TOTAL = LOADER_DURATION + FADE_DURATION

const SHUFFLE_PROPS = {
  shuffleDirection: "right",
  duration: 0.35,
  animationMode: "evenodd",
  shuffleTimes: 1,
  ease: "power3.out",
  stagger: 0.03,
  threshold: 0.1,
  triggerOnce: true,
  triggerOnHover: true,
  respectReducedMotion: true,
  loop: false,
  loopDelay: 0,
}

const ABOUT_PARAGRAPHS = [
  "NexVitals is an innovative MedTech company focused on transforming emergency healthcare response using intelligent monitoring systems and real-time medical connectivity.",
  "Our mission is to reduce emergency response time and improve survival outcomes by integrating smart health monitoring devices with advanced accident detection technology.",
  "NexVitals devices are designed to be installed inside vehicles, continuously monitoring critical vital parameters and detecting severe accident conditions instantly. When a major accident occurs, our system automatically triggers emergency protocols, notifying paramedics, ambulance teams, and healthcare providers within seconds.",
  "At the same time, the victim's real-time vital data is securely shared with the most suitable medical specialists, helping doctors prepare immediate treatment even before the patient reaches the hospital.",
  "To ensure faster and smarter emergency care, NexVitals identifies the most suitable nearby hospital by evaluating emergency readiness, specialist support, response efficiency, and immediate treatment capability.",
]

const WHY_PARAGRAPHS = [
  "NexVitals provides advanced emergency healthcare technology at an affordable and accessible cost, making smart medical assistance available for more people and vehicles.",
  "Our intelligent monitoring system instantly detects severe accidents and automatically triggers emergency response protocols in real time.",
  "NexVitals continuously monitors critical health vitals and securely shares real-time medical data with healthcare professionals during emergencies.",
  "Our platform identifies the nearest suitable hospital based on emergency support availability, specialist access, and bed availability for faster treatment.",
  "NexVitals creates seamless connectivity between patients, ambulances, doctors, specialists, and hospitals through one integrated healthcare ecosystem.",
]

const WHAT_EXP = [
  "We are seeking seed and pre-Series A investors with a background in medtech, automotive safety, or healthtech who bring not just capital but strategic connections to hospital systems, insurance networks, and regulatory bodies — and a long-term commitment to scaling a solution that the world genuinely needs.",
  "We need experienced guides — medical directors, deep-tech entrepreneurs, regulatory experts, and connected health leaders — who can challenge us with honest advice, open the right doors, and help us navigate the complex landscape of hardware, healthcare compliance, and global market entry.",
  "We are actively partnering with hospitals, ambulance networks, fleet operators, vehicle manufacturers, and insurance providers who are ready to integrate into our emergency response infrastructure and co-build a connected system that works seamlessly when lives are on the line.",
  "We are looking for support from state and national health and transport bodies who can back NexVitals through policy mandates, public procurement, and regulatory fast-tracking — turning a proven solution into a nationally implemented standard of road safety.",
  "Above all, we expect alignment of purpose. Every investor, mentor, and stakeholder who joins NexVitals becomes a co-author of a global movement — and in return, we commit to full transparency, regular impact reporting, and a seat at the table as we define the future of emergency response.",
]

let loaderAlreadyShown = false

export default function App() {
  const [isLoaderVisible, setIsLoaderVisible] = useState(!loaderAlreadyShown)
  const [isLoaderFading, setIsLoaderFading] = useState(false)

  const [showHeroIntro, setShowHeroIntro] = useState(loaderAlreadyShown)
  const [showQuote, setShowQuote] = useState(loaderAlreadyShown)
  const [showAbout, setShowAbout] = useState(loaderAlreadyShown)
  const [showWhy, setShowWhy] = useState(loaderAlreadyShown)
  const [showWhat, setShowWhat] = useState(loaderAlreadyShown)
  const [showContact, setShowContact] = useState(loaderAlreadyShown)
  const [showMark, setShowMark] = useState(loaderAlreadyShown)
  const [showFooter, setShowFooter] = useState(loaderAlreadyShown)

  const footerRef = useRef(null)

  const handleAnimationComplete = () => {
    console.log("All letters have animated!")
  }

  const handleAboutComplete = () => {
    console.log("About heading animation completed!")
  }

  const handleQuoteComplete = () => {
    console.log("Quote blur animation completed!")
  }

  const handleWhyComplete = () => {
    console.log("Why heading animation completed!")
  }

  const handleWhatComplete = () => {
    console.log("What heading animation complete!")
  }

  useEffect(() => {
    if (loaderAlreadyShown) {
      setShowHeroIntro(true)
      setShowQuote(true)
      setShowAbout(true)
      setShowWhy(true)
      setShowWhat(true)
      setShowContact(true)
      setShowMark(true)
      setShowFooter(true)
      return
    }

    const fadeTimer = setTimeout(() => {
      setIsLoaderFading(true)
    }, LOADER_DURATION)

    const removeTimer = setTimeout(() => {
      setIsLoaderVisible(false)
      loaderAlreadyShown = true
    }, LOADER_TOTAL)

    const heroTimer = setTimeout(() => {
      setShowHeroIntro(true)
    }, LOADER_TOTAL + 80)

    const quoteTimer = setTimeout(() => {
      setShowQuote(true)
    }, LOADER_TOTAL + 500)

    const aboutTimer = setTimeout(() => {
      setShowAbout(true)
    }, LOADER_TOTAL + 850)

    const whyTimer = setTimeout(() => {
      setShowWhy(true)
    }, LOADER_TOTAL + 1100)

    const whatTimer = setTimeout(() => {
      setShowWhat(true)
    }, LOADER_TOTAL + 1350)

    const contactTimer = setTimeout(() => {
      setShowContact(true)
    }, LOADER_TOTAL + 1500)

    const markTimer = setTimeout(() => {
      setShowMark(true)
    }, LOADER_TOTAL + 1650)

    const footerTimer = setTimeout(() => {
      setShowFooter(true)
    }, LOADER_TOTAL + 1800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      clearTimeout(heroTimer)
      clearTimeout(quoteTimer)
      clearTimeout(aboutTimer)
      clearTimeout(whyTimer)
      clearTimeout(whatTimer)
      clearTimeout(contactTimer)
      clearTimeout(markTimer)
      clearTimeout(footerTimer)
    }
  }, [])

  useEffect(() => {
    if (!showFooter || !footerRef.current) return

    const node = footerRef.current
    const observer = new IntersectionObserver(
      () => {},
      {
        root: null,
        threshold: 0.15,
      }
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  }, [showFooter])

  return (
    <div className="app">
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={12}
        sparkRadius={15}
        sparkCount={7}
        duration={400}
      >
        <div className="background-layer">
          <Threads
            color={[1, 1, 1]}
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>

        {isLoaderVisible && (
          <div className={`loader-overlay ${isLoaderFading ? "loader-overlay--fade" : ""}`}>
            <Loader />
          </div>
        )}

        <main className="app-content">
          <section className="hero-section">
            <div className="heading-wrapper">
              <div className="heading-row">
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="N"
                  style={{ color: "#4a90ff", fontSize: "7.5rem" }}
                />
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="ex"
                  style={{ color: "#ffffff" }}
                />
                <span className="heading-space" />
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="V"
                  style={{ color: "#ff4444", fontSize: "7.5rem" }}
                />
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="itals"
                  style={{ color: "#ffffff" }}
                />
              </div>

              {showHeroIntro && (
                <SplitText
                  key="split-after-loader"
                  text="- BY PADMA VYUHA -"
                  className="split-text-sub"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                  showCallbacks={true}
                />
              )}

              {showHeroIntro && (
                <TextType
                  text={["Welcome to NexVitals Support !"]}
                  typingSpeed={70}
                  deletingSpeed={45}
                  pauseDuration={1200}
                  initialDelay={300}
                  showCursor
                  cursorCharacter="|"
                  cursorBlinkDuration={0.7}
                  loop={true}
                  className="subheading-text"
                />
              )}

              {showHeroIntro && (
                <div className="hero-pill-nav">
                  <PillNav
                    logo={logo}
                    logoAlt="Company Logo"
                    items={[
                      { label: "Assistance", href: "/Assistance" },
                      { label: "Queries", href: "/Query" },
                      { label: "Grievances", href: "/Grievance" },
                      { label: "Suggestions", href: "/Suggestions" },
                      { label: "Review", href: "/Review" },
                      { label: "Updates", href: "/Updates" },
                      { label: "Admin Login", href: "/PreAdmin" },
                    ]}
                    activeHref="/"
                    ease="power2.easeOut"
                    baseColor="#ffffff"
                    pillColor="#000000"
                    hoveredPillTextColor="#000000"
                    pillTextColor="#ffffff"
                    theme="dark"
                    initialLoadAnimation={true}
                  />
                </div>
              )}
            </div>
          </section>

          {showQuote && (
            <section className="quote-section">
              <div className="quote-inner">
                <BlurText
                  key="quote-blur"
                  text="When Every Moment Counts, NexVitals Delivers Faster Emergency Response And Smarter Medical Assistance."
                  delay={200}
                  animateBy="words"
                  direction="bottom"
                  onAnimationComplete={handleQuoteComplete}
                  className="quote-text"
                />
              </div>
            </section>
          )}

          {showAbout && (
            <section className="about-section">
              <div className="about-inner">
                <div className="about-title-wrap">
                  <SplitText
                    key="about-heading"
                    text="- ABOUT NexVitals -"
                    className="about-title"
                    delay={45}
                    duration={1.1}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 28 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAboutComplete}
                    showCallbacks={true}
                  />
                </div>

                <section className="about-panel">
                  <div className="about-content">
                    {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                      <div className="about-block" key={index}>
                        <SplitText
                          key={`about-paragraph-${index}`}
                          text={paragraph}
                          className="about-paragraph"
                          delay={12}
                          duration={0.85}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 18 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="left"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          )}

          {showWhy && (
            <section className="why-section">
              <div className="why-inner">
                <div className="why-title-wrap">
                  <SplitText
                    key="why-heading"
                    text="- WHY NexVitals ? -"
                    className="why-title"
                    delay={45}
                    duration={1.1}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 28 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleWhyComplete}
                    showCallbacks={true}
                  />
                </div>

                <section className="why-panel">
                  <div className="why-content">
                    {WHY_PARAGRAPHS.map((paragraph, index) => (
                      <div className="why-block" key={index}>
                        <SplitText
                          key={`why-paragraph-${index}`}
                          text={paragraph}
                          className="why-paragraph"
                          delay={12}
                          duration={0.85}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 18 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="left"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          )}

          {showWhat && (
            <section className="What-section">
              <div className="What-title-wrap">
                <SplitText
                  key="What-heading"
                  text="- Open to Strategic Partnerships, Investment, and Mentorship for Global Deployment -"
                  className="What-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleWhatComplete}
                  showCallbacks={true}
                />
              </div>

              <div className="What-content">
                <div className="What-content-wrapper">
                  {WHAT_EXP.map((paragraph, index) => (
                    <div className="What-block" key={index}>
                      <SplitText
                        key={`What-paragraph-${index}`}
                        text={paragraph}
                        className="What-paragraph"
                        delay={12}
                        duration={0.85}
                        ease="power2.out"
                        splitType="words"
                        from={{ opacity: 0, y: 18 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.05}
                        rootMargin="0px"
                        textAlign="left"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {showContact && (
            <section className="contact-button-section">
              <div className="contact-button-wrap">
                <ContactUsButton />
              </div>
            </section>
          )}

          {showMark && (
            <section className="mark-section">
              <div className="mark-inner">
                <CircularText
                  text="NEXVITALS*BY*PADMA*VYUHA*"
                  onHover="speedUp"
                  spinDuration={15}
                  className="mark-class"
                />
              </div>
            </section>
          )}

          {showFooter && (
            <div ref={footerRef} className="footer-wrap">
              <Footer />
            </div>
          )}
        </main>
      </ClickSpark>
    </div>
  )
}