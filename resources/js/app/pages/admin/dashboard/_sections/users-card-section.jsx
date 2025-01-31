import React from 'react';
import { useSelector } from 'react-redux';

export default function UsersCardSection() {
    const barangayList = [
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

    // Fetch barangays from Redux store
    const demographics = useSelector((store) => store.demographic?.demographics);

    console.log('Demographics Data bargy:', demographics);

    // Extract unique barangays from database (ensure it's an array before mapping)
    const databaseBarangays = Array.isArray(demographics)
        ? [...new Set(demographics.map((b) => b.barangay))]
        : [];

    // Count matching barangays
    const matchingBarangays = barangayList.filter(b => databaseBarangays.includes(b.value)).length;

    return (
        <div className='bg-white rounded-md shadow-2xl w-[500px]'>
            <div className='bg-slate-100 p-3 text-xl font-bold text-center'>
                Number of Barangays with Beneficiaries
            </div>
            <div className='text-8xl p-3 text-center'>
                {matchingBarangays}
            </div>
        </div>
    );
}
