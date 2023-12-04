import express from "express"

const app = express()

app.set("view engine", "pug")

app.get("/", (req, res) => {
  res.status(200)
})

app.get("/contacts", (req, res) => {
  res.send("Contacts")
})

app.get("/contacts/:id", (req, res) => {
  res.send("Contact ID:")
})

app.listen(3000, () => {
  console.log("Server is running at port 3000")
})
