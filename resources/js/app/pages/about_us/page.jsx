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
                        src="/img/dswd.jpg"
                        className="w-full object-cover"
                    />
                </div>

            </header>

            <main>
                <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10 lg:px-8'>
                    <div className=" mx-auto px-6 py-12 bg-white shadow-lg">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            History of Social Welfare in the Philippines
                        </h1>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Social welfare as a basic function of the state materialized after World War II. However,
                            various groups had already been involved in social work during the early years of
                            American occupation. After the war, the Philippine government gradually assumed
                            greater responsibility for social welfare.
                        </p>

                        <div className="space-y-6">
                            <TimelineItem year="1915" description="The Public Welfare Board (PWB) was created to study, coordinate, and regulate all government and private social service entities." />
                            <TimelineItem year="1921" description="PWB was abolished and replaced by the Bureau of Public Welfare under the Department of Public Instruction." />
                            <TimelineItem year="1939" description="Commonwealth Act No. 439 established the Department of Health and Public Welfare." />
                            <TimelineItem year="1941" description="The Bureau of Public Welfare officially became part of the Department of Health and Public Welfare." />
                            <TimelineItem year="1947" description="President Manuel Roxas abolished the Bureau of Public Welfare and replaced it with the Social Welfare Commission (SWC) under the Office of the President." />
                            <TimelineItem year="1948" description="President Elpidio Quirino created the President’s Action Committee on Social Amelioration (PACSA) to address socio-economic reforms." />
                            <TimelineItem year="1951" description="SWC and PACSA were merged into the Social Welfare Administration (SWA), marking the start of an integrated public welfare program." />
                            <TimelineItem year="1968" description="Republic Act 5416 elevated the SWA into a Department, giving it equal status with agencies like health and education." />
                            <TimelineItem year="1976" description="Under Presidential Decree No. 994, President Ferdinand Marcos renamed the Department to the Department of Social Services and Development (DSSD)." />
                            <TimelineItem year="1978" description="DSSD was renamed the Ministry of Social Services and Development (MSSD) following the shift to a parliamentary government." />
                            <TimelineItem year="1987" description="President Corazon Aquino reorganized the MSSD into the Department of Social Welfare and Development (DSWD) under Executive Order 123." />
                            <TimelineItem year="1991" description="Republic Act 7160 (Local Government Code) devolved many DSWD services to local government units (LGUs)." />
                            <TimelineItem year="1998" description="President Joseph Estrada issued Executive Order No. 15 to strengthen DSWD’s repositioning efforts." />
                            <TimelineItem year="2003" description="President Gloria Macapagal Arroyo issued Executive Order No. 221 to further define the DSWD’s mandate, roles, and functions." />
                            <TimelineItem year="2005" description="The Department of Budget and Management (DBM) approved the DSWD’s Rationalization and Streamlining Plan (RSP) to improve efficiency." />
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
