'use client'

import { Fragment, useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import store from '@/app/store/store'
import { get_latest_content_thunk } from '../admin/contents/_redux/content-thunk'
import { useSelector } from 'react-redux'

const navigation = {

    pages: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '#' },
        /* { name: 'Donate', href: '#' }, */
        { name: 'Contact Us', href: '#' },
    ],
}

const footerNavigation = {
    shop: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    account: [
        { name: 'Manage Account', href: '#' },
        { name: 'Returns & Exchanges', href: '#' },
        { name: 'Redeem a Gift Card', href: '#' },
    ],
    connect: [
        { name: 'Contact Us', href: '#' },
        { name: 'Facebook', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'Pinterest', href: '#' },
    ],
}

export default function LandingPage() {

    const { latest_contents } = useSelector(state => state.contents);

    useEffect(() => {
        store.dispatch(get_latest_content_thunk())
    }, []);

    const [open, setOpen] = useState(false)

    console.log('ssssssss', latest_contents)

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <TabGroup className="mt-2">
                            <div className="border-b border-gray-200">

                            </div>

                        </TabGroup>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className=' mt-5 text-md text-slate-600'>
                                <a href='/'>Home</a>
                            </div>
                            <div className=' mt-5 text-md text-slate-600'>
                                <a href='/'>About Us</a>
                            </div>
                            <div className=' mt-5 text-md text-slate-600'>
                                <a href="/">Contact Us</a>
                            </div>
                            <div className=' mt-5 text-md text-slate-600'>
                                <a href="/">List of Brgy</a>
                            </div>
                        </div>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className="flow-root">
                                <a href="/log-in" className="-m-2 block p-2 font-medium text-gray-900">
                                    Sign in
                                </a>
                            </div>

                        </div>


                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative overflow-hidden">
                {/* Top navigation */}
                <nav aria-label="Top" className="relative z-20 bg-white/90 backdrop-blur-xl backdrop-filter">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="#">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt=""
                                        src="/img/logo.jpg"
                                        className="h-8 w-auto"
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch h-full overflow-visible">
                                <div className="flex h-full space-x-8">
                                    <div className=' mt-5 text-md text-slate-600'>
                                        <a href='/'>Home</a>
                                    </div>
                                    <div className=' mt-5 text-md text-slate-600'>
                                        <a href='/'>About Us</a>
                                    </div>
                                    <div className=' mt-5 text-md text-slate-600'>
                                        <a href="/">Contact Us</a>
                                    </div>
                                    <div className=' mt-5 text-md text-slate-600'>
                                        <a href="/">List of Brgy</a>
                                    </div>
                                </div>
                            </PopoverGroup>




                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <a href="/log-in" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Sign in
                                    </a>
                                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />

                                </div>


                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero section */}
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <img
                        alt="Descriptive text"
                        src="/img/dswd.jpg"
                        className="w-full object-cover"
                    />
                </div>

            </header>

            <main>
                <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[0]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[0]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[0]?.content}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow mt-8">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[1]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[1]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[1]?.content}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow mt-8">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[2]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[2]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[2]?.content}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow mt-8">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[3]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[3]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[3]?.content}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow mt-8">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[4]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[4]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[4]?.content}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow mt-8">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[5]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[5]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[5]?.content}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-slate-100 shadow mt-8">
                        <div className="px-4 py-5 sm:px-6 text-3xl">
                            {latest_contents[6]?.title}
                        </div>
                        <div className="sm:flex sm:gap-4 bg-gray-50 px-4 py-5 sm:p-6">
                            <div className=''>
                                <img src={'/storage/' + latest_contents[6]?.file_path} alt="" className='w-full sm:w-[400px] sm:h-[400px]' />
                            </div>
                            <div className='flex-1'>
                                {latest_contents[6]?.content}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer aria-labelledby="footer-heading" className="bg-white">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="border-t border-gray-200 py-10">
                        <p className="text-sm text-gray-500">Copyright &copy; 2021 Your Company, Inc.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
