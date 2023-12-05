import { z } from "zod"
import validator from "validator"

export const contactSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(value => validator.isMobilePhone(value, "id-ID"), "Invalid phone number"),
  email: z.string().email("Invalid email address")
})

export const validate = (schema, data) => {
  const parsedData = schema.safeParse(data)

  return parsedData
}
