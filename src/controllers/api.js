import { returnContactNotFoundPage } from "./page.js"
import { validate, contactSchema } from "../utils/validator.js"
import {
  createData,
  updateDataById,
  deleteDataById,
} from "../utils/data.js"

export const createContact = async (req, res) => {
  try {
    const { name, phone, email, fax, address, gender, idcard, jobs } = req.body
    const newContact = {
      name,
      phone,
      email,
      fax,
      address,
      gender,
      idcard,
      jobs,
    }
    const result = validate(contactSchema, newContact)

    if (!result.success) {
      return res.status(400).send(result.error.errors)
    }

    await createData(result.data)

    req.flash("create_success", `New contact added: ${result.data.name}`)
    res.redirect("/contacts")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const updateContactById = async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, email, fax, address, gender, idcard, jobs } = req.body
    const updatedContact = {
      name,
      phone,
      email,
      fax,
      address,
      gender,
      idcard,
      jobs,
    }
    const result = validate(contactSchema, updatedContact)

    if (!result.success) {
      return res.status(400).send(result.error.errors)
    }

    const isUpdated = await updateDataById(id, result.data)

    if (!isUpdated) {
      returnContactNotFoundPage(req, res)
    }

    req.flash("update_success", `Contact updated: ${result.data.name}`)
    res.redirect(`/contacts/${id}`)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params
    const isDeleted = await deleteDataById(id)

    if (!isDeleted) {
      returnContactNotFoundPage(req, res)
    }

    req.flash("delete_success", "Contact deleted")
    res.status(200).redirect("/contacts")
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}
