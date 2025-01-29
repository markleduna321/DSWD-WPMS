import React from 'react'
import { useSelector } from 'react-redux';

export default function BeneficiaryCardSection() {
    const { dashboard } = useSelector((store) => store.dashboard);
    const beneficiaries = Array.isArray(dashboard) ? dashboard : [];
    const totalBeneficiaries = Array.isArray(dashboard) ? dashboard.length : 0;

    console.log('benef', beneficiaries)
    console.log('total', totalBeneficiaries)
    return (
        <div className=' bg-white rounded-md shadow-2xl  w-[500px] text-center'>
            <div className=' bg-slate-100 p-3 text-xl font-bold'>
                Total Beneficiaries
            </div>
            <div className=' text-8xl p-3 text-center'>
                {totalBeneficiaries}
            </div>
        </div>
    )
}
