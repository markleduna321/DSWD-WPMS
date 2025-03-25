import React from "react";

export default function BarangayBection() {
    const barangay = [
        { value: "Agpangi", label: "Agpangi" },
        { value: "Ani-e", label: "Ani-e" },
        { value: "Bagacay", label: "Bagacay" },
        { value: "Bantayanon", label: "Bantayanon" },
        { value: "Buenavista", label: "Buenavista" },
        { value: "Cabungahan", label: "Cabungahan" },
        { value: "Calampisawan", label: "Calampisawan" },
        { value: "Cambayobo", label: "Cambayobo" },
        { value: "Castellano", label: "Castellano" },
        { value: "Cruz", label: "Cruz" },
        { value: "Dolis", label: "Dolis" },
        { value: "Hilub-Ang", label: "Hilub-Ang" },
        { value: "Hinab-Ongan", label: "Hinab-Ongan" },
        { value: "Ilaya", label: "Ilaya" },
        { value: "Laga-an", label: "Laga-an" },
        { value: "Lalong", label: "Lalong" },
        { value: "Lemery", label: "Lemery" },
        { value: "Lipat-on", label: "Lipat-on" },
        { value: "Lo-ok (Poblacion)", label: "Lo-ok (Poblacion)" },
        { value: "Ma-aslob", label: "Ma-aslob" },
        { value: "Macasilao", label: "Macasilao" },
        { value: "Malanog", label: "Malanog" },
        { value: "Malatas", label: "Malatas" },
        { value: "Marcelo", label: "Marcelo" },
        { value: "Mina-utok", label: "Mina-utok" },
        { value: "Menchaca", label: "Menchaca" },
        { value: "Minapasuk", label: "Minapasuk" },
        { value: "Mahilum", label: "Mahilum" },
        { value: "Paghumayan", label: "Paghumayan" },
        { value: "Pantao", label: "Pantao" },
        { value: "Patun-an", label: "Patun-an" },
        { value: "Pinocutan", label: "Pinocutan" },
        { value: "Refugio", label: "Refugio" },
        { value: "San Benito", label: "San Benito" },
        { value: "San Isidro", label: "San Isidro" },
        { value: "Suba (Poblacion)", label: "Suba (Poblacion)" },
        { value: "Telim", label: "Telim" },
        { value: "Tigbao", label: "Tigbao" },
        { value: "Tigbon", label: "Tigbon" },
        { value: "Winaswasan", label: "Winaswasan" },
    ];

    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Barangay
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {barangay.map((res) => {
                        return (
                            <tr class="bg-white border-b border-gray-200">
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                   <a
                                   target="_blank"
                                   href={"/admin/barangay?brgy="+res.value}>
                                   {res.label}
                                   </a>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
