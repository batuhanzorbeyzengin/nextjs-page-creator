import { get, post } from "./request";

const apiUrl = process.env.API_URL

export const getPages = () => get(`${apiUrl}/pages`)
export const newPage = data => post(`${apiUrl}/page`, data)