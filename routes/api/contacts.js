const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contacts.listContacts();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: allContacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await Contacts.getContactById(req.params.contactId);
    if (contactById) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: contactById });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateContact, async (req, res, next) => {
  try {
    const newContact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactById = await Contacts.removeContact(req.params.contactId);
    if (contactById) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ status: "bad request", code: 400, message: "missing fields" });
    }
    const contactById = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contactById) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: contactById });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
