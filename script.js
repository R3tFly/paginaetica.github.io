let timeLeft = 30;
const timerElement = document.getElementById("timer");

// Temporizador de cuenta regresiva
const countdown = setInterval(() => {
    timeLeft--;
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
    
    if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Tiempo terminado");
    }
}, 1000);

// Funciones de arrastre y soltado
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.textContent);
}

function drop(event, conceptId) {
    event.preventDefault();
    const conceptText = document.getElementById(`concept-text${conceptId.slice(-1)}`);
    
    // Verificar si ya hay una palabra en el concepto
    if (conceptText.textContent === "") {
        const word = event.dataTransfer.getData("text");
        conceptText.textContent = word;
    } else {
        alert("Este concepto ya tiene una palabra.");
    }
}

// Lista de palabras correctas (esto se puede personalizar)
const correctWords = {
    concept1: "Honestidad",
    concept2: "Responsabilidad",
    concept3: "Justicia"
};

// Función para verificar las respuestas
function checkAnswers() {
    let correctAnswers = 0;

    for (const [conceptId, correctWord] of Object.entries(correctWords)) {
        const conceptText = document.getElementById(`concept-text${conceptId.slice(-1)}`).textContent;
        if (conceptText === correctWord) {
            correctAnswers++;
        }
    }

    const incorrectAnswers = Object.keys(correctWords).length - correctAnswers;
    const score = (correctAnswers / Object.keys(correctWords).length) * 10;

    alert(`Puntuación: ${score}/10\nCorrectos: ${correctAnswers}\nIncorrectos: ${incorrectAnswers}`);
}


// Verdadero y falso

// Respuestas correctas para el ejercicio de Verdadero o Falso
const trueFalseAnswers = ["true", "false", "true", "false"];
const userAnswers = [];

// Función para seleccionar una respuesta y almacenarla
function selectAnswer(button, answer) {
    const statementIndex = Array.from(button.parentNode.parentNode.children).indexOf(button.parentNode);
    userAnswers[statementIndex] = answer;

    // Deseleccionar otras opciones en el mismo statement
    button.parentNode.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

// Función para verificar respuestas de Verdadero o Falso y mostrar resultados
function checkTrueFalseAnswers() {
    let correctCount = 0;

    for (let i = 0; i < trueFalseAnswers.length; i++) {
        if (userAnswers[i] === trueFalseAnswers[i]) {
            correctCount++;
        }
    }

    const score = (correctCount / trueFalseAnswers.length) * 10;
    const incorrectCount = trueFalseAnswers.length - correctCount;

    alert(`Puntuación: ${score}/10\nCorrectas: ${correctCount}\nIncorrectas: ${incorrectCount}`);
}

//seleccion multiple

// Respuestas correctas para el ejercicio de Selección Múltiple
const multipleChoiceAnswers = ["A", "B", "C", "A"]; // Actualiza las respuestas según el ejercicio
const userMultipleChoiceAnswers = [];

// Función para seleccionar una opción en el ejercicio de Selección Múltiple
function selectMultipleChoiceAnswer(questionIndex, answer) {
    userMultipleChoiceAnswers[questionIndex] = answer;

    // Deseleccionar otras opciones en la misma pregunta
    const options = document.querySelectorAll(`#question${questionIndex} .option`);
    options.forEach(option => option.classList.remove("selected"));

    // Resaltar la opción seleccionada
    const selectedOption = document.querySelector(`#question${questionIndex} .option-${answer}`);
    selectedOption.classList.add("selected");
}

// Función para verificar respuestas del ejercicio de Selección Múltiple y mostrar resultados
function checkMultipleChoiceAnswers() {
    let correctCount = 0;

    for (let i = 0; i < multipleChoiceAnswers.length; i++) {
        if (userMultipleChoiceAnswers[i] === multipleChoiceAnswers[i]) {
            correctCount++;
        }
    }

    const score = (correctCount / multipleChoiceAnswers.length) * 10;
    const incorrectCount = multipleChoiceAnswers.length - correctCount;

    alert(`Puntuación: ${score}/10\nCorrectas: ${correctCount}\nIncorrectas: ${incorrectCount}`);
}

//crucigrama

function checkCrossword() {
    const cells = document.querySelectorAll(".cell");
    let correctCount = 0;

    cells.forEach(cell => {
        const userAnswer = cell.textContent.trim().toUpperCase();
        const correctAnswer = cell.getAttribute("data-answer");

        if (userAnswer === correctAnswer) {
            correctCount++;
            cell.style.backgroundColor = "#d4edda"; // Verde claro si es correcto
        } else {
            cell.style.backgroundColor = "#f8d7da"; // Rojo claro si es incorrecto
        }
    });

    const totalCells = cells.length;
    const score = (correctCount / totalCells) * 10;

    alert(`Puntuación: ${score.toFixed(1)}/10\nCorrectas: ${correctCount}\nIncorrectas: ${totalCells - correctCount}`);
}
