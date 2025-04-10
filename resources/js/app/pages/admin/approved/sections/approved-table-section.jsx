import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_demographics_thunk } from '../../demographic_data/_redux/demographic-data-thunk';
import { useEffect } from 'react';
import Button from '@/app/pages/components/button';

export default function ApprovedTablePage() {
  const dispatch = useDispatch();
  const { demographics, currentPage, totalPages } = useSelector((state) => state.demographic);
  const demographicData = Array.isArray(demographics) ? demographics : [];

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDemographic, setSelectedDemographic] = useState(null);

  console.log('table', demographics)

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  const page = getQueryParam('page') || 1;

  useEffect(() => {
    dispatch(get_demographics_thunk(currentPage)); // Fetch contents for the current page
  }, [dispatch, currentPage]);

  const handlePageChange = (value) => {
    if (value == 'next') {
      router.visit(`?page=${parseInt(page) + 1}`)
    } else {
      router.visit(`?page=${parseInt(page) - 1}`)
    }

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
                ID Card Number
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {demographics.data.length > 0 ? (
              demographics.data
                .filter((demographic) => demographic.status === 'approved') // Only include approved status
                .map((demographic) => (
                  <tr key={demographic.id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      {demographic.head_last_name} {demographic.head_first_name}
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Title</dt>
                        <dd className="mt-1 truncate text-gray-700">{demographic.permanent_address}</dd>
                        <dt className="sr-only sm:hidden">Email</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{demographic.civil_status}</dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{demographic.permanent_address}</td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{demographic.id_card_number}</td>
                    <td className="px-3 py-4 text-sm text-gray-500">{demographic.status == "approved" && (
                      <>
                        <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{demographic.status}</span>
                      </>
                    )}</td>
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
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => handlePageChange('back')}
          disabled={demographics.current_page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {demographics.current_page} of {demographics.last_page}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => handlePageChange('next')}
          disabled={demographics.current_page === demographics.last_page}
        >
          Next
        </Button>
      </div>

    </div>
  )
}
