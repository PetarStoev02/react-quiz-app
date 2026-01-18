import { useState, useCallback, useEffect } from "react";
import { fetchQuestions } from "../services/quizApi";

export function useQuiz(difficulty = "easy", questionCount = 10) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  // Load questions when difficulty changes
  useEffect(() => {
    let mounted = true;

    async function loadQuestions() {
      setIsLoading(true);
      setError(null);

      try {
        const loadedQuestions = await fetchQuestions(difficulty, questionCount);

        if (mounted) {
          setQuestions(loadedQuestions);
          setCurrentIndex(0);
          setScore(0);
          setAnswers([]);
          setIsComplete(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load questions");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
    };
  }, [difficulty, questionCount]);

  // Get current question
  const currentQuestion = questions[currentIndex] || null;

  // Check if there are more questions
  const hasMoreQuestions = currentIndex < questions.length - 1;

  // Progress percentage
  const progress = questions.length > 0
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  // Answer the current question
  const answerQuestion = useCallback(
    (userAnswer) => {
      if (!currentQuestion || isComplete) return;

      const isCorrect = userAnswer === currentQuestion.answer;

      // Record the answer
      const answerRecord = {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        correctAnswer: currentQuestion.answer,
        userAnswer,
        isCorrect,
        category: currentQuestion.category,
      };

      setAnswers((prev) => [...prev, answerRecord]);

      // Update score if correct
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      // Move to next question or complete
      if (hasMoreQuestions) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }

      return isCorrect;
    },
    [currentQuestion, hasMoreQuestions, isComplete]
  );

  // Reset the quiz
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
  }, []);

  // Reload questions (for new game with same difficulty)
  const reloadQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedQuestions = await fetchQuestions(difficulty, questionCount);
      setQuestions(loadedQuestions);
      resetQuiz();
    } catch (err) {
      setError(err.message || "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  }, [difficulty, questionCount, resetQuiz]);

  return {
    // State
    questions,
    currentQuestion,
    currentIndex,
    score,
    answers,
    isLoading,
    error,
    isComplete,
    progress,
    totalQuestions: questions.length,

    // Actions
    answerQuestion,
    resetQuiz,
    reloadQuestions,
  };
}

export default useQuiz;
