import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import ContentsSection from './_sections/contents-section'
import store from '@/app/store/store';
import { fetchAllContents } from './_redux/content-thunk';

export default function ContentPage() {


  useEffect(() => {
    store.dispatch(fetchAllContents())
  }, []);
  return (
    <AdminLayout>
        <ContentsSection/>
    </AdminLayout>
    
  )
}
