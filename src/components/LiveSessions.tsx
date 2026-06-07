import React, { useState } from "react";
import { LiveSession } from "../types";
import { sampleLiveSessions } from "../data/mockData";
import { Calendar, User, Video, CheckCircle, Clock, Sparkles } from "lucide-react";

export default function LiveSessions() {
  const [sessions, setSessions] = useState<LiveSession[]>(sampleLiveSessions);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRegister = (id: string) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === id) {
          const nextState = !s.registered;
          if (nextState) {
            setSuccessMsg(`Successfully registered for: "${s.title}"! We've sent a calendar invite.`);
            setTimeout(() => setSuccessMsg(null), 4000);
          }
          return { ...s, registered: nextState };
        }
        return s;
      })
    );
  };

  return (
    <section className="bg-slate-900 border-t border-slate-850 py-16 px-4 md:px-8" id="live-lectures-sched">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md text-xs font-mono font-bold mb-3">
            <Video className="h-3.5 w-3.5" />
            <span>Interactive Live Broadcaster</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
            Upcoming Live Lectures & Panels
          </h2>
          <p className="text-slate-400 mt-1 max-w-2xl text-xs sm:text-sm font-sans mx-auto md:mx-0">
            Learn directly from active researchers. Join interactive laboratory walk-throughs, cosmology panels, or genetic debates, completely free.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center space-x-3 text-xs md:text-sm animate-scaleUp">
            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Sessions Feed */}
        <div className="space-y-6" id="live-sessions-feed-container">
          {sessions.map((session) => (
            <div
              key={session.id}
              id={`session-card-${session.id}`}
              className="bg-slate-950/60 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-cyan-500/15 transition-all duration-300"
            >
              <div className="space-y-4 max-w-2xl">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-bold uppercase">
                    {session.platform}
                  </span>
                  
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{session.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>{session.time}</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white font-sans leading-snug">
                    {session.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {session.description}
                  </p>
                </div>

                {/* Speaker Profile */}
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-705 flex items-center justify-center text-slate-300">
                    <User className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300 font-sans">{session.speaker}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{session.role}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleRegister(session.id)}
                id={`register-session-${session.id}`}
                className={`w-full md:w-auto px-5 py-2.5 rounded-lg text-xs font-black transition transform active:scale-95 cursor-pointer ${
                  session.registered
                    ? "bg-slate-900 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-1.5"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold"
                }`}
              >
                {session.registered ? (
                  <>
                    <CheckCircle className="h-4 w-4 animate-pulse" />
                    <span>REGISTERED</span>
                  </>
                ) : (
                  <span>REGISTER SEAT</span>
                )}
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
