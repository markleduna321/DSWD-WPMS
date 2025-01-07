import React from 'react'
import AdminLayout from '../layout'
import DemographicTableSection from './_sections/demographic-table-section'
import DemographicDataCreateSection from './_sections/demographic-data-create-section'

export default function DemographicDataPage() {
  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
      
        <div className="sm:flex sm:items-center">

          <div className="sm:flex-auto">

            <h1 className="text-base font-semibold text-gray-900">Demographic Data</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
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
