import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// SankeyController and Flow are registered globally in chartSetup.ts
import SankeyChart from './SankeyChart';

type SankeyRowProps = {
  stacked?: boolean;
};

const SankeyRow: React.FC<SankeyRowProps> = ({ stacked }) => {
    const { currentAnnualSalary, filingStatus, caTaxAdjustmentPercent, selectedState, employerSavingsPercent } = useSelector(
        (state: RootState) => state.tax
    );
    const darkMode = useSelector((state: RootState) => state.ui.darkMode);
    const showFederalTaxImpact = useSelector((state: RootState) => state.ui.showFederalTaxImpact);

    // Get scenario values from SalaryAnalysis logic
    // Import getTaxScenario from utils/taxData
    const { getTaxScenario, stateNames } = require("../utils/taxData");
    const scenario = getTaxScenario(
        currentAnnualSalary,
        filingStatus,
        caTaxAdjustmentPercent,
        selectedState,
        employerSavingsPercent
    );

    // Values for Sankey Chart

    //Chart 1
    const salary = Math.round(currentAnnualSalary);
    const fedTax = Math.round(scenario.originalFedTax);
    const stateTax = Math.round(scenario.originalCaTax);
    const netIncome = Math.round(scenario.netIncome);

    //Chart 2
    const employerSavings = Math.round(scenario.employerSavings);
    const newIncome = Math.round(scenario.newIncome);
    const adjustedIncome = Math.round(scenario.adjustedIncome);
    const adjustedFedTax = Math.round(scenario.adjustedFedTax);
    const caTaxImpact = Math.round(scenario.caTaxImpact);
    const adjustedCaTax = Math.round(scenario.adjustedCaTax);

    // 2. Federal Tax
    const fedTaxSavings = adjustedFedTax - fedTax;
    const employeeSavings = adjustedIncome - netIncome;

    // Helper to format numbers with commas
    const formatNumber = (num: number) => num.toLocaleString();

    // Build node labels with values for Sankey 1
    const employerLabel = `Employer\n$${formatNumber(salary)}`;
    const employeeLabel = `Employee\n$${formatNumber(salary)}`;
    const irsLabel = `IRS: $${formatNumber(fedTax)}`;
    const stateLabel = `${stateNames[selectedState]}: $${formatNumber(stateTax)}`;
    const netIncomeLabel = `Net Income\n$${formatNumber(netIncome)}`;

    // Build node labels with values for Sankey 2
    var employerCessLabel = `Employer\n$${formatNumber(salary - employerSavings)}`;
    if (employerSavings) employerCessLabel += `\nSaves $${formatNumber(Math.round(employerSavings))}`;

    var employeeCessLabel = `Employee\n$${formatNumber(newIncome)}`;
    employeeCessLabel += `\n${selectedState} Income Tax Exempt`;
    
    var stateCessLabel = `${stateNames[selectedState]}: $${formatNumber(adjustedCaTax)}`;
    if (caTaxImpact) stateCessLabel += `\nGains $${formatNumber(Math.round(caTaxImpact))}`;

    var irsCessLabel = `IRS: $${formatNumber(adjustedFedTax)}`;
    if (showFederalTaxImpact && fedTaxSavings) {
        if (!stacked) {
          irsCessLabel += `\nImpact $${formatNumber(Math.round(fedTaxSavings))}`;
        } else {
          irsCessLabel += ` (Impact $${formatNumber(Math.round(fedTaxSavings))})`;
        }
    }
    var netIncomeCessLabel = `Net Income\n$${formatNumber(adjustedIncome)}`;
    netIncomeCessLabel += `\nSaves $${formatNumber(Math.round(employeeSavings))} ( ${((employeeSavings / netIncome) * 100).toFixed(2)}%)`;

    // Simple color map by node name
    const colors: Record<string, string> = {
        'Employer': 'blue',
        'Employee': '#9366f1',
        'IRS': 'red',
        [stateNames[selectedState]]: 'orange',
        'Net Income': '#1ade50',
    };

    // Y Axis Order
    const priority = {
        'Employer': 1,
        'Employee': 1,
        'IRS': 1,
        [stateNames[selectedState]]: 2,
        'Net Income': 3,
    };

    // Sankey 1: Labels
    const labels1 = {
        "Employer": employerLabel,
        "Employee": employeeLabel,
        'IRS': irsLabel,
        [stateNames[selectedState]]: stateLabel,
        'Net Income': netIncomeLabel,
    }

    const labels2 = {
        "Employer": employerCessLabel,
        "Employee": employeeCessLabel,
        'IRS': irsCessLabel,
        [stateNames[selectedState]]: stateCessLabel,
        'Net Income': netIncomeCessLabel,
    }

    // Factory function for Sankey data
    const createSankeyData = (
        data: Array<{ from: string; to: string; flow: number }>,
        labels: Record<string, string>,
        nodePaddingOverride?: number
    ) => ({
        datasets: [
            {
                data,
                labels,
                priority: priority,
                colorFrom: (c: { dataset: { data: Array<{ from: string; to: string; flow: number }> }, dataIndex: number }) => colors[(c.dataset.data[c.dataIndex].from as string)],
                colorTo: (c: { dataset: { data: Array<{ from: string; to: string; flow: number }> }, dataIndex: number }) => colors[(c.dataset.data[c.dataIndex].to as string)],
                colorMode: 'to',
                nodeWidth: 15,
                borderWidth: 0,
                nodePadding: nodePaddingOverride !== undefined ? nodePaddingOverride : 400,
                alpha: darkMode?0.5:0.4, 
            }
        ],
    });

    // Sankey 1: Employer → Employee → IRS/State/Net Income
    const data1 = [
        { from: 'Employer', to: 'Employee', flow: salary },
        { from: 'Employee', to: 'IRS', flow: fedTax },
        { from: 'Employee', to: stateNames[selectedState], flow: stateTax },
        { from: 'Employee', to: 'Net Income', flow: netIncome },
    ];

    // Sankey 2: Employer → Employee/State, Employee → IRS/Net Income
    const data2 = [
        { from: 'Employer', to: 'Employee', flow: newIncome },
        { from: 'Employer', to: `${stateNames[selectedState]}`, flow: adjustedCaTax },
        { from: 'Employee', to: 'IRS', flow: adjustedFedTax },
        { from: 'Employee', to: 'Net Income', flow: adjustedIncome },
    ];

    // Sankey chart options with node label callback
    const options = {
        spriteText: true,
    };

    // Defensive checks for required values
    const valid1 =
        typeof salary === 'number' && !isNaN(salary) &&
        typeof fedTax === 'number' && !isNaN(fedTax) &&
        typeof stateTax === 'number' && !isNaN(stateTax) &&
        typeof netIncome === 'number' && !isNaN(netIncome);
    const valid2 =
        typeof salary === 'number' && !isNaN(salary) &&
        typeof employerSavings === 'number' && !isNaN(employerSavings) &&
        typeof adjustedFedTax === 'number' && !isNaN(adjustedFedTax) &&
        typeof newIncome === 'number' && !isNaN(newIncome);

    if (!valid1 || !valid2) {
        return (
            <div
                style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center', margin: '2rem 0' }}
            >
                Insufficient data for Sankey Income Charts.
            </div>
        );
    }

    if (stacked) {
      // Chart options for stacked mode: disable aspect ratio
      const stackedOptions = { ...options, maintainAspectRatio: false };
      return (
        <div className="flex flex-col gap-4 w-full">
          <div className="mt-0 mx-auto rounded-lg shadow relative z-10 w-full px-4 py-4 bg-white bg-opacity-80 dark:bg-gray-700 dark:bg-opacity-80">
            <div className={`font-semibold text-lg mb-4 ${darkMode ? 'text-gray-100' : ''}`}>Distribution of Income for Employee Salary of ${formatNumber(salary)}</div>
            <div className={`p-2 ${darkMode ? 'bg-white rounded-lg' : ''}`}> 
              <SankeyChart
                data={createSankeyData(data1, labels1, 200)}
                chartKey={`sankey1-${salary}-${fedTax}-${stateTax}-${netIncome}-${stacked ? 'stacked' : 'row'}`}
                options={stackedOptions}
                height={260}
              />
            </div>
          </div>
          <div className="mt-0 mx-auto rounded-lg shadow relative z-10 w-full px-4 py-4 pt-4 bg-white bg-opacity-80 dark:bg-gray-700 dark:bg-opacity-80">
            <div className={`font-semibold text-lg mb-4 ${darkMode ? 'text-gray-100' : ''}`}>Distribution of Income after Adjustment to ${formatNumber(newIncome)}</div>
            <div className={`p-2 ${darkMode ? 'bg-white rounded-lg' : ''}`}> 
              <SankeyChart
                data={createSankeyData(data2, labels2, 200)}
                chartKey={`sankey2-${salary}-${employerSavings}-${adjustedFedTax}-${newIncome}-${stacked ? 'stacked' : 'row'}`}
                options={stackedOptions}
                height={260}
              />
            </div>
          </div>
        </div>
      );
    }
    // Default: side-by-side row
    return (
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 my-0 mx-0">
        <div className="w-full md:w-1/2 bg-white bg-opacity-80 dark:bg-gray-700 dark:bg-opacity-80 rounded-lg shadow p-2">
          <div className={`font-semibold text-lg m-2 ${darkMode ? 'text-gray-100' : ''}`}>Distribution of Income for Employee Salary of ${formatNumber(salary)}</div>
          <div className={`p-2 ${darkMode ? 'bg-white rounded-lg' : ''}`}>
            <SankeyChart
              data={createSankeyData(data1, labels1)}
              chartKey={`sankey1-${salary}-${fedTax}-${stateTax}-${netIncome}-${stacked ? 'stacked' : 'row'}`}
              options={options}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white bg-opacity-80 dark:bg-gray-700 dark:bg-opacity-80 rounded-lg shadow p-2">
          <div className={`font-semibold text-lg m-2 ${darkMode ? 'text-gray-100' : ''}`}>Distribution of Income after Salary Adjustment to ${formatNumber(newIncome)}</div>
          <div className={`p-2 ${darkMode ? 'bg-white rounded-lg' : ''}`}>
            <SankeyChart
              data={createSankeyData(data2, labels2)}
              chartKey={`sankey2-${salary}-${employerSavings}-${adjustedFedTax}-${adjustedIncome}-${stacked ? 'stacked' : 'row'}`}
              options={options}
            />
          </div>
        </div>
      </div>
    );
};

export default SankeyRow; 