import React from "react";
import ReactECharts from "echarts-for-react";

export type SankeyEChartProps = {
    data: any; // Should be in ECharts Sankey format
    chartKey: string;
    options?: any;
    height?: number | string;
};

const SankeyEChart: React.FC<SankeyEChartProps> = ({ data, chartKey, options, height }) => {
    // Compose ECharts option
    const chartOptions = {
        ...options,
        series: [
            {
                type: 'sankey',
                ...data,
                ...((options && options.series && options.series[0]) || {})
            }
        ]
    };
    return (
        <div className="mt-4 w-full" style={height ? { height, width: '100%' } : { width: '100%' }}>
            <ReactECharts
                key={chartKey}
                option={chartOptions}
                style={{ width: '100%', height: height || 400 }}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    );
};

export default SankeyEChart; 