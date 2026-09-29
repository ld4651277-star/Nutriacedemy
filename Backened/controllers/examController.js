/**
 * Exam & Quiz Controller
 * Manages mock exams, real-time question evaluation, and topic analytics
 */

const { readData, writeData } = require('../utils/db');

exports.getCategories = (req, res) => {
  try {
    const examsData = readData('exams.json') || {};
    return res.json({ success: true, data: examsData.categories || [] });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getExams = (req, res) => {
  try {
    const examsData = readData('exams.json') || {};
    const { category } = req.query;

    let tests = examsData.mockTests || [];
    if (category && category !== 'All') {
      tests = tests.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    // Return summaries without full answers to prevent cheating
    const summaries = tests.map(t => ({
      id: t.id,
      title: t.title,
      category: t.category,
      durationMinutes: t.durationMinutes,
      totalQuestions: t.questions.length,
      passingScore: t.passingScore,
      status: t.status,
      difficulty: t.difficulty,
      description: t.description
    }));

    return res.json({ success: true, count: summaries.length, data: summaries });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getExamById = (req, res) => {
  try {
    const { id } = req.params;
    const examsData = readData('exams.json') || {};
    const test = (examsData.mockTests || []).find(t => t.id === id);

    if (!test) {
      return res.status(404).json({ success: false, error: "Mock test not found." });
    }

    // Strip answers for active test mode unless review requested
    const isReview = req.query.review === 'true';
    const questions = test.questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      topic: q.topic,
      ...(isReview ? { correctIndex: q.correctIndex, explanation: q.explanation } : {})
    }));

    return res.json({
      success: true,
      data: {
        id: test.id,
        title: test.title,
        category: test.category,
        durationMinutes: test.durationMinutes,
        totalQuestions: questions.length,
        passingScore: test.passingScore,
        difficulty: test.difficulty,
        questions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.submitExam = (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // e.g. { "q1": 1, "q2": 0 }

    const examsData = readData('exams.json') || {};
    const test = (examsData.mockTests || []).find(t => t.id === id);

    if (!test) {
      return res.status(404).json({ success: false, error: "Mock test not found." });
    }

    let correctCount = 0;
    const totalQuestions = test.questions.length;
    const topicBreakdown = {};
    const evaluatedQuestions = [];

    test.questions.forEach(q => {
      const userAnswer = answers ? answers[q.id] : undefined;
      const isCorrect = userAnswer !== undefined && parseInt(userAnswer, 10) === q.correctIndex;

      if (isCorrect) correctCount++;

      // Track by topic
      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { total: 0, correct: 0 };
      }
      topicBreakdown[q.topic].total += 1;
      if (isCorrect) topicBreakdown[q.topic].correct += 1;

      evaluatedQuestions.push({
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswer: userAnswer !== undefined ? parseInt(userAnswer, 10) : null,
        correctAnswer: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic
      });
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= test.passingScore;

    // Persist to recent submissions in exams.json
    const submission = {
      id: `sub-${Date.now()}`,
      examId: test.id,
      examName: test.title,
      score: scorePercentage,
      correctCount,
      totalQuestions,
      date: new Date().toISOString().split('T')[0],
      status: passed ? "Passed" : "Review"
    };

    examsData.recentSubmissions = examsData.recentSubmissions || [];
    examsData.recentSubmissions.unshift(submission);
    writeData('exams.json', examsData);

    return res.json({
      success: true,
      data: {
        scorePercentage,
        correctCount,
        totalQuestions,
        passed,
        passingThreshold: test.passingScore,
        status: passed ? "Passed" : "Needs Review",
        topicBreakdown,
        evaluatedQuestions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getWeakTopics = (req, res) => {
  try {
    const examsData = readData('exams.json') || {};
    return res.json({ success: true, data: examsData.weakTopics || [] });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStudyPlanner = (req, res) => {
  try {
    const examsData = readData('exams.json') || {};
    return res.json({ success: true, data: examsData.studyPlanner || [] });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.addStudyPlannerItem = (req, res) => {
  try {
    const { day, time, title, type } = req.body;
    if (!day || !title) {
      return res.status(400).json({ success: false, error: "Day and title are required." });
    }

    const examsData = readData('exams.json') || {};
    examsData.studyPlanner = examsData.studyPlanner || [];

    const dayEntry = examsData.studyPlanner.find(d => d.day.toLowerCase() === day.toLowerCase());
    if (dayEntry) {
      dayEntry.events.push({
        time: time || "Flexible",
        title,
        type: type || "primary"
      });
    } else {
      examsData.studyPlanner.push({
        day,
        date: new Date().getDate(),
        active: false,
        hasBadge: true,
        events: [{ time: time || "Flexible", title, type: type || "primary" }]
      });
    }

    writeData('exams.json', examsData);
    return res.status(201).json({ success: true, message: "Study planner item added." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
