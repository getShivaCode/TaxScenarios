import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, toggleDarkMode, toggleShowFederalTaxImpact } from "../store";
import { stateNames } from "../utils/taxData";
import "./Header.css";

const Header: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);
  const dispatch = useDispatch();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-2 shadow-md flex items-center justify-between ${darkMode ? "bg-blue-900 text-gray-100" : "bg-sky-600 text-white"}`}
      style={{ minHeight: 48 }}
    >
      <div className="relative flex items-center">
        <span
          onClick={() => dispatch(toggleShowFederalTaxImpact())}
          className={`absolute left-0 top-0 bottom-0 w-10 h-full m-0 p-0 cursor-pointer transition-colors duration-150 border-r-2 border-transparent
            ${darkMode ? "bg-blue-900" : "bg-sky-600"}
          `}
          aria-label="Toggle Federal Tax Impact"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { dispatch(toggleShowFederalTaxImpact()); } }}
        />
        <h1 className="text-xl font-bold ml-12 flex items-center">
          <span className="mr-4 flex items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer', outline: 'none' }}
              tabIndex={0}
              aria-label="Toggle Salary Analysis View"
              className="focus:outline-none focus:ring-0 border-none"
              onClick={() => (window as any).toggleAnalysisView && (window as any).toggleAnalysisView()}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  (window as any).toggleAnalysisView && (window as any).toggleAnalysisView();
                }
              }}
            >
              <defs>
                <linearGradient id="shiva-shield-gradient" x1="18" y1="3" x2="18" y2="33" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa"/>
                  <stop offset="1" stopColor="#0ea5e9"/>
                </linearGradient>
                <filter id="shiva-shadow" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0ea5e9" floodOpacity="0.25"/>
                </filter>
              </defs>
              <g filter="url(#shiva-shadow)">
                <path d="M18 3L31 8V16C31 24.5 24.5 30 18 33C11.5 30 5 24.5 5 16V8L18 3Z" fill="url(#shiva-shield-gradient)" stroke="#0ea5e9" strokeWidth="2"/>
                {/* Star for value/honor */}
                <polygon points="27,9 28,11.5 30.7,11.7 28.7,13.3 29.3,16 27,14.5 24.7,16 25.3,13.3 23.3,11.7 26,11.5" fill="#fff" opacity="0.7"/>
                {/* Dollar sign with gold and white outline */}
                <text x="18" y="23" textAnchor="middle" fontSize="14" fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" paintOrder="stroke" dominantBaseline="middle">$</text>
              </g>
            </svg>
          </span>
          <span className="flex ml-2">
            <span className="font-extrabold text-2xl tracking-widest text-sky-400 dark:text-blue-200">SHIVA</span>
          </span>
          <span className="font-bold text-white dark:text-gray-100 ml-4">
            Save Honest Income's Value Act: {stateNames[selectedState]}
            <img
              src={getFlagUrl(selectedState)}
              alt={`${stateNames[selectedState]} flag`}
              className="ml-2 h-3 w-auto object-contain flutter-flag"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
              tabIndex={0}
              role="button"
              aria-label="Toggle Select State Dropdown"
              onClick={() => (window as any).toggleStateDropdown && (window as any).toggleStateDropdown()}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  (window as any).toggleStateDropdown && (window as any).toggleStateDropdown();
                }
              }}
            />
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`p-2 rounded-full focus:outline-none focus:ring-2 ${darkMode ? "hover:bg-blue-700 focus:ring-blue-500" : "hover:bg-sky-700 focus:ring-sky-500"}`}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.757l-.707-.707M6.343 17.657l-.707.707M16.95 7.05l.707-.707M7.05 16.95l.707.707M12 7a5 5 0 110 10 5 5 0 010-10z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

// Helper to map state code to flag filename
function getFlagUrl(stateCode: string) {
  const map: Record<string, string> = {
    CA: 'california.svg',
    HI: 'hawaii.svg',
    NY: 'new_york.svg',
    NJ: 'new_jersey.svg',
    OR: 'oregon.svg',
    MN: 'minnesota.svg',
    DC: 'district_of_columbia.svg',
    VT: 'vermont.svg',
    IA: 'iowa.svg',
    WI: 'wisconsin.svg',
  };
  return `/images/flags/${map[stateCode] || 'california.svg'}`;
} 