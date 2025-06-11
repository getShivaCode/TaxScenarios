import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, toggleDarkMode } from "../store";
import { stateNames } from "../utils/taxData";

const Header: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);
  const dispatch = useDispatch();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 p-4 shadow-md flex items-center justify-between ${darkMode ? "bg-blue-900 text-gray-100" : "bg-sky-600 text-white"}`}
    >
      <h1 className="text-2xl font-bold">
        Tax Scenario Analysis - {stateNames[selectedState]}
      </h1>
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
    </header>
  );
};

export default Header; 