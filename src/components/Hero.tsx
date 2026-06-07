import React from "react";
import { ArrowRight, Compass, Sparkles, BookOpen, MessageSquare } from "lucide-react";

interface HeroProps {
  onExploreClick: (tab: string) => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const scienceTags = ["Astronomy", "Quantum Physics", "Genetics", "Deep Sea Exploration"];

  return (
    <div className="relative overflow-hidden bg-slate-950 pt-12 pb-16 md:py-24" id="app-hero">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 px-3.5 py-1.5 rounded-full border border-cyan-500/20 text-xs font-semibold tracking-wider uppercase font-mono">
              <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "3s" }} />
              <span>Innovating Educational Gateways</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
              Explore the World of{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Science & Tech
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Dive deep into advanced natural sciences, engage in interactive Q&As with active academic experts, read curated modern reference textbooks, and access real-time discoverability feeds connected straight from live research.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onExploreClick("news")}
                id="hero-cta-explore"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-base font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-lg shadow-cyan-500/10 transition duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Read Latest Discoveries</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onExploreClick("qa")}
                id="hero-cta-qa"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg shadow transition duration-200 cursor-pointer"
              >
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                <span>Ask the Community</span>
              </button>
            </div>

            {/* Science tags */}
            <div className="pt-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-3">Trending Fields</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {scienceTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-300 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full hover:border-cyan-500/30 hover:text-cyan-400 cursor-pointer transition duration-300"
                    onClick={() => onExploreClick("news")}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Right Content (Custom Illustration) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative border border-slate-800 bg-slate-900/40 p-3 rounded-2xl shadow-2xl backdrop-blur-sm group overflow-hidden max-w-md w-full">
              <img
                src="/src/assets/images/science_hero_1780812228665.png"
                alt="Science Learning Hub Graphics"
                className="w-full h-auto rounded-xl object-contain hover:scale-[1.02] transition duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-5 left-5 right-5 bg-slate-950/80 backdrop-blur-md px-4 py-2+5.5 border border-slate-800/80 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Orbital Simulator</p>
                  <p className="text-xs text-white font-medium">Cosmic Mechanics & DNA Helix v2.4</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
