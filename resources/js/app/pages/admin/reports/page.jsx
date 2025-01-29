import React from 'react'
import AdminLayout from '../layout'
import BarangayTotalCardSection from './_sections/barangay-total-card-section'
import ReportSearchSection from './_sections/report-search-section'
import ReportTableSection from './_sections/report-table-section'

export default function ReportsPage() {
  return (
    <AdminLayout>
      Reports Page
      <div className='mt-2'>
        <ReportSearchSection />
        <div>
          <ReportTableSection/>
        </div>
      </div>
    </AdminLayout>
  )
}
