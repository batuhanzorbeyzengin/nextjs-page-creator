"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NextIcon, PreviousIcon } from "./icons"
import { PageService } from "@/services"

const itemsPerPage = 10

export function Table() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await PageService.getPages()
      setData(response)
    }

    fetchData()
  }, [])

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const pages = [...Array(totalPages).keys()].map((i) => i + 1)

  const handleClick = (page) => {
    setCurrentPage(page)
  }

  const pageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleAll = (event) => {
    setSelectedItems(
      event.target.checked ? pageData.map((item) => item.id) : []
    )
  }

  const toggleItem = (itemId) => {
    setSelectedItems(
      selectedItems.includes(itemId)
        ? selectedItems.filter((id) => id !== itemId)
        : [...selectedItems, itemId]
    )
  }

  useEffect(() => {
    setSelectedItems([])
  }, [currentPage])

  const handleDelete = async (id) => {
    try {
      await PageService.deletePage(id)
      const updatedData = await PageService.getPages()
      setData(updatedData)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  onChange={toggleAll}
                  checked={
                    pageData.length > 0 &&
                    selectedItems.length === pageData.length
                  }
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Target
            </th>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 bg-gray-300">
                No Data
              </td>
            </tr>
          ) : (
            pageData.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${item.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                    />
                    <label
                      htmlFor={`checkbox-table-search-${item.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <i>Url path is /{item.target}</i>
                </td>
                <td className="px-6 py-4">{item.model}</td>
                <td
                  className={
                    item.status === "Published"
                      ? "px-6 py-4 text-[#009600]"
                      : "px-6 py-4 text-gray-800"
                  }
                >
                  {item.status}
                </td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <Link
                    href={`/content/${item.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {(currentPage - 1) * itemsPerPage + 1}-{currentPage * itemsPerPage}
          </span>{" "}
          of <span className="font-semibold text-gray-900">{data.length}</span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <Link
              href={"#"}
              onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              <PreviousIcon />
            </Link>
          </li>
          {pages.map((page) => (
            <li key={page}>
              <Link
                href={"#"}
                className={`px-3 py-2 leading-tight ${
                  currentPage === page
                    ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
                onClick={() => handleClick(page)}
              >
                {page}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={"#"}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={() =>
                currentPage < totalPages && handleClick(currentPage + 1)
              }
            >
              <span className="sr-only">Next</span>
              <NextIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
