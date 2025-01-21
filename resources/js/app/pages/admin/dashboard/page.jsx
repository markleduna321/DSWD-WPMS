import React from 'react'
import AdminLayout from '../layout'
import NewsCardSection from './_sections/news-card-section'
import UsersCardSection from './_sections/users-card-section'
import BeneficiaryCardSection from './_sections/beneficiary-card-section'
import ChartSection from './_sections/chart-section'

export default function AdminDashboardPage() {
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
