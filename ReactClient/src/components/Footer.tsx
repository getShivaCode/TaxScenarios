import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { stateNames } from "../utils/taxData";

const Footer: React.FC = () => {
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 py-3 border-t ${darkMode ? "bg-gray-900 text-gray-400 border-gray-700" : "bg-slate-100 text-slate-600"}`}
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        <span className="text-xs">
          &copy; {new Date().getFullYear()} {stateNames[selectedState]} Tax Scenario Visualizer{' '}
          <a
            href="mailto:ds2vconcoctions@gmail.com"
            style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'inherit' }}
            className="inline"
          >
            by ds<sup>2</sup>v Concoctions
          </a>
        </span>
        <span className="text-xs mt-2">
          IRS & {stateNames[selectedState]} State Tax Data, based on 2024 information from 
          <a
            href="https://www.taxfoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={darkMode ? "text-blue-400 hover:text-blue-300 underline ml-1" : "text-blue-600 hover:text-blue-800 underline ml-1"}
          >
            Tax Foundation
          </a>
          {" extracted by "}
          <a
            href="https://www.cursor.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={darkMode ? "text-blue-400 hover:text-blue-300 underline" : "text-blue-600 hover:text-blue-800 underline"}
          >
            Cursor AI
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer; 