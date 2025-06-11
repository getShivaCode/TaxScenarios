// Tax data and calculation logic for 2024
export type FilingStatus =
  | "Single"
  | "Married Filing Jointly"
  | "Married Filing Separately"
  | "Head of Household";

export const standardDeductions: Record<FilingStatus, number> = {
  Single: 14600,
  "Married Filing Jointly": 29200,
  "Married Filing Separately": 14600,
  "Head of Household": 21900,
};

export const federalBrackets: Record<FilingStatus, [number, number, number][]> = {
  Single: [
    [0, 11600, 0.10],
    [11601, 47150, 0.12],
    [47151, 100525, 0.22],
    [100526, 191950, 0.24],
    [191951, 243725, 0.32],
    [243726, 609350, 0.35],
    [609351, Infinity, 0.37],
  ],
  "Married Filing Jointly": [
    [0, 23200, 0.10],
    [23201, 94300, 0.12],
    [94301, 201050, 0.22],
    [201051, 383900, 0.24],
    [383901, 487450, 0.32],
    [487451, 731200, 0.35],
    [731201, Infinity, 0.37],
  ],
  "Married Filing Separately": [
    [0, 11600, 0.10],
    [11601, 47150, 0.12],
    [47151, 100525, 0.22],
    [100526, 191950, 0.24],
    [191951, 243725, 0.32],
    [243726, 365600, 0.35],
    [365601, Infinity, 0.37],
  ],
  "Head of Household": [
    [0, 16550, 0.10],
    [16551, 63100, 0.12],
    [63101, 100500, 0.22],
    [100501, 191950, 0.24],
    [191951, 243700, 0.32],
    [243701, 609350, 0.35],
    [609351, Infinity, 0.37],
  ],
};

// State tax brackets for 2025 based on Tax Foundation data
export const allStateTaxBrackets: Record<string, Record<FilingStatus, [number, number, number][]>> = {
  "CA": {
    Single: [
      [0, 10756, 0.01],
      [10757, 25499, 0.02],
      [25500, 40245, 0.04],
      [40246, 55866, 0.06],
      [55867, 70606, 0.08],
      [70607, 360659, 0.093],
      [360660, 432787, 0.103],
      [432788, 721314, 0.113],
      [721315, Infinity, 0.123]
    ],
    "Married Filing Jointly": [
      [0, 21512, 0.01],
      [21513, 50998, 0.02],
      [50999, 80490, 0.04],
      [80491, 111732, 0.06],
      [111733, 141212, 0.08],
      [141213, 721318, 0.093],
      [721319, 865574, 0.103],
      [865575, 1442628, 0.113],
      [1442629, Infinity, 0.123]
    ],
    "Married Filing Separately": [
      [0, 10756, 0.01],
      [10757, 25499, 0.02],
      [25500, 40245, 0.04],
      [40246, 55866, 0.06],
      [55867, 70606, 0.08],
      [70607, 360659, 0.093],
      [360660, 432787, 0.103],
      [432788, 721314, 0.113],
      [721315, Infinity, 0.123]
    ],
    "Head of Household": [
      [0, 21527, 0.01],
      [21528, 51000, 0.02],
      [51001, 65744, 0.04],
      [65745, 81364, 0.06],
      [81365, 96107, 0.08],
      [96108, 490493, 0.093],
      [490494, 588593, 0.103],
      [588594, 980987, 0.113],
      [980988, Infinity, 0.123]
    ]
  },
  "HI": { // Hawaii
    Single: [
      [0, 9600, 0.014],
      [9601, 14400, 0.032],
      [14401, 19200, 0.055],
      [19201, 24000, 0.064],
      [24001, 36000, 0.068],
      [36001, 48000, 0.072],
      [48001, 125000, 0.076],
      [125001, 175000, 0.079],
      [175001, 225000, 0.0825],
      [225001, 275000, 0.09],
      [275001, 325000, 0.10],
      [325001, Infinity, 0.11]
    ],
    "Married Filing Jointly": [
      [0, 19200, 0.014],
      [19201, 28800, 0.032],
      [28801, 38400, 0.055],
      [38401, 48000, 0.064],
      [48001, 72000, 0.068],
      [72001, 96000, 0.072],
      [96001, 250000, 0.076],
      [250001, 350000, 0.079],
      [350001, 450000, 0.0825],
      [450001, 550000, 0.09],
      [550001, 650000, 0.10],
      [650001, Infinity, 0.11]
    ],
    "Married Filing Separately": [
      [0, 9600, 0.014],
      [9601, 14400, 0.032],
      [14401, 19200, 0.055],
      [19201, 24000, 0.064],
      [24001, 36000, 0.068],
      [36001, 48000, 0.072],
      [48001, 125000, 0.076],
      [125001, 175000, 0.079],
      [175001, 225000, 0.0825],
      [225001, 275000, 0.09],
      [275001, 325000, 0.10],
      [325001, Infinity, 0.11]
    ],
    "Head of Household": [
      [0, 19200, 0.014],
      [19201, 28800, 0.032],
      [28801, 38400, 0.055],
      [38401, 48000, 0.064],
      [48001, 72000, 0.068],
      [72001, 96000, 0.072],
      [96001, 250000, 0.076],
      [250001, 350000, 0.079],
      [350001, 450000, 0.0825],
      [450001, 550000, 0.09],
      [550001, 650000, 0.10],
      [650001, Infinity, 0.11]
    ]
  },
  "NY": { // New York
    Single: [
      [0, 8500, 0.04],
      [8501, 11700, 0.045],
      [11701, 13900, 0.0525],
      [13901, 80650, 0.055],
      [80651, 215400, 0.06],
      [215401, 1077550, 0.0685],
      [1077551, 5000000, 0.0965],
      [5000001, 25000000, 0.1030],
      [25000001, Infinity, 0.1090]
    ],
    "Married Filing Jointly": [
      [0, 17150, 0.04],
      [17151, 23600, 0.045],
      [23601, 27900, 0.0525],
      [27901, 161550, 0.055],
      [161551, 323200, 0.06],
      [323201, 2155350, 0.0685],
      [2155351, 5000000, 0.0965],
      [5000001, 25000000, 0.1030],
      [25000001, Infinity, 0.1090]
    ],
    "Married Filing Separately": [
      [0, 8500, 0.04],
      [8501, 11700, 0.045],
      [11701, 13900, 0.0525],
      [13901, 80650, 0.055],
      [80651, 215400, 0.06],
      [215401, 1077550, 0.0685],
      [1077551, 5000000, 0.0965],
      [5000001, 25000000, 0.1030],
      [25000001, Infinity, 0.1090]
    ],
    "Head of Household": [
      [0, 17150, 0.04],
      [17151, 23600, 0.045],
      [23601, 27900, 0.0525],
      [27901, 161550, 0.055],
      [161551, 323200, 0.06],
      [323201, 2155350, 0.0685],
      [2155351, 5000000, 0.0965],
      [5000001, 25000000, 0.1030],
      [25000001, Infinity, 0.1090]
    ]
  },
  "NJ": { // New Jersey
    Single: [
      [0, 20000, 0.014],
      [20001, 35000, 0.0175],
      [35001, 40000, 0.0245], // Note: this bracket applies to single, while MFJ has a different rate. Will use this for single and MFS.
      [40001, 75000, 0.035],
      [75001, 500000, 0.05525],
      [500001, 1000000, 0.0637],
      [1000001, 5000000, 0.0897],
      [5000001, Infinity, 0.1075]
    ],
    "Married Filing Jointly": [
      [0, 20000, 0.014],
      [20001, 50000, 0.0175],
      [50001, 70000, 0.0245],
      [70001, 80000, 0.035],
      [80001, 150000, 0.05525],
      [150001, 500000, 0.0637],
      [500001, 1000000, 0.0897],
      [1000001, 5000000, 0.1075],
      [5000001, Infinity, 0.1075] // Top bracket often simplified to one large bracket.
    ],
    "Married Filing Separately": [ // Mirrors Single
      [0, 20000, 0.014],
      [20001, 35000, 0.0175],
      [35001, 40000, 0.0245],
      [40001, 75000, 0.035],
      [75001, 500000, 0.05525],
      [500001, 1000000, 0.0637],
      [1000001, 5000000, 0.0897],
      [5000001, Infinity, 0.1075]
    ],
    "Head of Household": [ // Will use MFJ for HOH as often they are similar or identical.
      [0, 20000, 0.014],
      [20001, 50000, 0.0175],
      [50001, 70000, 0.0245],
      [70001, 80000, 0.035],
      [80001, 150000, 0.05525],
      [150001, 500000, 0.0637],
      [500001, 1000000, 0.0897],
      [1000001, 5000000, 0.1075],
      [5000001, Infinity, 0.1075]
    ]
  },
  "OR": { // Oregon
    Single: [
      [0, 4400, 0.0475],
      [4401, 11050, 0.0675],
      [11051, 125000, 0.0875],
      [125001, Infinity, 0.099]
    ],
    "Married Filing Jointly": [
      [0, 8800, 0.0475],
      [8801, 22100, 0.0675],
      [22101, 250000, 0.0875],
      [250001, Infinity, 0.099]
    ],
    "Married Filing Separately": [ // Mirrors Single
      [0, 4400, 0.0475],
      [4401, 11050, 0.0675],
      [11051, 125000, 0.0875],
      [125001, Infinity, 0.099]
    ],
    "Head of Household": [ // Mirrors MFJ
      [0, 8800, 0.0475],
      [8801, 22100, 0.0675],
      [22101, 250000, 0.0875],
      [250001, Infinity, 0.099]
    ]
  },
  "MN": { // Minnesota
    Single: [
      [0, 32570, 0.0535],
      [32571, 106990, 0.0680],
      [106991, 198630, 0.0785],
      [198631, Infinity, 0.0985]
    ],
    "Married Filing Jointly": [
      [0, 47620, 0.0535],
      [47621, 189180, 0.0680],
      [189181, 330410, 0.0785],
      [330411, Infinity, 0.0985]
    ],
    "Married Filing Separately": [ // Mirrors Single
      [0, 32570, 0.0535],
      [32571, 106990, 0.0680],
      [106991, 198630, 0.0785],
      [198631, Infinity, 0.0985]
    ],
    "Head of Household": [ // Mirrors MFJ
      [0, 47620, 0.0535],
      [47621, 189180, 0.0680],
      [189181, 330410, 0.0785],
      [330411, Infinity, 0.0985]
    ]
  },
  "DC": { // District of Columbia
    Single: [
      [0, 10000, 0.04],
      [10001, 40000, 0.06],
      [40001, 60000, 0.065],
      [60001, 250000, 0.085],
      [250001, 500000, 0.0925],
      [500001, 1000000, 0.0975],
      [1000001, Infinity, 0.1075]
    ],
    "Married Filing Jointly": [ // MFJ brackets are typically double Single
      [0, 20000, 0.04],
      [20001, 80000, 0.06],
      [80001, 120000, 0.065],
      [120001, 500000, 0.085],
      [500001, 1000000, 0.0925],
      [1000001, 2000000, 0.0975],
      [2000001, Infinity, 0.1075]
    ],
    "Married Filing Separately": [ // Mirrors Single
      [0, 10000, 0.04],
      [10001, 40000, 0.06],
      [40001, 60000, 0.065],
      [60001, 250000, 0.085],
      [250001, 500000, 0.0925],
      [500001, 1000000, 0.0975],
      [1000001, Infinity, 0.1075]
    ],
    "Head of Household": [ // Often similar to MFJ
      [0, 20000, 0.04],
      [20001, 80000, 0.06],
      [80001, 120000, 0.065],
      [120001, 500000, 0.085],
      [500001, 1000000, 0.0925],
      [1000001, 2000000, 0.0975],
      [2000001, Infinity, 0.1075]
    ]
  },
  "VT": { // Vermont
    Single: [
      [0, 47900, 0.0335],
      [47901, 116000, 0.0660],
      [116001, 242000, 0.0760],
      [242001, Infinity, 0.0875]
    ],
    "Married Filing Jointly": [
      [0, 79950, 0.0335],
      [79951, 193300, 0.0660],
      [193301, 294600, 0.0760],
      [294601, Infinity, 0.0875]
    ],
    "Married Filing Separately": [ // Mirrors Single
      [0, 47900, 0.0335],
      [47901, 116000, 0.0660],
      [116001, 242000, 0.0760],
      [242001, Infinity, 0.0875]
    ],
    "Head of Household": [ // Mirrors MFJ
      [0, 79950, 0.0335],
      [79951, 193300, 0.0660],
      [193301, 294600, 0.0760],
      [294601, Infinity, 0.0875]
    ]
  },
  "IA": { // Iowa (flat tax in 2025)
    Single: [
      [0, Infinity, 0.038]
    ],
    "Married Filing Jointly": [
      [0, Infinity, 0.038]
    ],
    "Married Filing Separately": [
      [0, Infinity, 0.038]
    ],
    "Head of Household": [
      [0, Infinity, 0.038]
    ]
  },
  "WI": { // Wisconsin
    Single: [
      [0, 14680, 0.035],
      [14681, 29370, 0.044],
      [29371, 323290, 0.053],
      [323291, Infinity, 0.0765]
    ],
    "Married Filing Jointly": [
      [0, 19580, 0.035],
      [19581, 39150, 0.044],
      [39151, 431060, 0.053],
      [431061, Infinity, 0.0765]
    ],
    "Married Filing Separately": [ // Mirrors Single
      [0, 14680, 0.035],
      [14681, 29370, 0.044],
      [29371, 323290, 0.053],
      [323291, Infinity, 0.0765]
    ],
    "Head of Household": [ // Mirrors MFJ
      [0, 19580, 0.035],
      [19581, 39150, 0.044],
      [39151, 431060, 0.053],
      [431061, Infinity, 0.0765]
    ]
  }
};

export const stateNames: Record<string, string> = {
  CA: "California",
  HI: "Hawaii",
  NY: "New York",
  NJ: "New Jersey",
  OR: "Oregon",
  MN: "Minnesota",
  DC: "District of Columbia",
  VT: "Vermont",
  IA: "Iowa",
  WI: "Wisconsin",
};

export const stateLandmarkImages: Record<string, string> = {
  CA: "/images/ca_landmark.jpg",
  HI: "/images/hi_landmark.jpg",
  NY: "/images/ny_landmark.jpg",
  NJ: "/images/nj_landmark.jpg",
  OR: "/images/or_landmark.jpg",
  MN: "/images/mn_landmark.jpg",
  DC: "/images/dc_landmark.jpg",
  VT: "/images/vt_landmark.jpg",
  IA: "/images/ia_landmark.jpg",
  WI: "/images/wi_landmark.jpg",
};

export function calculateTax(taxableIncome: number, brackets: [number, number, number][]) {
  let tax = 0;
  for (const [lower, upper, rate] of brackets) {
    if (taxableIncome > lower) {
      const incomeInBracket = Math.min(taxableIncome, upper) - lower;
      tax += incomeInBracket * rate;
    } else {
      break;
    }
  }
  return tax;
}

export interface TaxScenarioRow {
  originalFedTax: number;
  originalCaTax: number;
  netIncome: number;
  newIncome: number;
  adjustedFedTax: number;
  adjustedIncome: number;
  savings: number;
  fedTaxDiff: number;
  caTaxPlusAdjustment: number;
  employerSavings: number;
}

export function getTaxScenario(
  income: number,
  filingStatus: FilingStatus,
  caTaxAdjustmentPercent: number,
  stateCode: string = "CA", // Add stateCode parameter with default "CA"
  employerSavingsPercent: number // Add new parameter
): TaxScenarioRow {
  const deduction = standardDeductions[filingStatus];
  const taxableIncome = Math.max(0, income - deduction);
  const originalFedTax = calculateTax(taxableIncome, federalBrackets[filingStatus]);
  const stateBrackets = allStateTaxBrackets[stateCode][filingStatus]; // Use stateCode to get brackets
  const originalStateTax = calculateTax(taxableIncome, stateBrackets);
  const netIncome = income - originalFedTax - originalStateTax;

  // Calculate new CA tax based on adjustment percentage and employer savings split
  const totalAdjustment = caTaxAdjustmentPercent / 100; // Convert total adjustment percentage to decimal
  const employerShare = employerSavingsPercent / 100; // Convert employer share percentage to decimal

  const caTaxAdjustment = totalAdjustment * (1 - employerShare) * originalStateTax; // Remaining portion for caTaxAdjustment
  const employerSavings = totalAdjustment * employerShare * originalStateTax; // Portion for employer savings

  const newIncome = income - originalStateTax - caTaxAdjustment;
  const adjustedFedTax = calculateTax(Math.max(0, newIncome - deduction), federalBrackets[filingStatus]);
  const adjustedIncome = newIncome - adjustedFedTax;
  const savings = adjustedIncome - netIncome;
  const fedTaxDiff = originalFedTax - adjustedFedTax;
  const caTaxPlusAdjustment = originalStateTax + caTaxAdjustment; // This will now represent the selected state tax + adjustment

  return {
    originalFedTax,
    originalCaTax: originalStateTax,
    netIncome,
    newIncome,
    adjustedFedTax,
    adjustedIncome,
    savings,
    fedTaxDiff,
    caTaxPlusAdjustment,
    employerSavings,
  };
}

export function getIncomeRangeScenario(
  filingStatus: FilingStatus,
  caTaxAdjustmentPercent: number,
  incomeRange: number[],
  stateCode: string = "CA", // Add stateCode parameter with default "CA"
  employerSavingsPercent: number // Add new parameter
): TaxScenarioRow[] {
  return incomeRange.map((income) =>
    getTaxScenario(income, filingStatus, caTaxAdjustmentPercent, stateCode, employerSavingsPercent) // Pass stateCode and employerSavingsPercent
  );
} 