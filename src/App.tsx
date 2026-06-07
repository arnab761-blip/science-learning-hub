import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import DynamicArticles from "./components/DynamicArticles";
import FeaturesGrid from "./components/FeaturesGrid";
import QASection from "./components/QASection";
import EbooksSection from "./components/EbooksSection";
import LiveSessions from "./components/LiveSessions";
import Footer from "./components/Footer";
import { LogIn, ShieldAlert, GraduationCap } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem("science_hub_user_email") || "arnabarnab761@gmail.com"; // Defaulting to user email for instant login experience
  });

  // Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setAuthError("Email is required");
      return;
    }
    if (passwordInput.length < 4) {
      setAuthError("Password must be at least 4 characters.");
      return;
    }

    setUserEmail(emailInput.trim());
    localStorage.setItem("science_hub_user_email", emailInput.trim());
    setShowLoginModal(false);
    setEmailInput("");
    setPasswordInput("");
    setAuthError(null);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem("science_hub_user_email");
  };

  // Switch tabs smoothly and focus the page view.
  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-white flex flex-col font-sans" id="science-learning-hub-root">
      
      {/* 1. Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        onLoginClick={() => setShowLoginModal(true)}
        userEmail={userEmail}
        onLogoutClick={handleLogout}
      />

      {/* Main content slot routing */}
      <main className="flex-grow">
        
        {activeTab === "home" && (
          <div className="animate-fadeIn">
            {/* 2. Hero Section */}
            <Hero onExploreClick={navigateToTab} />
            
            {/* 3. Statistics Bar */}
            <Stats />

            {/* Teaser News Bar */}
            <div className="bg-slate-950 py-8 px-4 border-t border-slate-900 flex justify-center">
              <button 
                onClick={() => navigateToTab("news")}
                id="homepage-news-teaser"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-cyan-400 px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition font-mono"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Go to Google Sheets News & Dynamic Articles Tab</span>
                <span>→</span>
              </button>
            </div>
            
            {/* 4. Features Grid */}
            <FeaturesGrid onFeatureClick={navigateToTab} />

            {/* Quick Live Preview Banner */}
            <div className="bg-gradient-to-r from-cyan-950/20 via-slate-950 to-slate-950 py-12 px-4 border-t border-slate-900 text-center space-y-4">
              <h3 className="text-xl font-bold font-sans text-white">Join Live Discussion Forums</h3>
              <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                Connect and debate molecular biology, astrophotography, or quantum mechanics with active researchers worldwide in our Community Q&A forum.
              </p>
              <button 
                onClick={() => navigateToTab("qa")}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-white rounded-lg transition cursor-pointer inline-flex items-center gap-2"
                id="cta-home-qa-button"
              >
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                <span>Open Science Q&A Forum</span>
              </button>
            </div>
          </div>
        )}

        {/* 5. Dynamic Articles Tab Section */}
        {activeTab === "news" && (
          <div className="animate-fadeIn">
            <DynamicArticles />
          </div>
        )}

        {/* 6. Active QA platform Tab Section */}
        {activeTab === "qa" && (
          <div className="animate-fadeIn">
            <QASection userEmail={userEmail} onLoginRequest={() => setShowLoginModal(true)} />
          </div>
        )}

        {/* 7. Active Ebooks platform Tab Section */}
        {activeTab === "ebooks" && (
          <div className="animate-fadeIn">
            <EbooksSection />
          </div>
        )}

        {/* 8. Active Live Sessions tab Section */}
        {activeTab === "live" && (
          <div className="animate-fadeIn">
            <LiveSessions />
          </div>
        )}

      </main>

      {/* 9. Platform Footer */}
      <Footer />

      {/* 10. Modular Login Simulated Dialog */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="auth-login-modal">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl w-full max-w-md space-y-6 animate-scaleUp">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <LogIn className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-sans">
                  Sign in to ScienceLearningHub
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setAuthError(null);
                }}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Logging in enables you to ask community astrophysics questions, bookmark online textbook materials, and receive specialized <strong>Educator</strong> badges if you help answer other student questions.
            </p>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="arnabarnab761@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  id="auth-email-input"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 placeholder-slate-655 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Academic Code/Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  id="auth-password-input"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 placeholder-slate-655 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Action and Test logins */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput("arnabarnab761@gmail.com");
                    setPasswordInput("science_key_2026");
                  }}
                  className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                >
                  Autofill Credentials
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setAuthError(null);
                    }}
                    className="bg-slate-800 text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="submit-auth-login"
                    className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 text-xs font-bold px-5 py-2 rounded-lg shadow-md transition cursor-pointer"
                  >
                    Authorize Account
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
