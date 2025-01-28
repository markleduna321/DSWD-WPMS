import React from 'react'
import { useSelector } from 'react-redux';

export default function NewsCardSection() {
    const { contents } = useSelector((store) => store.dashboard);
    const news = Array.isArray(contents) ? contents : [];
    const totalNews = Array.isArray(contents) ? contents.length : 0;

    console.log('contents card', news)
    console.log('total contents card', totalNews)
    return (
        <div className='flex justify-center bg-white shadow overflow-hidden sm:rounded-md p-5 sm:w-1/2'>
            <div>
            <h1 className='text-2xl font-bold'>Total News and Events Uploaded : </h1>
            </div>
            <div>
                <h1 className='text-3xl font-bold'> {totalNews}</h1>
            </div>
        </div>
    )
}
