import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  // Use basename only in production (GitHub Pages)
  const basename = process.env.NODE_ENV === 'production' ? '/react-quiz-app' : '';

  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-terminal-dark">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
