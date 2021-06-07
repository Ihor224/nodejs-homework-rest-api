const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const contactById = allContacts.find(
      ({ id }) => String(id) === String(contactId)
    );
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const contactById = allContacts.filter(
      (item) => String(item.id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactById, null, 2));

    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const newContact = { id: uuidv4(), ...body };
    const newContacts = [...allContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return newContact;
  } catch (error) {
    next(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    let contact = {};
    const newContacts = allContacts.map((item) => {
      if (String(item.id) === String(contactId)) {
        contact = { ...item, ...body };
        return contact;
      }
      return item;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
