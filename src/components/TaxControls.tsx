import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCaTaxAdjustmentPercent,
  setFilingStatus,
  setSelectedState,
  RootState,
} from "../store";
import { FilingStatus, stateNames } from "../utils/taxData";

const TaxControls: React.FC = () => {
  const dispatch = useDispatch();
  const { caTaxAdjustmentPercent, filingStatus, selectedState, availableStates } = useSelector(
    (state: RootState) => state.tax
  );
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  const handleCaTaxAdjustmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
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

  return (
    <div className="flex flex-col space-y-4">
      {/* CA Tax Adjustment Slider */}
      <div className="flex flex-col">
        <label htmlFor="caTaxAdjustment" className="text-sm font-medium mb-2">
          State Tax Adjustment Percentage: {caTaxAdjustmentPercent}%
        </label>
        <input
          type="range"
          id="caTaxAdjustment"
          min="0"
          max="30"
          step="1"
          value={caTaxAdjustmentPercent}
          onChange={handleCaTaxAdjustmentChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-600"
        />
      </div>

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
          <option value="Married Filing Separately">
            Married Filing Separately
          </option>
          <option value="Head of Household">Head of Household</option>
        </select>
      </div>

      {/* State Dropdown */}
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
    </div>
  );
};

export default TaxControls; 