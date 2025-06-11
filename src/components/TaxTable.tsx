import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getTaxScenario } from "../utils/taxData";

const TaxTable: React.FC = () => {
  const caTaxAdjustmentPercent = useSelector(
    (state: RootState) => state.tax.caTaxAdjustmentPercent
  );
  const filingStatus = useSelector((state: RootState) => state.tax.filingStatus);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const employerSavingsPercent = useSelector((state: RootState) => state.tax.employerSavingsPercent);

  const incomeRange = [
    100000,
    200000,
    300000,
    400000,
    500000,
    600000,
    700000,
    800000,
    900000,
    1000000,
  ];

  const tableData = incomeRange.map((income) => {
    const scenario = getTaxScenario(income, filingStatus, caTaxAdjustmentPercent, selectedState, employerSavingsPercent);

    return {
      income: income,
      originalFedTax: Math.round(scenario.originalFedTax),
      originalStateTax: Math.round(scenario.originalCaTax),
      netIncomeOriginal: Math.round(scenario.netIncome),
      adjustedIncomePostStateTax: Math.round(scenario.newIncome),
      adjustedFedTax: Math.round(scenario.adjustedFedTax),
      adjustedNetIncome: Math.round(scenario.adjustedIncome),
      taxSavings: Math.round(scenario.savings),
      federalTaxImpact: Math.round(scenario.fedTaxDiff),
      stateTaxPlusAdjustment: Math.round(scenario.caTaxPlusAdjustment),
      employerSavings: Math.round(scenario.employerSavings),
    };
  });

  const headers = [
    "INCOME",
    "FEDERAL TAX OWED",
    `${selectedState} TAX OWED`,
    "NET INCOME",
    "INCOME",
    "FEDERAL TAX OWED",
    "NET INCOME",
    "TAX SAVINGS",
    "FEDERAL TAX IMPACT",
    `${selectedState} TAX + ADJ.`,
    "EMPLOYER SAVINGS",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={`${darkMode ? "bg-blue-900 text-gray-100" : "bg-gray-200"}`}>
          <tr>
            <th colSpan={4} className={`px-1 py-2 text-center text-xs uppercase border whitespace-normal break-words overflow-hidden ${darkMode ? "bg-blue-900 text-gray-100 border-gray-600" : "bg-gray-200 text-gray-500 border-gray-300"}`}>ORIGINAL</th>
            <th colSpan={7} className={`px-1 py-2 text-center text-xs uppercase border whitespace-normal break-words overflow-hidden ${darkMode ? "bg-indigo-700 text-gray-100 border-gray-600" : "bg-gray-300 text-gray-500 border-gray-300"}`}>AFTER ADJUSTMENT</th>
          </tr>
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={`w-1/10 px-1 py-3 text-center text-xs uppercase border whitespace-normal break-words overflow-hidden ${darkMode ? (index < 4 ? "bg-blue-900" : "bg-indigo-700") + " text-gray-100 border-gray-600" : (index < 4 ? "bg-gray-200" : "bg-gray-300") + " text-gray-500 border-gray-300"}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tableData.map((row, index) => (
            <tr
              key={row.income}
              className={`${index % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-gray-100") : (darkMode ? "bg-gray-700" : "bg-gray-200")} ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
            >
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.income.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.originalFedTax.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.originalStateTax.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.netIncomeOriginal.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.adjustedIncomePostStateTax.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.adjustedFedTax.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.adjustedNetIncome.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.taxSavings.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.federalTaxImpact.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.stateTaxPlusAdjustment.toLocaleString()}
              </td>
              <td className={`w-1/10 px-1 py-2 text-right text-xs overflow-hidden ${darkMode ? "border-gray-600 text-gray-100" : "border-gray-300"} border`}>
                ${row.employerSavings.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable; 