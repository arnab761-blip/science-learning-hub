import React, { useState, useEffect } from "react";
import { Article } from "../types";
import { fallbackArticles } from "../data/mockData";
import { Link2, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle, Database, HelpCircle } from "lucide-react";

export default function DynamicArticles() {
  const DEFAULT_PLACEHOLDER_URL = "https://script.google.com/macros/s/AKfycbzkrABxxogiC18bG5Ll6ulO9YB6ApJUjMIUsmlmkpY-6Kv89YpT-gJ0VVpUJH3flDw2EA/exec";
  
  const [scriptURL, setScriptURL] = useState<string>(() => {
    return localStorage.getItem("google_sheets_apps_script_url") || DEFAULT_PLACEHOLDER_URL;
  });
  
  const [tempURL, setTempURL] = useState(scriptURL);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(() => {
    return localStorage.getItem("is_live_sheets_mode") === "true";
  });
  const [showGuide, setShowGuide] = useState(false);
useEffect(() => {
    const fetchSheetData = async () => {
      const targetURL = scriptURL || DEFAULT_PLACEHOLDER_URL;

      if (isLiveMode && targetURL) {
        setIsLoading(true);
        setFetchError(null);
        try {
          const response = await fetch(targetURL);
          if (!response.ok) throw new Error("Failed to fetch data");
          
          const data = await response.json();
          
          // 🛡️ ওয়েবসাইট ব্ল্যাঙ্ক হওয়া আটকানোর সেফগার্ড (ডাটা অ্যারে না হলে মক ডাটা দেখাবে)
          if (Array.isArray(data)) {
            setArticles(data);
          } else {
            console.error("Data is not an array:", data);
            setArticles(fallbackArticles);
          }
        } catch (error: any) {
          console.error("Google Sheets Fetch Error:", error);
          setFetchError(error.message || "Failed to load live data");
          setArticles(fallbackArticles);
        } finally {
          setIsLoading(false);
        }
      } else {
        setArticles(fallbackArticles);
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, [isLiveMode, scriptURL]);

      return;
    }

    setIsLoading(true);
    setFetchError(null);

    try {
      // Execute the real integration call
      const response = await fetch(urlToFetch, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        mode: "cors" // Apps script requires CORS headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Verify data shape
      if (Array.isArray(data)) {
        // Map the expected spreadsheet columns to our Article model
        const formattedArticles: Article[] = data.map((item: any, i: number) => ({
          title: item.title || `Article from Sheet #${i+1}`,
          content: item.content || item.summary || "No description provided.",
          date: item.date ? String(item.date).split("T")[0] : new Date().toISOString().split("T")[0],
          image: item.image || item.imageUrl || `https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80`,
          category: item.category || "General Science",
          author: item.author || "Guest Researcher",
          readTime: item.readTime || `${Math.max(2, Math.round((item.content || "").length / 500))} min read`
        }));
        
        setArticles(formattedArticles);
        setIsLiveMode(true);
        localStorage.setItem("is_live_sheets_mode", "true");
      } else {
        throw new Error("Malformed JSON response. Expected an array of article objects.");
      }
    } catch (err: any) {
      console.error("Sheets Fetch Details Error:", err);
      setFetchError(
        err.message || 
        "Failed to query Google Web App. Check CORS origin settings, script permissions, or URL formatting."
      );
      // Automatically show fallback articles but warn the user
      setArticles(fallbackArticles);
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchArticles(scriptURL, isLiveMode);
  }, []);

  const handleURLSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanURL = tempURL.trim();
    setScriptURL(cleanURL);
    localStorage.setItem("google_sheets_apps_script_url", cleanURL);
    
    // If the user inputs a real URL, try to connect to it or flag alert
    const runLive = (cleanURL !== "" && cleanURL !== DEFAULT_PLACEHOLDER_URL);
    setIsLiveMode(runLive);
    localStorage.setItem("is_live_sheets_mode", String(runLive));
    fetchArticles(cleanURL, runLive);
  };

  const resetToDemo = () => {
    setScriptURL(DEFAULT_PLACEHOLDER_URL);
    setTempURL(DEFAULT_PLACEHOLDER_URL);
    setIsLiveMode(false);
    localStorage.removeItem("google_sheets_apps_script_url");
    localStorage.setItem("is_live_sheets_mode", "false");
    setFetchError(null);
    fetchArticles(DEFAULT_PLACEHOLDER_URL, false);
  };

  const manualReload = () => {
    fetchArticles(scriptURL, isLiveMode);
  };

  const mockAppScriptCode = `// 1. Open your Google Sheet
// 2. Click Extensions -> Apps Script
// 3. Paste this code and save:

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var jsonArray = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var record = {};
    for (var j = 0; j < headers.length; j++) {
      var headerName = headers[j].toString().toLowerCase().trim();
      record[headerName] = row[j];
    }
    jsonArray.push(record);
  }
  
  var result = JSON.stringify(jsonArray);
  return ContentService.createTextOutput(result)
    .setMimeType(ContentService.MimeType.JSON);
}

// 4. Click Deploy -> New Deployment
// 5. Select 'Web App' type
// 6. Set Execute as: "Me" and Who has access: "Anyone"
// 7. Click Deploy, copy the Web App URL, and paste it below!`;

  return (
    <section className="bg-slate-950 py-16 px-4 md:px-8 border-t border-slate-900" id="latest-news-section">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md text-xs font-mono font-bold mb-3">
              <Database className="h-3 w-3" />
              <span>Google Sheets Sync Integration</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
              Latest Science Articles & News
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl font-sans">
              Articles pulled in real-time from a Google Sheets spreadsheet via a Google Apps Script API. Populate cells in the spreadsheet and observe instant live updates here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle className="h-4 w-4 text-teal-400" />
              <span>{showGuide ? "Hide Script Guide" : "How to Connect Google Sheet"}</span>
            </button>
            <button
              onClick={manualReload}
              disabled={isLoading}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 p-2.5 rounded-lg text-sm font-semibold transition cursor-pointer disabled:opacity-50"
              title="Reload data"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Integration Configurator Drawer/Guide */}
        {showGuide && (
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-amber-400 h-5 w-5" />
                  <span>Google Sheets & Apps Script Setup Instructions</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect your classroom or research Google Sheet to this system with these 4 steps:
                </p>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-sm space-y-3 text-slate-300 font-sans">
                <div>
                  <span className="font-bold text-cyan-400 font-mono">1. Prepare your Sheet:</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Create a Google Sheet and add four column headers in the very first row: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-white font-mono">title</code>, <code className="bg-slate-950 px-1.5 py-0.5 rounded text-white font-mono">content</code>, <code className="bg-slate-950 px-1.5 py-0.5 rounded text-white font-mono">date</code>, and <code className="bg-slate-950 px-1.5 py-0.5 rounded text-white font-mono">image</code>. Fill in lines of data below it.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-cyan-400 font-mono">2. Open Apps Script:</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Go to <strong>Extensions &gt; Apps Script</strong> in the Google Sheet menu bar. Delete any existing template code and paste the script shown on the right.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-cyan-400 font-mono">3. Deploy Web App:</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Click <strong>Deploy &gt; New deployment</strong>. Click the gear icon and select <strong>Web App</strong>. Set "Execute as" to <strong>Me</strong> and "Who has access" to <strong>Anyone</strong>. Click Deploy.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-cyan-400 font-mono">4. Authenticate & Copy URL:</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Authorize the Google accounts permissions when prompted. Copy the provided "Web app URL" (it ends in <code className="text-amber-400 bg-slate-950 px-1 rounded font-mono">/exec</code>) and paste it below!
                  </p>
                </div>
              </div>

              <div className="relative">
                <label className="text-[11px] uppercase font-mono font-bold text-slate-500 block mb-1">Apps Script Code Block</label>
                <pre className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[240px] leading-relaxed">
                  {mockAppScriptCode}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Live URL Input Panel */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className={`p-2.5 rounded-xl border ${isLiveMode && !fetchError ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
              {isLiveMode && !fetchError ? (
                <CheckCircle className="h-5 w-5 animate-bounce" />
              ) : (
                <Link2 className="h-5 w-5 text-cyan-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <span>API Connection:</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${isLiveMode && !fetchError ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                  {isLiveMode && !fetchError ? "LIVE SHEETS SYNC" : "DEMO / FALLBACK CACHE"}
                </span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {isLiveMode && !fetchError ? "Connected to dynamic endpoint" : "Using pre-cached educational reports"}
              </p>
            </div>
          </div>

          <form onSubmit={handleURLSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:max-w-2xl">
            <input
              type="text"
              value={tempURL}
              onChange={(e) => setTempURL(e.target.value)}
              placeholder="Paste Apps Script Web App URL (https://script.google.com/.../exec)"
              id="apps-script-url-input"
              className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg px-4 py-2.5 text-xs font-mono grow focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <div className="flex gap-1.5 justify-end">
              <button
                type="submit"
                id="save-script-url-btn"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-cyan-500/5 transition cursor-pointer flex items-center justify-center gap-1 shrink-0"
              >
                <Send className="h-3 w-3" />
                <span>Save</span>
              </button>
              {scriptURL !== DEFAULT_PLACEHOLDER_URL && (
                <button
                  type="button"
                  onClick={resetToDemo}
                  id="reset-demo-btn"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-lg transition border border-slate-700 cursor-pointer shrink-0"
                >
                  Reset Demo
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Warning Banner if API error is true */}
        {fetchError && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-4 rounded-xl flex items-start space-x-3 text-xs md:text-sm animate-pulse">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <p className="font-bold">Google Sheets Query Failed</p>
              <p className="text-slate-400 mt-0.5 font-mono text-[11px]">{fetchError}</p>
              <p className="text-slate-400 mt-2">
                We have temporarily fallen back to cached offline records of matching schema structure so the interface remains operational.
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Container as explicitly requested by prompt: <div id="articles-container"> */}
        <div id="articles-container" className="relative min-h-[250px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20 border border-slate-900 rounded-2xl space-y-3" id="articles-loading-state">
              <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin" />
              <p className="text-sm font-semibold text-slate-300 font-mono tracking-wide animate-pulse">
                Loading articles from Google Apps Script...
              </p>
              <p className="text-xs text-slate-500 font-sans">
                Connecting to endpoint: {scriptURL.length > 50 ? `${scriptURL.substring(0, 50)}...` : scriptURL}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="articles-cards-grid">
              {articles.map((article, index) => (
                <article
                  key={index}
                  id={`article-card-${index}`}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-cyan-500/30 hover:shadow-cyan-950/10 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Card Image */}
                  <div className="h-48 md:h-52 w-full overflow-hidden bg-slate-950 relative">
                    <img
                      src={article.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-cyan-400 border border-slate-850 tracking-wider uppercase font-mono">
                      {article.category || "Science Focus"}
                    </div>
                    {article.readTime && (
                      <div className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400 border border-slate-800">
                        {article.readTime}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-mono text-slate-500 flex items-center justify-between">
                        <span>BY {article.author?.toUpperCase() || "STAFF ACADEMIC"}</span>
                        <span>{article.date}</span>
                      </p>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed font-sans">
                        {article.content}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center text-xs font-bold text-cyan-400 group-hover:text-cyan-300 gap-1 cursor-pointer">
                      <span>Explore In-Depth analysis</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
