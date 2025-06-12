import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setCurrentAnnualSalary } from "../store";
import { getTaxScenario, stateNames } from "../utils/taxData";

const SalaryAnalysis: React.FC = () => {
  const dispatch = useDispatch();
  const { currentAnnualSalary, filingStatus, caTaxAdjustmentPercent, selectedState, employerSavingsPercent } = useSelector(
    (state: RootState) => state.tax
  );

  // Local state for input field to handle raw input and display formatted value on blur/enter
  const [displayValue, setDisplayValue] = React.useState(
    currentAnnualSalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) // Initialize without '$'
  );

  // Function to process and update the value
  const processAndSetSalary = (value: string) => {
    // Remove '$' and ',' characters for parsing
    let cleanedValue = value.replace(/[^0-9.]/g, '');

    // Ensure value has at most two decimal places
    const parts = cleanedValue.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      cleanedValue = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    const parsedValue = parseFloat(cleanedValue);
    if (!isNaN(parsedValue)) {
      dispatch(setCurrentAnnualSalary(parsedValue));
      // Reformat the display value without dollar sign, but with commas
      setDisplayValue(parsedValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
    } else {
      // If invalid, revert to the last valid state from Redux, formatted without dollar sign
      setDisplayValue(currentAnnualSalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      processAndSetSalary(event.currentTarget.value);
      event.currentTarget.blur(); // Blur the input after Enter
    }
  };

  const scenario = getTaxScenario(currentAnnualSalary, filingStatus, caTaxAdjustmentPercent, selectedState, employerSavingsPercent);

  const currentNetIncome = Math.round(scenario.netIncome);
  const adjustedNetIncome = Math.round(scenario.adjustedIncome);
  const annualSavings = Math.round(scenario.savings);
  const caTaxImpact = Math.round(scenario.caTaxImpact);
  const federalTaxImpact = Math.round(scenario.fedTaxDiff);
  const employerSavingsAmount = Math.round(scenario.employerSavings);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <div className="flex flex-col space-y-4">
      {/* Current Annual Salary Input */}
      <div className="flex flex-row items-center w-full">
        <label htmlFor="currentAnnualSalary" className={`text-sm font-medium flex-grow ${darkMode ? "text-gray-100" : ""}`}>
          Current Annual Salary:
        </label>
        <div className="flex flex-row items-center justify-end">
          <input
            type="text"
            id="currentAnnualSalaryTextBox"
            min="0"
            max="2000000"
            value={displayValue ? `$${displayValue}` : ''} // Add '$' prefix only for display
            onChange={(e) => {
              let inputValue = e.target.value;
              // Explicitly remove the dollar sign from the beginning of the input string
              if (inputValue.startsWith('$')) {
                inputValue = inputValue.substring(1);
              }
              // Then remove any other non-numeric characters (including commas)
              inputValue = inputValue.replace(/[^0-9.]/g, '');
              setDisplayValue(inputValue);
            }}
            onBlur={(e) => processAndSetSalary(e.target.value)} // Process on blur
            onKeyDown={handleKeyDown} // Process on Enter key
            className={`w-32 p-1 border rounded-md shadow-sm text-right ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className={`my-4 ${darkMode ? "border-gray-600" : "border-gray-300"}`} />

      {/* Display Values */}
      <div className={`mt-4 ${darkMode ? "text-gray-100" : ""}`}>
        <h3 className="text-md font-semibold mb-2">Calculated Values:</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Current Annual Salary:</span>
          <span className="font-medium">${currentAnnualSalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Current Net Income:</span>
          <span className="font-medium">${currentNetIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Adjusted Net Income:</span>
          <span className="font-medium">${adjustedNetIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1 font-bold">
          <span>Tax Savings (Annual):</span>
          <span className="">${annualSavings.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Impact to {stateNames[selectedState]} tax revenue:</span>
          <span className="font-medium">${caTaxImpact.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Impact to IRS:</span>
          <span className="font-medium">${federalTaxImpact.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Impact to Employer:</span>
          <span className="font-medium">${employerSavingsAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>State:</span>
          <span className="font-medium">{stateNames[selectedState]}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Filing Status:</span>
          <span className="font-medium">{filingStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryAnalysis; 