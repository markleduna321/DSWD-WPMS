import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import DemographicTableSection from './_sections/demographic-table-section'
import DemographicDataCreateSection from './_sections/demographic-data-create-section'
import store from '@/app/store/store';
import { get_demographics_thunk } from './_redux/demographic-data-thunk';

export default function DemographicDataPage() {
  useEffect(() => {
    store.dispatch(get_demographics_thunk())
    console.log('main page', store)
  }, []);

  function handleAccountAdded(params) {
    // Handle account addition here
  }
  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">

        <div className="sm:flex sm:items-center">

          <div className="sm:flex-auto">

            <h1 className="text-base font-semibold text-gray-900">Demographic Data</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the data including their Serial ID, Name, Address, ID Card Number and Status.
            </p>

          </div>

          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <DemographicDataCreateSection />
          </div>

        </div>

        <DemographicTableSection />

      </div>
    </AdminLayout>
  )
}
