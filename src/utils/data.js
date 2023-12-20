import { connectDB, Contact } from "./db.js"

export const createData = async (data) => {
  await connectDB()

  const newContact = new Contact({
    name: data.name,
    phone: data.phone,
    email: data.email,
    fax: data.fax || "",
    address: data.address || "",
    gender: data.gender || "",
    idcard: data.idcard || "",
    jobs: data.jobs || "",
  })

  return newContact.save()
}

export const readData = async () => {
  await connectDB()

  return Contact.find()
}

export const readDataById = async (id) => {
  await connectDB()

  const contact = await Contact.findById(id)

  if (!contact) {
    return false
  }

  return contact
}

export const updateDataById = async (id, data) => {
  await connectDB()

  const contactToUpdate = await Contact.findById(id)

  if (!contactToUpdate) {
    return false
  }

  contactToUpdate.set(data)

  await contactToUpdate.save()

  return true
}

export const deleteDataById = async (id) => {
  await connectDB()

  const deletedContact = await Contact.findByIdAndDelete(id)

  if (!deletedContact) {
    return false
  }

  return true
}
