import React from "react";
import TaxControls from "./TaxControls";
import TaxChart from "./TaxChart";
import TaxTable from "./TaxTable";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { stateNames, stateLandmarkImages } from "../utils/taxData";

const Body: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);

  const backgroundImage = stateLandmarkImages[selectedState];

  return (
    <div
      className="relative flex-1"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for glazed effect */}
      <div
        className={`absolute inset-0 z-0 ${darkMode ? 'bg-black opacity-50' : 'bg-white opacity-40'}`}
      ></div>

      <div className="relative z-10 w-full px-4 py-4 flex flex-col md:flex-row gap-4">
        {/* Left: Controls */}
        <div className={`md:w-1/3 w-full rounded-lg shadow p-6 mb-6 md:mb-0 ${darkMode ? "bg-gray-800 text-gray-100 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
          <div className="font-semibold text-lg mb-4">Adjust {stateNames[selectedState]} Tax & Filing Status</div>
          <TaxControls />
        </div>
        {/* Right: Chart/Table */}
        <div className={`md:w-2/3 w-full rounded-lg shadow p-6 ${darkMode ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
          <div className={`font-semibold text-lg mb-4 ${darkMode ? "text-gray-100" : ""}`}>Tax Scenario Chart for {stateNames[selectedState]}</div>
          <TaxChart />
        </div>
      </div>
      {/* Table at the bottom */}
      <div className={`mt-0 mx-1 rounded-lg shadow relative z-10 w-80% px-4 py-4 ${darkMode ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
        <div className={`font-semibold text-lg mb-4 ${darkMode ? "text-gray-100" : ""}`}>Tax Scenario Table for {stateNames[selectedState]}</div>
        <TaxTable />
      </div>
    </div>
  );
};

export default Body; 