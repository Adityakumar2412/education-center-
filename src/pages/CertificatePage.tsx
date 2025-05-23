import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Certificate from '../components/certificates/Certificate';
import { mockCourseDetails } from '../data/mockData';
import { Certificate as CertificateType } from '../types';

const CertificatePage: React.FC = () => {
  const { courseId } = useParams<{courseId: string}>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [certificate, setCertificate] = useState<CertificateType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!courseId || !currentUser) {
      setError('Invalid course or user');
      setLoading(false);
      return;
    }

    const courseCompletion = currentUser.completedCourses[courseId];
    
    // Check if user has completed the course with a passing score
    if (!courseCompletion || courseCompletion.score < 90) {
      navigate(`/courses/${courseId}`);
      return;
    }

    const course = mockCourseDetails.find(c => c.id === courseId);
    
    if (course) {
      // Create certificate data
      const certificateData: CertificateType = {
        id: `cert-${currentUser.id}-${courseId}`,
        userId: currentUser.id,
        userName: currentUser.name,
        courseId: courseId,
        courseTitle: course.title,
        score: courseCompletion.score,
        issueDate: courseCompletion.date,
        directors: {
          director: 'Aditya Kumar',
          coDirector: 'Lekh Raj Soni'
        }
      };
      
      setCertificate(certificateData);
    } else {
      setError('Course not found');
    }
    
    setLoading(false);
  }, [courseId, currentUser, navigate]);

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('In a production environment, this would download a PDF certificate.');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('In a production environment, this would open sharing options.');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center">
        <p className="text-xl">Loading certificate...</p>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-gray-600 mb-8">{error || 'Certificate not found'}</p>
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
    <div className="min-h-screen bg-gray-100 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={() => navigate(`/courses/${courseId}`)}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Course
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Download size={18} className="mr-2" />
              Download
            </button>
            <button
              onClick={handleShare}
              className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Share2 size={18} className="mr-2" />
              Share
            </button>
          </div>
        </div>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Certificate</h1>
          <p className="text-gray-600">
            Congratulations on completing <strong>{certificate.courseTitle}</strong> with a score of <strong>{certificate.score}%</strong>!
            This certificate is a recognition of your achievement and can be shared with others.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Certificate ref={certificateRef} certificate={certificate} />
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;