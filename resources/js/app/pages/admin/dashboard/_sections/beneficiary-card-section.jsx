import React from 'react';
import { useSelector } from 'react-redux';

export default function BeneficiaryCardSection() {
    const { dashboard = [] } = useSelector((store) => store.dashboard || {});
    const totalBeneficiaries = dashboard.length;

    return (
        <div
            className="bg-white rounded-md shadow-2xl w-full text-center transition-transform duration-200 ease-in-out hover:animate-none"
            style={{
                display: "inline-block",
                transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
        >
            <div className="bg-slate-100 p-3 text-xl font-bold">Total Beneficiaries</div>
            <div className="text-8xl p-3 text-center">{totalBeneficiaries}</div>
        </div>
    );
}
