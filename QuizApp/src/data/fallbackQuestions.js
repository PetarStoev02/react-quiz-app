// Fallback coding questions for when API is unavailable
// Format: statement is TRUE or FALSE

export const fallbackQuestions = {
  easy: [
    {
      id: "e1",
      question: "In JavaScript, '===' checks both value and type equality.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "e2",
      question: "HTML stands for Hyper Text Markup Language.",
      answer: true,
      category: "HTML",
    },
    {
      id: "e3",
      question: "CSS stands for Computer Style Sheets.",
      answer: false,
      category: "CSS",
    },
    {
      id: "e4",
      question: "Python uses curly braces {} to define code blocks.",
      answer: false,
      category: "Python",
    },
    {
      id: "e5",
      question: "Git is a version control system.",
      answer: true,
      category: "Git",
    },
    {
      id: "e6",
      question: "In JavaScript, 'null' and 'undefined' are the same.",
      answer: false,
      category: "JavaScript",
    },
    {
      id: "e7",
      question: "SQL stands for Structured Query Language.",
      answer: true,
      category: "SQL",
    },
    {
      id: "e8",
      question: "React is a JavaScript framework created by Google.",
      answer: false,
      category: "React",
    },
    {
      id: "e9",
      question: "An array index in most programming languages starts at 0.",
      answer: true,
      category: "General",
    },
    {
      id: "e10",
      question: "HTTP stands for Hyper Text Transfer Protocol.",
      answer: true,
      category: "Web",
    },
    {
      id: "e11",
      question: "In Python, lists are immutable.",
      answer: false,
      category: "Python",
    },
    {
      id: "e12",
      question: "JSON stands for JavaScript Object Notation.",
      answer: true,
      category: "Web",
    },
    {
      id: "e13",
      question: "The 'let' keyword in JavaScript creates a block-scoped variable.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "e14",
      question: "In CSS, 'margin' adds space inside an element's border.",
      answer: false,
      category: "CSS",
    },
    {
      id: "e15",
      question: "A boolean data type can have only two values: true or false.",
      answer: true,
      category: "General",
    },
  ],
  medium: [
    {
      id: "m1",
      question: "In JavaScript, Promises can have three states: pending, fulfilled, and rejected.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "m2",
      question: "REST API must always use JSON format for data exchange.",
      answer: false,
      category: "API",
    },
    {
      id: "m3",
      question: "In Python, a decorator is a function that modifies another function.",
      answer: true,
      category: "Python",
    },
    {
      id: "m4",
      question: "Docker containers share the host system's kernel.",
      answer: true,
      category: "DevOps",
    },
    {
      id: "m5",
      question: "In SQL, INNER JOIN returns all rows from both tables.",
      answer: false,
      category: "SQL",
    },
    {
      id: "m6",
      question: "React's useEffect hook runs after every render by default.",
      answer: true,
      category: "React",
    },
    {
      id: "m7",
      question: "Big O notation O(1) means the algorithm's time complexity increases linearly with input size.",
      answer: false,
      category: "Algorithms",
    },
    {
      id: "m8",
      question: "In Git, 'rebase' rewrites commit history.",
      answer: true,
      category: "Git",
    },
    {
      id: "m9",
      question: "TypeScript is a superset of JavaScript.",
      answer: true,
      category: "TypeScript",
    },
    {
      id: "m10",
      question: "In CSS, 'position: fixed' positions an element relative to its parent.",
      answer: false,
      category: "CSS",
    },
    {
      id: "m11",
      question: "A stack data structure follows LIFO (Last In First Out) principle.",
      answer: true,
      category: "Data Structures",
    },
    {
      id: "m12",
      question: "Node.js is single-threaded but uses asynchronous I/O.",
      answer: true,
      category: "Node.js",
    },
    {
      id: "m13",
      question: "In JavaScript, 'const' prevents reassignment but not mutation of objects.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "m14",
      question: "GraphQL requires multiple endpoints for different queries.",
      answer: false,
      category: "API",
    },
    {
      id: "m15",
      question: "A binary search algorithm requires the input array to be sorted.",
      answer: true,
      category: "Algorithms",
    },
  ],
  hard: [
    {
      id: "h1",
      question: "In JavaScript, the event loop processes the microtask queue before the macrotask queue.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "h2",
      question: "TCP guarantees packet delivery in the order they were sent.",
      answer: true,
      category: "Networking",
    },
    {
      id: "h3",
      question: "In Python, the GIL (Global Interpreter Lock) allows multiple threads to execute Python bytecode simultaneously.",
      answer: false,
      category: "Python",
    },
    {
      id: "h4",
      question: "A B-tree is a self-balancing binary search tree.",
      answer: false,
      category: "Data Structures",
    },
    {
      id: "h5",
      question: "In React, the Virtual DOM is faster than directly manipulating the real DOM.",
      answer: true,
      category: "React",
    },
    {
      id: "h6",
      question: "ACID properties in databases include Atomicity, Consistency, Isolation, and Durability.",
      answer: true,
      category: "Databases",
    },
    {
      id: "h7",
      question: "In JavaScript, WeakMap keys must be objects and are weakly referenced.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "h8",
      question: "Kubernetes pods can contain multiple containers that share the same network namespace.",
      answer: true,
      category: "DevOps",
    },
    {
      id: "h9",
      question: "The time complexity of quicksort's worst case is O(n log n).",
      answer: false,
      category: "Algorithms",
    },
    {
      id: "h10",
      question: "In SQL, a covering index includes all columns needed for a query.",
      answer: true,
      category: "SQL",
    },
    {
      id: "h11",
      question: "WebSockets use HTTP for the initial handshake then switch to a persistent TCP connection.",
      answer: true,
      category: "Web",
    },
    {
      id: "h12",
      question: "In functional programming, a pure function can have side effects.",
      answer: false,
      category: "General",
    },
    {
      id: "h13",
      question: "Redis is an in-memory data structure store that can persist data to disk.",
      answer: true,
      category: "Databases",
    },
    {
      id: "h14",
      question: "In JavaScript, Symbol.iterator defines the default iteration behavior for an object.",
      answer: true,
      category: "JavaScript",
    },
    {
      id: "h15",
      question: "OAuth 2.0 is an authentication protocol.",
      answer: false,
      category: "Security",
    },
  ],
};

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions for a specific difficulty
export function getQuestions(difficulty, count = 10) {
  const questions = fallbackQuestions[difficulty] || fallbackQuestions.easy;
  return shuffleArray(questions).slice(0, count);
}
