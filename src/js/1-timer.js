import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const inputElement = document.getElementById('datetime-picker');
  let userSelectedDate = null;
  const startButton = document.querySelector('[data-start]');
  const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (!selectedDate || selectedDate <= new Date()) {
        iziToast.warning({
          title: 'Warning',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
      }
    },
  };

  flatpickr(inputElement, options);

  startButton.addEventListener('click', startTimer);

  function startTimer() {
    const countdownInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      const currentTime = new Date().getTime();
      const timeDifference = userSelectedDate - currentTime;

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        displayTimerValues(0, 0, 0, 0);
        iziToast.success({
          title: 'Countdown Complete',
          message: 'The countdown has reached zero!',
        });
        startButton.disabled = true;
        inputElement.disabled = false;
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        displayTimerValues(days, hours, minutes, seconds);
        startButton.disabled = true;
        inputElement.disabled = true;
      }
    }

    function displayTimerValues(days, hours, minutes, seconds) {
      timerFields.days.textContent = addLeadingZero(days);
      timerFields.hours.textContent = addLeadingZero(hours);
      timerFields.minutes.textContent = addLeadingZero(minutes);
      timerFields.seconds.textContent = addLeadingZero(seconds);
    }

    function addLeadingZero(value) {
      return value < 10 ? `0${value}` : value;
    }
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
  }
});
