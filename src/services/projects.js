import { post } from "./request"

const apiUrl = process.env.API_URL

export const newProject = (data) => post(`${apiUrl}/project`, data)
export const getProjects = () => get(`${apiUrl}/projects`)