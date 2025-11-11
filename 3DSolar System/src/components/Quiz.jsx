import React, { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Earth", "Mars", "Jupiter"],
      answer: "Mars",
    },
    {
      text: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      answer: "Mercury",
    },
    {
      text: "Which planet has the largest rings?",
      options: ["Saturn", "Uranus", "Jupiter", "Neptune"],
      answer: "Saturn",
    },
    {
      text: "Which planet is known as the Blue Planet?",
      options: ["Earth", "Neptune", "Uranus", "Venus"],
      answer: "Earth",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);

    if (option === questions[current].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect. Correct answer: ${questions[current].answer}`);
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setAnswered(false);
      setFeedback("");
    } else {
      setFinished(true);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button
        onClick={() => setShowQuiz(!showQuiz)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.1)",
          color: "white",
          border: "1px solid #555",
          padding: "8px",
          borderRadius: 6,
          cursor: "pointer",
          marginBottom: 10,
        }}
      >
        {showQuiz ? "❌ Hide Quiz" : "🧠 Show Quiz"}
      </button>

      {showQuiz && (
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            padding: 10,
            borderRadius: 8,
          }}
        >
          {!finished ? (
            <>
              <h3 style={{ color: "#b5e0ff" }}>
                Question {current + 1}
              </h3>
              <p>{questions[current].text}</p>

              {questions[current].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  style={{
                    display: "block",
                    width: "100%",
                    margin: "4px 0",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background:
                      answered && option === questions[current].answer
                        ? "green"
                        : answered &&
                          feedback.includes("❌") &&
                          option !== questions[current].answer
                        ? "#333"
                        : "#222",
                    color: "white",
                    border: "1px solid #444",
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
              ))}

              {answered && (
                <div style={{ marginTop: 8 }}>
                  <p
                    style={{
                      color: feedback.includes("✅") ? "lime" : "red",
                    }}
                  >
                    {feedback}
                  </p>
                  <button
                    onClick={nextQuestion}
                    style={{
                      background: "#444",
                      border: "none",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Next Question →
                  </button>
                </div>
              )}

              <p style={{ color: "#a0b0c0", marginTop: 10 }}>
                ⭐ Score: {score}
              </p>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#b5e0ff",
              }}
            >
              <h3>🎉 Quiz Complete!</h3>
              <p>
                Your final score: {score} / {questions.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
