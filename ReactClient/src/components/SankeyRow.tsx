import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SankeyEChart from './SankeyEChart';

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
    const employerLabel = `Employer\n\n$${formatNumber(salary)}`;
    const employeeLabel = `Employee\n\n$${formatNumber(salary)}`;
    const irsLabel = `IRS: $${formatNumber(fedTax)}`;
    const stateLabel = `${stateNames[selectedState]}: $${formatNumber(stateTax)}`;
    const netIncomeLabel = `Net Income\n\n$${formatNumber(netIncome)}`;

    // Build node labels with values for Sankey 2
    var employerCessLabel = `Employer\n\n$${formatNumber(salary - employerSavings)}`;
    if (employerSavings) employerCessLabel += `\n\nSaves $${formatNumber(Math.round(employerSavings))}`;

    var employeeCessLabel = `Employee\n\n$${formatNumber(newIncome)}`;
    employeeCessLabel += `\n\n${selectedState} Tax Exempt`;
    
    var stateCessLabel = `${stateNames[selectedState]}: $${formatNumber(adjustedCaTax)}`;
    if (caTaxImpact) stateCessLabel += `\n\nGains $${formatNumber(Math.round(caTaxImpact))}`;

    var irsCessLabel = `IRS: $${formatNumber(adjustedFedTax)}`;
    if (showFederalTaxImpact && fedTaxSavings) {
      irsCessLabel += `\n\nImpact $${formatNumber(Math.round(fedTaxSavings))}`;
    }
    var netIncomeCessLabel = `Net Income\n\n$${formatNumber(adjustedIncome)}`;
    netIncomeCessLabel += `\n\nSaves $${formatNumber(Math.round(employeeSavings))} ( ${((employeeSavings / netIncome) * 100).toFixed(2)}%)`;

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

    // Default: side-by-side row
    return (
      <div className="flex flex-col md:flex-row w-full items-stretch gap-4 my-0 mx-0">
        <div className="flex-1 min-w-0 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 rounded-lg shadow p-2">
          <div className={`font-semibold text-lg m-2 ${darkMode ? 'text-gray-100' : ''}`}>Distribution of Income for Employee Salary of ${formatNumber(salary)}</div>
          <div className="p-2">
            <SankeyEChart
              data={{
                nodes: [
                  { name: 'Employer', itemStyle: { color: darkMode ? '#38bdf8' : 'blue' }, label: { position: 'right', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels1['Employer'] } },
                  { name: 'Employee', itemStyle: { color: darkMode ? '#a78bfa' : '#9366f1' }, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels1['Employee'] } },
                  { name: 'IRS', itemStyle: { color: darkMode ? '#dc2626' : 'red' }, y: 0, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels1['IRS'] } },
                  { name: stateNames[selectedState], itemStyle: { color: darkMode ? '#facc15' : 'orange' }, y: 100, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels1[stateNames[selectedState]] } },
                  { name: 'Net Income', itemStyle: { color: darkMode ? '#a3e635' : '#1ade50' }, y: 200, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels1['Net Income'] } }
                ],
                links: data1.map(({ from, to, flow }) => ({ source: from, target: to, value: flow }))
              }}
              chartKey={`sankey1-echart-${salary}-${fedTax}-${stateTax}-${netIncome}-${stacked ? 'stacked' : 'row'}`}
              options={{
                tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove',
                  formatter: function(params: any) {
                    if (params.dataType === 'node') {
                      // Show only the hovered node's label and value
                      let label = params.name;
                      let value = '';
                      switch (label) {
                        case 'Employer':
                          value = labels1['Employer']; break;
                        case 'Employee':
                          value = labels1['Employee']; break;
                        case 'IRS':
                          value = labels1['IRS']; break;
                        case stateNames[selectedState]:
                          value = labels1[stateNames[selectedState]]; break;
                        case 'Net Income':
                          value = labels1['Net Income']; break;
                        default:
                          value = label;
                      }
                      // Only show the main $ amount for each node (first $... in the label)
                      const dollarMatch = value.match(/\$[\d,]+/);
                      if (dollarMatch) {
                        return `${label}: ${dollarMatch[0]}`;
                      }
                      return label;
                    } else if (params.dataType === 'edge') {
                      return `${params.data.source} → ${params.data.target} : $${params.data.value.toLocaleString()}`;
                    }
                    return '';
                  }
                },
                series: [{
                  label: {
                    // No align or position here
                  },
                  nodeAlign: 'justify',
                  lineStyle: { color: 'target', opacity: 0.5, curveness: 0.5 },
                  emphasis: { focus: 'adjacency' },
                  nodeGap: 60,
                  nodeWidth: 16,
                  nodeBorderWidth: 0,
                  levels: [
                    { depth: 0 },
                    { depth: 1 },
                    { depth: 2 }
                  ],
                  left: '0%',
                  right: '0%',
                  width: '100%',
                }]
              }}
              height={500}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 rounded-lg shadow p-2">
          <div className={`font-semibold text-lg m-2 ${darkMode ? 'text-gray-100' : ''}`}>Distribution of Income after Salary Adjustment to ${formatNumber(newIncome)}</div>
          <div className="p-2">
            <SankeyEChart
              data={{
                nodes: [
                  { name: 'Employer', itemStyle: { color: darkMode ? '#38bdf8' : 'blue' }, label: { position: 'right', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels2['Employer'] } },
                  { name: 'Employee', itemStyle: { color: darkMode ? '#a78bfa' : '#9366f1' }, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels2['Employee'] } },
                  { name: 'IRS', itemStyle: { color: darkMode ? '#dc2626' : 'red' }, y: 0, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels2['IRS'] } },
                  { name: stateNames[selectedState], itemStyle: { color: darkMode ? '#facc15' : 'orange' }, y: 100, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels2[stateNames[selectedState]] } },
                  { name: 'Net Income', itemStyle: { color: darkMode ? '#a3e635' : '#1ade50' }, y: 200, label: { position: 'left', color: darkMode ? '#fff' : '#000', fontSize: '0.8rem', formatter: labels2['Net Income'] } }
                ],
                links: data2.map(({ from, to, flow }) => ({ source: from, target: to, value: flow }))
              }}
              chartKey={`sankey2-echart-${salary}-${employerSavings}-${adjustedFedTax}-${adjustedIncome}-${stacked ? 'stacked' : 'row'}`}
              options={{
                tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove',
                  formatter: function(params: any) {
                    if (params.dataType === 'node') {
                      // Show only the hovered node's label and value
                      let label = params.name;
                      let value = '';
                      switch (label) {
                        case 'Employer':
                          value = labels2['Employer']; break;
                        case 'Employee':
                          value = labels2['Employee']; break;
                        case 'IRS':
                          value = labels2['IRS']; break;
                        case stateNames[selectedState]:
                          value = labels2[stateNames[selectedState]]; break;
                        case 'Net Income':
                          value = labels2['Net Income']; break;
                        default:
                          value = label;
                      }
                      // Only show the main $ amount for each node (first $... in the label)
                      const dollarMatch = value.match(/\$[\d,]+/);
                      if (dollarMatch) {
                        return `${label}: ${dollarMatch[0]}`;
                      }
                      return label;
                    } else if (params.dataType === 'edge') {
                      return `${params.data.source} → ${params.data.target} : $${params.data.value.toLocaleString()}`;
                    }
                    return '';
                  }
                },
                series: [{
                  label: {
                    // No align or position here
                  },
                  nodeAlign: 'justify',
                  lineStyle: { color: 'target', opacity: 0.5, curveness: 0.5 },
                  emphasis: { focus: 'adjacency' },
                  nodeGap: 60,
                  nodeWidth: 16,
                  nodeBorderWidth: 0,
                  levels: [
                    { depth: 0 },
                    { depth: 1 },
                    { depth: 2 }
                  ],
                  left: '0%',
                  right: '0%',
                  width: '100%',
                }]
              }}
              height={500}
            />
          </div>
        </div>
      </div>
    );
};

export default SankeyRow; 