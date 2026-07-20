import { useState, useMemo } from "react";
import { 
  Server, 
  Leaf, 
  Trash2, 
  Cloud, 
  Cpu, 
  DollarSign, 
  Zap, 
  Car, 
  Trees, 
  Smartphone, 
  Flame, 
  RotateCcw,
  Info
} from "lucide-react";
import { 
  ServerMetrics, 
  CalculatedImpact, 
  HardwareLifecycle, 
  LifecycleSavings,
  CloudMetrics,
  CloudSavings
} from "../types";

export default function GreenITCalculator() {
  const [activeTab, setActiveTab] = useState<'server' | 'ewaste' | 'cloud'>('server');

  // --- TAB 1: SERVER METRICS STATE ---
  const [serverMetrics, setServerMetrics] = useState<ServerMetrics>({
    serversCount: 80,
    wattsSavedPerServer: 130,
    operatingHours: 24,
    gridFactor: 0.417 // Global Average
  });

  const gridPresets = [
    { name: "Ethiopia (Hydropower)", factor: 0.015, desc: "Very green, mostly renewable grid" },
    { name: "US Average Grid", factor: 0.370, desc: "Mixed fossil & renewable sources" },
    { name: "Global Average", factor: 0.417, desc: "Standard baseline carbon coefficient" },
    { name: "Coal-Heavy Grid", factor: 0.820, desc: "Predominantly fossil-fuel generated grid" }
  ];

  // TAB 1 calculations
  const serverImpact = useMemo<CalculatedImpact>(() => {
    const { serversCount, wattsSavedPerServer, operatingHours, gridFactor } = serverMetrics;
    const dailyWattHours = serversCount * wattsSavedPerServer * operatingHours;
    const annualKwhSaved = (dailyWattHours * 365) / 1000;
    const annualCo2SavedTons = (annualKwhSaved * gridFactor) / 1000;

    // Equivalents formulas from EPA Greenhouse Gas Equivalencies
    const passengerCarsYear = annualCo2SavedTons / 4.6;
    const forestAcresYear = annualCo2SavedTons * 1.2;
    const smartphonesChargedMillion = (annualCo2SavedTons * 121600) / 1000000;
    const coalBurnedTons = annualCo2SavedTons * 0.95;

    return {
      annualKwhSaved,
      annualCo2SavedTons,
      passengerCarsYear,
      forestAcresYear,
      smartphonesChargedMillion,
      coalBurnedTons
    };
  }, [serverMetrics]);

  // --- TAB 2: E-WASTE METRICS STATE ---
  const [lifecycleMetrics, setLifecycleMetrics] = useState<HardwareLifecycle>({
    currentDevices: 250,
    currentLifespanYears: 3,
    targetLifespanYears: 5,
    avgDeviceCost: 1100,
    avgDeviceWeightKg: 2.2
  });

  // TAB 2 calculations
  const lifecycleSavings = useMemo<LifecycleSavings>(() => {
    const { currentDevices, currentLifespanYears, targetLifespanYears, avgDeviceCost, avgDeviceWeightKg } = lifecycleMetrics;
    
    const replacementsCurrent = currentDevices / currentLifespanYears;
    const replacementsTarget = currentDevices / targetLifespanYears;
    const devicesSavedPerYear = replacementsCurrent - replacementsTarget;

    const yearsExtended = targetLifespanYears - currentLifespanYears;
    const annualFinancialSavings = devicesSavedPerYear * avgDeviceCost;
    const eWasteAvoidedKg = devicesSavedPerYear * avgDeviceWeightKg;
    // Avg manufacturing footprint of a modern endpoint (laptop/desktop/monitor) is around 320kg CO2
    const co2ManufacturingSavedTons = (devicesSavedPerYear * 320) / 1000;

    return {
      yearsExtended,
      annualFinancialSavings,
      eWasteAvoidedKg,
      co2ManufacturingSavedTons
    };
  }, [lifecycleMetrics]);


  // --- TAB 3: CLOUD METRICS STATE ---
  const [cloudMetrics, setCloudMetrics] = useState<CloudMetrics>({
    instanceCount: 45,
    idlePercentage: 35,
    avgInstanceWatts: 180,
    hoursIdlePerMonth: 160 // Off-hours (evenings and weekends)
  });

  // TAB 3 calculations
  const cloudSavings = useMemo<CloudSavings>(() => {
    const { instanceCount, idlePercentage, avgInstanceWatts, hoursIdlePerMonth } = cloudMetrics;
    
    // Number of instances we can optimize / schedule
    const optimizableInstances = instanceCount * (idlePercentage / 100);
    // Watts draw reduction when scheduled off
    const monthlyWhSaved = optimizableInstances * avgInstanceWatts * hoursIdlePerMonth;
    const annualKwhSaved = (monthlyWhSaved * 12) / 1000;
    const annualCo2SavedTons = (annualKwhSaved * 0.417) / 1000; // Using global grid avg for data centers
    // Cloud cost estimate: average instance running cost of $0.08 / hour
    const annualCostSavings = optimizableInstances * 0.08 * hoursIdlePerMonth * 12;

    return {
      annualKwhSaved,
      annualCo2SavedTons,
      annualCostSavings
    };
  }, [cloudMetrics]);


  // Helper resets
  const resetServerMetrics = () => {
    setServerMetrics({
      serversCount: 50,
      wattsSavedPerServer: 120,
      operatingHours: 24,
      gridFactor: 0.400
    });
  };

  const resetLifecycleMetrics = () => {
    setLifecycleMetrics({
      currentDevices: 250,
      currentLifespanYears: 3,
      targetLifespanYears: 5,
      avgDeviceCost: 1100,
      avgDeviceWeightKg: 2.2
    });
  };

  const resetCloudMetrics = () => {
    setCloudMetrics({
      instanceCount: 45,
      idlePercentage: 35,
      avgInstanceWatts: 180,
      hoursIdlePerMonth: 160
    });
  };

  return (
    <div id="green-it-dashboard" className="bg-white border border-[#1B4332]/10 rounded-[32px] p-6 md:p-8 shadow-[0_16px_48px_rgba(27,67,50,0.03)]">
      
      {/* Dashboard Tabs Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1B4332]/10 pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-serif italic text-[#1B4332] flex items-center gap-2">
            <Leaf className="w-6 h-6 text-[#76C893]" /> Green IT Impact Simulator
          </h2>
          <p className="text-xs text-[#1B4332]/60 mt-1">
            Quantify carbon reductions, energy savings, and financial payoffs from sustainable IT policies.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-[#F9FBF7] p-1.5 rounded-[20px] border border-[#1B4332]/10 text-xs">
          <button
            onClick={() => setActiveTab('server')}
            className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-[14px] font-bold transition duration-200 ${
              activeTab === 'server' 
                ? 'bg-[#1B4332] text-white shadow-sm' 
                : 'text-[#1B4332]/60 hover:text-[#1B4332]'
            }`}
          >
            <Server className="w-4 h-4" /> Server Power
          </button>
          <button
            onClick={() => setActiveTab('ewaste')}
            className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-[14px] font-bold transition duration-200 ${
              activeTab === 'ewaste' 
                ? 'bg-[#1B4332] text-white shadow-sm' 
                : 'text-[#1B4332]/60 hover:text-[#1B4332]'
            }`}
          >
            <Trash2 className="w-4 h-4" /> E-Waste Lifecycle
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-[14px] font-bold transition duration-200 ${
              activeTab === 'cloud' 
                ? 'bg-[#1B4332] text-white shadow-sm' 
                : 'text-[#1B4332]/60 hover:text-[#1B4332]'
            }`}
          >
            <Cloud className="w-4 h-4" /> Cloud Optimization
          </button>
        </div>
      </div>

      {/* --- SERVER OPTIMIZATION TAB --- */}
      {activeTab === 'server' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center bg-[#F9FBF7] p-3.5 rounded-[16px] border border-[#1B4332]/10 shadow-sm">
              <span className="text-xs font-bold text-[#1B4332]/80 uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#1B4332]" /> Optimization Inputs
              </span>
              <button 
                onClick={resetServerMetrics}
                className="text-xs text-[#1B4332]/60 hover:text-[#1B4332] flex items-center gap-1 transition font-semibold"
                title="Reset values to original Python simulation values"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Servers Optimized Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Servers / Devices Optimized</span>
                <span className="text-[#1B4332] font-extrabold">{serverMetrics.serversCount} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="1000"
                step="5"
                value={serverMetrics.serversCount}
                onChange={(e) => setServerMetrics({ ...serverMetrics, serversCount: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Active endpoints subjected to smart power capping or virtualization.</span>
            </div>

            {/* Average Watts Saved Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Avg Power Reduction per Server</span>
                <span className="text-[#1B4332] font-extrabold">{serverMetrics.wattsSavedPerServer} Watts</span>
              </div>
              <input
                type="range"
                min="10"
                max="350"
                step="5"
                value={serverMetrics.wattsSavedPerServer}
                onChange={(e) => setServerMetrics({ ...serverMetrics, wattsSavedPerServer: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Average baseline drop achieved via CPU throttling, energy-efficient CPU states, or right-sizing.</span>
            </div>

            {/* Operating Hours Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Daily Operating Hours</span>
                <span className="text-[#1B4332] font-extrabold">{serverMetrics.operatingHours} hrs/day</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={serverMetrics.operatingHours}
                onChange={(e) => setServerMetrics({ ...serverMetrics, operatingHours: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Duty cycle of targeted servers. Typically 24/7 in datacenter environments.</span>
            </div>

            {/* Grid Preset Buttons */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-[#1B4332]/70 uppercase tracking-wider">Grid Emission Factor</span>
              <div className="grid grid-cols-2 gap-2">
                {gridPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setServerMetrics({ ...serverMetrics, gridFactor: preset.factor })}
                    className={`p-3 rounded-[14px] text-left border text-xs transition duration-200 ${
                      Math.abs(serverMetrics.gridFactor - preset.factor) < 0.005
                        ? "bg-[#76C893]/15 border-[#1B4332]/30 text-[#1B4332] font-semibold"
                        : "bg-white border-[#1B4332]/10 hover:bg-[#1B4332]/5 text-[#1B4332]/60"
                    }`}
                  >
                    <span className="block font-bold">{preset.name}</span>
                    <span className="text-[10px] opacity-75">{preset.factor} kg CO₂/kWh</span>
                  </button>
                ))}
              </div>
              
              {/* Custom Input */}
              <div className="mt-3 flex items-center gap-3 bg-[#F9FBF7] p-3 rounded-[14px] border border-[#1B4332]/10">
                <span className="text-xs text-[#1B4332]/60 font-semibold whitespace-nowrap">Custom factor:</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.0"
                  max="2.0"
                  value={serverMetrics.gridFactor}
                  onChange={(e) => setServerMetrics({ ...serverMetrics, gridFactor: parseFloat(e.target.value) || 0 })}
                  className="bg-transparent text-[#1B4332] font-bold text-xs focus:outline-none w-full border-b border-[#1B4332]/10 pb-0.5"
                />
                <span className="text-[10px] text-[#1B4332]/50 font-bold whitespace-nowrap">kg CO₂/kWh</span>
              </div>
            </div>
          </div>

          {/* Impact Results Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Core Calculations Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Energy Saved Card */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-6 relative overflow-hidden shadow-sm group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.04] text-[#1B4332]">
                  <Zap className="w-16 h-16" />
                </div>
                <span className="text-xs font-bold text-[#1B4332]/60 uppercase tracking-wider block">Estimated Annual Energy Saved</span>
                <span className="block text-4xl font-serif italic font-bold text-[#1B4332] mt-2 tracking-tight">
                  {serverImpact.annualKwhSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-[#1B4332]/60 block mt-1 font-semibold">Kilowatt-hours (kWh) per year</span>
              </div>

              {/* Carbon Reduction Card */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-6 relative overflow-hidden shadow-sm group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.04] text-[#1B4332]">
                  <Leaf className="w-16 h-16" />
                </div>
                <span className="text-xs font-bold text-[#1B4332]/60 uppercase tracking-wider block">Carbon Emissions Avoided</span>
                <span className="block text-4xl font-serif italic font-bold text-[#1B4332] mt-2 tracking-tight">
                  {serverImpact.annualCo2SavedTons.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-[#1B4332]/60 block mt-1 font-semibold">Metric Tons of CO₂ equivalent (MT CO₂e)</span>
              </div>
            </div>

            {/* Environmental Equivalents Dashboard */}
            <div className="bg-white border border-[#1B4332]/10 rounded-[28px] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-[#1B4332]/70 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#76C893]" /> Climate Equivalencies (EPA Framework)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-[#F9FBF7] p-4 rounded-[20px] border border-[#1B4332]/10 text-center shadow-sm">
                  <div className="mx-auto w-8 h-8 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2">
                    <Car className="w-4 h-4" />
                  </div>
                  <span className="block text-xl font-serif italic font-bold text-[#1B4332] leading-tight">
                    {serverImpact.passengerCarsYear.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-[10px] text-[#1B4332]/60 block mt-0.5 leading-snug">Passenger Cars taken off road / yr</span>
                </div>

                <div className="bg-[#F9FBF7] p-4 rounded-[20px] border border-[#1B4332]/10 text-center shadow-sm">
                  <div className="mx-auto w-8 h-8 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2">
                    <Trees className="w-4 h-4" />
                  </div>
                  <span className="block text-xl font-serif italic font-bold text-[#1B4332] leading-tight">
                    {serverImpact.forestAcresYear.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-[10px] text-[#1B4332]/60 block mt-0.5 leading-snug">Acres of US Forest carbon sink / yr</span>
                </div>

                <div className="bg-[#F9FBF7] p-4 rounded-[20px] border border-[#1B4332]/10 text-center shadow-sm">
                  <div className="mx-auto w-8 h-8 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="block text-xl font-serif italic font-bold text-[#1B4332] leading-tight">
                    {serverImpact.smartphonesChargedMillion.toLocaleString(undefined, { maximumFractionDigits: 2 })}M
                  </span>
                  <span className="text-[10px] text-[#1B4332]/60 block mt-0.5 leading-snug">Smartphones fully charged</span>
                </div>

                <div className="bg-[#F9FBF7] p-4 rounded-[20px] border border-[#1B4332]/10 text-center shadow-sm">
                  <div className="mx-auto w-8 h-8 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="block text-xl font-serif italic font-bold text-[#1B4332] leading-tight">
                    {serverImpact.coalBurnedTons.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </span>
                  <span className="text-[10px] text-[#1B4332]/60 block mt-0.5 leading-snug">Tons of Coal unburned</span>
                </div>

              </div>
            </div>

            {/* Custom Responsive SVG Chart Bar Comparison */}
            <div className="bg-[#F9FBF7] p-5 rounded-[24px] border border-[#1B4332]/10">
              <span className="text-[11px] font-bold text-[#1B4332]/70 uppercase tracking-wider block mb-3.5">Baseline vs. Optimized annual Energy Footprint (MWh/yr)</span>
              
              {/* Custom SVG Bar chart */}
              <div className="h-20 flex flex-col justify-center space-y-3">
                {/* Baseline Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#1B4332]/60 font-semibold">Baseline Consumption (Unoptimized)</span>
                    <span className="text-[#1B4332] font-bold">
                      {((serverMetrics.serversCount * 250 * serverMetrics.operatingHours * 365) / 1000000).toFixed(1)} MWh
                    </span>
                  </div>
                  <div className="w-full bg-[#1B4332]/5 rounded-full h-2.5 overflow-hidden border border-[#1B4332]/10">
                    <div className="bg-[#1B4332]/40 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Optimized Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#1B4332] font-bold">Power Capped / virtualized Consumption</span>
                    <span className="text-[#1B4332] font-black">
                      {(((serverMetrics.serversCount * (250 - serverMetrics.wattsSavedPerServer) * serverMetrics.operatingHours * 365) / 1000000)).toFixed(1)} MWh
                    </span>
                  </div>
                  <div className="w-full bg-[#1B4332]/5 rounded-full h-2.5 overflow-hidden border border-[#1B4332]/10">
                    <div 
                      className="bg-[#1B4332] h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${Math.max(15, Math.min(100, (1 - (serverMetrics.wattsSavedPerServer / 250)) * 100))}%` 
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- E-WASTE LIFECYCLE TAB --- */}
      {activeTab === 'ewaste' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center bg-[#F9FBF7] p-3.5 rounded-[16px] border border-[#1B4332]/10 shadow-sm">
              <span className="text-xs font-bold text-[#1B4332]/80 uppercase tracking-widest flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-[#1B4332]" /> Lifecycle Parameters
              </span>
              <button 
                onClick={resetLifecycleMetrics}
                className="text-xs text-[#1B4332]/60 hover:text-[#1B4332] flex items-center gap-1 transition font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Managed Endpoints */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Total IT Devices Managed</span>
                <span className="text-[#1B4332] font-extrabold">{lifecycleMetrics.currentDevices} endpoints</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={lifecycleMetrics.currentDevices}
                onChange={(e) => setLifecycleMetrics({ ...lifecycleMetrics, currentDevices: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Total quantity of laptops, PCs, tablets, and monitors in active rotation.</span>
            </div>

            {/* Current Lifespan Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Current Lifespan</span>
                <span className="text-rose-600 font-extrabold">{lifecycleMetrics.currentLifespanYears} Years</span>
              </div>
              <input
                type="range"
                min="2"
                max="4"
                step="0.5"
                value={lifecycleMetrics.currentLifespanYears}
                onChange={(e) => setLifecycleMetrics({ ...lifecycleMetrics, currentLifespanYears: parseFloat(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Typical procurement lifecycle before retiring endpoints. Usually 3 years in standard corporate structures.</span>
            </div>

            {/* Extended Lifespan Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Extended Lifespan (Target)</span>
                <span className="text-[#1B4332] font-extrabold">{lifecycleMetrics.targetLifespanYears} Years</span>
              </div>
              <input
                type="range"
                min="4.5"
                max="7"
                step="0.5"
                value={lifecycleMetrics.targetLifespanYears}
                onChange={(e) => setLifecycleMetrics({ ...lifecycleMetrics, targetLifespanYears: parseFloat(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Target lifecycle through proactive OS tune-ups, memory upgrades, and refurbishing.</span>
            </div>

            {/* Cost and Weight configuration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1B4332]/70 uppercase tracking-wider mb-1.5">Avg Unit Cost</label>
                <div className="flex items-center gap-1.5 bg-[#F9FBF7] p-2.5 rounded-xl border border-[#1B4332]/10">
                  <DollarSign className="w-3.5 h-3.5 text-[#1B4332]/50" />
                  <input
                    type="number"
                    value={lifecycleMetrics.avgDeviceCost}
                    onChange={(e) => setLifecycleMetrics({ ...lifecycleMetrics, avgDeviceCost: parseInt(e.target.value) || 0 })}
                    className="bg-transparent text-sm font-bold text-[#1B4332] focus:outline-none w-full border-b border-[#1B4332]/10 pb-0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1B4332]/70 uppercase tracking-wider mb-1.5">Avg Device Weight</label>
                <div className="flex items-center gap-1.5 bg-[#F9FBF7] p-2.5 rounded-xl border border-[#1B4332]/10">
                  <input
                    type="number"
                    step="0.1"
                    value={lifecycleMetrics.avgDeviceWeightKg}
                    onChange={(e) => setLifecycleMetrics({ ...lifecycleMetrics, avgDeviceWeightKg: parseFloat(e.target.value) || 0 })}
                    className="bg-transparent text-sm font-bold text-[#1B4332] focus:outline-none w-full text-right border-b border-[#1B4332]/10 pb-0.5"
                  />
                  <span className="text-xs text-[#1B4332]/50 font-semibold">kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* E-waste prevented */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-5 text-center shadow-sm">
                <div className="mx-auto w-9 h-9 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2.5">
                  <Trash2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#1B4332]/60 uppercase tracking-wider block">E-Waste Avoided / Year</span>
                <span className="block text-2xl font-serif italic font-bold text-[#1B4332] mt-1">
                  {lifecycleSavings.eWasteAvoidedKg.toFixed(1)} kg
                </span>
                <p className="text-[10px] text-[#1B4332]/60 mt-1 leading-snug">Lead, lithium, and mercury kept out of landfills</p>
              </div>

              {/* Capital procurement savings */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-5 text-center shadow-sm">
                <div className="mx-auto w-9 h-9 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2.5">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#1B4332]/60 uppercase tracking-wider block">CAPEX Saved / Year</span>
                <span className="block text-2xl font-serif italic font-bold text-[#1B4332] mt-1">
                  ${Math.round(lifecycleSavings.annualFinancialSavings).toLocaleString()}
                </span>
                <p className="text-[10px] text-[#1B4332]/60 mt-1 leading-snug">Sustained capital reduction by postponing purchasing cycles</p>
              </div>

              {/* Manufacturing Carbon Saved */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-5 text-center shadow-sm">
                <div className="mx-auto w-9 h-9 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2.5">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#1B4332]/60 uppercase tracking-wider block">Manufacturing CO₂ Saved</span>
                <span className="block text-2xl font-serif italic font-bold text-[#1B4332] mt-1">
                  {lifecycleSavings.co2ManufacturingSavedTons.toFixed(1)} Tons
                </span>
                <p className="text-[10px] text-[#1B4332]/60 mt-1 leading-snug">CO₂ emissions avoided in factory production stages</p>
              </div>
            </div>

            {/* Explanatory context cards */}
            <div className="bg-white border border-[#1B4332]/10 rounded-[24px] p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[#1B4332]/70 uppercase tracking-widest mb-3">Prevention-Based IT Maintenance & Refurbishment Method</h4>
              <p className="text-xs text-[#1B4332]/70 leading-relaxed font-sans">
                As an IT Support Specialist, Bilal leverages physical and digital triage: rather than recycling laptops at the 3-year boundary, implementing rigorous software optimization (SSD upgrades, thermal repasting, RAM expansion, bloatware cleanup) extends endpoint longevity safely to 5 years. This slashes organizational carbon footprints because <strong>75% to 85% of an endpoint's total lifetime carbon footprint is emitted during manufacturing</strong>, not runtime electricity.
              </p>
            </div>

            {/* Custom Interactive replacement chart */}
            <div className="bg-[#F9FBF7] p-5 rounded-[24px] border border-[#1B4332]/10">
              <span className="text-[11px] font-bold text-[#1B4332]/70 uppercase tracking-wider block mb-3">Annual Hardware Replacement Volume (Units/yr)</span>
              <div className="flex items-end justify-around h-24 pt-4 relative">
                {/* Visual grid line */}
                <div className="absolute left-0 right-0 top-1/2 border-t border-[#1B4332]/10 pointer-events-none" />
                
                {/* Current Column */}
                <div className="flex flex-col items-center z-10 w-1/3">
                  <span className="text-xs text-rose-700 font-extrabold mb-1">
                    {(lifecycleMetrics.currentDevices / lifecycleMetrics.currentLifespanYears).toFixed(0)} units
                  </span>
                  <div className="w-12 bg-rose-500/10 border-t-2 border-rose-600 rounded-t-lg transition-all duration-300" style={{ height: '45px' }} />
                  <span className="text-[10px] text-[#1B4332]/60 font-semibold mt-1">Current ({lifecycleMetrics.currentLifespanYears} yr cycle)</span>
                </div>

                {/* Extended Column */}
                <div className="flex flex-col items-center z-10 w-1/3">
                  <span className="text-xs text-[#1B4332] font-black mb-1">
                    {(lifecycleMetrics.currentDevices / lifecycleMetrics.targetLifespanYears).toFixed(0)} units
                  </span>
                  <div className="w-12 bg-[#1B4332]/20 border-t-2 border-[#1B4332] rounded-t-lg transition-all duration-300" style={{ height: `${( (lifecycleMetrics.currentDevices/lifecycleMetrics.targetLifespanYears) / (lifecycleMetrics.currentDevices/lifecycleMetrics.currentLifespanYears) ) * 45}px` }} />
                  <span className="text-[10px] text-[#1B4332] font-bold mt-1">Extended ({lifecycleMetrics.targetLifespanYears} yr cycle)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- CLOUD OPTIMIZATION TAB --- */}
      {activeTab === 'cloud' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center bg-[#F9FBF7] p-3.5 rounded-[16px] border border-[#1B4332]/10 shadow-sm">
              <span className="text-xs font-bold text-[#1B4332]/80 uppercase tracking-widest flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-[#1B4332]" /> Cloud Resources
              </span>
              <button 
                onClick={resetCloudMetrics}
                className="text-xs text-[#1B4332]/60 hover:text-[#1B4332] flex items-center gap-1 transition font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Total Cloud Instances */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Cloud VM Instances Running</span>
                <span className="text-[#1B4332] font-extrabold">{cloudMetrics.instanceCount} instances</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={cloudMetrics.instanceCount}
                onChange={(e) => setCloudMetrics({ ...cloudMetrics, instanceCount: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Active virtual machine footprints (AWS EC2, GCP Compute Engine, Azure VMs).</span>
            </div>

            {/* Idle Percentage */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Average Idle / Over-Provisioned Rate</span>
                <span className="text-[#1B4332] font-extrabold">{cloudMetrics.idlePercentage}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={cloudMetrics.idlePercentage}
                onChange={(e) => setCloudMetrics({ ...cloudMetrics, idlePercentage: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Percentage of instances operating at less than 10% average CPU capacity or running needlessly during non-business hours.</span>
            </div>

            {/* Idle Hours Shut Down */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Monthly Non-Prod Idle Hours Saved</span>
                <span className="text-[#1B4332] font-extrabold">{cloudMetrics.hoursIdlePerMonth} hrs/month</span>
              </div>
              <input
                type="range"
                min="20"
                max="320"
                step="10"
                value={cloudMetrics.hoursIdlePerMonth}
                onChange={(e) => setCloudMetrics({ ...cloudMetrics, hoursIdlePerMonth: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Total hours dev/test environments can be programmatically shut down per month (e.g. 12 hrs/day on weekends & evenings).</span>
            </div>

            {/* Avg Instance Watts */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#1B4332]/70">Avg Virtual Core physical Power allocation</span>
                <span className="text-[#1B4332] font-extrabold">{cloudMetrics.avgInstanceWatts} Watts</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={cloudMetrics.avgInstanceWatts}
                onChange={(e) => setCloudMetrics({ ...cloudMetrics, avgInstanceWatts: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332] bg-[#1B4332]/10 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-[#1B4332]/60 mt-1 block">Estimated physical host rack energy overhead mapped back to your instances including cooling PUE factors.</span>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Cloud energy saved */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-5 text-center shadow-sm">
                <div className="mx-auto w-9 h-9 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2.5">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#1B4332]/60 uppercase tracking-wider block">Energy Savings</span>
                <span className="block text-2xl font-serif italic font-bold text-[#1B4332] mt-1">
                  {Math.round(cloudSavings.annualKwhSaved).toLocaleString()} kWh
                </span>
                <p className="text-[10px] text-[#1B4332]/60 mt-1 leading-snug">Reduced server load and cooling overhead at host datacenters</p>
              </div>

              {/* Cloud Carbon Avoided */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-5 text-center shadow-sm">
                <div className="mx-auto w-9 h-9 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2.5">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#1B4332]/60 uppercase tracking-wider block">Carbon Emissions Saved</span>
                <span className="block text-2xl font-serif italic font-bold text-[#1B4332] mt-1">
                  {cloudSavings.annualCo2SavedTons.toFixed(2)} MT CO₂e
                </span>
                <p className="text-[10px] text-[#1B4332]/60 mt-1 leading-snug">Avoided cloud infrastructure scope 3 grid emissions</p>
              </div>

              {/* Cost Savings */}
              <div className="bg-[#F9FBF7] border border-[#1B4332]/10 rounded-[24px] p-5 text-center shadow-sm">
                <div className="mx-auto w-9 h-9 rounded-full bg-[#1B4332]/5 text-[#1B4332] flex items-center justify-center mb-2.5">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#1B4332]/60 uppercase tracking-wider block">Estimated Cost Cut</span>
                <span className="block text-2xl font-serif italic font-bold text-[#1B4332] mt-1">
                  ${Math.round(cloudSavings.annualCostSavings).toLocaleString()}
                </span>
                <p className="text-[10px] text-[#1B4332]/60 mt-1 leading-snug">Cloud OPEX saved via automated scheduled terminations</p>
              </div>
            </div>

            {/* Cloud methodology card */}
            <div className="bg-white border border-[#1B4332]/10 rounded-[24px] p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[#1B4332]/70 uppercase tracking-widest mb-3">Green Cloud Architecture & Scheduling</h4>
              <p className="text-xs text-[#1B4332]/70 leading-relaxed font-sans">
                Modern datacenters are incredibly efficient (PUE of ~1.1 to 1.2), but running idle development or test instances 24/7 generates massive energy waste. Setting up automated cron triggers (or serverless AWS Lambda / Google Cloud Scheduler scripts) to shut down non-production servers when teams are offline cuts idle resource waste by up to <strong>70%</strong>, immediately reducing both carbon footprints and cloud hosting expenditures.
              </p>
            </div>

            {/* Custom Responsive Progress Ring equivalent */}
            <div className="bg-[#F9FBF7] p-5 rounded-[24px] border border-[#1B4332]/10 flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-20 h-20 shrink-0">
                {/* SVG Circular Progress */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="32" className="stroke-[#1B4332]/10" strokeWidth="6" fill="transparent" />
                  <circle cx="40" cy="40" r="32" className="stroke-[#1B4332] transition-all duration-500" strokeWidth="6" fill="transparent" 
                    strokeDasharray={`${2 * Math.PI * 32}`} 
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - (cloudMetrics.idlePercentage / 100))}`} 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#1B4332]">
                  {cloudMetrics.idlePercentage}%
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1B4332] block mb-1">Over-Provisioning Reduction Potential</span>
                <p className="text-xs text-[#1B4332]/60 leading-relaxed">
                  Your current parameters demonstrate that by optimizing the <strong>{cloudMetrics.idlePercentage}%</strong> idle capacity on your <strong>{cloudMetrics.instanceCount}</strong> instances, you prevent <strong>{cloudSavings.annualCo2SavedTons.toFixed(1)} tons</strong> of CO₂ from being released into the atmosphere annually.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
