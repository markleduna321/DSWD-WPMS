import { BarChart } from "@mui/x-charts";
import React from "react";
import { useSelector } from "react-redux";

export default function StatsChartSection() {
    const { dashboard } = useSelector((store) => store.dashboard);

    // Function to get the month name
    const getMonthName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("default", { month: "short" }); // 'Jan', 'Feb', ...
    };

    // Define the last 12 months for filtering
    const currentDate = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        return getMonthName(date);
    }).reverse(); // Ensure correct chronological order

    // Initialize data structure
    const monthData = last12Months.reduce((acc, month) => {
        acc[month] = { male: 0, female: 0, ageGroups: { "0-18": 0, "19-35": 0, "36-50": 0, "51+": 0 } };
        return acc;
    }, {});

    // Process beneficiaries
    if (Array.isArray(dashboard)) {
        dashboard.forEach((beneficiary) => {
            const month = getMonthName(beneficiary.created_at);
            const gender = beneficiary.gender?.toLowerCase(); // Assuming 'male' or 'female'
            const age = beneficiary.age || 0; // Assuming an 'age' field exists

            if (monthData[month]) {
                if (gender === "male") monthData[month].male += 1;
                if (gender === "female") monthData[month].female += 1;

                // Categorize into age groups
                if (age <= 18) monthData[month].ageGroups["0-18"] += 1;
                else if (age <= 35) monthData[month].ageGroups["19-35"] += 1;
                else if (age <= 50) monthData[month].ageGroups["36-50"] += 1;
                else monthData[month].ageGroups["51+"] += 1;
            }
        });
    }

    // Prepare data for chart
    const chartMonths = Object.keys(monthData);
    const maleData = chartMonths.map((month) => monthData[month].male);
    const femaleData = chartMonths.map((month) => monthData[month].female);
    const ageData0_18 = chartMonths.map((month) => monthData[month].ageGroups["0-18"]);
    const ageData19_35 = chartMonths.map((month) => monthData[month].ageGroups["19-35"]);
    const ageData36_50 = chartMonths.map((month) => monthData[month].ageGroups["36-50"]);
    const ageData51plus = chartMonths.map((month) => monthData[month].ageGroups["51+"]);

    return (
        <div className="flex flex-col items-center h-[600px]">
            <h1 className="text-center mb-1">Beneficiaries by Month, Gender & Age</h1>
            <div className="w-full max-w-full">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl">
                        <BarChart
                            xAxis={[
                                {
                                    id: "months",
                                    data: chartMonths, // Months as labels
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                { data: maleData, label: "Male", color: "#4A90E2" },
                                { data: femaleData, label: "Female", color: "#FF4081" },
                                { data: ageData0_18, label: "Age 0-18", color: "#FFA726" },
                                { data: ageData19_35, label: "Age 19-35", color: "#66BB6A" },
                                { data: ageData36_50, label: "Age 36-50", color: "#42A5F5" },
                                { data: ageData51plus, label: "Age 51+", color: "#AB47BC" },
                            ]}
                            width={1200}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
