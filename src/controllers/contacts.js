import { nanoid } from "nanoid"

import {
  checkDataDir,
  loadContactsDoc,
  inputContactDoc,
  updateContactDoc,
  deleteContactDoc
} from "../utils/data.js"
import { validate, contactSchema } from "../utils/validator.js"

export const createContact = (req, res) => {
  try {
    const id = nanoid(7)
    const { name, phone, email } = req.body
    const newContact = { id, name, phone, email }
    const result = validate(contactSchema, newContact)

    if (!result.success) {
      return res.status(400).send(result.error.errors)
    }

    checkDataDir()
    inputContactDoc(result.data)

    req.flash("create_success", `New contact added: ${result.data.name}`)
    res.redirect("/contacts")
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error")
  }
}

export const getContacts = (req, res) => {
  try {
    const contacts = loadContactsDoc()
    const msg = {
      createSuccess: req.flash("create_success"),
      updateSuccess: req.flash("update_success"),
      deleteSuccess: req.flash("delete_success")
    }

    res.render("contacts", {
      layout: "layouts/layout",
      title: "Contacts",
      contacts,
      msg
    })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error")
  }
}

export const getContactById = (req, res) => {
  try {
    const { id } = req.params
    const contacts = loadContactsDoc()

    const contact = contacts.find((contact) => contact.id === id)

    if (!contact) {
      return res.status(404).render("detail_404", {
        layout: "layouts/layout",
        title: "404 | Contact Not Found"
      })
    }

    res.render("detail", {
      layout: "layouts/layout",
      title: contact.name + " | Contact",
      contact
    })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

export const getContactDetails = (req, res) => {
  try {
    const { id } = req.params
    const contacts = loadContactsDoc()

    const contact = contacts.find((contact) => contact.id === id)

    if (!contact) {
      return res.status(404).render("detail_404", {
        layout: "layouts/layout",
        title: "404 | Contact Not Found"
      })
    }

    res.render("update_contact", {
      layout: "layouts/layout",
      title: "Update Contact",
      contact
    })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

export const updateContactById = (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, email } = req.body
    const updatatedContact = { id, name, phone, email }
    const result = validate(contactSchema, updatatedContact)

    if (!result.success) {
      return res.status(400).send(result.error.errors)
    }

    const isUpdated = updateContactDoc(id, updatatedContact)

    if (!isUpdated) {
      return res.status(404).render("detail_404", {
        layout: "layouts/layout",
        title: "404 | Contact Not Found"
      })
    }

    req.flash("update_success", `Contact updated: ${result.data.name}`)
    res.status(200).redirect(`/contacts/${id}`)
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

export const deleteContactById = (req, res) => {
  try {
    const { id } = req.params
    const isDeleted = deleteContactDoc(id)

    if (!isDeleted) {
      return res.status(404).render("detail_404", {
        layout: "layouts/layout",
        title: "404 | Contact Not Found"
      })
    }

    req.flash("delete_success", "Contact deleted")
    res.status(200).redirect("/contacts")
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}
