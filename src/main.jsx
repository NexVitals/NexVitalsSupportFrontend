import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import Admin from "./Pages/Admin.jsx"
import Assistance from "./Pages/Assistance.jsx"
import Grievance from "./Pages/Grievance.jsx"
import Query from "./Pages/Query.jsx"
import Review from "./Pages/Review.jsx"
import Suggestions from "./Pages/Suggestions.jsx"
import PreAdLogin from "./Pages/PreAdLogin.jsx"
import ResetPassword from "./Pages/ResetPassword.jsx"
import Updates from "./Pages/Updates.jsx"
import ContactUs from "./Pages/ContactUs.jsx"

function ProtectedAdminRoute({ children }) {
  const isAdminAuthenticated = sessionStorage.getItem("isAdminAuthenticated") === "true"
  return isAdminAuthenticated ? children : <Navigate to="/preadmin" replace />
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* --- Admin Authentication Routes --- */}
        <Route path="/preadmin" element={<PreAdLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Safety fallback: Catches the rogue /admin-login URL and safely redirects to /preadmin */}
        <Route path="/admin-login" element={<Navigate to="/preadmin" replace />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          } 
        />
        <Route path="/assistance" element={<Assistance />} />
        <Route path="/grievance" element={<Grievance />} />
        <Route path="/query" element={<Query />} />
        <Route path="/review" element={<Review />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)