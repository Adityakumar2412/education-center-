import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, Award, CheckCircle2, Edit, Save, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [activeTab, setActiveTab] = useState('profile');

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your profile.</p>
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  // Get enrolled courses
  const enrolledCourses = mockCourses.filter(course => 
    currentUser.enrolledCourses.includes(course.id)
  );

  // Get completed courses
  const completedCourses = enrolledCourses.filter(course => 
    currentUser.completedCourses[course.id] !== undefined
  );

  // Get certificates (courses with score >= 90)
  const certificates = completedCourses.filter(course => 
    currentUser.completedCourses[course.id].score >= 90
  );

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({ name });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-blue-600" />
                )}
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold mb-2">{currentUser.name}</h1>
                <p className="text-blue-100">{currentUser.email}</p>
                
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">{enrolledCourses.length}</span>
                    Enrolled Courses
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">{completedCourses.length}</span>
                    Completed
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">{certificates.length}</span>
                    Certificates
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User size={16} className="inline mr-1" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'courses'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <BookOpen size={16} className="inline mr-1" />
                My Courses
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'certificates'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Award size={16} className="inline mr-1" />
                Certificates
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <Save size={18} className="mr-1" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit size={18} className="mr-1" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="space-y-6">
                  {isEditing ? (
                    <>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Profile Picture
                        </label>
                        <div className="mt-1 flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                            {currentUser.photoURL ? (
                              <img src={currentUser.photoURL} alt={currentUser.name} className="w-full h-full object-cover" />
                            ) : (
                              <User size={24} className="text-gray-400" />
                            )}
                          </div>
                          <button
                            type="button"
                            className="flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Image size={16} className="mr-1" />
                            Change
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Note: In this demo, you cannot actually change your profile picture.
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                        <p className="text-base text-gray-900">{currentUser.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                        <p className="text-base text-gray-900">{currentUser.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Courses Enrolled</h3>
                        <p className="text-base text-gray-900">{enrolledCourses.length}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Certificates Earned</h3>
                        <p className="text-base text-gray-900">{certificates.length}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">My Courses</h2>
                
                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses.map(course => {
                      const isCompleted = currentUser.completedCourses[course.id] !== undefined;
                      const score = isCompleted ? currentUser.completedCourses[course.id].score : null;
                      
                      return (
                        <div key={course.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {course.title}
                              </h3>
                              {isCompleted && (
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  score && score >= 90 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {score && score >= 90 ? 'Passed' : 'Not Passed'}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4">
                              {course.category} • {course.duration}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              {isCompleted ? (
                                <div className="flex items-center text-gray-600 text-sm">
                                  <CheckCircle2 size={16} className={`mr-1 ${
                                    score && score >= 90 ? 'text-green-500' : 'text-yellow-500'
                                  }`} />
                                  <span>Score: {score}%</span>
                                </div>
                              ) : (
                                <div className="text-gray-600 text-sm">Not completed</div>
                              )}
                              
                              <Link 
                                to={isCompleted && score && score >= 90 
                                  ? `/certificate/${course.id}` 
                                  : `/quiz/${course.id}`
                                }
                                className={`px-3 py-1 rounded-md text-sm font-medium ${
                                  isCompleted && score && score >= 90
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                              >
                                {isCompleted && score && score >= 90 
                                  ? 'View Certificate' 
                                  : isCompleted 
                                    ? 'Retake Quiz' 
                                    : 'Start Quiz'
                                }
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No courses yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't enrolled in any courses yet.
                    </p>
                    <Link 
                      to="/courses" 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">My Certificates</h2>
                
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map(course => {
                      const completionData = currentUser.completedCourses[course.id];
                      
                      return (
                        <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-4 border-b border-gray-200 bg-blue-50">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {course.title}
                              </h3>
                              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                                {completionData.score}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center mb-3 text-sm text-gray-600">
                              <Award size={16} className="mr-1 text-blue-600" />
                              <span>Issued on {new Date(completionData.date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <span className="text-sm text-gray-500">Education Centre</span>
                              <Link 
                                to={`/certificate/${course.id}`}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Certificate →
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Award size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No certificates yet</h3>
                    <p className="text-gray-600 mb-6">
                      Complete courses with a score of 90% or higher to earn certificates.
                    </p>
                    <Link 
                      to="/courses" 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;