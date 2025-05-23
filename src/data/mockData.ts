import { User, Course, CourseDetail, Quiz } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    photoURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    enrolledCourses: ['course1', 'course2'],
    completedCourses: {
      'course1': { score: 95, date: '2025-04-15T14:48:00.000Z' }
    }
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    photoURL: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    enrolledCourses: ['course3'],
    completedCourses: {}
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course1',
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming language and build interactive web applications.',
    category: 'Programming',
    image: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
    duration: '6 weeks',
    instructor: 'Dr. Sarah Johnson',
    enrolledCount: 1245
  },
  {
    id: 'course2',
    title: 'Digital Marketing Fundamentals',
    description: 'Master the key concepts of digital marketing, including SEO, social media, and content marketing.',
    category: 'Marketing',
    image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    duration: '4 weeks',
    instructor: 'Alex Thompson',
    enrolledCount: 879
  },
  {
    id: 'course3',
    title: 'Financial Planning for Beginners',
    description: 'Learn the basics of personal finance, budgeting, and investment strategies for a secure future.',
    category: 'Finance',
    image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
    duration: '5 weeks',
    instructor: 'Michael Rivera',
    enrolledCount: 1056
  },
  {
    id: 'course4',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design to create effective digital products.',
    category: 'Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    duration: '8 weeks',
    instructor: 'Emma Wilson',
    enrolledCount: 742
  },
  {
    id: 'course5',
    title: 'Business Strategy and Management',
    description: 'Explore key business strategies and management techniques to drive organizational success.',
    category: 'Business',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    duration: '7 weeks',
    instructor: 'Robert Chen',
    enrolledCount: 935
  },
  {
    id: 'course6',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning applications.',
    category: 'Programming',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    duration: '10 weeks',
    instructor: 'Dr. James Peterson',
    enrolledCount: 1876
  },
  {
    id: 'course7',
    title: 'Advanced React Development',
    description: 'Master advanced React concepts including hooks, context, and performance optimization.',
    category: 'Programming',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
    duration: '8 weeks',
    instructor: 'Emily Chen',
    enrolledCount: 1532
  },
  {
    id: 'course8',
    title: 'Social Media Marketing Strategy',
    description: 'Create effective social media marketing campaigns and build brand presence online.',
    category: 'Marketing',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    duration: '6 weeks',
    instructor: 'Sophie Martinez',
    enrolledCount: 2145
  },
  {
    id: 'course9',
    title: 'Investment Strategies',
    description: 'Learn advanced investment techniques and portfolio management strategies.',
    category: 'Finance',
    image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
    duration: '7 weeks',
    instructor: 'William Turner',
    enrolledCount: 1678
  },
  {
    id: 'course10',
    title: 'Mobile App Design',
    description: 'Master the principles of mobile app design and create engaging user experiences.',
    category: 'Design',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    duration: '9 weeks',
    instructor: 'Lisa Wong',
    enrolledCount: 1234
  }
  // Additional courses continued...
];

// Mock Course Details
export const mockCourseDetails: CourseDetail[] = [
  {
    id: 'course1',
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming language and build interactive web applications.',
    category: 'Programming',
    image: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
    duration: '6 weeks',
    instructor: 'Dr. Sarah Johnson',
    enrolledCount: 1245,
    content: `
      This comprehensive course will take you from JavaScript basics to advanced concepts. 
      
      You'll learn about variables, data types, functions, objects, arrays, DOM manipulation, 
      events, asynchronous programming with promises, and modern ES6+ features.
      
      The course includes practical projects that will help you apply your knowledge to 
      real-world scenarios and build a portfolio of JavaScript applications.
    `,
    objectives: [
      'Understand JavaScript syntax and fundamentals',
      'Create dynamic and interactive web pages',
      'Master DOM manipulation and event handling',
      'Learn asynchronous programming with Promises and async/await',
      'Build complete web applications with JavaScript'
    ],
    requirements: [
      'Basic knowledge of HTML and CSS',
      'No prior JavaScript experience required',
      'A computer with a modern web browser',
      'Text editor (VSCode recommended)'
    ]
  },
  {
    id: 'course2',
    title: 'Digital Marketing Fundamentals',
    description: 'Master the key concepts of digital marketing, including SEO, social media, and content marketing.',
    category: 'Marketing',
    image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    duration: '4 weeks',
    instructor: 'Alex Thompson',
    enrolledCount: 879,
    content: `
      This course covers all essential aspects of digital marketing that you need to know to 
      promote products and services effectively in the digital age.
      
      You'll learn how to develop a digital marketing strategy, optimize websites for search engines, 
      create engaging social media campaigns, implement effective email marketing, and analyze 
      marketing performance using various tools.
      
      By the end of this course, you'll be equipped with the knowledge and skills to plan and 
      execute successful digital marketing campaigns across multiple channels.
    `,
    objectives: [
      'Develop a comprehensive digital marketing strategy',
      'Master SEO techniques to improve website visibility',
      'Create effective social media marketing campaigns',
      'Implement successful email marketing strategies',
      'Analyze marketing performance using analytics tools'
    ],
    requirements: [
      'No prior marketing experience required',
      'Basic computer skills',
      'Interest in digital marketing and social media'
    ]
  },
  {
    id: 'course3',
    title: 'Financial Planning for Beginners',
    description: 'Learn the basics of personal finance, budgeting, and investment strategies for a secure future.',
    category: 'Finance',
    image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
    duration: '5 weeks',
    instructor: 'Michael Rivera',
    enrolledCount: 1056,
    content: `
      This course provides a comprehensive introduction to personal financial planning, helping you 
      take control of your finances and build a secure financial future.
      
      You'll learn essential concepts like budgeting, debt management, saving strategies, investment 
      basics, retirement planning, and tax planning. The course emphasizes practical applications 
      with real-world examples and interactive exercises.
      
      By the end of the course, you'll have developed a personalized financial plan and gained the 
      confidence to make informed financial decisions.
    `,
    objectives: [
      'Create and maintain an effective personal budget',
      'Understand different types of investments and their risks',
      'Develop strategies for debt reduction and management',
      'Plan for retirement and long-term financial goals',
      'Make informed decisions about insurance and tax planning'
    ],
    requirements: [
      'No prior finance knowledge required',
      'Basic math skills',
      'Interest in improving personal finances'
    ]
  },
  {
    id: 'course4',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design to create effective digital products.',
    category: 'Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    duration: '8 weeks',
    instructor: 'Emma Wilson',
    enrolledCount: 742,
    content: `
      Master the principles of user interface and user experience design to create 
      intuitive and engaging digital products that users love.
      
      Learn about user research, wireframing, prototyping, usability testing, and 
      design systems. Work on real-world projects and build a professional portfolio.
    `,
    objectives: [
      'Understand core UI/UX design principles',
      'Create user-centered designs',
      'Master popular design tools',
      'Conduct effective user research',
      'Build and test prototypes'
    ],
    requirements: [
      'No prior design experience needed',
      'Basic computer skills',
      'Interest in digital design'
    ]
  },
  // Add more course details as needed...
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    courseId: 'course1',
    questions: [
      {
        id: 'q1',
        text: 'What does JavaScript primarily run on?',
        options: ['Server', 'Browser', 'Database', 'Operating System'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'Which of the following is not a JavaScript data type?',
        options: ['String', 'Boolean', 'Character', 'Number'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        text: 'Which operator is used for strict equality comparison in JavaScript?',
        options: ['==', '===', '=', '!='],
        correctAnswer: 1
      },
      {
        id: 'q4',
        text: 'What will console.log(typeof []) output?',
        options: ['array', 'object', 'undefined', 'null'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: 'Which method adds a new element to the end of an array?',
        options: ['push()', 'pop()', 'unshift()', 'shift()'],
        correctAnswer: 0
      },
      {
        id: 'q6',
        text: 'What is a closure in JavaScript?',
        options: [
          'A way to close a browser window',
          'A function that has access to variables from its outer scope',
          'A method to stop event propagation',
          'A way to close database connections'
        ],
        correctAnswer: 1
      },
      {
        id: 'q7',
        text: 'Which statement is used to handle exceptions in JavaScript?',
        options: ['if-else', 'for-in', 'try-catch', 'switch-case'],
        correctAnswer: 2
      },
      {
        id: 'q8',
        text: 'What does the "this" keyword refer to in JavaScript?',
        options: [
          'The current function',
          'The global object',
          'The object that is executing the current function',
          'The parent object'
        ],
        correctAnswer: 2
      },
      {
        id: 'q9',
        text: 'Which method is used to convert a JSON string to a JavaScript object?',
        options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'],
        correctAnswer: 1
      },
      {
        id: 'q10',
        text: 'What is the output of: console.log(2 + "2")?',
        options: ['4', '22', 'TypeError', '"22"'],
        correctAnswer: 1
      }
    ]
  },
  {
    courseId: 'course2',
    questions: [
      {
        id: 'q1',
        text: 'What does SEO stand for?',
        options: [
          'Search Engine Optimization',
          'Search Engine Organizer',
          'Search Engagement Optimization',
          'Social Engine Optimization'
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: 'Which of the following is NOT a popular social media platform for business marketing?',
        options: ['Facebook', 'Instagram', 'Napster', 'LinkedIn'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        text: 'What is a key metric for measuring email marketing success?',
        options: ['Social shares', 'Open rate', 'Number of images', 'Font size'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        text: 'What is a backlink in SEO terminology?',
        options: [
          'A link to return to the previous page',
          'A link from another website to your website',
          'A broken link',
          'A link to your website\'s backup'
        ],
        correctAnswer: 1
      },
      {
        id: 'q5',
        text: 'Which of the following best describes content marketing?',
        options: [
          'Paying for advertisements on search engines',
          'Creating and sharing valuable content to attract an audience',
          'Sending direct mail to potential customers',
          'Cold calling potential leads'
        ],
        correctAnswer: 1
      },
      {
        id: 'q6',
        text: 'What is a Call to Action (CTA)?',
        options: [
          'A phone number for customer support',
          'An instruction to the audience to take a specific action',
          'A type of advertisement',
          'A marketing team meeting'
        ],
        correctAnswer: 1
      },
      {
        id: 'q7',
        text: 'Which tool would you use to analyze website traffic?',
        options: ['Microsoft Word', 'Google Analytics', 'Adobe Photoshop', 'Gmail'],
        correctAnswer: 1
      },
      {
        id: 'q8',
        text: 'What does PPC stand for in digital marketing?',
        options: ['Pay Per Click', 'Price Per Customer', 'Page Per Content', 'Permanent Platform Content'],
        correctAnswer: 0
      },
      {
        id: 'q9',
        text: 'Which of the following is an example of organic marketing?',
        options: [
          'Paid search ads',
          'Sponsored social media posts',
          'Blog posts optimized for SEO',
          'Display advertising'
        ],
        correctAnswer: 2
      },
      {
        id: 'q10',
        text: 'What is the primary purpose of a landing page?',
        options: [
          'To provide company information',
          'To collect visitor information through a form',
          'To list all products and services',
          'To show the company\'s history'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    courseId: 'course3',
    questions: [
      {
        id: 'q1',
        text: 'What is the first step in creating a budget?',
        options: [
          'Track your expenses',
          'Set financial goals',
          'Calculate your income',
          'Open a savings account'
        ],
        correctAnswer: 2
      },
      {
        id: 'q2',
        text: 'Which type of investment typically offers the highest potential returns over the long term?',
        options: ['Bonds', 'Stocks', 'Savings accounts', 'Certificates of deposit'],
        correctAnswer: 1
      },
      // Add more questions for course3...
    ]
  },
  {
    courseId: 'course4',
    questions: [
      {
        id: 'q1',
        text: 'What is the primary goal of user interface design?',
        options: [
          'Make the application look beautiful',
          'Create an intuitive and efficient user experience',
          'Use the latest design trends',
          'Minimize development costs'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'Which of the following is a key principle of user experience design?',
        options: [
          'Using as many features as possible',
          'Making the interface visually complex',
          'Keeping the user in control',
          'Avoiding user testing'
        ],
        correctAnswer: 2
      },
      // Add more questions for course4...
    ]
  }
  // Add more quizzes as needed...
];