import React from 'react';
import { Mail, Phone, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold">Education Centre</h3>
            </div>
            <p className="text-gray-300">
              Education for Everyone, Everywhere.
            </p>
            <p className="text-gray-300">
              Making high-quality education free and accessible to all.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-blue-400 transition-colors">Courses</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-blue-400 transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-300">+91 9523340408</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <a 
                  href="mailto:adityakumar9523340408@gmail.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors break-all"
                >
                  adityakumar9523340408@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Education Centre. All rights reserved.</p>
          <p className="mt-2">
            Director: Aditya Kumar | Co-Director: Lekh Raj Soni
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;