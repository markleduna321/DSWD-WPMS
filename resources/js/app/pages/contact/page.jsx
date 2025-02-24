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

export default function AboutPage() {

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
                                        <a href='/about-us'>About Us</a>
                                    </div>
                                    <div className=' mt-5 text-md text-slate-600'>
                                        <a href="/contact-us">Contact Us</a>
                                    </div>
                                    {/* Dropdown for List of Brgy */}
                                    <div className="mt-5 text-md text-slate-600 relative">
                                        <Popover>
                                            {({ open }) => (
                                                <>
                                                    <Popover.Button className="focus:outline-none">
                                                        List of Brgy
                                                    </Popover.Button>

                                                    <Popover.Panel className={`absolute bg-white shadow-lg rounded-md p-4 mt-2 space-y-2 ${open ? 'block' : 'hidden'}`}>
                                                        <a href="/brgy-1" className="block text-sm text-gray-700">Brgy 1</a>
                                                        <a href="/brgy-2" className="block text-sm text-gray-700">Brgy 2</a>
                                                        <a href="/brgy-3" className="block text-sm text-gray-700">Brgy 3</a>
                                                        <a href="/brgy-4" className="block text-sm text-gray-700">Brgy 4</a>
                                                        <a href="/brgy-5" className="block text-sm text-gray-700">Brgy 5</a>
                                                    </Popover.Panel>
                                                </>
                                            )}
                                        </Popover>
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
                        src="/img/mswdo.jpg"
                        className="w-full object-cover"
                    />
                </div>

            </header>

            <main>
                <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10 lg:px-8'>
                    <div className="max-w-3xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            Contact Us
                        </h2>

                        <p className="text-gray-700 text-center mb-4">
                            <strong>Department of Social Welfare and Development</strong> <br />
                            DSWD Central Office, Constitution Hills, Batasan Complex, <br />
                            Quezon City, Philippines 1126
                        </p>

                        <div className="text-gray-700 text-center mb-6 space-y-2">
                            <p>☎️ (632) 8-931-81-01 to 07</p>
                            <p>📲 GLOBE: 09171105686, 09178272543</p>
                            <p>📲 SMART: 09199116200</p>
                            <p>
                                📧{" "}
                                <a href="mailto:inquiry@dswd.gov.ph" className="text-blue-600 hover:underline">
                                    inquiry@dswd.gov.ph
                                </a>
                            </p>
                            <p><strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM</p>
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

function TimelineItem({ year, description }) {
    return (
        <div className="flex items-start space-x-4">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
                {year}
            </div>
            <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
    );
}
