import React from 'react';
import { useSelector } from 'react-redux';

export default function NewsCardSection() {
    const { contents = [] } = useSelector((store) => store.dashboard || {});
    const totalNews = contents.length;

    return (
        <div
            className="bg-white rounded-md shadow-2xl w-full transition-transform duration-200 ease-in-out"
            style={{
                display: "inline-block",
                transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
        >
            <div className="bg-slate-100 p-3 text-xl font-bold text-center">
                Total News and Events Uploaded
            </div>
            <div className="text-8xl p-3 text-center">
                {totalNews}
            </div>
        </div>
    );
}
