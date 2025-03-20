import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Button from '@/app/pages/components/button';
import SelectComponent from '@/app/pages/components/input-select';

export default function ReportSearchSection({ onSearch }) {
    const [startDate, setStartDate] = useState(null); // Default to null
    const [endDate, setEndDate] = useState(null); // Default to null
    const [selectedType, setSelectedType] = useState('');
    const [barangay, setBarangay] = useState('');
    const [evacuationSite, setEvacuationSite] = useState('');

    const getQueryParam = (param) => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(param);
    };

    const category = getQueryParam('category') || '';
    const where = getQueryParam('where') || '';

    useEffect(() => {
        setSelectedType(category);
        setBarangay(where);
        setEvacuationSite(where);
    }, [category, where]);

    const typeOptions = [
        { value: 'beneficiaries', label: 'Beneficiaries' },
        { value: 'barangay', label: 'Beneficiaries per Barangay' },
        { value: 'evacuation', label: 'Evacuation site' },
    ];

    const barangayOptions = [
        { value: 'Agpangi', label: 'Agpangi' },
        { value: 'Ani-e', label: 'Ani-e' },
        { value: 'Bagacay', label: 'Bagacay' },
        { value: 'Bantayanon', label: 'Bantayanon' },
        { value: 'Buenavista', label: 'Buenavista' },
        { value: 'Cabungahan', label: 'Cabungahan' },
        { value: 'Calampisawan', label: 'Calampisawan' },
        { value: 'Cambayobo', label: 'Cambayobo' },
        { value: 'Castellano', label: 'Castellano' },
        { value: 'Cruz', label: 'Cruz' },
        { value: 'Dolis', label: 'Dolis' },
        { value: 'Hilub-Ang', label: 'Hilub-Ang' },
        { value: 'Hinab-Ongan', label: 'Hinab-Ongan' },
        { value: 'Ilaya', label: 'Ilaya' },
        { value: 'Laga-an', label: 'Laga-an' },
        { value: 'Lalong', label: 'Lalong' },
        { value: 'Lemery', label: 'Lemery' },
        { value: 'Lipat-on', label: 'Lipat-on' },
        { value: 'Lo-ok (Poblacion)', label: 'Lo-ok (Poblacion)' },
        { value: 'Ma-aslob', label: 'Ma-aslob' },
        { value: 'Macasilao', label: 'Macasilao' },
        { value: 'Malanog', label: 'Malanog' },
        { value: 'Malatas', label: 'Malatas' },
        { value: 'Marcelo', label: 'Marcelo' },
        { value: 'Mina-utok', label: 'Mina-utok' },
        { value: 'Menchaca', label: 'Menchaca' },
        { value: 'Minapasuk', label: 'Minapasuk' },
        { value: 'Mahilum', label: 'Mahilum' },
        { value: 'Paghumayan', label: 'Paghumayan' },
        { value: 'Pantao', label: 'Pantao' },
        { value: 'Patun-an', label: 'Patun-an' },
        { value: 'Pinocutan', label: 'Pinocutan' },
        { value: 'Refugio', label: 'Refugio' },
        { value: 'San Benito', label: 'San Benito' },
        { value: 'San Isidro', label: 'San Isidro' },
        { value: 'Suba (Poblacion)', label: 'Suba (Poblacion)' },
        { value: 'Telim', label: 'Telim' },
        { value: 'Tigbao', label: 'Tigbao' },
        { value: 'Tigbon', label: 'Tigbon' },
        { value: 'Winaswasan', label: 'Winaswasan' },
    ];

    const evacuationSiteOptions = [
        { value: 'Calatrava Evacuation Center', label: 'Calatrava Evacuation Center' },
        { value: 'Bantayanon Evacuation Center', label: 'Bantayanon Evacuation Center' },
        { value: 'Agpangi', label: 'Agpangi' },
        { value: 'Ani-e', label: 'Ani-e' },
        { value: 'Bagacay', label: 'Bagacay' },
        { value: 'Bantayanon', label: 'Bantayanon' },
        { value: 'Buenavista', label: 'Buenavista' },
        { value: 'Cabungahan', label: 'Cabungahan' },
        { value: 'Calampisawan', label: 'Calampisawan' },
        { value: 'Cambayobo', label: 'Cambayobo' },
        { value: 'Castellano', label: 'Castellano' },
        { value: 'Cruz', label: 'Cruz' },
        { value: 'Dolis', label: 'Dolis' },
        { value: 'Hilub-Ang', label: 'Hilub-Ang' },
        { value: 'Hinab-Ongan', label: 'Hinab-Ongan' },
        { value: 'Ilaya', label: 'Ilaya' },
        { value: 'Laga-an', label: 'Laga-an' },
        { value: 'Lalong', label: 'Lalong' },
        { value: 'Lemery', label: 'Lemery' },
        { value: 'Lipat-on', label: 'Lipat-on' },
        { value: 'Lo-ok (Poblacion)', label: 'Lo-ok (Poblacion)' },
        { value: 'Ma-aslob', label: 'Ma-aslob' },
        { value: 'Macasilao', label: 'Macasilao' },
        { value: 'Malanog', label: 'Malanog' },
        { value: 'Malatas', label: 'Malatas' },
        { value: 'Marcelo', label: 'Marcelo' },
        { value: 'Mina-utok', label: 'Mina-utok' },
        { value: 'Menchaca', label: 'Menchaca' },
        { value: 'Minapasuk', label: 'Minapasuk' },
        { value: 'Mahilum', label: 'Mahilum' },
        { value: 'Paghumayan', label: 'Paghumayan' },
        { value: 'Pantao', label: 'Pantao' },
        { value: 'Patun-an', label: 'Patun-an' },
        { value: 'Pinocutan', label: 'Pinocutan' },
        { value: 'Refugio', label: 'Refugio' },
        { value: 'San Benito', label: 'San Benito' },
        { value: 'San Isidro', label: 'San Isidro' },
        { value: 'Suba (Poblacion)', label: 'Suba (Poblacion)' },
        { value: 'Telim', label: 'Telim' },
        { value: 'Tigbao', label: 'Tigbao' },
        { value: 'Tigbon', label: 'Tigbon' },
        { value: 'Winaswasan', label: 'Winaswasan' },
    ];

    const searchData = async () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        if (!selectedType) {
            alert("Please select a report type.");
            return;
        }

        if (selectedType === 'barangay' && !barangay) {
            alert("Please select a barangay.");
            return;
        }

        if (selectedType === 'evacuation' && !evacuationSite) {
            alert("Please select an evacuation site.");
            return;
        }

        const params = {
            start: moment(startDate).format('MM-DD-YYYY'),
            end: moment(endDate).format('MM-DD-YYYY'),
            category: selectedType,
            where: selectedType === 'barangay' ? barangay : selectedType === 'evacuation' ? evacuationSite : '',
        };

        try {
            const response = await fetch(`https://mswdo.site/api/reports?${new URLSearchParams(params).toString()}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const text = await response.text();
            console.log('API Response:', text);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = JSON.parse(text);
            onSearch(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className="flex w-fit mb-1 gap-4">
            {/* Date Pickers */}
            <div className="relative">
                <DatePicker
                    selected={startDate} // Default null value works with isClearable
                    onChange={(date) => setStartDate(date ? moment(date).toDate() : null)} // Reset to null if cleared
                    isClearable
                    showIcon
                    placeholderText="Search from date"
                    dateFormat="MM-dd-yyyy"
                    calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-gray-900"
                    popperClassName="z-50"
                    showPopperArrow={false}
                />
            </div>
            -
            <div className="relative">
                <DatePicker
                    selected={endDate} // Default null value works with isClearable
                    onChange={(date) => setEndDate(date ? moment(date).toDate() : null)} // Reset to null if cleared
                    isClearable
                    showIcon
                    placeholderText="Search to date"
                    dateFormat="MM-dd-yyyy"
                    calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-gray-900"
                    popperClassName="z-50"
                    showPopperArrow={false}
                />
            </div>

            {/* Type Select */}
            <div className="relative">
                <SelectComponent
                    id="select"
                    value={selectedType}
                    name="select"
                    onChange={(e) => setSelectedType(e.target.value)}
                    options={typeOptions}
                    className="border border-black p-[.33rem] w-56"
                />
            </div>

            {/* Barangay Select (Conditional) */}
            {selectedType === 'barangay' && (
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

            {/* Evacuation Site Select (Conditional) */}
            {selectedType === 'evacuation' && (
                <div className="relative">
                    <select
                        id="evacuationSite"
                        name="evacuationSite"
                        className="border border-black p-[.33rem] w-56"
                        value={evacuationSite}
                        onChange={(e) => setEvacuationSite(e.target.value)}
                    >
                        <option value="">Select Evacuation Site</option>
                        {evacuationSiteOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Search Button */}
            <div>
                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={searchData}
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}
