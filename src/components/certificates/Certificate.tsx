import React, { forwardRef } from 'react';
import { Certificate as CertificateType } from '../../types';

interface CertificateProps {
  certificate: CertificateType;
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ certificate }, ref) => {
    return (
      <div 
        ref={ref}
        className="bg-white border-8 border-blue-100 rounded-lg p-8 shadow-lg max-w-3xl mx-auto text-center"
        style={{ aspectRatio: '1.414/1' }}
      >
        <div className="border-4 border-blue-600 h-full rounded flex flex-col items-center justify-between p-8">
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Education Centre</h1>
            <p className="text-2xl text-gray-600 mb-12">Certificate of Completion</p>
            
            <p className="text-xl text-gray-700 mb-6">This is to certify that</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-gray-300 pb-2 px-8 inline-block">
              {certificate.userName}
            </h2>
            
            <p className="text-xl text-gray-700 mb-6">
              has successfully completed the course
            </p>
            
            <h3 className="text-2xl font-bold text-blue-600 mb-8 px-4">
              {certificate.courseTitle}
            </h3>
            
            <p className="text-xl text-gray-700">
              with a score of <span className="text-green-600 font-bold">{certificate.score}%</span>
            </p>
          </div>
          
          <div className="mt-auto w-full">
            <p className="text-base text-gray-600 mb-12">
              Issued on {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            
            <div className="flex justify-between items-end px-12">
              <div className="text-center">
                <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                <p className="font-bold text-gray-800">{certificate.directors.director}</p>
                <p className="text-gray-600">Director, Education Centre</p>
              </div>
              
              <div className="text-center">
                <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                <p className="font-bold text-gray-800">{certificate.directors.coDirector}</p>
                <p className="text-gray-600">Co-Director, Education Centre</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Certificate;