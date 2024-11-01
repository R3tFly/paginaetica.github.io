// Función general para mostrar la puntuación en una página aparte
function displayScore(score, correctCount, incorrectCount) {
    window.location.href = `Resultado.html?score=${score}&correct=${correctCount}&incorrect=${incorrectCount}`;
}

// Temporizador de cuenta regresiva
let timeLeft = 3;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
    timeLeft--;
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Tiempo terminado");
        function displayScore(score, correctCount, incorrectCount) {
            window.location.href = `Resultado.html?score=${score}&correct=${correctCount}&incorrect=${incorrectCount}`;
        }
    }
}, 1000);

// Arrastrar y Soltar
const correctWords = {
    concept1: "Honestidad",
    concept2: "Responsabilidad",
    concept3: "Justicia"
};

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.textContent);
}

function drop(event, conceptId) {
    event.preventDefault();
    const conceptText = document.getElementById(`concept-text${conceptId.slice(-1)}`);
    
    if (conceptText.textContent === "") {
        const word = event.dataTransfer.getData("text");
        conceptText.textContent = word;
    } else {
        alert("Este concepto ya tiene una palabra.");
    }
}

// Verificar respuestas de Arrastrar y Soltar
function checkAnswers() {
    let correctAnswers = 0;
    for (const [conceptId, correctWord] of Object.entries(correctWords)) {
        const conceptText = document.getElementById(`concept-text${conceptId.slice(-1)}`).textContent;
        if (conceptText === correctWord) {
            correctAnswers++;
        }
    }
    const totalConcepts = Object.keys(correctWords).length;
    const score = (correctAnswers / totalConcepts) * 10;
    displayScore(score.toFixed(1), correctAnswers, totalConcepts - correctAnswers);
}

// Verdadero o Falso
const trueFalseAnswers = ["true", "false", "true", "false"];
const userAnswers = [];

function selectAnswer(button, answer) {
    const statementIndex = Array.from(button.parentNode.parentNode.children).indexOf(button.parentNode);
    userAnswers[statementIndex] = answer;

    button.parentNode.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

// Verificar respuestas de Verdadero o Falso
function checkTrueFalseAnswers() {
    let correctCount = 0;
    for (let i = 0; i < trueFalseAnswers.length; i++) {
        if (userAnswers[i] === trueFalseAnswers[i]) {
            correctCount++;
        }
    }
    const score = (correctCount / trueFalseAnswers.length) * 10;
    displayScore(score.toFixed(1), correctCount, trueFalseAnswers.length - correctCount);
}

// Selección Múltiple
const multipleChoiceAnswers = ["A", "B", "C", "A"];
const userMultipleChoiceAnswers = [];

function selectMultipleChoiceAnswer(questionIndex, answer) {
    userMultipleChoiceAnswers[questionIndex] = answer;

    const options = document.querySelectorAll(`#question${questionIndex} .option`);
    options.forEach(option => option.classList.remove("selected"));

    const selectedOption = document.querySelector(`#question${questionIndex} .option-${answer}`);
    selectedOption.classList.add("selected");
}

// Verificar respuestas de Selección Múltiple
function checkMultipleChoiceAnswers() {
    let correctCount = 0;
    for (let i = 0; i < multipleChoiceAnswers.length; i++) {
        if (userMultipleChoiceAnswers[i] === multipleChoiceAnswers[i]) {
            correctCount++;
        }
    }
    const score = (correctCount / multipleChoiceAnswers.length) * 10;
    displayScore(score.toFixed(1), correctCount, multipleChoiceAnswers.length - correctCount);
}

// Crucigrama
function checkCrossword() {
    const cells = document.querySelectorAll(".crossword input");
    let correctCount = 0;
    cells.forEach(cell => {
        const userAnswer = cell.value.trim().toUpperCase();
        const correctAnswer = cell.getAttribute("data-answer");
        if (userAnswer === correctAnswer) {
            correctCount++;
            cell.style.backgroundColor = "#d4edda";
        } else {
            cell.style.backgroundColor = "#f8d7da";
        }
    });
    const totalCells = cells.length;
    const score = (correctCount / totalCells) * 10;
    displayScore(score.toFixed(1), correctCount, totalCells - correctCount);
}
