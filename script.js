class Countdown {
  constructor(time) {
    this.date = time;
  }
  get _current() {
    return new Date();
  }
  get _future() {
    return new Date(this.date);
  }
  get _difference() {
    return this._future.getTime() - this._current.getTime();
  }
  get days() {
    return Math.floor(this._difference / (24 * 60 * 60 * 1000));
  }
  get hours() {
    return Math.floor(this._difference / (60 * 60 * 1000));
  }
  get minutes() {
    return Math.floor(this._difference / (60 * 1000));
  }
  get seconds() {
    return Math.floor(this._difference / 1000);
  }
  get total() {
    const days = this.days;
    const hours = this.hours % 24;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}

const input = document.querySelector('input');
const buttonInit = document.querySelector('[type="submit"]');
const buttonReset = document.querySelector('[type="reset"]');

function formatValue(e) {
  let length = input.value.length;
  if (e.key !== 'Backspace') {
    if ((length == 2 && length < 6) || (length == 5 && length < 6)) {
      input.value += '/';
    } else if (length == 3 || length == 6) {
      input.value = input.value.slice(0, length - 1);
      input.value += '/' + e.key;
    }
  }
}

function getCountdown(e) {
  e.preventDefault();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = input.value.split('/');
  const today = new Date();
  if (
    input.value == '' ||
    input.value < 10 ||
    date[2] < today.getUTCFullYear()
  ) {
    alert('Insira um valor válido');
  } else {
    initCoundown(months, date);
  }
}

function initCoundown(months, date) {
  const spans = document.querySelectorAll('#result span');

  const count = setInterval(() => {
    let time = new Countdown(
      `${date[0]} ${months[date[1] - 1]} ${date[2]} 00:00:00 GMT-0300`,
    ).total;

    spans.forEach((span) => {
      if ((time[span.dataset.time] + '').length < 2) {
        span.innerText = '0' + time[span.dataset.time];
      } else {
        span.innerText = time[span.dataset.time];
      }
    });
  }, 1000);

  buttonReset.addEventListener('click', () => {
    spans.forEach((span) => {
      span.innerText = '00';
    });
    clearInterval(count);
  });
}

input.addEventListener('keyup', formatValue);
buttonInit.addEventListener('click', getCountdown);
