const express = require("express");
const router = express.Router();
const { createApplication, getAllApplications } = require("../controllers/applicationController");
const validateApplication = require("../middleware/validateApplication");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", protect, adminOnly, getAllApplications);
router.post("/", validateApplication, createApplication);

module.exports = router;
