import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, X, AlertTriangle } from 'lucide-react';
import { mockQuizzes, mockCourseDetails } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import QuizQuestion from '../components/quizzes/QuizQuestion';
import { Quiz, Question } from '../types';

const QuizPage: React.FC = () => {
  const { courseId } = useParams<{courseId: string}>();
  const navigate = useNavigate();
  const { currentUser, updateUserProfile } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [courseName, setCourseName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!courseId) {
      setError('Invalid course ID');
      setLoading(false);
      return;
    }

    // Check if user is enrolled
    if (currentUser && !currentUser.enrolledCourses.includes(courseId)) {
      navigate(`/courses/${courseId}`);
      return;
    }

    // Get quiz data
    const quizData = mockQuizzes.find(q => q.courseId === courseId);
    const courseData = mockCourseDetails.find(c => c.id === courseId);

    if (quizData && courseData) {
      setQuiz(quizData);
      setCourseName(courseData.title);
      // Initialize answers array with nulls
      setAnswers(new Array(quizData.questions.length).fill(null));
    } else {
      setError('Quiz not found');
    }

    setLoading(false);
  }, [courseId, currentUser, navigate]);

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setShowResults(true);
    
    // Update user's completed courses
    if (currentUser && courseId) {
      try {
        const updatedCompletedCourses = {
          ...currentUser.completedCourses,
          [courseId]: { score: calculatedScore, date: new Date().toISOString() }
        };
        
        await updateUserProfile({ completedCourses: updatedCompletedCourses });
      } catch (error) {
        console.error('Error updating completed courses:', error);
      }
    }
  };

  const handleViewCertificate = () => {
    if (courseId) {
      navigate(`/certificate/${courseId}`);
    }
  };

  const handleReturnToCourse = () => {
    if (courseId) {
      navigate(`/courses/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center">
        <p className="text-xl">Loading quiz...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-gray-600 mb-8">{error || 'Quiz not found'}</p>
          <button 
            onClick={() => navigate('/courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  // Get current question
  const currentQuestion: Question = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {!showResults ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{courseName} - Assessment</h1>
              <p className="text-gray-600 mb-6">
                Answer all 10 questions to complete the course. You need 90% to earn your certificate.
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span>{answers.filter(a => a !== null).length} answered</span>
              </div>
            </div>
            
            <QuizQuestion 
              question={currentQuestion}
              selectedAnswer={answers[currentQuestionIndex]}
              onSelectAnswer={handleSelectAnswer}
              showResults={false}
            />
            
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} className="mr-1" />
                Previous
              </button>
              
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={answers.includes(null)}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                  <ChevronRight size={18} className="ml-1" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
              <p>{courseName}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-8 text-center">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-blue-600">{score}%</span>
                </div>
                
                {score >= 90 ? (
                  <div className="flex items-center justify-center text-green-600 mb-2">
                    <Check size={24} className="mr-2" />
                    <span className="text-xl font-semibold">Passed!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-red-600 mb-2">
                    <X size={24} className="mr-2" />
                    <span className="text-xl font-semibold">Not Passed</span>
                  </div>
                )}
                
                <p className="text-gray-600">
                  {score >= 90 
                    ? 'Congratulations! You have successfully completed this course.' 
                    : 'You need to score at least 90% to pass this assessment.'}
                </p>
              </div>
              
              {score < 90 && (
                <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                  <AlertTriangle size={24} className="text-yellow-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-1">You can try again</h3>
                    <p className="text-yellow-700">
                      Review the course material and attempt the quiz again to improve your score.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {score >= 90 ? (
                  <button
                    onClick={handleViewCertificate}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                  >
                    View Your Certificate
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setCurrentQuestionIndex(0);
                      setAnswers(new Array(quiz.questions.length).fill(null));
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    Try Again
                  </button>
                )}
                
                <button
                  onClick={handleReturnToCourse}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
                >
                  Return to Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;