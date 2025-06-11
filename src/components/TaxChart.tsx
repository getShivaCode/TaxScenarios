import React from "react";
import { Bar } from "react-chartjs-2";
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
  LineController
);

const incomeRange = Array.from({ length: 10 }, (_, i) => 100000 + i * 100000); // $100k to $1M

const TaxChart: React.FC = () => {
  const filingStatus = useSelector((state: RootState) => state.tax.filingStatus) as FilingStatus;
  const caTaxAdjustmentPercent = useSelector((state: RootState) => state.tax.caTaxAdjustmentPercent);
  const selectedState = useSelector((state: RootState) => state.tax.selectedState);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode); // Get dark mode state
  const scenarioRows = getIncomeRangeScenario(filingStatus, caTaxAdjustmentPercent, incomeRange, selectedState);

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
      },
      {
        type: "bar" as const,
        label: "Adjusted Income",
        data: scenarioRows.map((row) => row.adjustedIncome),
        backgroundColor: adjustedIncomeColor,
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
        labels: { color: textColor },
      },
      tooltip: { mode: "index" as const, intersect: false },
      title: {
        display: true,
        text: `Net Income, Adjusted Income, and Savings vs Income (${filingStatus}, State: ${stateNames[selectedState]})`,
        color: textColor,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero: false,
        title: { display: true, text: "Income ($)", color: textColor },
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y1: {
        position: "right" as const,
        grid: { drawOnChartArea: false, color: gridColor },
        title: { display: true, text: "Savings ($)", color: textColor },
        ticks: { color: textColor },
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