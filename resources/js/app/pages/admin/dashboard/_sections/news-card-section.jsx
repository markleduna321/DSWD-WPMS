import React from 'react'
import { useSelector } from 'react-redux';

export default function NewsCardSection() {
    const { contents } = useSelector((store) => store.dashboard);
    const news = Array.isArray(contents) ? contents : [];
    const totalNews = Array.isArray(contents) ? contents.length : 0;

    console.log('contents card', news)
    console.log('total contents card', totalNews)
    return (
        <div className=' bg-white rounded-md shadow-2xl  w-full'>
            <div className=' bg-slate-100 p-3 text-xl font-bold text-center'>
                Total News and Events Uploaded
            </div>
            <div className=' text-8xl p-3 text-center'>
                {totalNews}
            </div>
        </div>
    )
}
