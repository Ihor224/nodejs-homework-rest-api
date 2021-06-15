const Contacts = require("../model/contacts");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allContacts = await Contacts.listContacts(userId);
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: allContacts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactById = await Contacts.getContactById(
      userId,
      req.params.contactId
    );
    if (contactById) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: contactById });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found contactById",
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newContact = await Contacts.addContact({
      ...req.body,
      owner: userId,
    });
    return res
      .status(HttpCode.CREATED)
      .json({ status: "success", code: HttpCode.CREATED, data: newContact });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactById = await Contacts.removeContact(
      userId,
      req.params.contactId
    );
    if (contactById) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "contact deleted",
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "bad request",
        code: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    }
    const contactById = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contactById) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: contactById });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "bad request",
        code: HttpCode.BAD_REQUEST,
        message: "missing fields",
      });
    }
    const contactById = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contactById) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: contactById });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  updateStatus,
  create,
};
