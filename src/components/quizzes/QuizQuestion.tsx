import React from 'react';
import { Question } from '../../types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (optionIndex: number) => void;
  showResults: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResults
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = showResults && index === question.correctAnswer;
          const isIncorrect = showResults && isSelected && index !== question.correctAnswer;
          
          let optionClasses = "border rounded-md p-4 transition-all cursor-pointer";
          
          if (isSelected) {
            optionClasses += " border-blue-500 bg-blue-50";
          } else {
            optionClasses += " border-gray-200 hover:border-blue-300 hover:bg-blue-50";
          }
          
          if (showResults) {
            if (isCorrect) {
              optionClasses = "border rounded-md p-4 border-green-500 bg-green-50";
            } else if (isIncorrect) {
              optionClasses = "border rounded-md p-4 border-red-500 bg-red-50";
            }
          }
          
          return (
            <div 
              key={index}
              className={optionClasses}
              onClick={() => !showResults && onSelectAnswer(index)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <span>✓</span>}
                  </div>
                </div>
                <span className="text-gray-700">{option}</span>
                {showResults && isCorrect && (
                  <span className="ml-auto text-green-600">Correct</span>
                )}
                {showResults && isIncorrect && (
                  <span className="ml-auto text-red-600">Incorrect</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;