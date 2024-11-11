import './Chart.css'
import {Bar} from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function ChartComponent() {
    const chartData = {
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: 'Popularity of colours',
                data: [55, 23, 96],
                backgroundColor: [
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)'
                ],
                borderWidth: 1,
            }
        ]
    };

    return (
        <>
            <div className="chartMenu">
                <p>Chart JS 4.4.0</p>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <Bar
                        data={chartData}
                    />
                </div>
            </div>
        </>
    )
}
