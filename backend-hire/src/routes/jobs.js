const express = require("express");
const router = express.Router();
const { getAllJobs, getJobById, createJob, updateJob, deleteJob } = require("../controllers/jobController");
const validateJob = require("../middleware/validateJob");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", protect, adminOnly, validateJob, createJob);
router.put("/:id", protect, adminOnly, validateJob, updateJob);
router.delete("/:id", protect, adminOnly, deleteJob);

module.exports = router;
