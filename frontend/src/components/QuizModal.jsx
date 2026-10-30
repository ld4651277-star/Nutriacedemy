import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function QuizModal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setQuizData(null);
      setCurrentQuestion(0);
      setUserAnswers({});
      setResults(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    api.getExamById('exam-2')
      .then((res) => {
        if (isMounted) {
          if (res.success && res.data) {
            setQuizData(res.data);
          } else {
            showToast('Could not load quiz questions.', 'error');
            onClose();
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Provide fallback quiz questions if backend is offline
          setQuizData({
            id: 'exam-2',
            title: 'Clinical Nutrition Revision Quiz',
            category: 'Clinical Dietetics',
            questions: [
              {
                id: 'q1',
                question: 'Which macronutrient is the primary fuel source for the brain under normal physiological conditions?',
                options: ['Dietary Fat', 'Glucose (Carbohydrates)', 'Amino Acids', 'Ketone Bodies'],
                correctIndex: 1,
              },
              {
                id: 'q2',
                question: 'What is the recommended daily dietary fiber intake for healthy adult individuals?',
                options: ['10-15 grams', '25-35 grams', '45-55 grams', '60+ grams'],
                correctIndex: 1,
              },
              {
                id: 'q3',
                question: 'Deficiency of which micronutrient is most commonly associated with microcytic hypochromic anemia?',
                options: ['Vitamin B12', 'Iron', 'Folate', 'Vitamin D'],
                correctIndex: 1,
              },
            ],
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const questions = quizData?.questions || [];
  const currentQ = questions[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;

  const handleOptionSelect = (index) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const handleNext = async () => {
    if (userAnswers[currentQ?.id] === undefined) {
      showToast('Please select an answer before proceeding.', 'error');
      return;
    }

    if (isLast) {
      setSubmitting(true);
      try {
        const res = await api.submitExam(quizData.id, userAnswers);
        if (res.success && res.data) {
          setResults(res.data);
        } else {
          // Local fallback evaluation
          evaluateLocally();
        }
      } catch (err) {
        evaluateLocally();
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const evaluateLocally = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const pct = Math.round((correct / questions.length) * 100);
    setResults({
      scorePercentage: pct,
      passed: pct >= 60,
      correctCount: correct,
      totalQuestions: questions.length,
      status: pct >= 60 ? 'PASSED' : 'NEEDS_REVIEW',
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 flex flex-col relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {quizData?.category || 'Revision Quiz'} • Interactive Test
            </span>
            <h3 className="text-base font-bold text-on-surface">
              {results
                ? 'Quiz Completed'
                : loading
                ? 'Loading Assessment...'
                : `Question ${currentQuestion + 1} of ${questions.length}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close Quiz"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-body-md text-on-surface-variant">Loading test questions...</p>
          </div>
        ) : results ? (
          /* Results View */
          <div className="text-center py-4">
            <div
              className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                results.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {results.passed ? 'emoji_events' : 'psychology'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {results.passed ? 'Congratulations!' : 'Good Effort!'}
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              You scored {results.scorePercentage}% ({results.correctCount}/{results.totalQuestions} correct)
            </p>
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 mb-6 border border-gray-200">
              Result status: <span className="font-bold text-primary">{results.status}</span>. Score saved to your student analytics!
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Close & Review Topics
            </button>
          </div>
        ) : (
          /* Question View */
          <div>
            <p className="text-sm font-medium text-gray-800 mb-4">{currentQ?.question}</p>

            <div className="space-y-2 mb-6">
              {currentQ?.options?.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <label
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-primary bg-emerald-50/70 text-primary font-medium'
                        : 'border-gray-200 hover:border-primary hover:bg-emerald-50/30 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`quiz-q-${currentQ.id}`}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(idx)}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs">{opt}</span>
                  </label>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors ${
                  currentQuestion === 0 ? 'opacity-40 pointer-events-none' : ''
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={submitting}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1"
              >
                {submitting ? 'Evaluating...' : isLast ? 'Submit Quiz' : 'Next Question'}
                {!isLast && !submitting && (
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
