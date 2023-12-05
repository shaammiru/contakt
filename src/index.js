import express from "express"
import expressLayouts from "express-ejs-layouts"
import session from "express-session"
import cookieParser from "cookie-parser"
import flash from "connect-flash"

import { port } from "./utils/locals.js"
import {
  createContact,
  getContacts,
  getContactById,
  getContactDetails,
  updateContactById,
  deleteContactById
} from "./controllers/contacts.js"

const app = express()

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(cookieParser("secret"))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: { maxAge: 60000 }
  })
)
app.use(flash())

app.get("/", (req, res) => {
  res.render("home", {
    layout: "layouts/layout",
    title: "Home"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/layout",
    title: "About"
  })
})

app.get("/contacts/new", (req, res) => {
  res.render("new_contact", {
    layout: "layouts/layout",
    title: "New Contact"
  })
})

app.post("/contacts", createContact)
app.get("/contacts", getContacts)
app.get("/contacts/:id", getContactById)
app.get("/contacts/update/:id", getContactDetails)
app.post("/contacts/update/:id", updateContactById)
app.post("/contacts/delete/:id", deleteContactById)

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
