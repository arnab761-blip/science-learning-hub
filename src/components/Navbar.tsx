import React, { useState } from "react";
import { Menu, X, Atom, LogIn, GraduationCap } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLoginClick: () => void;
  userEmail: string | null;
  onLogoutClick: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onLoginClick,
  userEmail,
  onLogoutClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "news", label: "News & Articles" },
    { id: "qa", label: "Community Q&A" },
    { id: "ebooks", label: "E-books" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-md border-b border-slate-800" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick("home")} id="nav-logo">
            <Atom className="h-8 w-8 text-cyan-400 animate-pulse" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent font-sans">
              ScienceLearningHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6" id="desktop-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1 pt-1"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            {userEmail ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700/50 flex items-center gap-1.5 font-mono">
                  <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
                  {userEmail}
                </span>
                <button
                  onClick={onLogoutClick}
                  id="nav-logout-btn"
                  className="text-xs font-semibold text-slate-400 hover:text-white transition duration-200 cursor-pointer hover:underline"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                id="nav-login-btn"
                className="flex items-center space-x-1 px-4 py-2 text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-md transition duration-200 transform active:scale-95 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="md:hidden flex items-center">
            {userEmail && (
              <div className="mr-2">
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700 font-mono">
                  {userEmail.split("@")[0]}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-burger"
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2" id="mobile-menu-panel">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition duration-200 ${
                activeTab === item.id
                  ? "bg-slate-800 text-cyan-400 border-l-4 border-cyan-400"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800">
            {userEmail ? (
              <button
                onClick={() => {
                  onLogoutClick();
                  setIsOpen(false);
                }}
                id="mobile-logout-btn"
                className="block w-full text-center px-4 py-2.5 text-base font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition duration-200 cursor-pointer"
              >
                Log out ({userEmail})
              </button>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setIsOpen(false);
                }}
                id="mobile-login-btn"
                className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 text-base font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-md shadow transition duration-200 cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Login to Account</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
