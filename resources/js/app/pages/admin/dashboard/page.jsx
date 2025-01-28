import React from 'react'
import AdminLayout from '../layout'
import NewsCardSection from './_sections/news-card-section'
import UsersCardSection from './_sections/users-card-section'
import BeneficiaryCardSection from './_sections/beneficiary-card-section'
import ChartSection from './_sections/chart-section'
import { useEffect } from 'react'
import store from '@/app/store/store'
import { get_beneficiaries_thunk, get_contents_thunk } from './_redux/dashboard-thunk'

export default function AdminDashboardPage() {
  useEffect(() => {
    store.dispatch(get_beneficiaries_thunk())
    console.log('main page', store)
  }, []);

  useEffect(() => {
    store.dispatch(get_contents_thunk())
  }, []);

  function handleAccountAdded(params) {
    // Handle account addition here
  }
  return (
    <AdminLayout>
        <h1 className='font-bold text-1xl mb-5'>Admin Dashboard</h1>

        <div className='flex gap-4'>
          <NewsCardSection /> 
          <UsersCardSection />
          <BeneficiaryCardSection />
        </div>

        <div className='mt-5 bg-white shadow sm:rounded-md p-5'>
          <ChartSection/>
        </div>
    </AdminLayout>
  )
}
