"use client"

import { Fragment, useState } from "react"
import { usePathname } from "next/navigation"
import { Dialog, Transition } from "@headlessui/react"
import { LockIcon } from "./icons/Lock"

export function TopBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  console.log(isOpen)
  return (
    <div className="flex justify-between relative z-20">
      <div className="flex items-center gap-x-2 p-3.5 lg:px-5 lg:py-3">
        <div className="text-gray-600">
          <LockIcon />
        </div>
        <div className="flex gap-x-1 text-sm font-medium">
          <div>
            <span className="px-2 text-gray-500">page-creator.io</span>
          </div>
          {pathname ? (
            <>
              {pathname
                .split("/")
                .slice(1)
                .map((segment, index) => {
                  if (!segment) {
                    return null
                  }
                  return (
                    <Fragment key={index}>
                      <span className="text-gray-600">/</span>
                      <span>
                        <span className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-400">
                          {segment}
                        </span>
                      </span>
                    </Fragment>
                  )
                })}
            </>
          ) : null}
        </div>
      </div>
      <div className="p-3.5 lg:px-5 lg:py-3">
        {pathname === "/content" ? (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Create page
          </button>
        ) : null}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(!isOpen)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Create Page
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className="flex flex-col space-y-6">
                        <input
                          type="text"
                          placeholder="Page Name"
                          className="border border-gray-300 py-2 px-4 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Path"
                          className="border border-gray-300 py-2 px-4 rounded-lg"
                        />
                      </form>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  )
}
