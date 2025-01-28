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
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </a>
                                </div>
                            ))}
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
                                        src="https://myschoolportal.net/blog/wp-content/uploads/2024/11/DSWD-Logo.png"
                                        className="h-8 w-auto"
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch h-full overflow-visible">
                                <div className="flex h-full space-x-8">


                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
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
                    <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                            <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Shop</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.shop.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Account</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.account.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.connect.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 md:mt-16 xl:mt-0">
                            <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                            <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
                            <form className="mt-2 flex sm:max-w-md">
                                <input
                                    id="email-address"
                                    type="text"
                                    required
                                    autoComplete="email"
                                    aria-label="Email address"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />

                                <div className="ml-4 shrink-0">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 py-10">
                        <p className="text-sm text-gray-500">Copyright &copy; 2021 Your Company, Inc.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
