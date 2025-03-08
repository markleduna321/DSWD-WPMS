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
import { get_beneficiaries_thunk } from '../admin/dashboard/_redux/dashboard-thunk'
import { Link } from '@inertiajs/react'

const navigation = {

  pages: [
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
  const { dashboard = [] } = useSelector((store) => store.dashboard || {});

  useEffect(() => {
    store.dispatch(get_latest_content_thunk())
    store.dispatch(get_beneficiaries_thunk())
  }, []);

  const [open, setOpen] = useState(false)

  console.log('benefi', dashboard)

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
                <a href='/about-us'>About Us</a>
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

      <header className="relative ">
        {/* Top navigation */}
        <nav aria-label="Top" className="relative z-50 bg-white/90 backdrop-blur-xl backdrop-filter">
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
                    className="h-10 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch h-full overflow-visible">
                <div className="flex h-full space-x-8">
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

                          <Popover.Panel className="absolute bg-white shadow-lg rounded-md p-4 mt-2 space-y-2 max-h-96 w-32 overflow-y-auto z-50">
                            {dashboard.length > 0 ? (
                              [...new Map(dashboard.map(item => [item.barangay, item])).values()].map((item, index) => (
                                <Link
                                  key={index}
                                  href={`/beneficiaries/barangay/${encodeURIComponent(item.barangay)}`}
                                  className="block text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                                >
                                  {item.barangay}
                                </Link>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500">No barangays available</p>
                            )}
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
        {/* Category section */}
        <section aria-labelledby="category-heading" className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                News and Events
              </h2>
              <a href="news" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                Show All
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">

              <div className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:row-span-2 sm:aspect-square">
                <img
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  src={'/storage/' + latest_contents[0]?.file_path}
                  className="absolute size-full object-cover group-hover:opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-bold text-3xl text-white">
                      <a href="#">
                        <span className="absolute inset-0 " />
                        {latest_contents[0]?.title}
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white max-h-[190px]">
                      {latest_contents[0]?.content}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:aspect-auto">
                <img
                  alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                  src={'/storage/' + latest_contents[1]?.file_path}
                  className="absolute size-full object-cover group-hover:opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-bold text-3xl text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {latest_contents[1]?.title}
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white max-h-[100px]">
                      {latest_contents[1]?.content}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:aspect-auto">
                <img
                  alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                  src={'/storage/' + latest_contents[2]?.file_path}
                  className="absolute size-full object-cover group-hover:opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-bold text-3xl text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {latest_contents[2]?.title}
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white max-h-[100px]">
                      {latest_contents[2]?.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Show All
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Featured section */}
        <section aria-labelledby="cause-heading">
          <div className="relative mx-auto max-w-7xl h-[500px] px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
              <img
                alt=""
                src={'/storage/' + latest_contents[3]?.file_path}
                className="size-full object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900/50" />
            <div className="relative mx-auto max-w-3xl items-center text-center pt-20">
              <h2 id="cause-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {latest_contents[3]?.title}
              </h2>
              <p className="mt-3 text-xl text-white">
                {latest_contents[3]?.content}
              </p>

            </div>
          </div>
        </section>




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
