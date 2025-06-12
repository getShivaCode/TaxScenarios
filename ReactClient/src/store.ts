import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilingStatus } from "./utils/taxData";

interface TaxState {
  caTaxAdjustmentPercent: number;
  filingStatus: FilingStatus;
  selectedState: string;
  availableStates: string[];
  employerSavingsPercent: number;
  currentAnnualSalary: number;
}

interface UIState {
  darkMode: boolean;
}

const initialTaxState: TaxState = {
  caTaxAdjustmentPercent: 10, // Default to 10%
  filingStatus: "Single", // Default to Single
  selectedState: "CA", // Default to California
  availableStates: ["CA", "HI", "NY", "NJ", "OR", "MN", "DC", "VT", "IA", "WI"], // Top 10 states
  employerSavingsPercent: 50, // Default to 50%
  currentAnnualSalary: 150000, // Default to 150000
};

const initialUIState: UIState = {
  darkMode: true,
};

const taxSlice = createSlice({
  name: "tax",
  initialState: initialTaxState,
  reducers: {
    setCaTaxAdjustmentPercent(
      state,
      action: PayloadAction<number>
    ) {
      state.caTaxAdjustmentPercent = action.payload;
    },
    setFilingStatus(state, action: PayloadAction<FilingStatus>) {
      state.filingStatus = action.payload;
    },
    setSelectedState(state, action: PayloadAction<string>) {
      state.selectedState = action.payload;
    },
    setEmployerSavingsPercent(
      state,
      action: PayloadAction<number>
    ) {
      state.employerSavingsPercent = action.payload;
    },
    setCurrentAnnualSalary(
      state,
      action: PayloadAction<number>
    ) {
      state.currentAnnualSalary = action.payload;
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  setCaTaxAdjustmentPercent,
  setFilingStatus,
  setSelectedState,
  setEmployerSavingsPercent,
  setCurrentAnnualSalary,
} = taxSlice.actions;
export const { toggleDarkMode } = uiSlice.actions;

const store = configureStore({
  reducer: {
    tax: taxSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 