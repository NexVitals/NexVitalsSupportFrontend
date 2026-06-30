import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const API_BASE_URL = "http://localhost:8080/api/auth";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const passwordChecks = useMemo(() => {
    const password = formData.password;
    return {
      minLength: password.length >= 8,
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
    };
  }, [formData.password]);

  const isPasswordValid =
    passwordChecks.minLength &&
    passwordChecks.hasLetter &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSymbol &&
    passwordChecks.hasUppercase &&
    passwordChecks.hasLowercase;

  const isConfirmPasswordValid =
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

  const errors = {
    password:
      touched.password && !formData.password
        ? "Password is required."
        : touched.password && !isPasswordValid
        ? "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
        : "",
    confirmPassword:
      touched.confirmPassword && !formData.confirmPassword
        ? "Please confirm your password."
        : touched.confirmPassword && !isConfirmPasswordValid
        ? "Passwords do not match."
        : "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setApiError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    setTouched({ password: true, confirmPassword: true });

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        token: token,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/admin-login");
        }, 2500);
      } else {
        setApiError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "Unable to reset password. The link may have expired or already been used."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Block direct access — no token in URL means this page wasn't opened via the mail link
  if (!token) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-overlay"></div>
        <div className="reset-password-container">
          <div className="reset-password-card invalid-link-card">
            <h1>Invalid Link</h1>
            <p className="reset-password-subtitle">
              This page can only be accessed through the password reset link
              sent to your email. Please check your inbox, or request a new
              link from the login page.
            </p>
            <button
              type="button"
              className="reset-password-btn"
              onClick={() => navigate("/admin")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-overlay"></div>

      <div className="reset-password-container">
        <div className="reset-password-card">
          <h1>Reset Password</h1>
          <p className="reset-password-subtitle">
            Create a new secure password for your account.
          </p>

          {isSubmitted ? (
            <p className="success-text">
              Password updated successfully. Redirecting to login...
            </p>
          ) : (
            <form className="reset-password-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password ? "input-error" : ""}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}

                <ul className="password-rules">
                  <li className={passwordChecks.minLength ? "valid" : ""}>
                    Minimum 8 characters
                  </li>
                  <li className={passwordChecks.hasUppercase ? "valid" : ""}>
                    At least one uppercase letter
                  </li>
                  <li className={passwordChecks.hasLowercase ? "valid" : ""}>
                    At least one lowercase letter
                  </li>
                  <li className={passwordChecks.hasNumber ? "valid" : ""}>
                    At least one number
                  </li>
                  <li className={passwordChecks.hasSymbol ? "valid" : ""}>
                    At least one symbol
                  </li>
                </ul>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.confirmPassword ? "input-error" : ""}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              {apiError && <span className="error-text">{apiError}</span>}

              <button
                type="submit"
                className="reset-password-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;