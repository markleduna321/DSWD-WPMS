import { Fragment, useState } from 'react'
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
  import { createPortal } from 'react-dom'; // Import createPortal for rendering outside the DOM hierarchy

  const navigation = {
    categories: [
      {
        id: 'women',
        name: 'About Us',
        featured: [
          {
            name: 'Mission',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Vision',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'About DSWD',
            items: [
              { name: 'History of DSWD', href: '#' },
              { name: 'Organizational Structure', href: '#' },
            ],
          },
          
        ],
      },
    ],
    pages: [
      { name: 'Donate', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
  }
  const favorites = [
    {
      id: 1,
      name: 'Black Basic Tee',
      price: '$32',
      href: '#',
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-03-favorite-01.jpg',
      imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
      id: 2,
      name: 'Off-White Basic Tee',
      price: '$32',
      href: '#',
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-03-favorite-02.jpg',
      imageAlt: "Model wearing women's off-white cotton crewneck tee.",
    },
    {
      id: 3,
      name: 'Mountains Artwork Tee',
      price: '$36',
      href: '#',
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-03-favorite-03.jpg',
      imageAlt:
        "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
    },
  ]
  

export default function NavbarSectionPage() {
    const [open, setOpen] = useState(false)
  return (
    <div>
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
            <TabList className="-mb-px flex space-x-8 px-4">
              {navigation.categories.map((category) => (
                <Tab
                  key={category.name}
                  className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                >
                  {category.name}
                </Tab>
              ))}
            </TabList>
          </div>
          <TabPanels as={Fragment}>
            {navigation.categories.map((category) => (
              <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                <div className="grid grid-cols-2 gap-x-4">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-sm">
                      <img
                        alt={item.imageAlt}
                        src={item.imageSrc}
                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                      />
                      <a href={item.href} className="mt-6 block font-medium text-gray-900">
                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                        {item.name}
                      </a>
                      <p aria-hidden="true" className="mt-1">
                        
                      </p>
                    </div>
                  ))}
                </div>
                {category.sections.map((section) => (
                  <div key={section.name}>
                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                      {section.name}
                    </p>
                    <ul
                      role="list"
                      aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                      className="mt-6 flex flex-col space-y-6"
                    >
                      {section.items.map((item) => (
                        <li key={item.name} className="flow-root">
                          <a href={item.href} className="-m-2 block p-2 text-gray-500">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
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

        <div className="border-t border-gray-200 px-4 py-6">
          <a href="#" className="-m-2 flex items-center p-2">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
              className="block h-auto w-5 shrink-0"
            />
            
          </a>
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
          <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            <div className="relative flex">
                                                <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                                                    {category.name}
                                                </PopoverButton>
                                            </div>

                                            {/* Use Portal here for rendering the popover outside the DOM hierarchy */}
                                            {createPortal(
                                                <PopoverPanel
                                                    transition
                                                    className="group absolute inset-x-0 top-full z-20 mt-4 bg-white text-sm text-gray-500 shadow-xl transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in w-full max-w-screen-xl"
                                                >
                                                    <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />
                                                    <div aria-hidden="true" className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8">
                                                        <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-[open]:bg-gray-200" />
                                                    </div>

                                                    <div className="relative">
                                                        <div className="mx-auto max-w-7xl px-8">
                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                    {category.featured.map((item) => (
                                                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                                                            <img
                                                                                alt={item.imageAlt}
                                                                                src={item.imageSrc}
                                                                                className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                                            />
                                                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                {item.name}
                                                                            </a>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverPanel>,
                                                document.body // This renders the popover outside the parent container
                                            )}
                                        </Popover>
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
  </div>
  )
}