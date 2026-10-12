
const questions = [
    {
        question: "Which language is used to structure a web page?",
        answers: [
            { text: "HTML", correct: true },
            { text: "CSS", correct: false },
            { text: "Python", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which language is mainly used to style a web page?",
        answers: [
            { text: "Java", correct: false },
            { text: "CSS", correct: true },
            { text: "HTML", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which language adds interactivity to a web page?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which symbol is commonly used to select an ID in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to add JavaScript to a page?",
        answers: [
            { text: "<style>", correct: false },
            { text: "<css>", correct: false },
            { text: "<script>", correct: true },
            { text: "<javascript>", correct: false }
        ]
    }
];

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const questionCount = document.getElementById("question-count");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const feedbackElement = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const scorePercent = document.getElementById("score-percent");
const resultMessage = document.getElementById("result-message");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let answered = false;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    clearInterval(timerInterval);

    currentQuestionIndex = 0;
    score = 0;

    welcomeScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);
    answered = false;
    timeLeft = 15;

    const currentQuestion = questions[currentQuestionIndex];

    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionElement.textContent = currentQuestion.question;
    timerElement.textContent = timeLeft;

    progressBar.style.width =
        `${(currentQuestionIndex / questions.length) * 100}%`;

    answerButtons.innerHTML = "";
    feedbackElement.textContent = "";
    feedbackElement.className = "";

    nextBtn.hidden = true;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(button, answer.correct);
        });

        answerButtons.appendChild(button);
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeIsUp();
        }
    }, 1000);
}

function selectAnswer(selectedButton, isCorrect) {
    if (answered) return;

    answered = true;
    clearInterval(timerInterval);

    const buttons = answerButtons.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;

        const correctAnswer = questions[currentQuestionIndex]
            .answers.find(answer => answer.text === button.textContent);

        if (correctAnswer && correctAnswer.correct) {
            button.classList.add("correct");
        }
    });

    if (isCorrect) {
        score++;
        feedbackElement.textContent = "✨ Correct answer! Well done!";
        feedbackElement.className = "correct";
    } else {
        selectedButton.classList.add("wrong");
        feedbackElement.textContent = "Not quite! The correct answer is highlighted.";
        feedbackElement.className = "wrong";
    }

    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    nextBtn.hidden = false;
    nextBtn.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results →"
            : "Next Question →";
}

function timeIsUp() {
    if (answered) return;

    answered = true;

    const buttons = answerButtons.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;

        const correctAnswer = questions[currentQuestionIndex]
            .answers.find(answer => answer.text === button.textContent);

        if (correctAnswer && correctAnswer.correct) {
            button.classList.add("correct");
        }
    });

    feedbackElement.textContent = "⏰ Time's up! The correct answer is highlighted.";
    feedbackElement.className = "wrong";

    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    nextBtn.hidden = false;
    nextBtn.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results →"
            : "Next Question →";
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const percentage = Math.round((score / questions.length) * 100);

    finalScore.textContent = `${score}/${questions.length}`;
    scorePercent.textContent = `${percentage}%`;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! You're amazing! 🌟";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Great job! Keep learning! 💜";
    } else {
        resultMessage.textContent = "Good try! Practice makes progress! 🌷";
    }

    progressBar.style.width = "100%";
}
