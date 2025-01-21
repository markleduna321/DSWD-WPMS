import { BarChart } from '@mui/x-charts'
import React from 'react'

export default function ChartSection() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center mb-4">Beneficiary per year</h1>
            <div className="w-full max-w-full overflow-x-auto">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">
                        <BarChart
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: ['2024', '2025', '2026', '2027', '2028', '2029'],
                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: [2, 5, 3, 7, 6, 8],
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
    )
}
