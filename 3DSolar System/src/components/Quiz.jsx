import React, { useState, useEffect } from "react";
import "./quizmodel.css";

// 🧠 MASTER QUESTION BANK
const QUESTION_BANK = [
  { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Neptune"], answer: "Mars" },
  { q: "Which planet has the most moons?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Saturn" },
  { q: "What is the center of the Solar System?", options: ["Earth", "Sun", "Moon", "Jupiter"], answer: "Sun" },
  { q: "Which planet is called the Blue Planet?", options: ["Earth", "Uranus", "Saturn", "Mars"], answer: "Earth" },
  { q: "Which planet has rings?", options: ["Mercury", "Mars", "Saturn", "Venus"], answer: "Saturn" },
  { q: "What is the name of Earth’s natural satellite?", options: ["Io", "Moon", "Europa", "Phobos"], answer: "Moon" },
  { q: "Which planet is the biggest?", options: ["Earth", "Jupiter", "Mars", "Neptune"], answer: "Jupiter" },
  { q: "What gas makes up most of the Sun?", options: ["Oxygen", "Nitrogen", "Hydrogen", "Helium"], answer: "Hydrogen" },
  { q: "Which dwarf planet is in the Kuiper Belt?", options: ["Ceres", "Pluto", "Haumea", "Makemake"], answer: "Pluto" },
  { q: "What causes seasons on Earth?", options: ["Earth’s tilt", "Moon", "Gravity", "Earth’s distance"], answer: "Earth’s tilt" },
  {
  q: "Which planet has the fastest rotation period?",
  options: ["Earth", "Jupiter", "Mars", "Venus"],
  answer: "Jupiter",
},
{
  q: "What is the main component of Jupiter’s atmosphere?",
  options: ["Carbon Dioxide", "Hydrogen", "Oxygen", "Methane"],
  answer: "Hydrogen",
},
{
  q: "Which planet has the longest day compared to its year?",
  options: ["Venus", "Mercury", "Earth", "Mars"],
  answer: "Venus",
},
{
  q: "Which planet is known for its Great Red Spot?",
  options: ["Earth", "Mars", "Jupiter", "Neptune"],
  answer: "Jupiter",
},
{
  q: "Which planet is famous for its blue color due to methane?",
  options: ["Mars", "Neptune", "Earth", "Uranus"],
  answer: "Neptune",
},
{
  q: "What is the asteroid belt mainly composed of?",
  options: ["Ice blocks", "Rock and metal", "Gas clouds", "Lava"],
  answer: "Rock and metal",
},
{
  q: "Which planet has a moon called Titan?",
  options: ["Jupiter", "Earth", "Neptune", "Saturn"],
  answer: "Saturn",
},
{
  q: "Which planet is tilted almost 98 degrees on its side?",
  options: ["Earth", "Uranus", "Mars", "Neptune"],
  answer: "Uranus",
},
{
  q: "Where is the Kuiper Belt located?",
  options: [
    "Between Earth and Mars",
    "Beyond Neptune",
    "Between Jupiter and Saturn",
    "Around the Sun’s poles"
  ],
  answer: "Beyond Neptune",
},
{
  q: "Which planet is known as the Morning Star or Evening Star?",
  options: ["Mercury", "Venus", "Mars", "Jupiter"],
  answer: "Venus",
},
{
  q: "What protects Earth from harmful solar radiation?",
  options: ["Magnetic field", "Atmosphere", "Oceans", "Mountains"],
  answer: "Magnetic field",
},
{
  q: "Which planet has the highest mountain in the solar system (Olympus Mons)?",
  options: ["Mars", "Earth", "Venus", "Jupiter"],
  answer: "Mars",
},
{
  q: "The Sun is made mostly of hydrogen and ______?",
  options: ["Carbon", "Helium", "Oxygen", "Nitrogen"],
  answer: "Helium",
},
{
  q: "Which planet has winds faster than 1,500 km/h?",
  options: ["Earth", "Neptune", "Mars", "Mercury"],
  answer: "Neptune",
},
{
  q: "What is the coldest planet in the solar system?",
  options: ["Pluto", "Uranus", "Neptune", "Saturn"],
  answer: "Uranus",
}

];

// ❗ Track used questions for 3 quiz cycles
let usedQuestions = [];
let quizCount = 0;

export default function Quiz({ onClose }) {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  // ⭐ Generate new quiz questions (ALWAYS 5)
  const generateQuiz = () => {
    if (quizCount === 5) {
      usedQuestions = [];
      quizCount = 0;
    }

    let available = QUESTION_BANK.filter(q => !usedQuestions.includes(q.q));

    // if fewer than 5 available → reset pool
    if (available.length < 5) {
      usedQuestions = [];
      available = QUESTION_BANK;
    }

    const selected = [...available]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    usedQuestions.push(...selected.map(q => q.q));
    quizCount++;

    return selected;
  };

  // ⭐ Load new quiz when opened
  useEffect(() => {
    setQuestions(generateQuiz());
  }, []);

  const handleAnswer = (opt) => {
    setSelectedOption(opt);
    setAnswered(true);
    if (opt === questions[step].answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (step === 4) {
      setFinished(true);
    } else {
      setStep(step + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  };

  const getMessage = () => {
    if (score === 5) return "🌟 Amazing! You're a Solar System Genius!";
    if (score >= 3) return "⭐ Great job! You're learning quickly!";
    return "Keep going! You'll get better!";
  };

  if (questions.length === 0) return null; // Prevent crash

  return (
    <div className="quiz-overlay">
      <div className="quiz-box">
        {!finished ? (
          <>
            <h2>Solar System Quiz</h2>
            <h3>Question {step + 1}/5</h3>

            <p className="quiz-question">{questions[step].q}</p>

            <div className="quiz-options">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  className={
                    answered
                      ? opt === questions[step].answer
                        ? "correct"
                        : opt === selectedOption
                        ? "wrong"
                        : ""
                      : ""
                  }
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <button className="next-btn" onClick={nextQuestion}>
                Next
              </button>
            )}
          </>
        ) : (
          <>
            <h2>Quiz Completed!</h2>
            <h3>Your Score: {score}/5</h3>
            <p className="message">{getMessage()}</p>

            <button className="close-btn" onClick={onClose}>
              Exit Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
