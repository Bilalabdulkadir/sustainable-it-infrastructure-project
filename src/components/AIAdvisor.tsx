import React, { useState } from "react";
import { 
  Sparkles, 
  Cpu, 
  Cloud, 
  Trash2, 
  Play, 
  Clipboard, 
  Check, 
  Activity, 
  AlertTriangle,
  FileCode,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  TrendingDown
} from "lucide-react";
import { AuditRequest, AuditResponse } from "../types";

export default function AIAdvisor() {
  const [formData, setFormData] = useState<AuditRequest>({
    infraType: "hybrid",
    scale: "50-150 servers",
    currentPUE: 1.8,
    primaryWorkload: "Enterprise ERP & Developer VM Testing Labs",
    additionalDetails: "We have developer instances running 24/7 on AWS that are mostly unused during weekends. On-premise we have 80 legacy servers with average PUE of 1.8. Hardware replacement cycle is strictly 3 years, and outdated laptops are stacked in our IT storage room."
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResponse | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const loadingMessages = [
    "Analyzing hardware configuration and on-premise PUE coefficients...",
    "Querying Gemini models for green datacenter virtualization alternatives...",
    "Estimating power draw caps and virtualization ratios...",
    "Formulating custom hardware lifecycle extensions to avoid e-waste...",
    "Synthesizing custom Python/Bash power monitoring automation scripts..."
  ];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);
    setAuditResult(null);

    // Dynamic messaging interval
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2800);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI audit. Please ensure your GEMINI_API_KEY is configured in Secrets.");
      }

      const data = await response.json();
      setAuditResult(data);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "An unexpected error occurred during the audit.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  return (
    <div id="ai-advisor" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex items-center gap-3 border-b border-slate-850 pb-5 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            AI-Powered Green IT Auditor <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20 uppercase tracking-wider">Gemini 3.5</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit your IT infrastructure inventory to receive a comprehensive sustainability audit and custom automation scripts.
          </p>
        </div>
      </div>

      {apiError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6 text-xs text-red-400 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Audit Request Interrupted</span>
            {apiError}
          </div>
        </div>
      )}

      {/* Audit Form Section */}
      {!isLoading && !auditResult && (
        <form onSubmit={runAudit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Infra Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Infrastructure Deployment</label>
              <div className="grid grid-cols-3 gap-2">
                {(['on-premise', 'cloud', 'hybrid'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, infraType: type })}
                    className={`py-3 rounded-xl border text-xs font-semibold capitalize transition ${
                      formData.infraType === type
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Org Scale */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Operational Scale</label>
              <input
                type="text"
                placeholder="e.g. 100 servers, 400 endpoints"
                value={formData.scale}
                onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>

            {/* Current PUE */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                Estimated PUE 
                <span className="group relative cursor-help text-slate-500">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-950 border border-slate-800 text-[10px] text-slate-300 p-2 rounded-lg w-48 shadow-xl text-center leading-normal z-20">
                    Power Usage Effectiveness. 1.0 is perfect efficiency. Standard legacy datacenters range 1.6 - 2.0.
                  </span>
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="3.0"
                value={formData.currentPUE}
                onChange={(e) => setFormData({ ...formData, currentPUE: parseFloat(e.target.value) || 1.0 })}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>

          </div>

          {/* Primary Workload */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Primary IT Workloads</label>
            <input
              type="text"
              placeholder="e.g. Microservice APIs, dev labs, database clustering"
              value={formData.primaryWorkload}
              onChange={(e) => setFormData({ ...formData, primaryWorkload: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

          {/* Details Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Detailed Infrastructure Description</label>
            <textarea
              rows={4}
              placeholder="Describe your server load, CPU utilization average, power policies, storage habits, endpoint renewal cycle (e.g. 'We replace laptops every 3 years', 'We leave development boxes running overnight', etc.)"
              value={formData.additionalDetails}
              onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition resize-none leading-relaxed"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-emerald-500/10 flex items-center gap-2 group hover:scale-[1.01] cursor-pointer"
            >
              Analyze & Audit Infrastructure
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </form>
      )}

      {/* Loading State Screen */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin" />
            <Sparkles className="w-6 h-6 text-emerald-400 absolute animate-pulse" />
          </div>
          <div className="space-y-1.5 max-w-md">
            <p className="text-sm font-bold text-white">AI Sustainability Auditor Active</p>
            <p className="text-xs text-slate-400 animate-pulse">{loadingMessages[loadingStep]}</p>
          </div>
        </div>
      )}

      {/* --- AUDIT RESULTS REPORT --- */}
      {auditResult && !isLoading && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Overarching Summary & Score Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950/80 border border-slate-850 rounded-2xl p-5 items-center">
            
            {/* Visual Circular Sustainability Score */}
            <div className="md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-850 pb-5 md:pb-0 md:pr-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sustainability Index</span>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" className="stroke-slate-850" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="56" 
                    cy="56" 
                    r="46" 
                    className="stroke-emerald-400 transition-all duration-1000" 
                    strokeWidth="8" 
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - (auditResult.overallScore / 100))}`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{auditResult.overallScore}</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Score</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-emerald-400 mt-2.5">
                {auditResult.overallScore >= 80 ? "Highly Efficient" : auditResult.overallScore >= 50 ? "Moderate Footprint" : "Urgent Action Required"}
              </span>
            </div>

            {/* Audit Narrative Summary */}
            <div className="md:col-span-9 space-y-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/10">
                <ShieldCheck className="w-3.5 h-3.5" /> Executive Audit Verdict
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {auditResult.summary}
              </p>
            </div>
          </div>

          {/* Actionable prioritized recommendations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" /> Prioritized Mitigation Protocols
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {auditResult.recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-2xl p-4 flex flex-col justify-between transition duration-200"
                >
                  <div className="space-y-3">
                    {/* Badge category & priority */}
                    <div className="flex justify-between items-center">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        rec.category === 'energy' 
                          ? "bg-amber-500/10 text-amber-400" 
                          : rec.category === 'cloud' 
                            ? "bg-sky-500/10 text-sky-400" 
                            : "bg-purple-500/10 text-purple-400"
                      }`}>
                        {rec.category === 'energy' ? <Cpu className="w-2.5 h-2.5" /> : rec.category === 'cloud' ? <Cloud className="w-2.5 h-2.5" /> : <Trash2 className="w-2.5 h-2.5" />}
                        {rec.category}
                      </span>

                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                        rec.priority === 'high' 
                          ? "bg-red-500/15 text-red-400 border border-red-500/10" 
                          : rec.priority === 'medium' 
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/10" 
                            : "bg-slate-800 text-slate-400"
                      }`}>
                        {rec.priority}
                      </span>
                    </div>

                    <h5 className="font-bold text-sm text-white leading-snug">{rec.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{rec.impactDescription}</p>

                    {/* Step lists */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Implementation Steps:</span>
                      <ul className="space-y-1 text-[11px] text-slate-300 list-decimal pl-4 leading-normal">
                        {rec.implementationSteps.map((step, sIdx) => (
                          <li key={sIdx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* KWh Saving Metric */}
                  {rec.estimatedKwhSavings > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Est. Energy Saved:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" /> {rec.estimatedKwhSavings.toLocaleString()} kWh/yr
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Automation Panel */}
          {auditResult.automationScript && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-emerald-400" /> Automated Optimization Script
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">{auditResult.automationScript.filename}</span>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden relative group">
                
                {/* Script header */}
                <div className="flex justify-between items-center bg-slate-950 px-4 py-2.5 border-b border-slate-900 text-xs text-slate-400 font-medium">
                  <span>Language: <span className="text-slate-200 capitalize font-bold">{auditResult.automationScript.language}</span></span>
                  
                  {/* Copy Action */}
                  <button
                    onClick={() => handleCopyCode(auditResult.automationScript.code)}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase hover:text-white transition py-1 px-2 bg-slate-900 border border-slate-850 rounded-lg"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3 h-3" /> Copy Script
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 overflow-x-auto max-h-72 font-mono text-[11px] leading-relaxed text-emerald-300/90 whitespace-pre bg-slate-950">
                  <code>{auditResult.automationScript.code}</code>
                </div>

                {/* Script Description */}
                <div className="px-4 py-3 bg-slate-900/40 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-300 block mb-0.5">Deployment Guide:</span>
                  {auditResult.automationScript.description}
                </div>
              </div>
            </div>
          )}

          {/* Audit Reset Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setAuditResult(null)}
              className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Run Another Infrastructure Audit
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
