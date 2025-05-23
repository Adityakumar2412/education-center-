export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  enrolledCourses: string[];
  completedCourses: { [courseId: string]: { score: number; date: string } };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  instructor: string;
  enrolledCount: number;
}

export interface CourseDetail extends Course {
  content: string;
  objectives: string[];
  requirements: string[];
}

export interface Quiz {
  courseId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  score: number;
  issueDate: string;
  directors: {
    director: string;
    coDirector: string;
  };
}