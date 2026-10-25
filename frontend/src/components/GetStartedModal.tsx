import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Shield, Database, Search, Sparkles } from 'lucide-react';
import { filterMemoriesByQuery, MemoryItem } from '../utils/animation-helpers.ts';

export interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'waitlist' | 'demo' | 'privacy';
}

const SAMPLE_MEMORIES: MemoryItem[] = [
  {
    id: 'm1',
    category: 'preference',
    content: 'Prefers light Ethiopian Yirgacheffe roast, black with no sugar',
    timestamp: 'Saved 2 days ago',
  },
  {
    id: 'm2',
    category: 'fact',
    content: 'Allergic to penicillin and unrefined hazelnut oil',
    timestamp: 'Saved 1 week ago',
  },
  {
    id: 'm3',
    category: 'goal',
    content: 'Training for Berlin Marathon 2026, targeting sub-3:30 pace',
    timestamp: 'Saved 2 weeks ago',
  },
  {
    id: 'm4',
    category: 'idea',
    content: 'Zero-latency vector index cache pattern using memory-mapped files',
    timestamp: 'Saved 3 weeks ago',
  },
];

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'waitlist',
}) => {
  const [tab, setTab] = useState<'waitlist' | 'demo' | 'privacy'>(initialTab);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState('');
  const [userThought, setUserThought] = useState('');
  const [memories, setMemories] = useState<MemoryItem[]>(SAMPLE_MEMORIES);
  const [capturedNotice, setCapturedNotice] = useState<string | null>(null);

  const filtered = filterMemoriesByQuery(memories, query);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  const handleCaptureThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userThought.trim()) return;

    const newMemory: MemoryItem = {
      id: `mem-${Date.now()}`,
      category: 'fact',
      content: userThought.trim(),
      timestamp: 'Just now',
    };

    setMemories([newMemory, ...memories]);
    setUserThought('');
    setCapturedNotice(`Memory captured: "${newMemory.content.slice(0, 40)}..."`);
    setTimeout(() => setCapturedNotice(null), 3500);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#141414] border border-white/[0.08] rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xl text-[#E1E0CC] overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/[0.06] pb-3 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setTab('waitlist')}
              className={`pb-1 px-1 transition-colors font-medium cursor-pointer ${
                tab === 'waitlist'
                  ? 'text-[#DEDBC8] border-b-2 border-[#DEDBC8]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Early Access
            </button>
            <button
              type="button"
              onClick={() => setTab('demo')}
              className={`pb-1 px-1 transition-colors font-medium cursor-pointer ${
                tab === 'demo'
                  ? 'text-[#DEDBC8] border-b-2 border-[#DEDBC8]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Interactive Preview
            </button>
            <button
              type="button"
              onClick={() => setTab('privacy')}
              className={`pb-1 px-1 transition-colors font-medium cursor-pointer ${
                tab === 'privacy'
                  ? 'text-[#DEDBC8] border-b-2 border-[#DEDBC8]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Privacy & Storage
            </button>
          </div>

          {/* TAB 1: WAITLIST */}
          {tab === 'waitlist' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-[#E1E0CC] tracking-tight mb-2">
                Begin with Remember AI.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                Join the private cohort of thinkers, builders, and writers using
                natural-language memory layers for personal context.
              </p>

              {submitted ? (
                <div className="bg-[#1c1c1c] border border-white/[0.08] rounded-xl p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#DEDBC8] text-black mx-auto flex items-center justify-center mb-3">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-base font-medium text-[#E1E0CC] mb-1">
                    You're on the list.
                  </h3>
                  <p className="text-xs text-gray-400">
                    We'll email you an invite token as rollout batches open.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email-input"
                      className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium"
                    >
                      Email address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.design"
                      required
                      className="w-full bg-[#212121] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-[#eae8d9] text-black font-semibold text-sm py-3 px-5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
                  >
                    <span>Request Early Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-gray-500 text-center m-0">
                    No spam. Zero data monetization. Encrypted personal vault.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE PREVIEW */}
          {tab === 'demo' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg sm:text-xl font-normal text-[#E1E0CC] tracking-tight">
                  Simulate Natural Memory
                </h2>
                <span className="text-[10px] uppercase tracking-wider text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                  Live sandbox
                </span>
              </div>

              {/* Capture Input */}
              <form onSubmit={handleCaptureThought} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userThought}
                    onChange={(e) => setUserThought(e.target.value)}
                    placeholder="E.g. Book club meets Tuesdays at 7pm on Zoom"
                    className="flex-1 bg-[#212121] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-[#E1E0CC] placeholder-gray-500 focus:outline-none focus:border-[#DEDBC8]"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-black font-medium text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Capture</span>
                  </button>
                </div>
                {capturedNotice && (
                  <p className="text-[11px] text-[#DEDBC8] mt-1.5 animate-fadeIn">
                    ✓ {capturedNotice}
                  </p>
                )}
              </form>

              {/* Search Recall Input */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Recall memory (e.g. coffee, marathon, penicillin)..."
                  className="w-full bg-[#1b1b1b] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2 text-xs text-[#E1E0CC] placeholder-gray-500 focus:outline-none focus:border-[#DEDBC8]"
                />
              </div>

              {/* Memory Cards list */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filtered.map((mem) => (
                  <div
                    key={mem.id}
                    className="bg-[#212121] rounded-xl p-3 text-xs border border-white/[0.04] flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                          {mem.category}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {mem.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-snug m-0">
                        {mem.content}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteMemory(mem.id)}
                      className="text-gray-500 hover:text-red-400 text-[11px] cursor-pointer"
                      title="Delete memory"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-4">
                    No memories found matching "{query}".
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY & ARCHITECTURE */}
          {tab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-normal text-[#E1E0CC] tracking-tight">
                Architected for Personal Sovereignty
              </h2>
              <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
                <div className="flex items-start gap-3 bg-[#212121] p-3 rounded-xl border border-white/[0.04]">
                  <Database className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-0.5">
                      MongoDB Persistent Storage
                    </h4>
                    <p className="text-gray-400 m-0">
                      Memories are stored as structured documents rather than ephemeral chat
                      buffers, surviving across sessions and interfaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#212121] p-3 rounded-xl border border-white/[0.04]">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-0.5">
                      User-Controlled Tool Calling
                    </h4>
                    <p className="text-gray-400 m-0">
                      Every memory mutation (create, read, update, delete) occurs transparently via
                      explicit tool calling with instant review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setTab('waitlist')}
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline cursor-pointer"
                >
                  <span>Ready to join? Request early access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GetStartedModal;
