import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

function BeneficiariesByBarangay() {
  const { barangay } = usePage().props; // Get barangay from Laravel props
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    fetch(`/api/beneficiaries/barangay/${barangay}`)
      .then(response => response.json())
      .then(data => setBeneficiaries(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [barangay]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Beneficiaries in {barangay}</h2>
      <p className="text-gray-700">Total Beneficiaries: {beneficiaries.length}</p> {/* Display the count */}
      
      <ul className="bg-white shadow-md rounded p-4">
        {beneficiaries.length > 0 ? (
          beneficiaries.map((beneficiary, index) => (
            <li key={index} className="border-b py-2 text-red-700">
              {beneficiary.head_first_name}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No beneficiaries found</p>
        )}
      </ul>
    </div>
  );
}

export default BeneficiariesByBarangay;
