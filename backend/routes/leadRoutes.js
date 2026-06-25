const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);
router.get("/:id", protect, getLeadById);
// router.get("/stats", getLeadStats);

module.exports = router;