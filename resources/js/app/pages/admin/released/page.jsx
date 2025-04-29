import React from 'react'
import AdminLayout from '../layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_demographics_thunk } from '../demographic_data/_redux/demographic-data-thunk';
import ReleasedTablePage from './sections/released-table-section';

export default function ReleasedPage() {
  useEffect(() => {
    store.dispatch(get_demographics_thunk())
    console.log('main page', store)
  }, []);
  return (
    <AdminLayout>
      <div className="sm:flex-auto">

        <h1 className="text-base font-semibold text-gray-900"> Released Data</h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the data of released status including their Serial ID, Name, Address, ID Card Number and Status.
        </p>

      </div>
      <ReleasedTablePage />
    </AdminLayout>
  )
}
