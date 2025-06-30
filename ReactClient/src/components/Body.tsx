import React from "react";
import TaxControls from "./TaxControls";
import TaxChart from "./TaxChart";
import TaxTable from "./TaxTable";
import SalaryAnalysis from "./SalaryAnalysis";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { stateNames, stateLandmarkImages, getFlagFile } from "../utils/taxData";
import SankeyRow from "./SankeyRow";
import mainPageNarration, { abridgedNarration } from "../utils/narration";
import NarrationBox from "./NarrationBox";

const Body: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);

  const [showStateDropdown, setShowStateDropdown] = React.useState(false);
  const [isAnalysisView, setIsAnalysisView] = React.useState(true);

  // Expose a handler to toggle the dropdown (to be called from Header)
  (window as any).toggleStateDropdown = () => setShowStateDropdown((prev: boolean) => !prev);

  // Expose a handler to toggle the analysis view (to be called from Header)
  (window as any).toggleAnalysisView = () => setIsAnalysisView((prev: boolean) => !prev);

  const backgroundImage = stateLandmarkImages[selectedState];

  return (
    <div className="relative min-h-screen">
      {/* Main content, conditional on isAnalysisView */}
      {isAnalysisView ? (
        <div
          className="relative min-h-screen"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for glazed effect */}
          <div
            className={`absolute inset-0 z-0 ${darkMode ? 'bg-black opacity-50' : 'bg-white opacity-40'}`}
          ></div>
          <div className="relative z-10 flex flex-col md:flex-row w-full min-h-screen pt-4 px-4 pb-0 gap-8">
            {/* Left column: SalaryAnalysis and TaxControls */}
            <div className={`max-w-md rounded-lg shadow p-6 self-start ${darkMode ? "bg-gray-800 text-gray-100 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
              <SalaryAnalysis showControlsBelowSalary>
                <TaxControls showStateDropdown={showStateDropdown} />
              </SalaryAnalysis>
            </div>
            {/* Right column: Stacked Sankey charts */}
            <div className="flex-1 flex flex-col items-center">
              <SankeyRow stacked={true} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative flex-1"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for glazed effect */}
          <div
            className={`absolute inset-0 z-0 ${darkMode ? 'bg-black opacity-50' : 'bg-white opacity-40'}`}
          ></div>

          <div className="relative z-10 w-full px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left: Controls */}
              <div className={`md:w-1/4 w-full rounded-lg shadow p-6 mb-6 md:mb-0 ${darkMode ? "bg-gray-800 text-gray-100 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
                <div className="font-semibold text-lg mb-4">Adjust {stateNames[selectedState]} Tax & Filing Status</div>
                <TaxControls showStateDropdown={showStateDropdown} />
              </div>
              {/* Middle: Chart */}
              <div className={`md:w-1/2 w-full rounded-lg shadow p-6 ${darkMode ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
                <div className={`font-semibold text-lg mb-4 ${darkMode ? "text-gray-100" : ""}`}>Impact of State Tax Adjustment to Annual Net Income</div>
                <TaxChart />
              </div>
              {/* Right: Salary Analysis */}
              <div className={`md:w-1/4 w-full rounded-lg shadow p-6 ${darkMode ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
                <div className={`font-semibold text-lg mb-4 ${darkMode ? "text-gray-100" : ""}`}>Salary Analysis</div>
                <SalaryAnalysis />
              </div>
            </div>
            <div className={`mt-0 mx-4 rounded-lg shadow relative z-10 w-80% px-4 py-4`}>
              {/* Sankey charts row */}
              <SankeyRow />
            </div>
          </div>
          {/* Table at the bottom */}
          <div className={`mt-0 mx-1 rounded-lg shadow relative z-10 w-80% px-4 py-4 ${darkMode ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"}`}>
            <div className={`font-semibold text-lg mb-4 ${darkMode ? "text-gray-100" : ""}`}>Tax Scenario Table for {stateNames[selectedState]}
              <img
                src={`/images/flags/${getFlagFile(selectedState)}`}
                alt={`${stateNames[selectedState]} flag`}
                className="ml-2 h-3 w-auto object-contain"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />
            </div>
            <TaxTable />
          </div>
        </div>
      )}
      {/* Absolutely positioned narration box, always visible */}
      <div
        className="fixed z-50 left-4 right-auto bottom-20 md:bottom-20 md:left-8 md:w-1/6 w-[90vw] max-w-md"
        style={{ pointerEvents: 'auto' }}
      >
        <NarrationBox narration={mainPageNarration} visibleText={abridgedNarration} />
      </div>
    </div>
  );
};

export default Body; 