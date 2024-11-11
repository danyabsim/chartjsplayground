import './App.css'
import {Bar} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, ChartOptions, Plugin} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(CategoryScale);

function App() {
    function barBackgroundColorCode(): (ctx) => string {
        return (ctx) => {
            if (ctx.dataIndex === 0 || ctx.dataIndex === ctx.chart.config.data.datasets[0].data.length - 1) return 'rgba(0, 0, 0, 0.2)';
            const start = ctx.parsed._custom.start;
            const end = ctx.parsed._custom.end;
            return start < end ? 'rgba(75, 192, 192, 0.2)' : (start > end ? 'rgba(255, 99, 132, 0.2)' : 'rgba(0, 0, 0, 0.2)');
        };
    }

    function barColorCode(): (ctx) => string {
        return (ctx) => {
            if (ctx.dataIndex === 0 || ctx.dataIndex === ctx.chart.config.data.datasets[0].data.length - 1) return 'rgba(0, 0, 0, 1)';
            const start = ctx.parsed._custom.start;
            const end = ctx.parsed._custom.end;
            return start < end ? 'rgba(75, 192, 192, 1)' : (start > end ? 'rgba(255, 99, 132, 1)' : 'rgba(0, 0, 0, 1)');
        };
    }

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [
                [10, 7],
                [7, 15],
                [15, 4],
                [4, 9],
                [9, 11],
                [11, 1],
            ],
            backgroundColor: barBackgroundColorCode(),
            borderColor: barColorCode(),
            borderWidth: 1,
            borderSkipped: false
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                enabled: false
            },
            waterfallLines: {
                lineColor: 'black'
            },
            datalabels: {
                formatter: (value: number[]) => {
                    return `Votes: ${Math.abs(value[1] - value[0])}`
                }
            }
        }
    };

    const waterfallLines: Plugin<string> = {
        id: 'waterfallLines',
        beforeDraw(chart: Chart<string>, args: { cancelable: true }, options: ChartOptions<string>): boolean | void {
            const {ctx, config, scales: {x, y}} = chart;
            ctx.save();

            ctx.strokeStyle = options.lineColor;
            ctx.setLineDash([5, 5]);

            for (let i = 0; i < config._config.data.datasets[0].data.length - 1; i++) {
                ctx.strokeRect(x.getPixelForValue(i), y.getPixelForValue(config._config.data.datasets[0].data[i][1]), x.getPixelForValue(0.5), 0);
            }
        }
    };

    return (
        <>
            <div className="chartMenu">
                <p>Chart JS 4.4.0</p>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <Bar
                        data={data}
                        options={options}
                        plugins={[waterfallLines, ChartDataLabels]}
                    />
                </div>
            </div>
        </>
    )
}

export default App
