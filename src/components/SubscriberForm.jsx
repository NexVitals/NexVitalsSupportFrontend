import { useState } from "react"
import { Form as FormPrimitive } from "@base-ui/react/form"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import "./SubscriberForm.css" // Make sure this exists

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/assistance`

export function Form({ className = "", ...props }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null) // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    // Validate email
    if (!email.trim()) {
      setMessage("Please enter your email address")
      setMessageType("error")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address")
      setMessageType("error")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmailId: email,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage("✓ Subscribed successfully! Check your email for confirmation.")
        setMessageType("success")
        setEmail("")
      } else {
        setMessage(result.message || "Subscription failed. Please try again.")
        setMessageType("error")
      }
    } catch (err) {
      console.error("Subscription error:", err)
      setMessage(
        err.message || "Failed to subscribe. Please check your connection and try again."
      )
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormPrimitive
      className={`subscriber-form ${className}`.trim()}
      data-slot="form"
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="subscriber-form-container">
        <div className="subscriber-input-wrapper">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setMessage(null) // Clear message on input change
            }}
            disabled={isLoading}
            className="subscriber-input"
            aria-label="Email address"
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="subscriber-button"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="subscriber-icon-spin" size={18} />
                Subscribing...
              </>
            ) : (
              "Subscribe!"
            )}
          </button>
        </div>

        {message && (
          <div className={`subscriber-message subscriber-message-${messageType}`}>
            {messageType === "success" ? (
              <CheckCircle size={18} className="subscriber-message-icon" />
            ) : (
              <AlertCircle size={18} className="subscriber-message-icon" />
            )}
            <span>{message}</span>
          </div>
        )}
      </div>
    </FormPrimitive>
  )
}

export { FormPrimitive }