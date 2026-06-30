import "./PreAdLogin.css"
import Threads from "../components/Threads"
import SplitText from "../components/SplitText"
import BlurText from "../components/BlurText"
import { Auth as AdminLogin } from "./AdminLogin"

export default function PreAdLogin() {
  const handlesbhComplete = () => {
    console.log("SBH COMPLETED!")
  }

  return (
    <section className="preadlogin-content">
      <div className="background-layer" aria-hidden="true">
        <Threads
          color={[1, 1, 1]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      <div className="preadlogin-overlay">
        <div className="preadlogin-heading">
          <SplitText
            key="split-after-loader"
            text="- WELCOME BACK, ADMIN ! -"
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

        <div className="preadlogin-subheading">
          <BlurText
            key="subheading-blur"
            text="Manage, Monitor, and Move NexVitals Forward — One Update, One Grievance, One Insight at a Time"
            delay={180}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handlesbhComplete}
            className="subheading-text"
          />
        </div>

        <div className="preadlogin-login-form">
          <AdminLogin />
        </div>
      </div>
    </section>
  )
}