const grid = document.getElementById('jurisdictions-grid');
const tagsEl = document.getElementById('reach-tags');
const dotsEl = document.getElementById('map-dots');

const juris = {
  es: ['Bahamas', 'EUA', 'BVI', 'Nevis', 'Panamá', 'Uruguay'],
  en: ['Bahamas', 'USA', 'BVI', 'Nevis', 'Panama', 'Uruguay'],
  pt: ['Bahamas', 'EUA', 'BVI', 'Nevis', 'Panamá', 'Uruguai'],
};

let currentLang = window.location.pathname.split('/').pop().split('.')[0];
if (currentLang === 'index') {
  currentLang = 'pt';
}

console.log(juris[currentLang]);

const getJurisdictionHTML = () => {
  let html = '';
  for (let i = 0; i < juris[currentLang].length; i++) {
    html = +`
                <div class="jurisdiction-item">
                    <div class="jurisdiction-dot"></div>
                    <span>${juris[currentLang][i]}</span>
                </div>`;
  }
  return html;
};

grid.innerHTML = getJurisdictionHTML();

const getDotsHTML = () => {
  let html = '';
  for (let i = 0; i < juris[currentLang].length; i++) {
    html += `<span class="reach-tag">${juris[currentLang][i]}</span>`;
  }
  return html;
};

console.log(tagsEl);

if (tagsEl) {
  tagsEl.innerHTML = getDotsHTML();
}

// Scatter dots on map
if (dotsEl) {
  const positions = [
    { top: '49%', left: '55.6%' }, //Bahamas
    { top: '40%', left: '42%' }, //EUA
    { top: '51%', left: '60.6%' }, //BVI
    { top: '53%', left: '62.6%' }, //Nevis
    { top: '58%', left: '52%' }, //Panama
    { top: '86%', left: '66%' }, // Uruguay
  ];
  dotsEl.innerHTML = positions
    .slice(0, juris.length)
    .map(
      (pos, i) => `
      <div class="map-dot" style="top:${pos.top};left:${pos.left};animation-delay:${i * 0.4}s;"></div>
    `,
    )
    .join('');
}
