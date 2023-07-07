import { get, post, deleteRequest } from "./request"

const apiUrl = process.env.API_URL

export const getPages = () => get(`${apiUrl}/pages`)
export const newPage = (data) => post(`${apiUrl}/page`, data)
export const deletePage = (id) => deleteRequest(`${apiUrl}/page/${id}`)
