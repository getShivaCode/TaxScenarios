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
    const scenario = getTaxScenario(income, filingStatus, caTaxAdjustmentPercent, selectedState);

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
    };
  });

  const headers = [
    "INCOME",
    "FEDERAL TAX OWED",
    `${selectedState} TAX OWED`,
    "NET INCOME (ORIGINAL)",
    "ADJ. INCOME (POST STATE TAX)",
    "ADJUSTED FEDERAL TAX",
    "ADJUSTED NET INCOME",
    "TAX SAVINGS",
    "FEDERAL TAX IMPACT",
    `${selectedState} TAX + ADJ.`,
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={`${darkMode ? "bg-blue-900 text-gray-100" : "bg-gray-50"}`}>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tableData.map((row) => (
            <tr
              key={row.income}
              className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-right font-medium ">
                ${row.income.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.originalFedTax.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.originalStateTax.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.netIncomeOriginal.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.adjustedIncomePostStateTax.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.adjustedFedTax.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.adjustedNetIncome.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.taxSavings.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.federalTaxImpact.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                ${row.stateTaxPlusAdjustment.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable; 