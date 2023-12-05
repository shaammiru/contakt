import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { Storage } from "@google-cloud/storage"

import { dirPath, filePath, bucketName } from "./locals.js"

const storage = new Storage({
  keyFilename: "./service-account.json"
})
const bucket = storage.bucket(bucketName)
const file = bucket.file("data/contacts.json")

export const checkDataDir = () => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath)
  }

  if (!existsSync(filePath)) {
    writeFileSync(filePath, "[]", "utf-8")
  }
}

export const loadContactsDoc = () => {
  checkDataDir()

  const file = readFileSync(filePath, "utf-8")
  const contacts = JSON.parse(file)
  return contacts
}

export const inputContactDoc = (newContact) => {
  const contacts = loadContactsDoc()

  contacts.push(newContact)

  writeFileSync(filePath, JSON.stringify(contacts))
}

export const updateContactDoc = (id, updatedContact) => {
  const contacts = loadContactsDoc()

  const index = contacts.findIndex((contact) => contact.id === id)

  if (index === -1) {
    return false
  }

  contacts[index] = updatedContact

  writeFileSync(filePath, JSON.stringify(contacts))

  return true
}

export const deleteContactDoc = (id) => {
  const contacts = loadContactsDoc()

  const filteredContacts = contacts.filter((contact) => contact.id !== id)

  if (filteredContacts.length === contacts.length) {
    return false
  }

  writeFileSync(filePath, JSON.stringify(filteredContacts))

  return true
}
