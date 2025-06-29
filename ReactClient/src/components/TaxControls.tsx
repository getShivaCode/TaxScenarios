import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCaTaxAdjustmentPercent,
  setFilingStatus,
  setSelectedState,
  setEmployerSavingsPercent,
  RootState,
} from "../store";
import { FilingStatus, stateNames } from "../utils/taxData";

const TaxControls: React.FC<{ showStateDropdown?: boolean }> = ({ showStateDropdown = false }) => {
  const dispatch = useDispatch();
  const { caTaxAdjustmentPercent, filingStatus, selectedState, availableStates, employerSavingsPercent } = useSelector(
    (state: RootState) => state.tax
  );
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  const handleCaTaxAdjustmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      dispatch(setCaTaxAdjustmentPercent(value));
    }
  };

  const handleFilingStatusChange =
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilingStatus(event.target.value as FilingStatus));
    };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedState(event.target.value));
  };

  const handleEmployerSavingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      dispatch(setEmployerSavingsPercent(value));
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Filing Status Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="filingStatus" className="text-sm font-medium mb-2">
          Filing Status:
        </label>
        <select
          id="filingStatus"
          value={filingStatus}
          onChange={handleFilingStatusChange}
          className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300"}`}
        >
          <option value="Single">Single</option>
          <option value="Married Filing Jointly">Married Filing Jointly</option>
          <option value="Head of Household">Head of Household</option>
          <option value="Married Filing Separately">Married Filing Separately</option>
        </select>
      </div>

      {/* State Tax Adjustment Slider */}
      <div className="flex flex-col">
        <label htmlFor="caTaxAdjustment" className="text-sm font-medium mb-2">
          {selectedState} State Tax Adjustment Percentage:
        </label>
        <div className="flex flex-row items-center space-x-2 w-full">
          <input
            type="range"
            id="caTaxAdjustment"
            min="0"
            max="20"
            step="0.5"
            value={caTaxAdjustmentPercent}
            onChange={handleCaTaxAdjustmentChange}
            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-600"
          />
          <input
            type="number"
            id="caTaxAdjustmentTextBox"
            min="0"
            max="20"
            step="0.5"
            value={caTaxAdjustmentPercent.toFixed(1)}
            onChange={handleCaTaxAdjustmentChange}
            className={`w-18 p-1 border rounded-md shadow-sm text-right ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
          />
          <span className="text-sm font-medium">%</span>
        </div>
      </div>

      {/* State Dropdown */}
      {showStateDropdown && (
        <div className="flex flex-col">
          <label htmlFor="stateSelect" className="text-sm font-medium mb-2">
            Select State:
          </label>
          <select
            id="stateSelect"
            value={selectedState}
            onChange={handleStateChange}
            className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300"}`}
          >
            {availableStates.map((stateCode: string) => (
              <option key={stateCode} value={stateCode}>
                {stateNames[stateCode]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Employer Savings Percentage Slider */}
      <div className="flex flex-col">
        <label htmlFor="employerSavings" className="text-sm font-medium mb-2">
          Employer Share Savings Percentage: {employerSavingsPercent}%
        </label>
        <div className="flex flex-row items-center space-x-2 w-full">
          <input
            type="range"
            id="employerSavings"
            min="0"
            max="100"
            step="5"
            value={employerSavingsPercent}
            onChange={handleEmployerSavingsChange}
            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-600"
          />
          <input
            type="number"
            id="employerSavingsTextBox"
            min="0"
            max="100"
            step="5"
            value={employerSavingsPercent}
            onChange={handleEmployerSavingsChange}
            className={`w-18 p-1 border rounded-md shadow-sm text-right ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
          />
          <span className="text-sm font-medium">%</span>
        </div>
      </div>
    </div>
  );
};

export default TaxControls; 