import React, { useState, useEffect } from 'react';
import MainMenu from './../../components/MainMenu';
import Loader from './../../components/Loader';
import useDataApi from './../../hooks/useDataApi';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

type ChartData = {
    datasets: any;
};

export default function ChartPage() {
    const [chartData, setChartData] = useState<ChartData>({ datasets: {} });

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const data = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <div className="min-h-full">
                <MainMenu />

                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Chart
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <Line data={data} options={options} />
                    </div>
                </main>
            </div>
        </>
    );
}
