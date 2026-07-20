export interface ServerMetrics {
  serversCount: number;
  wattsSavedPerServer: number;
  operatingHours: number;
  gridFactor: number; // kg CO2 / kWh
}

export interface CalculatedImpact {
  annualKwhSaved: number;
  annualCo2SavedTons: number; // metric tons
  // Environmental Equivalents
  passengerCarsYear: number;
  forestAcresYear: number;
  smartphonesChargedMillion: number;
  coalBurnedTons: number;
}

export interface HardwareLifecycle {
  currentDevices: number;
  currentLifespanYears: number;
  targetLifespanYears: number;
  avgDeviceCost: number;
  avgDeviceWeightKg: number;
}

export interface LifecycleSavings {
  yearsExtended: number;
  annualFinancialSavings: number;
  eWasteAvoidedKg: number;
  co2ManufacturingSavedTons: number;
}

export interface CloudMetrics {
  instanceCount: number;
  idlePercentage: number;
  avgInstanceWatts: number;
  hoursIdlePerMonth: number;
}

export interface CloudSavings {
  annualKwhSaved: number;
  annualCo2SavedTons: number;
  annualCostSavings: number;
}

export interface AuditRequest {
  infraType: 'on-premise' | 'cloud' | 'hybrid';
  scale: string; // e.g. "50-100 servers"
  currentPUE: number;
  primaryWorkload: string;
  additionalDetails: string;
}

export interface AuditRecommendation {
  title: string;
  category: 'energy' | 'cloud' | 'ewaste';
  priority: 'high' | 'medium' | 'low';
  impactDescription: string;
  estimatedKwhSavings: number;
  implementationSteps: string[];
}

export interface AuditResponse {
  overallScore: number; // 0-100 rating of current sustainability
  summary: string;
  recommendations: AuditRecommendation[];
  automationScript: {
    language: string;
    filename: string;
    code: string;
    description: string;
  };
}
