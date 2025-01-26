import store from '@/app/store/store';
import React, { useEffect } from 'react'
import { fetch_demographic_by_id_thunk } from '../_redux/demographic-data-thunk';
import DemographicDetailSection from './_sections/demographic-detail-section';
import AdminLayout from '../../layout';

export default function DemographicDetailPage() {
    const id = window.location.pathname.split('/')[3]

    console.log('id:', id);
    
    useEffect(() => {
        store.dispatch(fetch_demographic_by_id_thunk(id))
    }, []);

  return (
    <AdminLayout>
      <DemographicDetailSection/>
    </AdminLayout>
  )
}
