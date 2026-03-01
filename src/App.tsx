import React, { useState } from 'react';
import Face from './components/Face';
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import { Search, Activity, Trophy, Loader2, AlertCircle, Info, Server, Lock, Type, FileText, Image as ImageIcon, Link as LinkIcon, ExternalLink, SearchCheck, Gauge, Award } from 'lucide-react';

const FEATURES = [
  { id: 'response_time', name: 'Server response time', icon: Server },
  { id: 'status_code', name: 'HTTP status code', icon: Activity },
  { id: 'ssl', name: 'SSL certificate', icon: Lock },
  { id: 'page_title', name: 'Page title', icon: Type },
  { id: 'meta_description', name: 'Meta description', icon: FileText },
  { id: 'word_count', name: 'Word count', icon: FileText },
  { id: 'image_count', name: 'Image count', icon: ImageIcon },
  { id: 'internal_links', name: 'Internal links count', icon: LinkIcon },
  { id: 'external_links', name: 'External links count', icon: ExternalLink },
  { id: 'seo_suggestions', name: 'Basic SEO suggestions', icon: SearchCheck },
  { id: 'color_speed', name: 'Color speed indicator', icon: Gauge },
  { id: 'rank_grade', name: 'Performance rank grade', icon: Award },
];

export default function App() {
  const [url, setUrl] = useState('');
  const [globalError, setGlobalError] = useState('');

  // Store results and loading states for each feature
  const [results, setResults] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCheckFeature = async (featureId: string) => {
    if (!url) {
      setGlobalError('Please enter a website URL first.');
      return;
    }

    setGlobalError('');
    setLoadingStates(prev => ({ ...prev, [featureId]: true }));
    setErrors(prev => ({ ...prev, [featureId]: '' }));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, feature: featureId })
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Invalid response from server: ${response.status} ${response.statusText}. Body: ${text.substring(0, 100)}`);
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setResults(prev => ({ ...prev, [featureId]: data.result }));
    } catch (err: any) {
      setErrors(prev => ({ ...prev, [featureId]: err.message }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [featureId]: false }));
    }
  };

  const handleCheckAll = async () => {
    if (!url) {
      setGlobalError('Please enter a website URL first.');
      return;
    }
    FEATURES.forEach(f => handleCheckFeature(f.id));
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#ff6a00] selection:text-white pb-20 relative">
      <InteractiveBackground />
      <CustomCursor />

      <header className="p-6 md:p-10 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-black tracking-tighter">COSMOCOP</div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-white/60">
          <a href="#" className="hover:text-[#ff6a00] transition-colors">Home</a>
          <a href="#" className="hover:text-[#ff6a00] transition-colors">Features</a>
          <a href="#" className="hover:text-[#ff6a00] transition-colors">Contact</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col items-center gap-16">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 flex flex-col z-10 w-full">
            <h1 className="text-[15vw] lg:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase hover:text-[#ff6a00] transition-colors duration-300">
              Analyze
            </h1>
            <div className="text-[8vw] lg:text-[4vw] font-black leading-[0.9] mt-6 flex flex-col">
              <span className="hover:text-[#ff6a00] transition-colors duration-300">Everything</span>
              <span className="hover:text-[#ff6a00] transition-colors duration-300">
                Instantly<span className="text-[#ff6a00]">.</span>
              </span>
            </div>

            <div className="mt-12 max-w-lg w-full bg-white/5 p-1 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 block">Enter Website URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="example.com"
                      className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all font-medium"
                    />
                  </div>
                </div>
                {globalError && (
                  <div className="text-red-400 text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {globalError}
                  </div>
                )}
                <button
                  onClick={handleCheckAll}
                  className="w-full bg-[#ff6a00] hover:bg-[#ff8533] text-black font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex justify-center items-center gap-3 mt-2"
                >
                  Analyze All Features
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end pointer-events-none mt-12 lg:mt-0">
            <Face />
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full mt-10">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Individual Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isLoading = loadingStates[feature.id];
              const result = results[feature.id];
              const error = errors[feature.id];

              return (
                <div key={feature.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-4 transition-all hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/50 rounded-lg">
                      <Icon className="w-5 h-5 text-[#ff6a00]" />
                    </div>
                    <h3 className="font-bold text-sm uppercase tracking-wider">{feature.name}</h3>
                  </div>

                  <div className="flex-1 flex items-center min-h-[60px]">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" /> Checking...
                      </div>
                    ) : error ? (
                      <div className="text-red-400 text-sm flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="line-clamp-3">{error}</span>
                      </div>
                    ) : result ? (
                      <div className="text-white font-medium text-lg whitespace-pre-wrap break-words w-full">
                        {result}
                      </div>
                    ) : (
                      <div className="text-white/30 text-sm italic">Not checked yet</div>
                    )}
                  </div>

                  <button
                    onClick={() => handleCheckFeature(feature.id)}
                    disabled={isLoading}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#ff6a00] hover:text-black text-white/70 font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
