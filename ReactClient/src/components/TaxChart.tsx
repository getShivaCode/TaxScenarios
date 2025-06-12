import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  getIncomeRangeScenario,
  FilingStatus,
  stateNames,
} from "../utils/taxData";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController
);

const incomeRange = Array.from({ length: 10 }, (_, i) => 100000 + i * 100000); // $100k to $1M

const TaxChart: React.FC = () => {
  const filingStatus = useSelector((state: RootState) => state.tax.filingStatus) as FilingStatus;
  const caTaxAdjustmentPercent = useSelector((state: RootState) => state.tax.caTaxAdjustmentPercent);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode); // Get dark mode state
  const employerSavingsPercent = useSelector((state: RootState) => state.tax.employerSavingsPercent);
  const scenarioRows = getIncomeRangeScenario(filingStatus, caTaxAdjustmentPercent, incomeRange, selectedState, employerSavingsPercent);

  // Define colors based on dark mode
  const netIncomeColor = darkMode ? "#60a5fa" : "#0ea5e9"; // blue-400 (light) / sky-500 (light)
  const adjustedIncomeColor = darkMode ? "#4ade80" : "#22c55e"; // green-400 (light) / green-600 (light)
  const savingsColor = darkMode ? "#fbbf24" : "#f59e42"; // amber-400 (light) / amber-500 (light)
  const textColor = darkMode ? "#e2e8f0" : "#475569"; // slate-200 / slate-700
  const gridColor = darkMode ? "#475569" : "#e2e8f0"; // slate-700 / slate-200
  const chartBackgroundColor = darkMode ? "#1e293b" : "#ffffff"; // slate-800 / white

  const data = {
    labels: incomeRange.map((i) => `$${i / 1000}k`),
    datasets: [
      {
        type: "bar" as const,
        label: "Net Income",
        data: scenarioRows.map((row) => row.netIncome),
        backgroundColor: netIncomeColor,
        categoryPercentage: 0.75,
        barPercentage: 0.75,
      },
      {
        type: "bar" as const,
        label: "Adjusted Income",
        data: scenarioRows.map((row) => row.adjustedIncome),
        backgroundColor: adjustedIncomeColor,
        categoryPercentage: 0.75,
        barPercentage: 0.75,
      },
      {
        type: "line" as const,
        label: "Savings",
        data: scenarioRows.map((row) => row.savings),
        borderColor: savingsColor,
        backgroundColor: savingsColor,
        yAxisID: "y1",
        tension: 0.3,
        pointRadius: 4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              const value = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(context.parsed.y);

              if (context.dataset.label === "Savings") {
                return `🚀 ${label}${value}`; // Add a rocket emoji for savings
              } else if (context.dataset.label === "Net Income") {
                return `💰 ${label}${value}`; // Add money bag for net income
              } else if (context.dataset.label === "Adjusted Income") {
                return `📈 ${label}${value}`; // Add chart increasing for adjusted income
              }
              return label + value;
            }
            return label;
          },
          title: function(tooltipItems: any) {
            // Customize the title to show the income level for bar charts
            const income = tooltipItems[0].label;
            const chartTitleText = tooltipItems[0].chart.options.plugins.title.text;
            const matchResult = chartTitleText.match(/\(Filing Status: (.*?)\)/);
            const filingStatus = matchResult && matchResult[1] ? matchResult[1] : "N/A"; // Add null check

            return `Income: ${income} (${filingStatus})`;
          }
        },
      },
      title: {
        display: true,
        text: `Impact of State Tax Adjustment to Annual Net Income (Filing Status: ${filingStatus})`,
        color: textColor,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
        categoryPercentage: 0.75,
        barPercentage: 0.75,
        title: { display: true, text: "Current Annual Salary ($)", color: textColor },
      },
      y: {
        beginAtZero: false,
        title: { display: true, text: "Annual Net Income ($)", color: textColor },
        ticks: {
          color: textColor,
          callback: function (value: string | number) {
            return `$${(value as number) / 1000}k`;
          },
        },
        grid: { color: gridColor },
      },
      y1: {
        position: "right" as const,
        grid: { drawOnChartArea: false, color: gridColor },
        title: { display: true, text: "Annual Savings ($)", color: textColor },
        ticks: {
          color: textColor,
          callback: function (value: string | number) {
            return `$${(value as number) / 1000}k`;
          },
        },
      },
    },
    // Chart background color
    backgroundColor: chartBackgroundColor,
  };

  return (
    <div className="h-96">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default TaxChart; 