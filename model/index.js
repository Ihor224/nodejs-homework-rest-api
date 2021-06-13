const Contact = require("./schemas/contacts");

const listContacts = async () => {
  try {
    const data = await Contact.find({});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await Contact.findOne({ _id: contactId });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await Contact.findByIdAndRemove({ _id: contactId });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await Contact.create(body);
    return data;
  } catch (error) {
    next(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await Contact.findOneAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const data = await Contact.findOneAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    );
    return data;
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
  updateStatusContact,
};
