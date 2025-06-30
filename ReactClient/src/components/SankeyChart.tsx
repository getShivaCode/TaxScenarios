import React from "react";
import { Chart } from "react-chartjs-2";

type SankeyChartProps = {
    data: any;
    chartKey: string;
    options: any;
    height?: number | string;
};

const SankeyChart: React.FC<SankeyChartProps> = ({ data, chartKey, options, height }) => (
    <div className="mt-4 w-full" style={height ? { height } : {}}>
        <Chart
            key={chartKey}
            type={"sankey" as any}
            data={data}
            options={options}
            width={undefined}
            height={height}
            style={{ width: '100%', ...(height ? { height } : {}) }}
        />
    </div>
);

export default SankeyChart; 