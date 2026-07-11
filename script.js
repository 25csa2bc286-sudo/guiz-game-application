// Quiz Questions
const quiz = [
{
    question: "1. What does JS stand for?",
    options: ["Java Source", "Java Script", "Just Script", "Java Style"],
    answer: "Java Script"
},
{
    question: "2. Which company developed JavaScript?",
    options: ["Microsoft", "Google", "Netscape", "Oracle"],
    answer: "Netscape"
},
{
    question: "3. Which symbol is used for single-line comments in JavaScript?",
    options: ["##", "<!-- -->", "//", "**"],
    answer: "//"
},
{
    question: "4. Which keyword is used to declare a variable in JavaScript?",
    options: ["int", "var", "string", "define"],
    answer: "var"
},
{
    question: "5. Which method is used to display output in the browser console?",
    options: ["print()", "console.log()", "display()", "write()"],
    answer: "console.log()"
},
{
    question: "6. Which symbol is used for assignment?",
    options: ["==", "=", "===", ":="],
    answer: "="
},
{
    question: "7. Which keyword is used to create a constant?",
    options: ["let", "const", "var", "constant"],
    answer: "const"
},
{
    question: "8. Which loop executes at least once?",
    options: ["for", "while", "do...while", "foreach"],
    answer: "do...while"
},
{
    question: "9. Which function is used to display a popup message?",
    options: ["prompt()", "console.log()", "alert()", "print()"],
    answer: "alert()"
},
{
    question: "10. Which operator checks both value and data type?",
    options: ["==", "=", "===", "!="],
    answer: "==="
}
];

// Variables
let index = 0;
let marks = 0;
let time = 60;
let timer;

const question = document.getElementById("question");
const options = document.getElementById("options");
const timerText = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const questionNumber = document.getElementById("question-number");

// Load Question
function loadQuestion() {

    clearInterval(timer);

    if (index >= quiz.length) {
        showResult();
        return;
    }

    questionNumber.innerText =
        `Question ${index + 1} / ${quiz.length}`;

    progressBar.style.width =
        ((index + 1) / quiz.length) * 100 + "%";

    question.innerText = quiz[index].question;

    options.innerHTML = "";

    quiz[index].options.forEach(option => {

        let btn = document.createElement("button");

        btn.innerText = option;

        btn.onclick = function () {
            checkAnswer(option);
        };

        options.appendChild(btn);

    });

    startTimer();

}

// Check Answer
function checkAnswer(selected) {

    clearInterval(timer);

    let buttons =
        document.querySelectorAll("#options button");

    buttons.forEach(button => {

        button.disabled = true;

        if (button.innerText === quiz[index].answer) {
            button.style.background = "green";
        }

        if (
            button.innerText === selected &&
            selected !== quiz[index].answer
        ) {
            button.style.background = "red";
        }

    });

    if (selected === quiz[index].answer) {
        marks++;
    }

    setTimeout(() => {

        index++;

        loadQuestion();

    }, 1000);

}

// Timer
function startTimer() {

    time = 60;

    timerText.style.color = "green";

    timer = setInterval(() => {

        timerText.innerText =
            "⏳ Time Left : " +
            Math.floor(time / 60) + ":" +
            String(time % 60).padStart(2, "0");

        if (time <= 10) {
            timerText.style.color = "red";
        }

        time--;

        if (time < 0) {

            clearInterval(timer);

            index++;

            loadQuestion();

        }

    }, 1000);

}
// Show Result
function showResult() {

    clearInterval(timer);

    question.innerHTML = "🎉 Quiz Finished!";
    options.innerHTML = "";
    timerText.innerHTML = "";

    document.getElementById("result-card").style.display = "block";
    document.getElementById("restart-btn").style.display = "block";

    let percentage = (marks / quiz.length) * 100;

    let grade = "";
    let status = "";

    if (percentage >= 90) {
        grade = "A";
    }
    else if (percentage >= 80) {
        grade = "B";
    }
    else if (percentage >= 70) {
        grade = "C";
    }
    else if (percentage >= 60) {
        grade = "D";
    }
    else {
        grade = "F";
    }

    if (percentage >= 50) {
        status = "✅ PASS";
    } else {
        status = "❌ FAIL";
    }

    let bestScore = localStorage.getItem("bestScore");

    if (bestScore === null || marks > Number(bestScore)) {
        bestScore = marks;
        localStorage.setItem("bestScore", bestScore);
    }

    document.getElementById("final-score").innerHTML =
        "🏆 Score : " + marks + " / " + quiz.length;

    document.getElementById("percentage").innerHTML =
        "📊 Percentage : " + percentage.toFixed(0) + "%";

    document.getElementById("grade").innerHTML =
        "🎖 Grade : " + grade;

    document.getElementById("status").innerHTML =
        "📌 Status : " + status;

    document.getElementById("best-score").innerHTML =
        "⭐ Best Score : " + bestScore + " / " + quiz.length;
}

// Restart Quiz
function restartQuiz() {

    index = 0;
    marks = 0;

    document.getElementById("result-card").style.display = "none";
    document.getElementById("restart-btn").style.display = "none";

    progressBar.style.width = "0%";

    loadQuestion();
}

// Dark Mode
function toggleDarkMode() {

    document.body.classList.toggle("dark");

}

// Start Quiz
loadQuestion();