/**
 * Careers Controller
 * Career pathways, licensing milestones, salary statistics, and industry demand
 */

const { readData } = require('../utils/db');

exports.getCareerPathways = (req, res) => {
  try {
    const careers = readData('careers.json') || {};
    return res.json({
      success: true,
      data: careers.pathways || [],
      jobMarketStats: careers.jobMarketStats || {}
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPathwayById = (req, res) => {
  try {
    const { id } = req.params;
    const careers = readData('careers.json') || {};
    const pathway = (careers.pathways || []).find(p => p.id === id);

    if (!pathway) {
      return res.status(404).json({ success: false, error: "Career pathway not found." });
    }

    return res.json({ success: true, data: pathway });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
