const images = [
  { src: './img/volcano.jpg', alt: 'Volcano' },
  { src: './img/hh.jpg', alt: 'Hamburg' },
  { src: './img/astronaut.jpg', alt: 'Astronaut' },
  { src: './img/japan.jpg', alt: 'Japan' },
  { src: './img/lion.jpg', alt: 'Lion' },
  { src: './img/seychelles.jpg', alt: 'Seychelles' },
  { src: './img/aibeach.jpg', alt: 'AIBeach' },
  { src: './img/moon.jpg', alt: 'Moon' },
  { src: './img/bridge.jpg', alt: 'Bridge' },
  { src: './img/bmx.jpg', alt: 'BMX' },
  { src: './img/temple.jpg', alt: 'Temple' }
];

function renderImages() {
  document.querySelector('.photo-container').innerHTML = images
    .map((img, index) => `<img src="${img.src}" alt="${img.alt}" class="photos" onclick="openPhoto(${index})">`)
    .join('');
}

function init() {
  renderImages();
}

function createDialogContent(index) {
  return `
    <div class="dialog-bubble">
      <div class="dialog-header">
        <span class="dialog-title">${images[index].alt}</span>
        <span class="dialog-close">×</span>
      </div>

      <div class="dialog-img-wrapper">
        <img src="${images[index].src}" alt="${images[index].alt}" class="dialog-img">
      </div>

      <div class="dialog-controls">
        <button class="dialog-arrow left-arrow" id="prev"><img src="./img/pfeil.svg" alt="Zurück"></button>
        <span class="dialog-counter">${index + 1}/${images.length}</span>
        <button class="dialog-arrow right-arrow" id="next"><img src="./img/pfeil.svg" alt="Weiter"></button>
      </div>
    </div>
  `;
}

function openPhoto(index) {
  document.querySelector('.dialog-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.innerHTML = createDialogContent(index);
  
  overlay.onclick = () => overlay.remove();
  overlay.querySelector('.dialog-bubble').onclick = dialogBubble => dialogBubble.stopPropagation();
  overlay.querySelector('.dialog-close').onclick = dialogClose => { dialogClose.stopPropagation(); overlay.remove(); };
  overlay.querySelector('#prev').onclick = prevArrow => { prevArrow.stopPropagation(); openPhoto((index - 1 + images.length) % images.length); };
  overlay.querySelector('#next').onclick = nextArrow => { nextArrow.stopPropagation(); openPhoto((index + 1) % images.length); };
  
  document.body.appendChild(overlay);
}
