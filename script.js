const canvas = document.querySelector('#canvas');
const sizeInput = document.querySelector('#size');
const modeInput = document.querySelector('#mode');
const clearButton = document.querySelector('#clear');

let size = sizeInput.value;
let mode = modeInput.value;

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
};

const canvasGridCreator = () => {
  const element = document.createElement('div');
  element.classList.add('grid');
  element.setAttribute('data-click', 0);
  switch (mode) {
    case 'bw':
      element.addEventListener(
        'mouseenter',
        (e) => {
          e.target.style.backgroundColor = '#000';
        },
        { once: true },
      );
      break;
    case 'accent':
      element.addEventListener(
        'mouseenter',
        (e) => {
          e.target.style.backgroundColor = '#e25931';
        },
        { once: true },
      );
      break;
    case 'random':
      element.addEventListener(
        'mouseenter',
        (e) => {
          e.target.style.backgroundColor = getRandomColor();
        },
        { once: true },
      );
      break;
    case 'gradient':
      element.addEventListener('mouseenter', (e) => {
        console.log(e.target.dataset.click);
        if (+e.target.dataset.click < 10) {
          e.target.dataset.click = +e.target.dataset.click + 1;
        }
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${
          +e.target.dataset.click / 10
        })`;
      });
      break;
  }
  return element;
};

const clearCanvas = () => {
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
};

const updateCanvas = () => {
  canvas.style.setProperty('--grid', size);
  const grids = Array.from({ length: size ** 2 }, () => canvasGridCreator());
  canvas.append(...grids);
};

sizeInput.addEventListener('input', (e) => {
  e.target.previousElementSibling.textContent = `${e.target.value}x${e.target.value}`;
  size = e.target.value;
  clearCanvas();
  updateCanvas();
});

modeInput.addEventListener('change', (e) => {
  mode = e.target.value;
  clearCanvas();
  updateCanvas();
});

clearButton.addEventListener('click', () => {
  clearCanvas();
  updateCanvas();
});

updateCanvas();
