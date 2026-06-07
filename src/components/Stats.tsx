import React from "react";
import { Users, HelpCircle, BookOpen, Video, Award } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      id: "stat-1",
      value: "1M+",
      label: "Active Learners",
      description: "Engaged in scientific studies",
      icon: Users,
      color: "text-cyan-400 border-cyan-500/20",
      bg: "bg-cyan-500/5",
    },
    {
      id: "stat-2",
      value: "50K+",
      label: "Solutions Provided",
      description: "In our peer-reviewed QA boards",
      icon: HelpCircle,
      color: "text-teal-400 border-teal-500/20",
      bg: "bg-teal-500/5",
    },
    {
      id: "stat-3",
      value: "2,500+",
      label: "Open Reference E-books",
      description: "Complete core reading titles",
      icon: BookOpen,
      color: "text-emerald-400 border-emerald-500/20",
      bg: "bg-emerald-500/5",
    },
    {
      id: "stat-4",
      value: "120+",
      label: "Monthly Live Sessions",
      description: "With active university educators",
      icon: Video,
      color: "text-blue-400 border-blue-500/20",
      bg: "bg-blue-500/5",
    },
  ];

  return (
    <div className="bg-slate-900 border-y border-slate-800/80 py-10" id="stats-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                id={stat.id}
                className={`flex flex-col sm:flex-row items-center sm:items-start p-5 rounded-xl border border-slate-800/60 bg-slate-950/40 relative overflow-hidden transition-all duration-300 hover:border-slate-700/80 group ${stat.color}`}
              >
                {/* Visual Glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 transition-opacity duration-300 group-hover:scale-125 ${stat.bg}`} />
                
                <div className={`p-3 rounded-lg mr-0 sm:mr-4 mb-3 sm:mb-0 shrink-0 ${stat.bg} border border-slate-800`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
