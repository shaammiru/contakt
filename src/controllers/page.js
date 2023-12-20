import { readData, readDataById } from "../utils/data.js"

export const returnNotFoundPage = (req, res) => {
  return res.status(404).render("404", {
    layout: "layouts/layout",
    title: "404 | Page Not Found",
  })
}

export const returnContactNotFoundPage = (req, res) => {
  return res.status(404).render("detail_404", {
    layout: "layouts/layout",
    title: "404 | Contact Not Found",
  })
}

export const getHomePage = (req, res) => {
  try {
    res.render("home", {
      layout: "layouts/layout",
      title: "Home",
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const getAboutPage = (req, res) => {
  try {
    res.render("about", {
      layout: "layouts/layout",
      title: "About",
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const getContactsPage = async (req, res) => {
  try {
    const contacts = await readData()
    const msg = {
      createSuccess: req.flash("create_success"),
      updateSuccess: req.flash("update_success"),
      deleteSuccess: req.flash("delete_success"),
    }

    res.render("contacts", {
      layout: "layouts/layout",
      title: "Contacts",
      contacts,
      msg,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const getNewContactPage = (req, res) => {
  try {
    res.render("new_contact", {
      layout: "layouts/layout",
      title: "New Contact",
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const getContactDetailPage = async (req, res) => {
  try {
    const { id } = req.params
    const contact = await readDataById(id)

    if (!contact) {
      returnContactNotFoundPage(req, res)
    }

    res.render("detail", {
      layout: "layouts/layout",
      title: contact.name + " | Contact",
      contact,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
}

export const getUpdateContactPage = async (req, res) => {
  try {
    const { id } = req.params
    const contact = await readDataById(id)

    if (!contact) {
      returnContactNotFoundPage(req, res)
    }

    res.render("update_contact", {
      layout: "layouts/layout",
      title: "Update Contact",
      contact,
    })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}