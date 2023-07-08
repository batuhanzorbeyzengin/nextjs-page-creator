import * as yup from "yup"

export const pageFormValidationSchema = yup.object({
  pageName: yup.string().required("Page Name is required"),
  path: yup
    .string()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Path must be a valid URL path")
    .required("Path is required"),
})