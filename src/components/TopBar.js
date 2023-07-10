"use client"

import { Fragment, useState, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import { pageFormValidationSchema } from "@/validations"
import { useFormik } from "formik"
import { PageService } from "@/services"
import { Modal } from "./Modal"
import { LockIcon, LoadingIcon } from "./icons"

const PathSegment = ({ segment }) => (
  <Fragment>
    <span className="text-gray-600">/</span>
    <span>
      <span className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-400">
        {segment}
      </span>
    </span>
  </Fragment>
)

const PathSegments = ({ pathname }) => {
  const segments = useMemo(() => pathname.split("/").slice(1), [pathname])
  return (
    <>
      {segments.map((segment, index) => {
        if (!segment) {
          return null
        }
        return <PathSegment key={index} segment={segment} />
      })}
    </>
  )
}

export function TopBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = () => setIsOpen(!isOpen)

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
          <PathSegments pathname={pathname} />
        </div>
      </div>
      <div className="p-3.5 lg:px-5 lg:py-3">
        {pathname === "/content" && (
          <button
            type="button"
            onClick={handleButtonClick}
            className={"rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"}
          >
            Create page
          </button>
        )}
        <TopModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}

function TopModal({ isOpen, setIsOpen }) {
  const [path, setPath] = useState("")

  const formik = useFormik({
    initialValues: {
      pageName: "",
      path: path,
      model: "page",
      status: "draft",
    },
    validationSchema: pageFormValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      PageService.newPage(values)
        .then(() => {
          setIsOpen(!isOpen)
          setPath("")
          resetForm()
        })
        .catch((error) => {
          console.error(error)
          setSubmitting(false)
        })
    },
  })

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    formik

  useEffect(() => {
    formik.setFieldValue("path", path)
  }, [path])

  const handlePathChange = (e) => {
    setPath(e.target.value.replace(/\s/g, "-"))
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Create Page"}>
      <div className="mt-4">
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Page Name"
            name="pageName"
            onChange={handleChange}
            value={values.pageName}
            className={`border py-2 px-4 rounded-lg ${errors.pageName && touched.pageName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.pageName && touched.pageName && <div className="text-[13px] text-red-500">{errors.pageName}</div>}
          <input
            type="text"
            placeholder="Path"
            name="path"
            onChange={handlePathChange}
            value={path}
            className={`border py-2 px-4 rounded-lg ${errors.path && touched.path ? "border-red-500" : (touched.path ? "border-gray-300" : "")}`}
          />
          {errors.path && touched.path && <div className="text-[13px] text-red-500">{errors.path}</div>}
        </form>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingIcon /> : "Create"}
        </button>
      </div>
    </Modal>
  )
}
