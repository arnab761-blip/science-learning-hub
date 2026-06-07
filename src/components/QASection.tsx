import React, { useState } from "react";
import { Question, Reply } from "../types";
import { sampleQuestions } from "../data/mockData";
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Filter,
  PlusCircle,
  CheckCircle2,
  Send,
  User,
  Tags,
  Search,
  BookOpen,
  GraduationCap
} from "lucide-react";

interface QAProps {
  userEmail: string | null;
  onLoginRequest: () => void;
}

export default function QASection({ userEmail, onLoginRequest }: QAProps) {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
  // Submit new question form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"Physics" | "Astronomy" | "Biology" | "Chemistry" | "General">("General");
  const [newContent, setNewContent] = useState("");

  // Submit reply form state
  const [newReplyContent, setNewReplyContent] = useState("");

  const categories = ["All", "Physics", "Astronomy", "Biology", "Chemistry", "General"];

  // Handle Question Voting
  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === id) {
          return { ...q, votes: q.votes + 1 };
        }
        return q;
      })
    );
  };

  // Handle Reply Voting
  const handleReplyVote = (questionId: string, replyId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            replies: q.replies.map(r => {
              if (r.id === replyId) {
                return { ...r, upvotes: r.upvotes + 1 };
              }
              return r;
            })
          };
        }
        return q;
      })
    );
  };

  // Handle Adding a Question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const authorName = userEmail ? userEmail.split("@")[0] : "AnonymousLearner";

    const newQ: Question = {
      id: `q-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: authorName,
      date: new Date().toISOString().split("T")[0],
      votes: 1,
      answersCount: 1,
      solved: false,
      replies: [
        {
          id: `r-init-${Date.now()}`,
          author: authorName,
          role: userEmail ? "Student" : "Student",
          content: newContent.trim(),
          date: new Date().toISOString().split("T")[0],
          upvotes: 0
        }
      ]
    };

    setQuestions([newQ, ...questions]);
    setShowAddModal(false);
    setNewTitle("");
    setNewContent("");
    setNewCategory("General");
  };

  // Handle Adding a Reply
  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyContent.trim() || !selectedQuestion) return;

    const authorName = userEmail ? userEmail.split("@")[0] : "AnonymousLearner";
    const authorRole = userEmail ? "Educator" : "Student";

    const newReply: Reply = {
      id: `r-${Date.now()}`,
      author: authorName,
      role: authorRole,
      content: newReplyContent.trim(),
      date: new Date().toISOString().split("T")[0],
      upvotes: 0
    };

    const updatedReplies = [...selectedQuestion.replies, newReply];
    const updatedQ = {
      ...selectedQuestion,
      replies: updatedReplies,
      answersCount: updatedReplies.length,
      solved: true // automatically flag as answered
    };

    setQuestions(prev => prev.map(q => (q.id === selectedQuestion.id ? updatedQ : q)));
    setSelectedQuestion(updatedQ);
    setNewReplyContent("");
  };

  // Filtering Logic
  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.replies.some(r => r.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-slate-950 py-16 px-4 md:px-8 border-t border-slate-900 min-h-[600px]" id="qa-board-section">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md text-xs font-mono font-bold mb-3">
              <MessageSquare className="h-3 w-3" />
              <span>Academic Inquiry exchange</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
              Community Q&A Forum
            </h2>
            <p className="text-slate-400 mt-1 max-w-2xl text-xs md:text-sm font-sans">
              Connect with fellow science enthusiasts, post tough questions, and assist others by answering their physics or chemistry doubts.
            </p>
          </div>

          <button
            onClick={() => {
              if (!userEmail) {
                onLoginRequest();
              } else {
                setShowAddModal(true);
              }
            }}
            id="qa-ask-question-btn"
            className="flex items-center justify-center space-x-1 px-5 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-lg shadow-cyan-500/10 transition cursor-pointer self-start sm:self-center"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Ask a Question</span>
          </button>
        </div>

        {/* Dashboard Grid - Sidebar + Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Rules & Filters */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search forum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="qa-search-input"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            {/* Segment Filters */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-cyan-400" />
                <span>Filter Fields</span>
              </p>
              <div className="flex flex-wrap lg:flex-col gap-1.5" id="category-filters-container">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs text-left px-3 py-2 rounded-md transition font-sans w-full max-w-[120px] lg:max-w-none cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400 font-semibold"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Guidelines box */}
            <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-2 text-xs">
              <p className="font-bold text-white font-sans">Inquiry Guidelines</p>
              <ul className="list-disc list-inside text-slate-400 space-y-1.5">
                <li>Check duplication first</li>
                <li>Write clear, atomic code equations if needed</li>
                <li>Refrain from homework solver requests</li>
                <li>Cite scientific references</li>
              </ul>
            </div>
          </div>

          {/* Right Main Feed / Question Details */}
          <div className="lg:col-span-9 space-y-4">
            {selectedQuestion ? (
              // Selected Question Details View
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 animate-fadeIn" id="selected-qa-detail">
                {/* Back Link */}
                <button
                  onClick={() => setSelectedQuestion(null)}
                  id="back-to-qa-list"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  ← Back to question boards
                </button>

                {/* Primary Question Body */}
                <div className="border-b border-slate-800 pb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-bold uppercase">
                      {selectedQuestion.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{selectedQuestion.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-sans leading-snug">
                    {selectedQuestion.title}
                  </h3>

                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                      <User className="h-3 w-3" />
                    </div>
                    <span>Posted by <strong className="text-slate-300 font-mono">{selectedQuestion.author}</strong></span>
                  </div>
                </div>

                {/* Replies Thread */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                    Responses ({selectedQuestion.replies.length})
                  </p>

                  <div className="space-y-4 font-sans">
                    {selectedQuestion.replies.map((reply, ridx) => (
                      <div
                        key={reply.id}
                        id={`reply-${ridx}`}
                        className={`p-4 rounded-xl border flex gap-4 ${
                          reply.role === "Scientist" || reply.role === "Educator"
                            ? "bg-slate-950/80 border-emerald-500/20 shadow-emerald-950/5 shadow-md"
                            : "bg-slate-950/40 border-slate-800"
                        }`}
                      >
                        {/* Vote side column for replies */}
                        <div className="flex flex-col items-center justify-start py-0.5 shrink-0">
                          <button
                            onClick={() => handleReplyVote(selectedQuestion.id, reply.id)}
                            className="p-1 hover:bg-slate-800 rounded transition text-slate-400 hover:text-emerald-400 cursor-pointer"
                            title="Upvote Reply"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <span className="text-xs font-bold text-slate-300 font-mono">{reply.upvotes}</span>
                        </div>

                        {/* Reply Body */}
                        <div className="space-y-2 grow">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-200 font-mono">{reply.author}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold tracking-wider ${
                                reply.role === "Scientist" 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : reply.role === "Educator"
                                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                  : "bg-slate-800 text-slate-400 border border-slate-700"
                              }`}>
                                {reply.role}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">{reply.date}</span>
                          </div>
                          
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Respond Submission Form */}
                <form onSubmit={handleAddReply} className="pt-4 border-t border-slate-800 space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 block">Write your response</label>
                    {!userEmail && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                        Replying as Guest. <button type="button" onClick={onLoginRequest} className="underline cursor-pointer">Login</button> for specialized Educator badge.
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Provide a peer-approved response with detailed logic models..."
                    id="qa-reply-textarea"
                    required
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      id="qa-add-reply-submit"
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold px-5 py-2 rounded-lg shadow-md transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="h-3 w-3" />
                      <span>Post Response</span>
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              // Question Feed Board View
              <div className="space-y-4" id="qa-list-feed">
                {filteredQuestions.length === 0 ? (
                  <div className="bg-slate-900/40 border border-slate-800 p-12 rounded-2xl text-center space-y-2">
                    <GraduationCap className="h-10 w-10 text-slate-600 mx-auto animate-pulse" />
                    <p className="text-slate-300 font-bold">No questions match your query</p>
                    <p className="text-xs text-slate-500">Be the first to ask! Go ahead and submit a inquiry above.</p>
                  </div>
                ) : (
                  filteredQuestions.map((q) => (
                    <div
                      key={q.id}
                      id={`question-card-${q.id}`}
                      onClick={() => setSelectedQuestion(q)}
                      className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl flex items-start gap-4 hover:border-cyan-500/20 active:border-cyan-500/40 transition duration-200 cursor-pointer group"
                    >
                      {/* Voting side-tray */}
                      <button
                        onClick={(e) => handleVote(q.id, e)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-850 shrink-0 text-slate-400 group-hover:border-slate-800 hover:bg-slate-800/50 hover:text-cyan-400 transition cursor-pointer"
                        title="Upvote Question"
                      >
                        <ChevronUp className="h-4 w-4" />
                        <span className="text-xs font-bold font-mono text-slate-200 mt-0.5">{q.votes}</span>
                      </button>

                      {/* Question Summary Body */}
                      <div className="space-y-3 grow">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/15 font-bold uppercase tracking-wider">
                            {q.category}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{q.date}</span>
                        </div>

                        <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition leading-snug">
                          {q.title}
                        </h4>

                        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/40 pt-2 font-mono">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-slate-300">{q.author}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-[11px] text-slate-500">Learner</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-[11px]">
                            {q.solved && (
                              <span className="text-emerald-400 flex items-center gap-0.5 text-[10px] uppercase font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>Solved</span>
                              </span>
                            )}
                            <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-850 text-[10px]">
                              {q.answersCount} {q.answersCount === 1 ? "response" : "responses"}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Add Question Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="add-question-modal">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 animate-scaleUp">
            
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <BookOpen className="h-5 w-5 text-teal-400" />
                <span>Submit community inquiry</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs sm:text-sm font-sans">
              
              {/* Question Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Question Topic Title</label>
                <input
                  type="text"
                  required
                  placeholder="How do quantum computers execute multi-gated coherence?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  id="new-question-title-input"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Grid Segment Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Science Category Field</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  id="new-question-category-select"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Physics">Physics (Theoretical / Applied)</option>
                  <option value="Astronomy">Astronomy & Cosmology</option>
                  <option value="Biology">Biology & Life Ecosystems</option>
                  <option value="Chemistry">Chemistry & Molecular Formulations</option>
                  <option value="General">General Science & Computing</option>
                </select>
              </div>

              {/* Extended Details Body */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Describe your dilemma in detail</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Summarize the surrounding mechanics or the equations you've analyzed..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  id="new-question-body-textarea"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                />
              </div>

              {/* CTAs */}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-800 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="new-question-submit-btn"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-lg shadow transition cursor-pointer"
                >
                  Publish Inquiry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
}
