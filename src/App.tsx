import { useState } from "react";
import { motion } from "motion/react";
import { 
  Leaf, 
  BarChart3, 
  Sparkles, 
  BookOpen, 
  Info,
  Server,
  Code2,
  Calendar,
  Layers,
  Award
} from "lucide-react";
import GravatarProfile from "./components/GravatarProfile";
import GreenITCalculator from "./components/GreenITCalculator";
import AIAdvisor from "./components/AIAdvisor";
import FrameworkDetails from "./components/FrameworkDetails";

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'framework' | 'audit'>('simulator');

  return (
    <div className="min-h-screen bg-[#F9FBF7] text-[#1B4332] flex flex-col font-sans selection:bg-[#76C893]/30 selection:text-[#1B4332]">
      
      {/* Dynamic Background Decorative Shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#1b4332_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#76C893]/5 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1B4332]/3 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48" />

      {/* Hero Banner Section */}
      <header className="border-b border-[#1B4332]/10 bg-white/70 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-[16px] bg-[#1B4332] flex items-center justify-center shadow-lg shadow-[#1B4332]/10 transition-transform duration-300 hover:rotate-3">
              <Leaf className="w-6 h-6 text-[#F9FBF7]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#1B4332] block">Green IT Hub</span>
              <span className="text-[10px] text-[#1B4332]/60 font-semibold uppercase tracking-[0.2em] block">Sustainable Digital Infrastructure</span>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#1B4332]/80">
            <div className="flex items-center gap-2 bg-[#1B4332]/5 px-3.5 py-2 rounded-full border border-[#1B4332]/10">
              <span className="w-2 h-2 rounded-full bg-[#76C893]" />
              <span>PUE Standard Target: <strong className="font-bold">1.15</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-[#1B4332]/5 px-3.5 py-2 rounded-full border border-[#1B4332]/10">
              <span className="w-2 h-2 rounded-full bg-[#76C893]" />
              <span>Manufacturing Carbon Saved: <strong className="font-bold">85%</strong></span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-10">
        
        {/* Entrance Banner Description */}
        <motion.section 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#1B4332]/10 rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-[0_16px_48px_rgba(27,67,50,0.03)]"
        >
          {/* Artistic background graphic lines */}
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-[#1B4332] pointer-events-none">
            <Layers className="w-64 h-64" />
          </div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#76C893]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#1B4332]/60 block">Project Framework & Impact Report</span>
            <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight text-[#1B4332] leading-tight">
              Sustainable IT Infrastructure & Resource Optimization
            </h2>
            <p className="text-sm md:text-base text-[#1B4332]/80 leading-relaxed max-w-2xl">
              This portfolio hub integrates real-world systems support expertise with data-driven environmental audits. Explore the active green calculators to simulate carbon reductions, view Bilal's core frameworks, or trigger the live Gemini AI auditor to analyze corporate workloads.
            </p>
          </div>
        </motion.section>

        {/* PROFILE PROFILE INTEGRATION */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GravatarProfile />
        </motion.section>

        {/* MAIN INTERACTIVE CORE NAVIGATION TABS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-3 rounded-[28px] border border-[#1B4332]/10 shadow-[0_10px_30px_rgba(27,67,50,0.02)]">
            <div className="text-xs font-bold text-[#1B4332]/70 uppercase tracking-[0.25em] px-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#76C893]" /> Portfolio Suite Navigation
            </div>

            {/* Nav controls */}
            <div className="flex bg-[#F9FBF7] p-1.5 rounded-[20px] border border-[#1B4332]/10 text-xs gap-1">
              <button
                onClick={() => setActiveView('simulator')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] font-bold transition-all duration-300 ${
                  activeView === 'simulator'
                    ? "bg-[#1B4332] text-white shadow-md shadow-[#1B4332]/15"
                    : "text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5"
                }`}
              >
                <BarChart3 className="w-4 h-4" /> Impact Calculator
              </button>
              <button
                onClick={() => setActiveView('framework')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] font-bold transition-all duration-300 ${
                  activeView === 'framework'
                    ? "bg-[#1B4332] text-white shadow-md shadow-[#1B4332]/15"
                    : "text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5"
                }`}
              >
                <BookOpen className="w-4 h-4" /> Green Framework
              </button>
              <button
                onClick={() => setActiveView('audit')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] font-bold transition-all duration-300 ${
                  activeView === 'audit'
                    ? "bg-[#1B4332] text-white shadow-md shadow-[#1B4332]/15"
                    : "text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5"
                }`}
              >
                <Sparkles className="w-4 h-4" /> AI Infrastructure Audit
              </button>
            </div>
          </div>

          {/* DYNAMIC WORKSPACE ROUTING */}
          <div className="min-h-[400px]">
            {activeView === 'simulator' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GreenITCalculator />
              </motion.div>
            )}
            {activeView === 'framework' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FrameworkDetails />
              </motion.div>
            )}
            {activeView === 'audit' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AIAdvisor />
              </motion.div>
            )}
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="border-t border-[#1B4332]/10 bg-white py-12 text-center relative z-20 text-[#1B4332]/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[#1B4332] font-semibold">
            <span>Bilal Abdulkadir Muhammed</span>
            <span className="opacity-30">&bull;</span>
            <span>B.Sc. Information Technology, Jimma University</span>
            <span className="opacity-30">&bull;</span>
            <span>Excelerate Associate Intern</span>
          </div>
          
          <p className="max-w-xl mx-auto leading-relaxed text-[11px] text-[#1B4332]/70">
            Leveraging analytical logic, computing configurations, and sustainable hardware practices to minimize organizational emissions and e-waste footprints.
          </p>

          <div className="h-px bg-[#1B4332]/10 max-w-sm mx-auto" />

          <p className="text-[10px] text-[#1B4332]/50 tracking-wider">
            &copy; {new Date().getFullYear()} Sustainable IT Infrastructure Hub. Designed & Engineered with Modern React & Tailwind CSS under the Artistic Flair Direction.
          </p>
        </div>
      </footer>

    </div>
  );
}
