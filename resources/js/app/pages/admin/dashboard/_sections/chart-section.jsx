import { BarChart } from '@mui/x-charts';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ChartSection() {
    const { dashboard } = useSelector((store) => store.dashboard);

    // Group beneficiaries by year from `created_at`
    const yearData = Array.isArray(dashboard)
        ? dashboard.reduce((acc, beneficiary) => {
              const createdAt = beneficiary.created_at; // Get the created_at field
              const year = createdAt ? new Date(createdAt).getFullYear() : 'Unknown'; // Extract the year
              acc[year] = (acc[year] || 0) + 1; // Increment the count for the year
              return acc;
          }, {})
        : {};

    const currentYear = new Date().getFullYear(); // Get the current year
    const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i); // Generate an array of the last 5 years

    // Filter yearData to include only the last 5 years
    const filteredYearData = Object.keys(yearData)
        .filter((year) => lastFiveYears.includes(Number(year)))
        .reduce((acc, year) => {
            acc[year] = yearData[year];
            return acc;
        }, {});

    const chartYears = Object.keys(filteredYearData).sort(); // Sort the filtered years
    const chartTotals = chartYears.map((year) => filteredYearData[year]);

    console.log('Filtered Year Data:', filteredYearData);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center mb-1">Beneficiaries per Year (Last 5 Years)</h1>
            <div className="w-full max-w-full overflow-x-auto">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">
                        <BarChart
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: chartYears.length ? chartYears : ['Unknown'], // Use filtered years or fallback
                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: chartTotals.length ? chartTotals : [0], // Use filtered totals or fallback
                                },
                            ]}
                            width={1200}
                            height={600}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
