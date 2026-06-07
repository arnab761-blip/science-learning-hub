import React from "react";
import { MessageSquare, BookOpen, Video, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

interface FeaturesGridProps {
  onFeatureClick: (tab: string) => void;
}

export default function FeaturesGrid({ onFeatureClick }: FeaturesGridProps) {
  const features = [
    {
      id: "qa",
      title: "Science Q&A Platform",
      description: "Ask deep questions about astrophysics, biology, genetics, and more. Receive peer-reviewed, accurate answers verified by certified science educators and community researchers.",
      icon: MessageSquare,
      color: "from-cyan-500/20 to-teal-500/10",
      iconColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/40",
      badge: "Active Forum"
    },
    {
      id: "ebooks",
      title: "Interactive E-books Library",
      description: "Access curated digital textbooks and reference manuals covering Quantum Physics, Cosmology, Biotechnology, and chemistry. Read online or offline, complete with quick summaries.",
      icon: BookOpen,
      color: "from-teal-500/20 to-emerald-500/10",
      iconColor: "text-teal-400",
      borderColor: "hover:border-teal-500/40",
      badge: "Free Resource"
    },
    {
      id: "live",
      title: "Live Lectures & Sessions",
      description: "Tune in to monthly live streams and interactive science webinars. Engage in real-time Q&A chats with active astronomers, cellular biologists, and academic researchers globally.",
      icon: Video,
      color: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-400",
      borderColor: "hover:border-blue-500/40",
      badge: "Schedule Stream"
    }
  ];

  return (
    <section className="bg-slate-900 border-t border-slate-800/80 py-16 px-4 md:px-8" id="features-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full text-xs font-mono font-bold">
            <Sparkles className="h-3 w-3" />
            <span>Community Features & Platform Modules</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
            Our Peer-Reviewed Platforms
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto font-sans">
            Whether you want to seek answers to complex planetary questions, study digital textbooks, or witness live academic discussions, the hub supplies tools for active scientific discovery.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                onClick={() => onFeatureClick(feature.id)}
                className={`flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-br ${feature.color} border border-slate-800 backdrop-blur-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${feature.borderColor} shadow-lg shadow-black/10 group`}
              >
                <div className="space-y-6">
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 ${feature.iconColor}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-100 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800/80 uppercase tracking-widest font-black">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors border-t border-slate-800/40 mt-6">
                  <span>Enter Platform Module</span>
                  <div className="flex items-center gap-1">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300">Open</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
