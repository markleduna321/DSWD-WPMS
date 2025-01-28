import Modal from '@/app/pages/components/modal';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DemographicEditSection from './demographic-edit-section';

export default function DemographicTableSection() {
  
  const { demographics } = useSelector((store) => store.demographic);
  const demographicData = Array.isArray(demographics) ? demographics : [];

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDemographic, setSelectedDemographic] = useState(null);

  console.log('table', demographicData)

  // Opens the view/edit modal and sets the selected user
  const handleViewDemographic = (demographic) => {
    setSelectedDemographic(demographic);
    setViewModalOpen(true);
  };

  // Closes the view/edit modal
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedDemographic(null);
  };


  return (
    <div className="mt-8 flow-root bg-white p-5 rounded-lg">
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Address
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Civil Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                ID Card Number
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {demographicData.length > 0 ? (
              demographicData.map((demographic) => (
                <tr key={demographic.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                  {demographic.head_last_name} {demographic.head_first_name} {/* Assuming this holds the person's name */}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Title</dt>
                      <dd className="mt-1 truncate text-gray-700">{demographic.permanent_address}</dd>
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">{demographic.civil_status}</dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{demographic.permanent_address}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{demographic.civil_status}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{demographic.id_card_number}</td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a href={`/admin/demographic_data/${demographic.id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-sm text-gray-500">
                  No demographic data available.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      
    </div>

    
  )
}
