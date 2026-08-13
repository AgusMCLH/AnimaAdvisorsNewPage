const grid = document.getElementById('jurisdictions-grid');
const dotsEl = document.getElementById('map-dots');

const juris = {
  es: [
    'Canadá',
    'Bahamas',
    'EUA',
    'BVI',
    'Nevis',
    'Panamá',
    'Paraguay',
    'Uruguay',
    'Dubái',
    'Reino Unido',
    'Hong Kong',
    'Singapur',
  ],
  en: [
    'Canada',
    'Bahamas',
    'USA',
    'BVI',
    'Nevis',
    'Panama',
    'Paraguay',
    'Uruguay',
    'Dubai',
    'United Kingdom',
    'Hong Kong',
    'Singapore',
  ],
  pt: [
    'Canadá',
    'Bahamas',
    'EUA',
    'BVI',
    'Nevis',
    'Panamá',
    'Paraguay',
    'Uruguai',
    'Dubai',
    'Reino Unido',
    'Hong Kong',
    'Singapura',
  ],
};

let currentLang = window.location.pathname.split('/').pop().split('.')[0];
if (currentLang === 'index' || currentLang === 'pt' || currentLang === '') {
  currentLang = 'pt';
}

const getJurisdictionHTML = () => {
  let html = '';
  for (let i = 0; i < juris[currentLang].length; i++) {
    html += `
                <div class="jurisdiction-item">
                    <div class="jurisdiction-dot"></div>
                    <span>${juris[currentLang][i]}</span>
                </div>`;
  }
  return html;
};
grid.innerHTML = getJurisdictionHTML();

// Scatter dots on map
if (dotsEl) {
  const positions = [
    { top: '40.9%', left: '17.4%' }, //Canada
    { top: '54.9%', left: '24%' }, //Bahamas
    { top: '49.4%', left: '17.4%' }, //EUA
    { top: '56.7%', left: '27.1%' }, //BVI
    { top: '58%', left: '29.6%' }, //Nevis
    { top: '60.5%', left: '24.8%' }, //Panama
    { top: '66.4%', left: '29.5%' }, // Paraguay
    { top: '71.4%', left: '30.5%' }, // Uruguay
    { top: '55.4%', left: '61.5%' }, // Dubai
    { top: '44.4%', left: '45.5%' }, // United Kingdom
    { top: '55.4%', left: '78.5%' }, // Hong Kong
    { top: '62.4%', left: '74.5%' }, // Singapur
  ];
  dotsEl.innerHTML = positions
    .slice(0, juris[currentLang].length)
    .map(
      (pos, i) => `
      <div class="map-dot" role="button" tabindex="0" aria-label="${juris[currentLang][i]}" data-label="${juris[currentLang][i]}" style="top:${pos.top};left:${pos.left};animation-delay:${i * 0.4}s;"></div>
    `
    )
    .join('');
}
