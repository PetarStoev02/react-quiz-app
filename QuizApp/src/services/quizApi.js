import { getQuestions as getFallbackQuestions } from "../data/fallbackQuestions";

const API_KEY = process.env.REACT_APP_QUIZ_API_KEY;
const API_URL = "https://quizapi.io/api/v1/questions";

// Convert QuizAPI response to our format
function convertApiQuestion(apiQuestion) {
  // QuizAPI provides multiple choice, we need to convert to true/false
  // We'll create a statement from the question that can be true or false
  const correctAnswer = Object.entries(apiQuestion.correct_answers).find(
    ([key, value]) => value === "true"
  );

  if (!correctAnswer) return null;

  const answerKey = correctAnswer[0].replace("_correct", "");
  const correctAnswerText = apiQuestion.answers[answerKey];

  // Create a true/false statement
  const isTrue = Math.random() > 0.5;
  let statement;

  if (isTrue) {
    statement = `${apiQuestion.question.replace("?", ".")} The answer is "${correctAnswerText}".`;
  } else {
    // Get a wrong answer
    const wrongAnswers = Object.entries(apiQuestion.answers).filter(
      ([key, value]) => value && key !== answerKey
    );
    if (wrongAnswers.length > 0) {
      const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)][1];
      statement = `${apiQuestion.question.replace("?", ".")} The answer is "${wrongAnswer}".`;
    } else {
      statement = `${apiQuestion.question.replace("?", ".")} The answer is NOT "${correctAnswerText}".`;
    }
  }

  return {
    id: apiQuestion.id.toString(),
    question: statement,
    answer: isTrue,
    category: apiQuestion.category || apiQuestion.tags?.[0]?.name || "General",
  };
}

// Fetch questions from QuizAPI
export async function fetchQuestions(difficulty = "easy", limit = 10) {
  // If no API key, use fallback immediately
  if (!API_KEY) {
    console.log("No API key found, using fallback questions");
    return getFallbackQuestions(difficulty, limit);
  }

  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      limit: limit.toString(),
      difficulty: difficulty,
    });

    const response = await fetch(`${API_URL}?${params}`, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No questions returned from API");
    }

    // Convert API questions to our format
    const convertedQuestions = data
      .map(convertApiQuestion)
      .filter((q) => q !== null);

    if (convertedQuestions.length < limit) {
      // Supplement with fallback questions if not enough from API
      const fallbackNeeded = limit - convertedQuestions.length;
      const fallback = getFallbackQuestions(difficulty, fallbackNeeded);
      return [...convertedQuestions, ...fallback];
    }

    return convertedQuestions;
  } catch (error) {
    console.error("Failed to fetch from API, using fallback:", error);
    return getFallbackQuestions(difficulty, limit);
  }
}

const quizApi = { fetchQuestions };
export default quizApi;
