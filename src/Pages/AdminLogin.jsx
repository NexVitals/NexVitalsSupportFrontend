import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  MailCheck,
  ShieldCheck,
} from "lucide-react"
import "./AdminLogin.css"

let AuthView
;(function (AuthView) {
  AuthView["SIGN_IN"] = "sign-in"
  AuthView["FORGOT_PASSWORD"] = "forgot-password"
  AuthView["RESET_PASSWORD"] = "reset-password"
  AuthView["RESET_SUCCESS"] = "reset-success"
  AuthView["LOGIN_SUCCESS"] = "login-success"
})(AuthView || (AuthView = {}))

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "Password must include letters and numbers (8+ characters)"
    ),
})

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "Password must include letters and numbers"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

function Button({
  children,
  type = "button",
  onClick,
  disabled,
  className = "",
  variant = "primary",
}) {
  const base = "admin-btn"
  const variants = {
    primary: "admin-btn-primary",
    outline: "admin-btn-outline",
    ghost: "admin-btn-ghost",
    link: "admin-btn-link",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || ""} ${className}`}
    >
      {children}
    </button>
  )
}

function Input({
  id,
  type = "text",
  placeholder,
  disabled,
  className = "",
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`admin-input ${className}`}
      {...rest}
    />
  )
}

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="admin-label">
      {children}
    </label>
  )
}

function AuthError({ message }) {
  if (!message) return null
  return <div className="admin-auth-error">{message}</div>
}

function Auth({ className = "" }) {
  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get("token")

  const [state, setState] = React.useState({
    view: resetToken ? AuthView.RESET_PASSWORD : AuthView.SIGN_IN,
    welcomeEmail: "",
  })

  const setView = React.useCallback((view, extras = {}) => {
    setState((prev) => ({ ...prev, view, ...extras }))
  }, [])

  return (
    <div className={`admin-auth-shell ${className}`}>
      <div className="admin-auth-background" />
      <div className="admin-auth-wrapper">
        <div className="admin-auth-card">
          <div className="admin-auth-glow admin-auth-glow-one" />
          <div className="admin-auth-glow admin-auth-glow-two" />

          <div className="admin-auth-inner">
            <AnimatePresence mode="wait">
              {state.view === AuthView.SIGN_IN && (
                <AuthSignIn
                  key="sign-in"
                  onForgotPassword={() => setView(AuthView.FORGOT_PASSWORD)}
                  onLoginSuccess={(email) =>
                    setView(AuthView.LOGIN_SUCCESS, { welcomeEmail: email })
                  }
                />
              )}

              {state.view === AuthView.FORGOT_PASSWORD && (
                <AuthForgotPassword
                  key="forgot-password"
                  onSignIn={() => setView(AuthView.SIGN_IN)}
                  onSuccess={() => setView(AuthView.RESET_SUCCESS)}
                />
              )}

              {state.view === AuthView.RESET_PASSWORD && (
                <AuthResetPassword
                  key="reset-password"
                  token={resetToken}
                  onSignIn={() => setView(AuthView.SIGN_IN)}
                  onSuccess={() => setView(AuthView.RESET_SUCCESS)}
                />
              )}

              {state.view === AuthView.RESET_SUCCESS && (
                <AuthResetSuccess
                  key="reset-success"
                  onSignIn={() => setView(AuthView.SIGN_IN)}
                />
              )}

              {state.view === AuthView.LOGIN_SUCCESS && (
                <AuthLoginSuccess
                  key="login-success"
                  email={state.welcomeEmail}
                  onSignIn={() => setView(AuthView.SIGN_IN, { welcomeEmail: "" })}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthSignIn({ onForgotPassword, onLoginSuccess }) {
  const [formState, setFormState] = React.useState({
    isLoading: false,
    error: null,
    showPassword: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data) => {
    setFormState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }))

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AdminEmailId: data.email,
          AdminPassword: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Login failed")
      }

      localStorage.setItem("adminToken", result.data.Token)
      sessionStorage.setItem("isAdminAuthenticated", "true")

      onLoginSuccess(data.email)
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: err.message,
      }))
    } finally {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="admin-auth-panel"
    >
      <div className="admin-auth-badge">Admin Portal</div>

      <div className="admin-auth-header">
        <h1 className="admin-auth-title">Welcome back</h1>
        <p className="admin-auth-subtitle">
          Sign in with your authorized NexVitals admin email
        </p>
      </div>

      <AuthError message={formState.error} />

      <form onSubmit={handleSubmit(onSubmit)} className="admin-auth-form">
        <div className="admin-form-group">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@nexvitals.site"
            disabled={formState.isLoading}
            className={errors.email ? "admin-input-error" : ""}
            {...register("email")}
          />
          {errors.email && (
            <p className="admin-field-error">{errors.email.message}</p>
          )}
        </div>

        <div className="admin-form-group">
          <div className="admin-form-row">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={onForgotPassword}
              disabled={formState.isLoading}
              className="admin-text-link"
            >
              Forgot password?
            </button>
          </div>

          <div className="admin-input-wrap">
            <Input
              id="password"
              type={formState.showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={formState.isLoading}
              className={`admin-input-password ${
                errors.password ? "admin-input-error" : ""
              }`}
              {...register("password")}
            />

            <button
              type="button"
              onClick={() =>
                setFormState((prev) => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                }))
              }
              disabled={formState.isLoading}
              className="admin-icon-button"
              aria-label={formState.showPassword ? "Hide password" : "Show password"}
            >
              {formState.showPassword ? (
                <EyeOff className="admin-icon-sm" />
              ) : (
                <Eye className="admin-icon-sm" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="admin-field-error">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={formState.isLoading} variant="primary">
          {formState.isLoading ? (
            <>
              <Loader2 className="admin-spinner" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </motion.div>
  )
}

function AuthForgotPassword({ onSignIn, onSuccess }) {
  const [formState, setFormState] = React.useState({
    isLoading: false,
    error: null,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data) => {
    setFormState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AdminEmailId: data.email,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send reset link")
      }

      onSuccess()
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: err.message || "An error occurred",
      }))
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="admin-auth-panel"
    >
      <button
        type="button"
        onClick={onSignIn}
        className="admin-back-button"
        aria-label="Back to sign in"
      >
        <ArrowLeft className="admin-icon-sm" />
      </button>

      <div className="admin-auth-badge">Password Recovery</div>

      <div className="admin-auth-header admin-auth-header-spaced">
        <h1 className="admin-auth-title">Reset password</h1>
        <p className="admin-auth-subtitle">
          Enter your email to receive a reset link
        </p>
      </div>

      <AuthError message={formState.error} />

      <form onSubmit={handleSubmit(onSubmit)} className="admin-auth-form">
        <div className="admin-form-group">
          <Label htmlFor="forgot-email">Email</Label>
          <Input
            id="forgot-email"
            type="email"
            placeholder="name@example.com"
            disabled={formState.isLoading}
            className={errors.email ? "admin-input-error" : ""}
            {...register("email")}
          />
          {errors.email && (
            <p className="admin-field-error">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" disabled={formState.isLoading} variant="primary">
          {formState.isLoading ? (
            <>
              <Loader2 className="admin-spinner" />
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      <p className="admin-auth-footer">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onSignIn}
          className="admin-text-link"
        >
          Sign in
        </button>
      </p>
    </motion.div>
  )
}

function AuthResetPassword({ token, onSignIn, onSuccess }) {
  const [formState, setFormState] = React.useState({
    isLoading: false,
    error: null,
    showPassword: false,
    showConfirm: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  })

  const newPassword = watch("newPassword")

  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.985 }}
        transition={{ duration: 0.32, ease: "easeInOut" }}
        className="admin-auth-panel"
      >
        <button
          type="button"
          onClick={onSignIn}
          className="admin-back-button"
          aria-label="Back to sign in"
        >
          <ArrowLeft className="admin-icon-sm" />
        </button>
        <div style={{ color: "#ff6b6b", textAlign: "center", marginTop: "2rem" }}>
          Reset token is missing. Please use the link from your email.
        </div>
      </motion.div>
    )
  }

  const onSubmit = async (data) => {
    if (!token) {
      setFormState(prev => ({ ...prev, error: "System error: Token lost during submission." }));
      return;
    }

    setFormState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`);
      url.searchParams.append("token", token);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          Token: token,
          resetToken: token,
          ResetToken: token,
          adminToken: token,
          AdminToken: token,
          
          newPassword: data.newPassword,
          NewPassword: data.newPassword,
          adminNewPassword: data.newPassword,
          AdminNewPassword: data.newPassword,
          
          confirmPassword: data.confirmPassword,
          ConfirmPassword: data.confirmPassword,
          adminConfirmPassword: data.confirmPassword,
          AdminConfirmPassword: data.confirmPassword
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to reset password")
      }

      // ✅ FIX FOR ROUTING LOOP: Extract token generated by backend during reset and authenticate session
      if (result.data) {
        const authToken = result.data.Token || result.data.token;
        if (authToken) {
          localStorage.setItem("adminToken", authToken);
          sessionStorage.setItem("isAdminAuthenticated", "true");
        }
      }

      onSuccess()
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: err.message || "An error occurred",
      }))
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="admin-auth-panel"
    >
      <button
        type="button"
        onClick={onSignIn}
        className="admin-back-button"
        aria-label="Back to sign in"
      >
        <ArrowLeft className="admin-icon-sm" />
      </button>

      <div className="admin-auth-badge">Password Reset</div>

      <div className="admin-auth-header admin-auth-header-spaced">
        <h1 className="admin-auth-title">Create new password</h1>
        <p className="admin-auth-subtitle">
          Enter a new secure password for your account
        </p>
      </div>

      <AuthError message={formState.error} />

      <form onSubmit={handleSubmit(onSubmit)} className="admin-auth-form">
        <div className="admin-form-group">
          <Label htmlFor="new-password">New Password</Label>
          <div className="admin-input-wrap">
            <Input
              id="new-password"
              type={formState.showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={formState.isLoading}
              className={errors.newPassword ? "admin-input-error" : ""}
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() =>
                setFormState((prev) => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                }))
              }
              disabled={formState.isLoading}
              className="admin-icon-button"
            >
              {formState.showPassword ? (
                <EyeOff className="admin-icon-sm" />
              ) : (
                <Eye className="admin-icon-sm" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="admin-field-error">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="admin-form-group">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="admin-input-wrap">
            <Input
              id="confirm-password"
              type={formState.showConfirm ? "text" : "password"}
              placeholder="••••••••"
              disabled={formState.isLoading}
              className={errors.confirmPassword ? "admin-input-error" : ""}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() =>
                setFormState((prev) => ({
                  ...prev,
                  showConfirm: !prev.showConfirm,
                }))
              }
              disabled={formState.isLoading}
              className="admin-icon-button"
            >
              {formState.showConfirm ? (
                <EyeOff className="admin-icon-sm" />
              ) : (
                <Eye className="admin-icon-sm" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="admin-field-error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" disabled={formState.isLoading} variant="primary">
          {formState.isLoading ? (
            <>
              <Loader2 className="admin-spinner" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </motion.div>
  )
}

function AuthResetSuccess({ onSignIn }) {
  // We removed the auto-timer since we want them to click "Sign in"
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="admin-success-panel"
    >
      <div className="admin-success-icon">
        <MailCheck className="admin-icon-lg" />
      </div>

      <div className="admin-auth-badge">Success</div>

      <h1 className="admin-success-title">Password updated successfully</h1>
      <p className="admin-success-text">
        Your password reset mail has been sent securely. Please log in with your new password !
      </p>

      <Button
        type="button"
        onClick={onSignIn}
        variant="primary"
        className="admin-success-action"
      >
        Sign in to Admin Portal
      </Button>
    </motion.div>
  )
}

function AuthLoginSuccess({ email, onSignIn }) {
  const navigate = useNavigate()
  const displayName = email ? email.split("@")[0] : "Admin"

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/admin")
    }, 1400)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
      className="admin-success-panel"
    >
      <div className="admin-success-icon admin-success-icon-green">
        <ShieldCheck className="admin-icon-lg" />
      </div>

      <div className="admin-auth-badge">Access Granted</div>

      <h1 className="admin-success-title">Welcome, {displayName}</h1>
      <p className="admin-success-text">
        Signed in successfully with{" "}
        <span className="admin-highlight">{email}</span>.
      </p>

      <p className="admin-redirect-text">Redirecting to admin page...</p>

      <Button
        type="button"
        onClick={() => navigate("/admin")}
        variant="outline"
        className="admin-success-action"
      >
        Go to admin page
      </Button>

      <button
        type="button"
        onClick={onSignIn}
        className="admin-secondary-action"
      >
        Cancel
      </button>
    </motion.div>
  )
}

export {
  Auth,
  AuthSignIn,
  AuthForgotPassword,
  AuthResetPassword,
  AuthResetSuccess,
  AuthLoginSuccess,
  AuthError,
}