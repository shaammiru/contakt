import { z } from "zod"
import validator from "validator"

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => validator.isMobilePhone(value, "id-ID"),
      "Invalid phone number"
    ),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  fax: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
  idcard: z.string().optional(),
  jobs: z.string().optional()
})

export const validate = (schema, data) => {
  const parsedData = schema.safeParse(data)

  return parsedData
}
