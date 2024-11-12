import './App.css'
import {Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale, ChartOptions, Plugin} from "chart.js";

Chart.register(CategoryScale);

function App() {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'White'],
        datasets: [{
            label: '# of Votes',
            data: [65, 59, 51, 81, 56, 55, 40],
            borderColor: 'rgb(55, 192, 192, 0.5)',
            borderWidth: 2,
            pointRadius: 5,
            pointStyle: 'circle',
            backgroundColor: 'rgb(55, 192, 192, 0.5)',
            tension: 0.4
        }, {
            label: '# of Votes',
            data: [23, 12, 74, 12, 76, 23, 12],
            borderColor: 'rgb(192, 55, 192, 0.5)',
            borderWidth: 2,
            pointRadius: 5,
            pointStyle: 'circle',
            backgroundColor: 'rgb(192, 55, 192, 0.5)',
            tension: 0.4
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
    };

    const hoverLines: Plugin<string> = {
        id: 'hoverLines',
        afterDatasetsDraw(chart: Chart<string>, args: any, options: ChartOptions<string>, cancelable: false) {
            const {ctx, scales: {x, y}} = chart;
            ctx.save();
            if (chart._active[0]) {
                const firstPoint = chart.config.data.datasets[0].data[chart._active[0].index];
                const secondPoint = chart.config.data.datasets[1].data[chart._active[0].index];
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'blue';
                ctx.setLineDash([5, 5]);
                ctx.strokeRect(x.getPixelForValue(chart._active[0].index), y.getPixelForValue(secondPoint), 0, y.getPixelForValue(firstPoint) - y.getPixelForValue(secondPoint));
            }
            ctx.restore();
        }
    };

    return (
        <>
            <div className="chartMenu">
                <p>Chart JS 4.4.0</p>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <Line
                        data={data}
                        options={options}
                        plugins={[hoverLines]}
                    />
                </div>
            </div>
        </>
    )
}

export default App
