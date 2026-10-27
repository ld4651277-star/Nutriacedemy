/**
 * Dashboard & User Profile Controller
 * Aggregates student progress, roadmap, and quick metrics for the dashboard view
 */

const { readData, writeData } = require('../utils/db');

exports.getDashboardSummary = (req, res) => {
  try {
    const userProfile = readData('user_profile.json') || {};
    const examsData = readData('exams.json') || {};
    const courses = readData('courses.json') || [];

    // Attach latest exam submissions if available
    if (examsData.recentSubmissions && examsData.recentSubmissions.length > 0) {
      userProfile.recentExams = examsData.recentSubmissions.slice(0, 5).map(s => ({
        name: s.examName,
        score: s.score,
        status: s.status,
        badge: s.status === 'Passed' ? 'passed' : 'review'
      }));
    }

    // Attach count of active courses
    const activeCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[0];
    if (activeCourse) {
      userProfile.progressOverview = {
        activeCourse: activeCourse.title,
        completionPercentage: activeCourse.progress,
        completedLessons: Math.round((activeCourse.progress / 100) * (activeCourse.lessonsCount || 10)),
        totalLessons: activeCourse.lessonsCount || 10,
        studyHoursThisMonth: 34.5
      };
    }

    return res.json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateProfile = (req, res) => {
  try {
    const { fullName, email, targetGoal } = req.body;
    const userProfile = readData('user_profile.json') || {};

    if (fullName) userProfile.user.fullName = fullName;
    if (email) userProfile.user.email = email;
    if (targetGoal) userProfile.user.targetGoal = targetGoal;

    writeData('user_profile.json', userProfile);

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      data: userProfile.user
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
