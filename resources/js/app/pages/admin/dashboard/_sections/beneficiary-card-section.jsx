import React from 'react'
import { useSelector } from 'react-redux';

export default function BeneficiaryCardSection() {
    const { dashboard } = useSelector((store) => store.dashboard);
    const beneficiaries = Array.isArray(dashboard) ? dashboard : [];
    const totalBeneficiaries = Array.isArray(dashboard) ? dashboard.length : 0;

    console.log('benef', beneficiaries)
    console.log('total', totalBeneficiaries)
    return (
        <div className='flex justify-center bg-white shadow overflow-hidden sm:rounded-md p-5 sm:w-1/2'>
            <div>
                <h1 className='text-2xl font-bold'>Total Beneficiaries : </h1>
            </div>
            <div>
                <h1 className='text-3xl font-bold'> {totalBeneficiaries} </h1>
            </div>
        </div>
    )
}
