"use client"

import { Fragment, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Dialog, Transition } from "@headlessui/react"
import { useFormik } from "formik"
import * as yup from "yup"
import { LockIcon } from "./icons/Lock"
import { newPage } from "@/services/pages"
import { toast } from "react-toastify"

export function TopBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
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
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}

const validationSchema = yup.object({
  pageName: yup.string().required("Page Name is required"),
  path: yup
    .string()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Path must be a valid URL path")
    .required("Path is required"),
})

function Modal({ isOpen, setIsOpen }) {
  const [path, setPath] = useState("")

  const formik = useFormik({
    initialValues: {
      pageName: "",
      path: path,
      model: "page",
      status: "draft",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values)
      newPage(values)
        .then((res) => {
          console.log(res)
          toast.success("Success!")
          setIsOpen(!isOpen)
          setPath("")
          resetForm()
        })
        .catch((error) => {
          toast.error("Error!")
          console.error(error)
          setSubmitting(false)
        })
    },
  })

  useEffect(() => {
    formik.setFieldValue("path", path)
  }, [path])

  const handlePathChange = (e) => {
    setPath(e.target.value.replace(/\s/g, "-"))
  }
  return (
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
                <div className="mt-4">
                  <form
                    className="flex flex-col space-y-3"
                    onSubmit={formik.handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Page Name"
                      name="pageName"
                      onChange={formik.handleChange}
                      value={formik.values.pageName}
                      className="border border-gray-300 py-2 px-4 rounded-lg"
                    />
                    {formik.errors.pageName && formik.touched.pageName ? (
                      <div>{formik.errors.pageName}</div>
                    ) : null}
                    <input
                      type="text"
                      placeholder="Path"
                      name="path"
                      onChange={handlePathChange}
                      value={path}
                      className="border border-gray-300 py-2 px-4 rounded-lg"
                    />
                    {formik.errors.path && formik.touched.path ? (
                      <div>{formik.errors.path}</div>
                    ) : null}
                  </form>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c-3.042 0-5.824-1.135-7.938-3l-3 2.647A8.003 8.003 0 0012 24v-4zm5.938-3A7.962 7.962 0 0120 12h-4a4.02 4.02 0 00-3.938-3H12v10h5.938z"
                        ></path>
                      </svg>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
