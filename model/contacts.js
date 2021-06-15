const Contact = require("./schemas/contact");

const listContacts = async (userId) => {
  try {
    const data = await Contact.find({ owner: userId }).populate({
      path: "owner",
      select: "email -_id",
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (userId, contactId) => {
  try {
    const data = await Contact.findOne({
      _id: contactId,
      owner: userId,
    }).populate({ path: "owner", select: "email -_id" });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (userId, contactId) => {
  try {
    const data = await Contact.findByIdAndRemove({
      _id: contactId,
      owner: userId,
    });
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

const updateContact = async (userId, contactId, body) => {
  try {
    const data = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: userId,
      },
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
