import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import './Assistance.css'
import Silk from '../components/Silk'
import TextType from '../components/TextType'
import BlurText from '../components/BlurText'
import SplitText from '../components/SplitText'
import { Form } from '../components/SubscriberForm'

const NS_PARAGRAPHS = [
  "Be the first to know about NexVitals' latest breakthroughs in emergency response technology.",
  "From firmware upgrades to hospital network expansions and safety compliance updates, our newsletter keeps you informed, prepared, and connected to a smarter ecosystem of care.",
  "Enter your email above and join thousands who trust NexVitals to keep them in the loop.",
]

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'nexvitalssupport@gmail.com',
    href: 'mailto:nexvitalssupport@gmail.com',
    full: false,
  },
  {
    label: 'Phone',
    value: '1800-XXX-XXXX (Toll-Free)',
    href: 'tel:1800XXXXXXXX',
    full: false,
  },
  {
    label: 'Working Hours',
    value: 'Monday to Saturday, 9 AM – 7 PM IST',
    full: false,
  },
  {
    label: 'Postal Address',
    value: 'NexVitals PVT LTD, Hyderabad, Telangana – 500050.',
    full: true,
  },
]

const EMERGENCY_DETAILS = [
  {
    label: 'Response Line',
    value: '1800-XXX-0000 (Available 24/7)',
    href: 'tel:1800-XXX-0000',
    full: false,
  },
  {
    label: 'National Ambulance Service',
    value: '108',
    href: 'tel:108',
    full: false,
  },
  {
    label: 'Police',
    value: '100',
    href: 'tel:100',
    full: false,
  },
  {
    label: 'National Disaster HelpLine',
    value: '1078',
    href: 'tel:1078',
    full: false,
  },
]

const FAQ_CATEGORIES = {
  WRKFLW: 'WORKFLOW',
  PRCNG: 'PRICING',
  ASSTNC: 'ASSISTANCE',
  TECH: 'TECHNOLOGY',
  PRVC: 'PRIVACY',
}

const FAQ_DATA = {
  WRKFLW: [
    {
      question: 'How does NexVitals detect that an accident has occurred?',
      answer:
        'The device uses impact sensors and real-time vital readings to identify a crash. When a severe event is confirmed, it instantly triggers the emergency alert protocol.',
    },
    {
      question: 'Who gets notified first when an accident is detected?',
      answer:
        'The nearest ambulance team and paramedic unit are notified simultaneously, along with the pre-assigned emergency contact on your profile.',
    },
    {
      question: 'How does NexVitals decide which hospital to send the victim to?',
      answer:
        'It checks real-time bed availability, emergency unit readiness, and specialist presence across nearby hospitals and routes the victim to the best available option.',
    },
    {
      question: "How does the victim's vitals data reach the doctor?",
      answer:
        'Vitals captured by the device are transmitted instantly to the assigned specialist, so the doctor is already briefed before the patient arrives at the hospital.',
    },
    {
      question: 'What happens if the accident occurs in a low network area?',
      answer:
        'The device stores the event data locally and transmits it as soon as connectivity is restored. Critical alerts are prioritized over all other data traffic.',
    },
  ],
  PRCNG: [
    {
      question: 'Is there a one-time device cost or a monthly subscription?',
      answer:
        'NexVitals follows a one-time device purchase model combined with an annual subscription for monitoring, alerts, and emergency services.',
    },
    {
      question: 'Does the subscription cover ambulance dispatch charges?',
      answer:
        'Yes, ambulance coordination is covered under all active subscription plans at no additional cost during an emergency.',
    },
    {
      question: 'Are there different pricing plans available?',
      answer:
        'Yes, we offer Individual, Family, and Fleet plans. Each plan varies in the number of devices, coverage scope, and support priority level.',
    },
    {
      question: 'Is there a free trial available before purchasing?',
      answer:
        'We offer a 30-day trial period for new users. Full emergency features are active during the trial with no commitment required.',
    },
    {
      question: 'What happens if I miss my subscription renewal?',
      answer:
        'You will receive reminders 15 days before expiry. Emergency features remain active for a 7-day grace period after the due date before the plan is paused.',
    },
  ],
  ASSTNC: [
    {
      question: 'How do I reach NexVitals support during an emergency?',
      answer:
        'Call our 24/7 emergency line at 1800-XXX-0000. For non-emergencies, our support team is available Monday to Saturday, 9 AM – 7 PM IST.',
    },
    {
      question: 'Can I get help with device installation?',
      answer:
        'Yes. Our support team provides guided installation assistance over call, and on-site support is available for fleet and enterprise clients.',
    },
    {
      question: 'How long does it take to get a response to a complaint?',
      answer:
        'Standard complaints are acknowledged within 24 hours and resolved within 48 business hours. Emergency-related complaints are escalated within 2 hours.',
    },
    {
      question: 'Is support available in regional languages?',
      answer:
        'Yes, we currently offer assistance in Hindi, Telugu, Tamil, and Kannada in addition to English. More languages are being added progressively.',
    },
    {
      question: 'What should I do if my device stops working suddenly?',
      answer:
        'Contact our technical helpdesk at [nexvitalssupport@gmail.com](mailto:nexvitalssupport@gmail.com) or call our support line. A remote diagnostic session can be scheduled within the hour.',
    },
  ],
  TECH: [
    {
      question: 'In which types of vehicles can the NexVitals device be installed?',
      answer:
        'It is compatible with personal cars, bikes, trucks, buses, and commercial fleets. Installation takes under 30 minutes with standard tools.',
    },
    {
      question: 'Does the device work while the vehicle is parked?',
      answer:
        'Yes. The device remains in a low-power monitoring mode when parked and activates fully when motion or a sudden impact is detected.',
    },
    {
      question: 'How often does the device need to be serviced or updated?',
      answer:
        'Firmware updates are pushed automatically over the air. Physical servicing is recommended once a year or after any emergency event.',
    },
    {
      question: 'Does the device have a battery backup if the vehicle power cuts off?',
      answer:
        'Yes. The device has an onboard battery that keeps it operational for up to 6 hours in the event of a complete vehicle power failure.',
    },
    {
      question: 'Can the device monitor passengers vitals, or only the driver?',
      answer:
        'The current model is optimized for the primary occupant. Multi-occupant vital monitoring is in development and expected in the next product generation.',
    },
  ],
  PRVC: [
    {
      question: 'Who has access to my health and vitals data?',
      answer:
        'Only authorized medical personnel — your assigned specialist and the treating hospital team — can access your vitals, and only during an active emergency.',
    },
    {
      question: 'Is my data stored permanently on NexVitals servers?',
      answer:
        'Vitals data is retained for 12 months for medical and legal purposes, after which it is securely deleted unless you request an extension.',
    },
    {
      question: 'Can I opt out of data sharing entirely?',
      answer:
        'You can control non-emergency data sharing through your profile settings. Emergency data sharing cannot be disabled as it is essential for the service to function.',
    },
    {
      question: 'Is the NexVitals platform compliant with Indian data protection laws?',
      answer:
        'Yes. We are fully compliant with the Digital Personal Data Protection Act, 2023, and follow medical-grade encryption standards for all data transmission.',
    },
    {
      question: 'Can I request a copy of my stored vitals and activity data?',
      answer:
        'Yes. You can raise a data access request through your NexVitals account under the Privacy Settings section, and we will share it within 7 working days.',
    },
  ],
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className={`faq-item-panel ${isOpen ? 'faq-item-open' : ''}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="faq-item-button"
        aria-expanded={isOpen}
      >
        <span className={`faq-item-question ${isOpen ? 'faq-item-question-open' : ''}`}>
          {question}
        </span>

        <motion.span
          variants={{
            open: { rotate: '45deg' },
            closed: { rotate: '0deg' },
          }}
          transition={{ duration: 0.2 }}
          className="faq-icon-wrap"
        >
          <Plus className={`faq-plus-icon ${isOpen ? 'faq-plus-icon-open' : ''}`} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : '0px',
          marginBottom: isOpen ? '16px' : '0px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="faq-answer-motion"
      >
        <p className="faq-item-answer">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

function Assistance() {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('ASSTNC')

  const handleQuoteComplete = () => {
    console.log('Quote animation completed!')
  }

  const handleNSComplete = () => {
    console.log('Newsletter heading animation completed!')
  }

  const handleContactComplete = () => {
    console.log('Contact heading animation completed!')
  }

  return (
    <div className="Assistance">
      <div className="Assistance-background">
        <Silk
          speed={3.5}
          scale={1}
          color="#DAD4BC"
          noiseIntensity={2.5}
          rotation={0}
        />
      </div>

      <div className="Assistance-Heading">
        <TextType
          text={[
            '- Welcome to NexVitals Assistance ! -',
            "- We're Here When You Need Us Most -",
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

      <div className="Assistance-subheading">
        <BlurText
          text="Connecting You to Resources, Updates, and the Right People — at the Right Time"
          delay={200}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleQuoteComplete}
          className="quote-text"
        />
      </div>

      <section className="Assistance-content">
        <div className="Assistance-stack">
          <div className="Assistance-newsletter-section">
            <div className="newsletter-heading">
              <SplitText
                key="newsletter-heading"
                text="- Newsletter Subscription -"
                className="newsletter-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleNSComplete}
                showCallbacks={true}
              />
            </div>

            <div className="newsletter-form">
              <Form className="subscriber-form" noValidate />
            </div>

            <div className="newsletter-description">
              {NS_PARAGRAPHS.map((paragraph, index) => (
                <div className="newsletter-paragraph-row" key={index}>
                  <SplitText
                    key={`newsletter-paragraph-${index}`}
                    text={paragraph}
                    className="newsletter-paragraph"
                    delay={12}
                    duration={0.85}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    textAlign="center"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="Assistance-contact-section">
            <div className="contact-heading">
              <SplitText
                key="contact-heading"
                text="- Contact Us -"
                className="contact-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleContactComplete}
                showCallbacks={true}
              />
            </div>

            <div className="contact-card">
              <div className="contact-text-wrap">
                <SplitText
                  key="contact-text"
                  text="Reach our NexVitals team for support, product guidance, and assistance during working hours."
                  className="contact-text"
                  delay={14}
                  duration={0.8}
                  ease="power2.out"
                  splitType="words"
                  from={{ opacity: 0, y: 18 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>

              <address className="contact-details">
                {CONTACT_DETAILS.map((item, index) => (
                  <div
                    className={`contact-item ${item.full ? 'contact-item-full' : ''}`}
                    key={item.label}
                  >
                    <div className="contact-label-wrap">
                      <SplitText
                        key={`contact-label-${index}`}
                        text={item.label}
                        className="contact-label"
                        delay={16}
                        duration={0.72}
                        ease="power2.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 14 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.05}
                        rootMargin="0px"
                        textAlign="center"
                      />
                    </div>

                    {item.href ? (
                      <a className="contact-link" href={item.href}>
                        <SplitText
                          key={`contact-value-${index}`}
                          text={item.value}
                          className="contact-link-text"
                          delay={10}
                          duration={0.78}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 16 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="center"
                        />
                      </a>
                    ) : (
                      <div className="contact-value-wrap">
                        <SplitText
                          key={`contact-value-${index}`}
                          text={item.value}
                          className="contact-value"
                          delay={10}
                          duration={0.78}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 16 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="center"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </address>
            </div>
          </div>

          <div className="Assistance-faqs">
            <div className="faqs-heading">
              <SplitText
                key="faqs-heading"
                text="- Frequently Asked Questions -"
                className="faqs-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
              />
            </div>

            <div className="faqs-panel">
              <div className="faq-tabs">
                {Object.entries(FAQ_CATEGORIES).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedFaqCategory(key)}
                    className={`faq-tab-button ${
                      selectedFaqCategory === key ? 'faq-tab-button-active' : ''
                    }`}
                  >
                    <span className="faq-tab-label">{label}</span>
                    <AnimatePresence>
                      {selectedFaqCategory === key && (
                        <motion.span
                          initial={{ y: '100%' }}
                          animate={{ y: '0%' }}
                          exit={{ y: '100%' }}
                          transition={{ duration: 0.5, ease: 'backIn' }}
                          className="faq-tab-highlight"
                        />
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              <div className="faq-list-wrap">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFaqCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: 'backIn' }}
                    className="faq-list"
                  >
                    {FAQ_DATA[selectedFaqCategory].map((faq, index) => (
                      <FAQItem key={`${selectedFaqCategory}-${index}`} {...faq} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="Assistance-footer">
            <div className="emergency-section">
              <div className="emergency-heading">
                <SplitText
                  key="emergency-heading"
                  text="- Emergency Contact Information -"
                  className="emergency-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>

              <div className="emergency-card">
                <div className="emergency-text-wrap">
                  <SplitText
                    key="emergency-text"
                    text="In a life-threatening situation, every second counts. Reach the right responders instantly."
                    className="emergency-text"
                    delay={14}
                    duration={0.8}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    textAlign="center"
                  />
                </div>

                <address className="emergency-details">
                  {EMERGENCY_DETAILS.map((item, index) => (
                    <div
                      className={`emergency-item ${item.full ? 'emergency-item-full' : ''}`}
                      key={item.label}
                    >
                      <div className="emergency-label-wrap">
                        <SplitText
                          key={`emergency-label-${index}`}
                          text={item.label}
                          className="emergency-label"
                          delay={16}
                          duration={0.72}
                          ease="power2.out"
                          splitType="chars"
                          from={{ opacity: 0, y: 14 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="center"
                        />
                      </div>

                      {item.href ? (
                        <a className="emergency-link" href={item.href}>
                          <SplitText
                            key={`emergency-value-${index}`}
                            text={item.value}
                            className="emergency-link-text"
                            delay={10}
                            duration={0.78}
                            ease="power2.out"
                            splitType="words"
                            from={{ opacity: 0, y: 16 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.05}
                            rootMargin="0px"
                            textAlign="center"
                          />
                        </a>
                      ) : (
                        <div className="emergency-value-wrap">
                          <SplitText
                            key={`emergency-value-${index}`}
                            text={item.value}
                            className="emergency-value"
                            delay={10}
                            duration={0.78}
                            ease="power2.out"
                            splitType="words"
                            from={{ opacity: 0, y: 16 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.05}
                            rootMargin="0px"
                            textAlign="center"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </address>
              </div>
            </div>

            <div className="footer-note">
              <div className="footer-text-wrap">
                <SplitText
                  key="footer-note"
                  text="- Every Second Counts. We Make Sure It Does ! -"
                  className="emergency-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
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

export default Assistance