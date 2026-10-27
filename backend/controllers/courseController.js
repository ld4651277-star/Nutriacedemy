/**
 * Course Controller
 * Manages courses, lessons, syllabus, and user learning progress
 */

const { readData, writeData } = require('../utils/db');

exports.getCourses = (req, res) => {
  try {
    const { difficulty, topic, search } = req.query;
    let courses = readData('courses.json') || [];

    if (difficulty) {
      courses = courses.filter(c => c.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (topic) {
      courses = courses.filter(c => c.topic.toLowerCase() === topic.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCourseById = (req, res) => {
  try {
    const { id } = req.params;
    const courses = readData('courses.json') || [];
    const course = courses.find(c => c.id === id);

    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found." });
    }

    return res.json({ success: true, data: course });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateCourseProgress = (req, res) => {
  try {
    const { id } = req.params;
    const { moduleId, completed, progress } = req.body;

    const courses = readData('courses.json') || [];
    const courseIndex = courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return res.status(404).json({ success: false, error: "Course not found." });
    }

    const course = courses[courseIndex];

    if (moduleId && course.modules) {
      const mod = course.modules.find(m => m.id === moduleId);
      if (mod) {
        mod.completed = completed !== undefined ? completed : true;
      }
      const completedCount = course.modules.filter(m => m.completed).length;
      course.progress = Math.round((completedCount / course.modules.length) * 100);
    } else if (progress !== undefined) {
      course.progress = Math.min(100, Math.max(0, parseInt(progress, 10)));
    }

    courses[courseIndex] = course;
    writeData('courses.json', courses);

    return res.json({
      success: true,
      message: "Course progress updated.",
      progress: course.progress,
      data: course
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
