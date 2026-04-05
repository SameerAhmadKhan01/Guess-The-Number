"use strict";

let score = 20;
let highscore = 0;
let RandomGuess = Math.trunc(Math.random() * 90) + 10;

const body = document.body;
const inputEl = document.querySelector(".number input");
const messageEl = document.querySelector(".message");
const guessEl = document.querySelector(".guess");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");
const themeToggleBtn = document.querySelector(".theme-toggle");

function setThemeButtonLabel() {
    themeToggleBtn.textContent = body.classList.contains("dark-theme") ? "Light Theme" : "Dark Theme";
}

const savedTheme = localStorage.getItem("guess-theme");
if (savedTheme === "dark") {
    body.classList.add("dark-theme");
}
setThemeButtonLabel();

themeToggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark-theme");
    localStorage.setItem("guess-theme", body.classList.contains("dark-theme") ? "dark" : "light");
    setThemeButtonLabel();
});

function Check() {
    const guess = Number(inputEl.value);

    if (!guess) {
        messageEl.textContent = "⛔ No number!";
    } else if (guess === RandomGuess) {
        messageEl.textContent = "🎉 Correct Guess!";
        guessEl.textContent = RandomGuess;
        body.classList.add("state-win");
        body.classList.remove("state-lose");

        if (score > highscore) {
            highscore = score;
            highscoreEl.textContent = highscore;
        }
    } else if (guess !== RandomGuess) {
        if (score > 1) {
            messageEl.textContent = 
                guess > RandomGuess ? "📈 Too high!" : "📉 Too low!";
            score--;
            scoreEl.textContent = score;
        } else {
            messageEl.textContent = "💥 You lost the game!";
            scoreEl.textContent = 0;
            body.classList.add("state-lose");
            body.classList.remove("state-win");
        }
    }
}

document.querySelector('.btn-check').addEventListener('click', Check);

document.querySelector('.btn-again').addEventListener('click', function() {
    score = 20;
    RandomGuess = Math.trunc(Math.random() * 90) + 10;
    messageEl.textContent = "Start guessing...";
    scoreEl.textContent = score;
    guessEl.textContent = "?";
    inputEl.value = "";
    body.classList.remove("state-win", "state-lose");
});