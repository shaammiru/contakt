import { db, contactSchema } from "./db.js"

const checkContactDb = () => {
  if (!db.models["Contact"]) {
    db.model("Contact", contactSchema)
  }
}

export const createData = (data) => {
  checkContactDb()

  return db.model("Contact").create({
    name: data.name,
    phone: data.phone,
    email: data.email,
    fax: data.fax || "",
    address: data.address || "",
    gender: data.gender || "",
    idcard: data.idcard || "",
    jobs: data.jobs || "",
  })
}

export const readData = () => {
  checkContactDb()

  return db.model("Contact").find()
}

export const readDataById = async (id) => {
  checkContactDb()

  const contact = await db.model("Contact").findOne({ _id: id })

  if (!contact) {
    return false
  }

  return contact
}

export const updateDataById = async (id, data) => {
  checkContactDb()

  const { acknowledged } = await db
    .model("Contact")
    .updateOne({ _id: id }, data)

  return acknowledged
}

export const deleteDataById = async (id) => {
  checkContactDb()

  const deletedContact = await readDataById(id)
  const { acknowledged } = await db.model("Contact").deleteOne({ _id: id })

  if (!acknowledged) {
    return false
  }

  return deletedContact
}
