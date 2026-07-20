import { useState } from "react";
import { 
  Zap, 
  Cloud, 
  Trash2, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Code2, 
  BookOpen, 
  PlusCircle, 
  BarChart4,
  Server
} from "lucide-react";

export default function FrameworkDetails() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: "Energy Efficiency",
      tagline: "Minimizing hardware idle draw and optimizing runtime thermodynamics.",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      color: "from-amber-500/10 to-orange-500/5 border-amber-500/25",
      bgClass: "bg-amber-100 text-amber-800 border border-amber-500/20",
      strategies: [
        {
          name: "Virtualization & Consolidation",
          desc: "Merging logical VMs onto fewer, high-density physical hosts. Retiring underutilized hardware and keeping active host CPUs at optimal load curves (60-80% utilization)."
        },
        {
          name: "Power Capping & Advanced Configuration",
          desc: "Configuring server dynamic voltage and frequency scaling (DVFS), using Intel SpeedStep or AMD Cool'n'Quiet, and establishing BIOS/OS-level power-management capping policies."
        },
        {
          name: "Preventative Datacenter Cooling",
          desc: "Arranging server racks into Hot/Cold Aisle Containment layouts to avoid thermal recirculations, reducing cooling fan energy, and optimizing local Power Usage Effectiveness (PUE)."
        }
      ]
    },
    {
      title: "Cloud Optimization",
      tagline: "Architecting serverless triggers, scheduling idle environments, and tiered storage.",
      icon: <Cloud className="w-5 h-5 text-sky-500" />,
      color: "from-sky-500/10 to-blue-500/5 border-sky-500/25",
      bgClass: "bg-sky-100 text-sky-800 border border-sky-500/20",
      strategies: [
        {
          name: "Dynamic Scaling & Down-sizing",
          desc: "Actively auditing instance utilization logs via AWS CloudWatch or GCP Operations suite. Down-sizing over-provisioned instances to match actual computing demands."
        },
        {
          name: "Off-Hour Scheduling Automation",
          desc: "Deploying automated shell scripts or serverless cron tasks to terminate or hibernate staging, testing, and dev environments during non-working weekends and nights."
        },
        {
          name: "Infrequently Accessed Tiered Storage",
          desc: "Configuring lifecycles to transition legacy logs and database backups from standard high-performance solid-state drives to lower-cost, low-energy glacier tier cold storage."
        }
      ]
    },
    {
      title: "E-Waste Management",
      tagline: "Extending device lifespan, preventive repair, and responsible recycling audits.",
      icon: <Trash2 className="w-5 h-5 text-purple-500" />,
      color: "from-purple-500/10 to-pink-500/5 border-purple-500/25",
      bgClass: "bg-purple-100 text-purple-800 border border-purple-500/20",
      strategies: [
        {
          name: "Triage & Preventative IT Support",
          desc: "Performing deep cleaning of dust blockages, replacing dried CPU thermal paste, expanding RAM, and replacing failure-prone mechanical hard drives with highly efficient SSDs."
        },
        {
          name: "Operating System De-bloating",
          desc: "Removing factory bloatware, configuring efficient sleep thresholds, and deploying lightweight operating systems on outdated hardware to sustain operational speeds."
        },
        {
          name: "Refurbishing & Responsible E-waste Channels",
          desc: "Refurbishing and donating retiring but active corporate devices to schools or youth clinics. Auditing final hardware recycling partners for strict e-waste compliance."
        }
      ]
    }
  ];

  const kpis = [
    {
      metric: "PUE (Power Usage Effectiveness)",
      ideal: "Ideal: 1.1 - 1.2",
      desc: "Measures datacenter overhead. PUE = Total Facility Power / IT Equipment Power. Lower is better."
    },
    {
      metric: "E-Waste Diversion Rate (%)",
      ideal: "Target: 95%+",
      desc: "The ratio of decommissioned equipment that is successfully refurbished, repurposed, or certified recycled versus dumped."
    },
    {
      metric: "Average Asset Longevity",
      ideal: "Target: 5 - 6 years",
      desc: "Extending the operational replacement lifecycle of endpoint workstations through proactive maintenance."
    },
    {
      metric: "Embodied Carbon Offset (MT CO₂e)",
      ideal: "Calculated Accumulative",
      desc: "Carbon footprint saved in manufacturing lines by extending active hardware life and purchasing fewer new units."
    }
  ];

  return (
    <div id="green-it-methodology" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-gold-muted/30 rounded-[32px] p-6 md:p-8 shadow-[0_16px_48px_rgba(179,146,82,0.06),0_4px_12px_rgba(27,67,50,0.02)] hover:border-gold-muted/40 transition-all duration-300">
      
      {/* Left Column: Pill Selectors & Pillar Strategy */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h3 className="text-lg font-serif italic text-[#1B4332] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#76C893]" /> Core Green IT Framework
          </h3>
          <p className="text-xs text-[#1B4332]/60 mt-1">
            Explore Bilal's three-pillared methodology for sustainable, low-carbon infrastructure operations.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="flex gap-2 bg-[#F9FBF7] p-1.5 rounded-2xl border border-gold-muted/20">
          {pillars.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePillar(idx)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition duration-200 ${
                activePillar === idx
                  ? "bg-[#1B4332] text-white shadow-md border border-transparent"
                  : "text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5"
              }`}
            >
              {p.icon}
              <span className="hidden sm:inline">{p.title}</span>
            </button>
          ))}
        </div>

        {/* Pillar Details Panel */}
        <div className={`p-6 rounded-2xl bg-gradient-to-br border ${pillars[activePillar].color} space-y-5 transition duration-300`}>
          <div className="space-y-1">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${pillars[activePillar].bgClass}`}>
              Pillar {activePillar + 1}: {pillars[activePillar].title}
            </span>
            <p className="text-sm font-bold text-[#1B4332] pt-1">{pillars[activePillar].tagline}</p>
          </div>

          <div className="space-y-4">
            {pillars[activePillar].strategies.map((strat, sIdx) => (
              <div key={sIdx} className="bg-white/80 p-4 rounded-xl border border-gold-muted/15 flex gap-3.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-[#1B4332] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-emerald-500/20">
                  {sIdx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B4332]">{strat.name}</h4>
                  <p className="text-[11px] text-[#1B4332]/70 leading-relaxed mt-1">{strat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: KPIs and Tech Stack info */}
      <div className="lg:col-span-5 space-y-6">
        {/* KPI Panel */}
        <div className="bg-[#F9FBF7] border border-gold-muted/20 rounded-2xl p-5 space-y-4 shadow-sm">
          <span className="text-xs font-bold text-[#1B4332]/80 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart4 className="w-4 h-4 text-[#76C893]" /> Key Performance Indicators (KPIs)
          </span>

          <div className="space-y-3.5">
            {kpis.map((k, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-gold-muted/15 flex flex-col justify-between shadow-[0_2px_8px_rgba(179,146,82,0.02)] hover:border-gold-muted/30 transition">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-bold text-[#1B4332]">{k.metric}</span>
                  <span className="text-emerald-700 font-extrabold">{k.ideal}</span>
                </div>
                <p className="text-[10px] text-[#1B4332]/60 leading-normal">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & demonstrated skills */}
        <div className="bg-[#F9FBF7] border border-gold-muted/20 rounded-2xl p-5 space-y-4 shadow-sm">
          <span className="text-xs font-bold text-[#1B4332]/80 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-[#76C893]" /> Demonstrated IT Tech Stack
          </span>

          <div className="flex flex-wrap gap-1.5">
            {[
              "IT Support & Infrastructure",
              "Hardware Lifecycle Management",
              "Power capping configurations",
              "Python Metrics Calculation",
              "SQL Log Analysis",
              "Power BI Visualizations",
              "Instance Right-Sizing",
              "Glacier Cold Storage tiering",
              "Server Virtualization",
              "Sustainable Procurement"
            ].map((skill, sIdx) => (
              <span 
                key={sIdx}
                className="text-[10px] font-bold bg-white text-[#1B4332]/80 px-2.5 py-1 rounded-lg border border-gold-muted/20 shadow-sm hover:border-gold-muted/45 transition"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-gold-muted/15 flex gap-3 items-start text-[11px] text-[#1B4332]/70 leading-relaxed">
            <Award className="w-5 h-5 text-[#76C893] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B4332] block">IT & Climate Leadership integration</span>
              Bilal blends digital troubleshooting expertise with data-driven decision-making to optimize organizational carbon footprints, demonstrating technology-driven climate advocacy.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
