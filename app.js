const screen = document.querySelector('section');
const overlay = document.querySelector('.overlay');
const counter = overlay.querySelector('h1');

const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');

const redText = document.getElementById('red-text');
const greenText = document.getElementById('green-text');
const blueText = document.getElementById('blue-text');

let red = 0, green = 0, blue = 0, correctRed = 0, correctGreen = 0, correctBlue = 0;
screen.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

redText.textContent = 0;
greenText.textContent = 0;
blueText.textContent = 0;

function changeRed(value) {
    red = value;
    redText.textContent = value;

    screen.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function changeGreen(value) {
    green = value;
    greenText.textContent = value;

    screen.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function changeBlue(value) {
    blue = value;
    blueText.textContent = value;

    screen.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

document.querySelectorAll('input[type="range"]').forEach((input) => { 
    input.addEventListener('mousedown',  () => window.getSelection().removeAllRanges());
});

function backToDefault() {
    redSlider.value = 0;
    greenSlider.value = 0;
    blueSlider.value = 0;

    redText.textContent = 0;
    greenText.textContent = 0;
    blueText.textContent = 0;

    red = 0;
    green = 0;
    blue = 0;
}

function genereateRandomRgb() {
    backToDefault();
    
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;

    correctRed = red;
    correctGreen = green;
    correctBlue = blue;

    screen.style.background = 'rgb(' + correctRed + ', ' + correctGreen + ', ' + correctBlue + ')';

    overlay.classList.add('active');
    anime({
        targets: counter,
        innerHTML: [3, 1],
        easing: 'linear',
        round: 1,
        duration: 3000,
        complete: function() {
            overlay.classList.remove('active');
            screen.style.backgroundColor = 'rgb(0, 0, 0)';
          }
      });
}

genereateRandomRgb();

const button = document.getElementById('check');
const score = document.querySelector('.score p');
const gameOver = document.querySelector('.game-over');
const roundNumber = document.getElementById('round');

let round = 0;

function revealScore() {
    screen.style.background = 'linear-gradient(to bottom, rgb(' + red + ', ' + green + ', ' + blue + ') 0%, rgb(' + red + ', ' + green + ', ' + blue + ') 50%, rgb(' + correctRed + ', ' + correctGreen + ', ' + correctBlue + ') 50%, rgb(' + correctRed + ', ' + correctGreen + ', ' + correctBlue + ') 100%)';
    let points = (255 - (Math.ceil(Math.abs(red - correctRed) + Math.abs(green - correctGreen) + Math.abs(blue - correctBlue)) / 3)) / 255 * 100;
    score.textContent = 'Score: ' + Math.floor(points) + '%';

    if (points < 80) {
        setTimeout(() => {
            gameOver.querySelector('p').textContent = 'Final score: ' + round;
            gameOver.classList.add('active');
            anime ({
                targets: gameOver,
                opacity: 1,
                easing: 'linear',
                duration: 500
            })
        }, 1000);
        return;
    }

    button.disabled = true;
    round++;
    roundNumber.textContent = round;

    setTimeout(() => {
        genereateRandomRgb();
        button.disabled = false;
    }, 1000)
}

button.addEventListener('click', revealScore);

const tryAgain = document.getElementById('again');

tryAgain.addEventListener('click', () => {
    location.reload();
})