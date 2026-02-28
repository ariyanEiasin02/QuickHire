const { validationResult } = require("express-validator");
const Application = require("../models/Application");
const Job = require("../models/Job");

const createApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const job = await Job.findById(req.body.job);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    const application = await Application.create(req.body);
    const populated = await application.populate("job", "title company");

    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { createApplication, getAllApplications };
