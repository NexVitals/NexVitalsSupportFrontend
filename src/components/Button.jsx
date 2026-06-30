import "./Button.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactUsButton() {
  const navigate = useNavigate();

  return (
    <button
      className="contact-btn"
      onClick={() => navigate("/contactus")}
    >
      <span>Contact Us</span>

      <ArrowRight
        size={18}
        className="contact-btn-icon"
      />
    </button>
  );
}