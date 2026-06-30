import './Query.css'
import Silk from '../components/Silk'
import TextType from '../components/TextType'
import BlurText from '../components/BlurText'
import SplitText from '../components/SplitText'
import FileUploadChat from '../components/ChatBot'

const QR_TYPES = [
  "Let NexBot walk you through detailed, step-by-step guidance tailored to your situation.",
  "Device Setup and Installation",
  "Vital Signs Monitoring",
  "Accident Detection and Alert System",
  "Hospital and Specialist Routing",
  "Data Privacy and Security",
  "Subscription Plans and Billing",
  "Troubleshooting and Technical Issues",
  "Account and Profile Management"
]

const BOT_DESC = [
  "Meet NexBot, your intelligent support companion.",
  "Whether you are curious about how the accident detection system works, need help pairing your device, want to understand how your vitals data reaches your assigned doctor, or simply need guidance on your subscription plan, NexBot is equipped to assist you instantly and accurately.",
  "For complex or unresolved queries, NexBot seamlessly escalates to a live human support agent during business hours so your concern is never left unanswered."
]

const FTR_CNT = [
  "NexBot draws from NexVitals' complete knowledge base to resolve the most common and complex queries within seconds.",
  "It understands medical terminology, device specifications, and emergency workflows, making it uniquely capable compared to standard support chatbots. Simply type your question in plain language and NexBot will guide you to the right answer or the right person.",
  "If NexBot is unable to resolve your query, you may request a live agent during business hours (Monday to Saturday, 9 AM – 7 PM IST) or submit a detailed query via our Grievance Page for a formal response within 48 working hours."
]

function Query() {
  const handleQuoteComplete = () => {
    console.log("Quote animation completed!")
  }

  const handleQRHComplete = () => {
    console.log("QRH animation completed!")
  }

  const handleQRCComplete = () => {
    console.log("QRC animation completed!")
  }

  const handleQBHComplete = () => {
    console.log("QBH animation completed!")
  }

  const handleQRDComplete = () => {
    console.log("QRD animation completed!")
  }

  const handleFTHComplete = () => {
    console.log("FTH animation completed!")
  }

  const handleFTRComplete = () => {
    console.log("FTR animation completed!")
  }

  const handleFTNComplete = () => {
    console.log("FTN animation completed!")
  }

  return (
    <div className="Query">
      <div className="Query-background">
        <Silk
          speed={3.5}
          scale={1}
          color="#ACC0D3"
          noiseIntensity={2.5}
          rotation={0}
        />
      </div>

      <div className="Query-Heading">
        <TextType
          text={[
            "- Welcome to NexVitals Query Support ! -",
            "- Got Questions? Our Smart Assistant Has Real Answers -"
          ]}
          typingSpeed={70}
          deletingSpeed={45}
          pauseDuration={1200}
          initialDelay={300}
          showCursor
          cursorCharacter="|"
          cursorBlinkDuration={0.7}
          loop={true}
          className="heading-text"
        />
      </div>

      <div className="Query-subheading">
        <BlurText
          text="Ask Anything About NexVitals — Devices, Emergency Protocols, Vital Monitoring, and Everything in Between"
          delay={200}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleQuoteComplete}
          className="quote-text"
        />
      </div>

      <section className="Query-content">
        <div className="Query-stack">
          <div className="Query-types">
            <div className="Query-types-heading">
              <SplitText
                key="Query-types-heading"
                text="- Browse by Topic — Find Exactly What You Are Looking for -"
                className="Query-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleQRHComplete}
                showCallbacks={true}
              />
            </div>

            <div className="Query-types-content">
              {QR_TYPES.map((type, index) => (
                <div className="Query-type" key={`query-type-${index}`}>
                  <SplitText
                    key={`query-type-text-${index}`}
                    text={type}
                    className="Query-type-text"
                    delay={12}
                    duration={0.85}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    onLetterAnimationComplete={handleQRCComplete}
                    textAlign="center"
                  />
                </div>
              ))}
            </div>

            <div className="Query-bot_chatpanel">
              <div className="Query-bot_chatpanel-heading">
                <SplitText
                  key="Query-bot-chatpanel-heading"
                  text="- NexBot : Instant Answers Powered by NexVitals Intelligence -"
                  className="Query-bot-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleQBHComplete}
                  showCallbacks={true}
                />
              </div>
            </div>

            <div className="Query-bot-chatpanel-chatbox">
              <FileUploadChat />
            </div>

            <div className="Query-bot-chatpanel-description">
              {BOT_DESC.map((text, index) => (
                <div
                  className={`Query-bot-description-card ${
                    index === 0 ? 'Query-bot-description-highlight' : ''
                  }`}
                  key={`query-bot-description-${index}`}
                >
                  <SplitText
                    key={`query-bot-description-text-${index}`}
                    text={text}
                    className="Query-bot-description-text"
                    delay={12}
                    duration={0.85}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    onLetterAnimationComplete={handleQRDComplete}
                    textAlign="center"
                  />
                </div>
              ))}
            </div>

            <div className="Query-footer">
              <div className="Query-footer-heading">
                <SplitText
                  key="Query-footer-heading"
                  text="- How NexBot Helps You — A Smarter Way to Get Support Without the Wait -"
                  className="Query-footer-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleFTHComplete}
                  showCallbacks={true}
                />
              </div>

              <div className="Query-footer-content">
                {FTR_CNT.map((type, index) => (
                  <div className="Query-footer-card" key={`query-footer-card-${index}`}>
                    <SplitText
                      key={`query-footer-text-${index}`}
                      text={type}
                      className="Query-footer-text"
                      delay={12}
                      duration={0.85}
                      ease="power2.out"
                      splitType="words"
                      from={{ opacity: 0, y: 18 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      onLetterAnimationComplete={handleFTRComplete}
                      textAlign="center"
                    />
                  </div>
                ))}
              </div>

              <div className="Query-footer-note">
                <SplitText
                  key="Query-footer-note"
                  text="- Precision in Every Pulse. Speed in Every Response. -"
                  className="Query-footer-note-text"
                  delay={12}
                  duration={0.85}
                  ease="power2.out"
                  splitType="letters"
                  from={{ opacity: 0, y: 18 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  onLetterAnimationComplete={handleFTNComplete}
                  textAlign="center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Query