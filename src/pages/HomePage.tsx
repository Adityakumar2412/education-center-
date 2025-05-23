import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, GraduationCap } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import CourseCard from '../components/courses/CourseCard';

const HomePage: React.FC = () => {
  // Get featured courses (first 3)
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Education for Everyone, Everywhere
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Access over 100+ high-quality courses across Programming, Business, Design, Finance, and Marketing – completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/courses" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors inline-flex items-center justify-center"
                >
                  Explore Courses <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link 
                  to="/register" 
                  className="bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-3 rounded-md font-medium text-lg transition-colors inline-flex items-center justify-center"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg" 
                alt="Students learning online" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Education Centre?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Free High-Quality Courses</h3>
              <p className="text-gray-600">
                All our courses are completely free, professionally designed, and regularly updated with the latest content.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience in their respective fields.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Professional Certificates</h3>
              <p className="text-gray-600">
                Earn recognized certificates upon completion to showcase your skills and knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Courses</h2>
            <Link 
              to="/courses" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
            >
              View All Courses <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <GraduationCap size={64} className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl mb-10 text-blue-100">
              Join thousands of learners from around the world who are advancing their careers with Education Centre.
            </p>
            <Link 
              to="/register" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-md font-medium text-lg transition-colors inline-flex items-center"
            >
              Get Started Now <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;