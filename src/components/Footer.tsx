import React from "react";
import { Atom, ExternalLink, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    resources: [
      { label: "Research Standards", href: "#" },
      { label: "Community Guidelines", href: "#" },
      { label: "Developer Sheets API", href: "#" },
      { label: "Educator Onboarding", href: "#" },
    ],
    scienceHub: [
      { label: "Cosmology Board", href: "#" },
      { label: "CRISPR Lab Docs", href: "#" },
      { label: "Quantum Simulators", href: "#" },
      { label: "Deep Sea Logs", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "COPPA Educational standards", href: "#" },
    ],
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! You have subscribed to the ScienceLearningHub bi-weekly research digest.");
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 md:px-8 font-sans" id="app-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
        
        {/* Footer Brand Column */}
        <div className="md:col-span-4 space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Atom className="h-6 w-6 text-cyan-400" />
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              ScienceLearningHub
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            Bridging classroom learning spaces and actual scientific reporting. Access collaborative Q&A threads, open digital ebooks, and real-time news data feeds synchronized directly with Google Sheets.
          </p>
          <p className="text-[10px] text-slate-600">
            Current session local time: <span className="font-mono">2026-06-07 UTC</span>
          </p>
        </div>

        {/* Links Column 2 */}
        <div className="col-span-2 text-center md:text-left">
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">Academic</p>
          <ul className="space-y-2 text-xs">
            {footerLinks.resources.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-cyan-400 transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="col-span-2 text-center md:text-left">
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">Focus Hubs</p>
          <ul className="space-y-2 text-xs">
            {footerLinks.scienceHub.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-cyan-400 transition flex items-center justify-center md:justify-start gap-1">
                  <span>{link.label}</span>
                  <ExternalLink className="h-2.5 w-2.5 text-slate-600" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
            Research Newsletter Digest
          </p>
          <p className="text-xs text-slate-500 leading-relaxed text-center md:text-left">
            Get bi-weekly briefings containing compiled astrophysicist releases, newly submitted community queries, and reference summaries.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm mx-auto md:mx-0 pt-1">
            <input
              type="email"
              required
              placeholder="curious_mind@example.com"
              id="footer-email-input"
              className="bg-slate-900 border border-slate-800 text-xs text-white rounded-lg px-3 py-2 grow focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              id="footer-subscribe-btn"
              className="bg-slate-850 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition text-xs font-bold px-3 py-2 rounded-lg border border-slate-800 cursor-pointer flex items-center gap-1 shrink-0"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>

      </div>

      {/* Corporate Copy Block */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="text-center sm:text-left">
          <p>© {currentYear} ScienceLearningHub. All rights reserved. Peer-reviewed classroom ecosystems.</p>
        </div>
        <div className="flex gap-4 font-sans justify-center sm:justify-start">
          {footerLinks.legal.map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-slate-300 transition">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
