import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { mockCourseDetails } from '../data/mockData';
import { CourseDetail } from '../types';
import { useAuth } from '../contexts/AuthContext';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{courseId: string}>();
  const navigate = useNavigate();
  const { currentUser, updateUserProfile } = useAuth();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Find the course
    const foundCourse = mockCourseDetails.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Check if user is enrolled
      if (currentUser) {
        setIsEnrolled(currentUser.enrolledCourses.includes(foundCourse.id));
        setHasCompleted(currentUser.completedCourses[foundCourse.id] !== undefined);
      }
    }
    
    setLoading(false);
  }, [courseId, currentUser]);

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }
    
    if (!course) return;
    
    try {
      // Update enrolled courses if not already enrolled
      if (!isEnrolled) {
        const updatedEnrolledCourses = [...currentUser.enrolledCourses, course.id];
        await updateUserProfile({ enrolledCourses: updatedEnrolledCourses });
        setIsEnrolled(true);
      }
      
      // Navigate to quiz
      navigate(`/quiz/${courseId}`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center">
        <p className="text-xl">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
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

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <span className="inline-block bg-blue-600 px-3 py-1 text-sm font-medium rounded-md mb-3">
                  {course.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-white/80 text-lg">{course.description}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-wrap gap-6 border-b border-gray-200">
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users size={18} className="mr-2" />
              <span>{course.enrolledCount.toLocaleString()} enrolled</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen size={18} className="mr-2" />
              <span>Instructor: {course.instructor}</span>
            </div>
            {hasCompleted && (
              <div className="flex items-center text-green-600">
                <CheckCircle2 size={18} className="mr-2" />
                <span>Completed</span>
              </div>
            )}
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-2xl font-bold text-blue-600">Free</p>
              <p className="text-gray-600">Lifetime access</p>
            </div>
            
            <button 
              onClick={handleEnroll}
              className={`${
                hasCompleted 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-8 py-3 rounded-md font-medium text-lg transition-colors`}
            >
              {hasCompleted 
                ? 'View Certificate' 
                : isEnrolled 
                  ? 'Continue to Quiz' 
                  : 'Enroll Now'}
            </button>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About the Course */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
              <div className="prose max-w-none text-gray-700">
                {course.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 size={20} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Requirements */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Course Certificate */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Course Certificate</h2>
              <div className="flex items-center mb-4">
                <Award size={24} className="text-blue-600 mr-3" />
                <span className="text-gray-700 font-medium">Education Centre Certificate</span>
              </div>
              <p className="text-gray-600 mb-4">
                Complete the course and score 90% or higher on the assessment to earn your certificate.
              </p>
              <div className="bg-white p-4 rounded-md border border-blue-200">
                <p className="text-sm text-gray-600">
                  Certificates include:
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Your name</li>
                  <li>• Course title</li>
                  <li>• Completion date</li>
                  <li>• Official signatures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Award } from 'lucide-react';

export default CourseDetailPage;