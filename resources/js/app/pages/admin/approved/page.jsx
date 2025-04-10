import React from 'react'
import AdminLayout from '../layout'
import ApprovedTablePage from './sections/approved-table-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_demographics_thunk } from '../demographic_data/_redux/demographic-data-thunk';

export default function ApprovedPage() {
  useEffect(() => {
      store.dispatch(get_demographics_thunk())
      console.log('main page', store)
    }, []);
  return (
    <AdminLayout>
        <ApprovedTablePage/>
    </AdminLayout>
  )
}
