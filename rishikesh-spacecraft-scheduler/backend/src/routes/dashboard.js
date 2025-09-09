const express = require("express");
const router = express.Router();

// Dummy data - replace with actual DB queries
router.get("/dashboard-stats", (req, res) => {
  const dashboardData = {
    totalRequests: 120,    // example number
    upcomingPasses: 8,     // example number
    alerts: 2,             // example number
  };

  res.json(dashboardData);
});

module.exports = router;




