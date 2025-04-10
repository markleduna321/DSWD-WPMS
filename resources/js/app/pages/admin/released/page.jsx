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
        <ReleasedTablePage/>
    </AdminLayout>
  )
}
