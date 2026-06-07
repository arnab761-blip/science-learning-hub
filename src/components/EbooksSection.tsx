import React, { useState } from "react";
import { Ebook } from "../types";
import { sampleEbooks } from "../data/mockData";
import { BookOpen, Map, CheckCircle, FileText, ChevronRight, Bookmark, ArrowLeft } from "lucide-react";

export default function EbooksSection() {
  const [ebooks] = useState<Ebook[]>(sampleEbooks);
  const [selectedBook, setSelectedBook] = useState<Ebook | null>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [bookmarkedChapters, setBookmarkedChapters] = useState<Record<string, boolean>>({});

  const toggleBookmark = (bookId: string, chapterIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${bookId}-${chapterIdx}`;
    setBookmarkedChapters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getSimulatedChapterContent = (bookTitle: string, chapterTitle: string) => {
    return `Welcome to your reference study guide of "${bookTitle}". Under review is: "${chapterTitle}". 

This material has been compiled and peer-reviewed by active educators for college-level study.

Key Scientific Tenets Covered in this Block:
1. Fundamental Postulates & Mathematical Formulations
2. Empirical Observational Evidence & Laboratory Tests
3. Modern Technical Applications (Quantum Computing, CRISPR arrays, or Cosmic Relativistic gravity models)

Post-Study Exercises:
- Outline three arguments supporting current theories surrounding this field.
- Contrast the classical paradigm with the newly proven models described in this text.
- Solve the basic mathematical matrix representation at the end of the appendix files.

Cite this text as: ScienceLearningHub Press, academic reference index (S-Ref-${bookTitle[0]}${chapterTitle[1]}2026).`;
  };

  return (
    <section className="bg-slate-950 py-16 px-4 md:px-8 border-t border-slate-900 min-h-[550px]" id="ebooks-library-section">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Block */}
        {selectedBook ? (
          <div>
            <button
              onClick={() => {
                setSelectedBook(null);
                setActiveChapterIdx(0);
              }}
              id="back-to-ebooks-grid"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 cursor-pointer font-mono uppercase bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Library Books</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center space-x-1.5 text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md text-xs font-mono font-bold mb-3">
              <BookOpen className="h-3 w-3" />
              <span>Digital Resource Libraries</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
              Free Science Reference E-books
            </h2>
            <p className="text-slate-400 mt-1 max-w-2xl text-xs sm:text-sm font-sans">
              Study curated, high-quality reference manuals compiled by specialized academic educators. Expand your depth in astrophysics, quantum laws, or molecular biology.
            </p>
          </div>
        )}

        {selectedBook ? (
          // Ebook Reader View
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 animate-scaleUp" id="ebook-reader-container">
            
            {/* Split Left: Chapter Selection Column */}
            <div className="md:col-span-4 border-r border-slate-800 bg-slate-950 p-6 space-y-6">
              <div className="flex gap-4 items-start pb-5 border-b border-slate-800">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-16 h-22 object-cover rounded-md border border-slate-800 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-white font-sans line-clamp-2">{selectedBook.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">{selectedBook.author}</p>
                  <span className="text-[10px] bg-slate-900 text-cyan-400 border border-slate-800 px-2 py-0.5 mt-2 inline-block rounded font-mono">
                    {selectedBook.pages} Pages
                  </span>
                </div>
              </div>

              {/* Chapters List */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">
                  Table of Contents
                </p>
                <div className="space-y-1" id="book-chapters-list">
                  {selectedBook.chapters.map((chapter, idx) => {
                    const isBookmarked = bookmarkedChapters[`${selectedBook.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        id={`chapter-link-${idx}`}
                        onClick={() => setActiveChapterIdx(idx)}
                        className={`w-full text-left p-3 rounded-lg text-xs transition duration-200 flex items-center justify-between cursor-pointer group ${
                          activeChapterIdx === idx
                            ? "bg-gradient-to-r from-cyan-500/10 to-teal-500/5 border border-cyan-500/20 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent"
                        }`}
                      >
                        <span className="line-clamp-1 grow pr-1">
                          {idx === 0 ? "Introduction" : `Ch.${idx}: ${chapter.substring(chapter.indexOf(":") + 1)}`}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Bookmark
                            onClick={(e) => toggleBookmark(selectedBook.id, idx, e)}
                            className={`h-3.5 w-3.5 cursor-pointer ${
                              isBookmarked ? "text-amber-400 fill-amber-400" : "text-slate-600 hover:text-slate-300"
                            }`}
                          />
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Split Right: Reader Core Display */}
            <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between space-y-6">
              
              {/* Core Text Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500">READING GUIDE SECTION</span>
                    <h4 className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
                      {selectedBook.chapters[activeChapterIdx]}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Page {Math.round((activeChapterIdx + 1) * (selectedBook.pages / selectedBook.chapters.length - 5))} of {selectedBook.pages}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-6 rounded-xl border border-slate-850 overflow-y-auto max-h-[350px]">
                  <p className="text-slate-300 whitespace-pre-line text-xs sm:text-sm leading-relaxed font-sans">
                    {getSimulatedChapterContent(selectedBook.title, selectedBook.chapters[activeChapterIdx])}
                  </p>
                </div>
              </div>

              {/* Progress & Chapter Back/Next Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
                <button
                  disabled={activeChapterIdx === 0}
                  onClick={() => setActiveChapterIdx(activeChapterIdx - 1)}
                  className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded transition cursor-pointer disabled:opacity-40"
                >
                  ◀ Previous
                </button>
                <span>
                  Ch. {activeChapterIdx} of {selectedBook.chapters.length - 1} Complete
                </span>
                <button
                  disabled={activeChapterIdx === selectedBook.chapters.length - 1}
                  onClick={() => setActiveChapterIdx(activeChapterIdx + 1)}
                  className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded transition cursor-pointer disabled:opacity-40"
                >
                  Next ▶
                </button>
              </div>

            </div>

          </div>
        ) : (
          // Ebooks Catalog View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="ebook-cards-grid">
            {ebooks.map((book) => (
              <div
                key={book.id}
                id={`book-card-${book.id}`}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/20 hover:shadow-cyan-950/5 hover:-translate-y-1 transition duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="space-y-4">
                  {/* Book cover visual block */}
                  <div className="h-44 w-full bg-slate-950 rounded-xl overflow-hidden relative border border-slate-850 group-hover:border-slate-800 shadow-md">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-teal-400 border border-slate-850 font-mono uppercase tracking-wider">
                      {book.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-slate-400 font-mono">
                      {book.pages} pages
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition leading-snug line-clamp-2 h-12">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">By {book.author}</p>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-2 font-sans">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span className="flex items-center gap-1.5 font-sans">
                    <FileText className="h-4 w-4" />
                    <span>Explore Chapters</span>
                  </span>
                  <span>Read Guide →</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
