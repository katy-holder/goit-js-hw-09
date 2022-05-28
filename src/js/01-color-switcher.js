const PROMPT_DELAY = 1000;
let timeoutId = null;

const startClick = document.querySelector('[data-start]');
const stopClick = document.querySelector('[data-stop]');

startClick.addEventListener('click', onClick);
stopClick.addEventListener('click', offClick);

function onClick() {
    if (stopClick) {
        startClick.disabled = true;
    }
    timeoutId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, PROMPT_DELAY);
  stopClick.removeAttribute('disabled');
  startClick.setAttribute('disabled', true);
};

function offClick() {
    clearInterval(timeoutId);
startClick.removeAttribute('disabled');
stopClick.setAttribute('disabled', true);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};













