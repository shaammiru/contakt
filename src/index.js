import path from "path"
import express from "express"
import expressLayouts from "express-ejs-layouts"
import session from "express-session"
import cookieParser from "cookie-parser"
import flash from "connect-flash"
import "dotenv/config"

import { port } from "./utils/locals.js"
import {
  createContact,
  updateContactById,
  deleteContactById,
} from "./controllers/api.js"
import {
  getContactsPage,
  getHomePage,
  getAboutPage,
  getNewContactPage,
  getContactDetailPage,
  getUpdateContactPage,
  returnNotFoundPage
} from "./controllers/page.js"

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(path.resolve(), "src/views"))

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
    cookie: { maxAge: 60000 },
  }),
)
app.use(flash())

// API routes
app.post("/contacts", createContact)
app.post("/contacts/update/:id", updateContactById)
app.post("/contacts/delete/:id", deleteContactById)

// Page routes
app.get("/", getHomePage)
app.get("/about", getAboutPage)
app.get("/contacts", getContactsPage)
app.get("/contacts/new", getNewContactPage)
app.get("/contacts/:id", getContactDetailPage)
app.get("/contacts/update/:id", getUpdateContactPage)
app.get("/contacts/delete/:id", deleteContactById)
app.get("*", returnNotFoundPage)

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
