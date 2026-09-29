/**
 * Clinical Case Studies Controller
 * Serves real-world patient case records, lab metrics, and student assessment submissions
 */

const { readData, writeData } = require('../utils/db');

exports.getCases = (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let cases = readData('cases.json') || [];

    if (category && category !== 'All') {
      cases = cases.filter(c =>
        c.category.toLowerCase() === category.toLowerCase() ||
        (c.tags && c.tags.some(t => t.toLowerCase() === category.toLowerCase()))
      );
    }

    if (difficulty) {
      cases = cases.filter(c => c.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      cases = cases.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.caseNumber.toLowerCase().includes(q) ||
        (c.patient && c.patient.clinicalInfo.primaryDiagnosis.toLowerCase().includes(q))
      );
    }

    return res.json({ success: true, count: cases.length, data: cases });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCaseById = (req, res) => {
  try {
    const { id } = req.params;
    const cases = readData('cases.json') || [];
    const caseItem = cases.find(c => c.id === id || c.caseNumber.replace(/\s+/g, '-').toLowerCase() === id.toLowerCase());

    if (!caseItem) {
      return res.status(404).json({ success: false, error: "Case study not found." });
    }

    return res.json({ success: true, data: caseItem });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.submitAssessment = (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, pesStatement, nutritionCarePlan, notes } = req.body;

    if (!pesStatement && !nutritionCarePlan && !notes) {
      return res.status(400).json({ success: false, error: "Please provide an assessment, PES statement, or note." });
    }

    const cases = readData('cases.json') || [];
    const caseIndex = cases.findIndex(c => c.id === id);

    if (caseIndex === -1) {
      return res.status(404).json({ success: false, error: "Case study not found." });
    }

    const assessmentEntry = {
      id: `assess-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      studentName: studentName || "Student Nutritionist",
      pesStatement,
      nutritionCarePlan,
      notes
    };

    cases[caseIndex].studentAssessments = cases[caseIndex].studentAssessments || [];
    cases[caseIndex].studentAssessments.unshift(assessmentEntry);

    writeData('cases.json', cases);

    return res.status(201).json({
      success: true,
      message: "Case assessment submitted and saved to patient record.",
      data: assessmentEntry
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
