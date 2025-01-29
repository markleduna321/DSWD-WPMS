import Button from '@/app/pages/components/button';
import InputLabelComponent from '@/app/pages/components/input-label-component'
import SelectComponent from '@/app/pages/components/input-select';
import InputTextComponent from '@/app/pages/components/input-text-component'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function ReportSearchSection() {
    const [startDate, setStartDate] = useState(null);
    const [endtDate, setEndDate] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [barangay, setBarangay] = useState("");

    const typeOptions = [
        { value: 'Beneficiaries', label: 'Beneficiaries' },
        { value: 'Beneficiaries per Barangay', label: 'Beneficiaries per Barangay' },
    ];

    const barangayOptions = [
        { value: "brgy1", label: "Barangay 1" },
        { value: "brgy2", label: "Barangay 2" },
        { value: "brgy3", label: "Barangay 3" },
    ];

    return (
        <div className=' flex w-fit mb-5 gap-4'>
            <div className="relative">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    showIcon
                    placeholderText="Search from date"
                    //className="border border-gray-300 rounded-lg py-2 px-3 w-44 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-gray-900"
                    popperClassName="z-50"
                    showPopperArrow={false}
                />
            </div>
            -
            <div className="relative">
                <DatePicker
                    selected={endtDate}
                    onChange={(date) => setEndDate(date)}
                    isClearable
                    showIcon
                    placeholderText="Search to date"
                    //className="border border-gray-300 rounded-lg py-2 px-3 w-44 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-gray-900"
                    popperClassName="z-50"
                    showPopperArrow={false}
                />
            </div>

            <div className="relative">
                <SelectComponent
                    id="select"
                    name="select"
                    onChange={(e) => setSelectedType(e.target.value)}
                    options={typeOptions}
                    className='border border-black p-[.33rem] w-56'
                />
            </div>
            {/* Hidden Input (Only Visible if Barangay is Selected) */}
            {selectedType === "Beneficiaries per Barangay" && (
                <div className="relative">
                    <select
                        id="barangay"
                        name="barangay"
                        className="border border-black p-[.33rem] w-56"
                        value={barangay}
                        onChange={(e) => setBarangay(e.target.value)}
                    >
                        <option value="">Select Barangay</option>
                        {barangayOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                <Button
                    type='button' // By default, it's a 'button', but can be 'submit' for form submission
                    variant = 'primary'
                    size = 'md'
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    >
                Search
            </Button>
            </div>

        </div>
    )
}
