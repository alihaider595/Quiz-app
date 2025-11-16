const questions = [
  {
    question: "What type of language is JavaScript?",
    answer: [
      { text: "Programming", correct: false },
      { text: "Scripting", correct: true },
      { text: "Markup", correct: false },
      { text: "Styling", correct: false }
    ]
  },
  {
    question: "What does console.log() do?",
    answer: [
      { text: "Shows a popup", correct: false },
      { text: "Changes the webpage", correct: false },
      { text: "Prints output to the console", correct: true },
      { text: "Deletes a variable", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answer: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "all of these", correct: true }
    ]
  },
  {
    question: "Which brackets are used for arrays?",
    answer: [
      { text: "{}", correct: false },
      { text: "()", correct: false },
      { text: "[]", correct: true },
      { text: "<>", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  answerButtons.innerHTML = "";
  const currentQuestion = questions[currentIndex];
  questionElement.innerText = `${currentIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answer.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.classList.add("btn");
    btn.dataset.correct = ans.correct;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });

  nextButton.style.display = "none";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  if (!isCorrect) {
    Array.from(answerButtons.children).forEach(btn => {
      if (btn.dataset.correct === "true") btn.classList.add("correct");
      else btn.classList.add("wrong");
    });
  }

  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    questionElement.innerText = `Quiz Finished! Your score: ${score}/${questions.length}`;
    answerButtons.innerHTML = "";
    nextButton.innerText = "Restart";
    nextButton.onclick = startQuiz;
  }
});

startQuiz();
