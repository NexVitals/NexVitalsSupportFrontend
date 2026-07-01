import './ContactUs.css';
import LightRays from '../components/LightRays.jsx';
import SplitText from '../components/SplitText.jsx';
import ChromaGrid from '../components/ChromaGrid.jsx';
import founderImg from "../assets/F.jpeg";
import cf1Img from "../assets/CF1.png";
import cf2Img from "../assets/CF2.jpeg";
import cf3Img from "../assets/CF3.jpeg";

function ContactUs() {
  const items = [
    {
      image: cf3Img,
      title: "K Kavya Sri",
      subtitle: "Co-Founder & COO",
      mail: "kotagirikavyasri1845@gmail.com",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      linkedin: "https://www.linkedin.com/in/kotagiri-kavya-sri-56690b317/"
    },
    {
      image: cf2Img,
      title: "K L Prasanna",
      subtitle: "Co-Founder & CPO",
      mail: "konduriprasanna22@gmail.com",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      linkedin: "https://www.linkedin.com/in/lakshmi-prasanna-konduri-520931318/"
    },
    {
      image: cf1Img,
      title: "Y K Sai Srikar",
      subtitle: "Co-Founder & CTO",
      mail: "saisrikaryerraguntla@gmail.com",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      linkedin: "https://www.linkedin.com/in/y-k-sai-srikar"
    },
    {
      image: founderImg,
      title: "S V Raghavan",
      subtitle: "Founder & CEO",
      mail: "sreenivasanvenkataraghavan@gmail.com",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      linkedin: "https://www.linkedin.com/in/venkata-raghavan-sreenivasan/"
    }
  ];

  const COMT = [
    "We are four engineers who decided to solve a problem that affects millions. Every day, preventable deaths occur because emergency help arrives too late.",
    "We are building NexVitals because we refused to accept that as inevitable",
    "We invite partners, investors, and stakeholders who share this conviction to join us in building a world where no accident goes unanswered and no emergency goes underprepared."
  ];

  return (
    <div className="contact-us">
      <div className="ContactUs-background">
        <div className="contactus-rays-wrapper">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        <section className="contactUs-section">
          <div className="ContactUs-content ContactUs-content--heading">
            <div className="ContactUs-heading">
              <SplitText
                key="split-after-loader"
                text="- Meet The Team NexVitals -"
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
                showCallbacks={false}
              />
            </div>
          </div>

          <div className="ContactUs-content ContactUs-content--body">
            <div className="ContactUs-body">
              <div className="contactus-grid-wrap">
                <ChromaGrid
                  items={items}
                  columns={2}
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>
            </div>
          </div>

          <div className="ContactUs-footer">
            <div className="ContactUs-footer-heading">
              <SplitText
                key="commitment-heading"
                text="- Our Commitment -"
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
                showCallbacks={false}
              />
            </div>

            <div className="contactus-footer-body">
              {COMT.map((paragraph, index) => (
                <div key={`commitment-${index}`} className="contactus-footer-line">
                  <SplitText
                    key={`commitment-split-${index}`}
                    text={paragraph}
                    className="contactus-footer-paragraph"
                    delay={20}
                    duration={0.9}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 24 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    showCallbacks={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;