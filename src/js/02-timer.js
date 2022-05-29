import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  intervalId: null,
  clockFace: document.querySelector('#datetime-picker'),
  startBtn:  document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  const date = new Date();
    if ((selectedDates[0].getTime() - date.getTime()) < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
        return;
    }
    else {
      refs.startBtn.disabled = false;
  };    
}
};

const result = flatpickr('input#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.disabled;

function onStartBtnClick() {
  refs.intervalId = setInterval(() => {
    const currentDate = new Date();
    const selectedDate = result.selectedDates[0];
    const deltaTime = selectedDate.getTime() - currentDate.getTime();
    if (deltaTime <= 0) {
      clearInterval(refs.intervalId);
      return;
    }
     const convertedData = convertMs(deltaTime);
        updateClockFace(convertedData);
  }, 1000);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
      return String(value).padStart(2, '0');
  }


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);
  
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};