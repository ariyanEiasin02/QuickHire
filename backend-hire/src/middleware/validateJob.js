const { body } = require("express-validator");

const validateJob = [
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("company").trim().notEmpty().withMessage("Company is required."),
  body("location").trim().notEmpty().withMessage("Location is required."),
  body("category").trim().notEmpty().withMessage("Category is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),
];

module.exports = validateJob;
