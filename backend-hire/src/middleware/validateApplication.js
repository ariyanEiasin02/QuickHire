const { body } = require("express-validator");

const validateApplication = [
  body("job").notEmpty().withMessage("Job ID is required.").isMongoId().withMessage("Invalid Job ID."),
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Must be a valid email address."),
  body("resumeLink")
    .trim()
    .notEmpty()
    .withMessage("Resume link is required.")
    .isURL()
    .withMessage("Resume link must be a valid URL."),
  body("coverNote").trim().notEmpty().withMessage("Cover note is required."),
];

module.exports = validateApplication;
