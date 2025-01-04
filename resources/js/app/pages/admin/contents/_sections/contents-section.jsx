import React from 'react'
import { ViewfinderCircleIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Button from '@/app/pages/components/button'

const people = [
  {
    name: 'Content Sample 1',
    title: 'During the program, the President confers awards to the top three (3) winners of the National Parol-Making Competition dubbed, Isang Bituin Isang Mithii by the Office of the President (OP), Office of the Social Secretary (SoSec) and Department of Education (DepEd).',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Content Sample 2',
    title: 'During the program, the President confers awards to the top three (3) winners of the National Parol-Making Competition dubbed, Isang Bituin Isang Mithii by the Office of the President (OP), Office of the Social Secretary (SoSec) and Department of Education (DepEd).',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://www.benarnews.org/english/news/philippine/assault-complaint-filed-in-sara-duterte-feud-with-president-marcos-11272024121358.html/@@images/a4f9ef92-2036-4da4-a3db-99f8592a6e7b.jpeg',
  },
  {
    name: 'Content Sample 3',
    title: 'During the program, the President confers awards to the top three (3) winners of the National Parol-Making Competition dubbed, Isang Bituin Isang Mithii by the Office of the President (OP), Office of the Social Secretary (SoSec) and Department of Education (DepEd).',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://philippinerevolution.nu/wp-content/uploads/2023/11/20231130-UpdatesPH_VolVNo22-1-791x1024.png',
  },
  {
    name: 'Content Sample 4',
    title: 'During the program, the President confers awards to the top three (3) winners of the National Parol-Making Competition dubbed, Isang Bituin Isang Mithii by the Office of the President (OP), Office of the Social Secretary (SoSec) and Department of Education (DepEd).',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV8Ry0kGKVK7xILQKq5E4NBTMamcCZdfv3CA&s',
  },
  // More people...
]

export default function ContentsSection() {
  return (
    <div>
      <Button
            type="button"
            variant="primary"
            size="md"
            isLoading={false}
            disabled={false}
            icon={<PlusIcon className="h-5 w-5" />}
        >
            Add User
        </Button>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center space-x-6 p-6">
              <img alt="" src={person.imageUrl} className="h-44 w-40 shrink-0 bg-gray-300" />
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                </div>
                <div>
                  <p className="mt-1 text-sm text-gray-500">{person.title}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${person.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <ViewfinderCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
                    View
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:${person.telephone}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <TrashIcon aria-hidden="true" className="size-5 text-red-400" />
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </a>
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}