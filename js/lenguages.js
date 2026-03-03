let translations = {};

const checkDefLeng = () => {
  // Debe entrar como animaadvisors.com?lang=es o ?lang=en o ?lang=pt
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang && ['es', 'en', 'pt'].includes(lang)) {
    setLang(lang);
  } else {
    setLang('pt');
  }
};

const fetchTranslation = async () => {
  const lengs = ['es', 'en', 'pt'];
  const promises = lengs.map((lang) =>
    fetch(`./leng/${lang}.json`)
      .then((res) => res.json())
      .then((data) => ({ lang, data })),
  );
  const results = await Promise.all(promises);
  results.forEach(({ lang, data }) => {
    translations[lang] = data;
  });
  checkDefLeng();
  return translations;
};

fetchTranslation();

/* ==============================================
   I18N ENGINE
   ============================================== */
let currentLang = 'pt';

function t(path) {
  const keys = path.split('.');
  let val = translations[currentLang];
  for (const k of keys) {
    if (val === undefined) return path;
    val = val[k];
  }
  return val !== undefined ? val : path;
}

async function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Update active button states
  ['es', 'en', 'pt'].forEach((l) => {
    const btn = document.getElementById('btn-' + l);
    const mbtn = document.getElementById('mbtn-' + l);
    if (btn) btn.classList.toggle('active', l === lang);
    if (mbtn) mbtn.classList.toggle('active', l === lang);
  });

  // Update all static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Re-render dynamic components
  renderServices();
  renderSteps();
  renderJurisdictions();
  renderFAQ();
  renderFooterLinks();
}

/* ==============================================
   DYNAMIC RENDERERS
   ============================================== */
function renderServices() {
  const map = [
    { listId: 'list-corporate', key: 'services.corporate.items' },
    { listId: 'list-planning', key: 'services.planning.items' },
    { listId: 'list-residency', key: 'services.residency.items' },
    { listId: 'list-accounting', key: 'services.accounting.items' },
  ];
  map.forEach(({ listId, key }) => {
    const el = document.getElementById(listId);
    if (!el) return;
    const items = t(key);
    el.innerHTML = (Array.isArray(items) ? items : [])
      .map((item) => `<li>${item}</li>`)
      .join('');
  });
}

function renderSteps() {
  const grid = document.getElementById('steps-grid');
  if (!grid) return;
  const steps = translations[currentLang].howWeWork.steps;
  grid.innerHTML = steps
    .map(
      (s) => `
    <div class="step-card">
      <div class="step-number">${s.number}</div>
      <h3 class="step-title">${s.title}</h3>
      <p class="step-desc">${s.description}</p>
    </div>
  `,
    )
    .join('');
}

function renderJurisdictions() {
  const grid = document.getElementById('jurisdictions-grid');
  const tagsEl = document.getElementById('reach-tags');
  const dotsEl = document.getElementById('map-dots');
  if (!grid) return;

  const juris = translations[currentLang].reach.jurisdictions;

  grid.innerHTML = juris
    .map(
      (j) => `
    <div class="jurisdiction-item">
      <div class="jurisdiction-dot"></div>
      <span>${j}</span>
    </div>
  `,
    )
    .join('');

  if (tagsEl) {
    tagsEl.innerHTML = juris
      .map((j) => `<span class="reach-tag">${j}</span>`)
      .join('');
  }

  // Scatter dots on map
  if (dotsEl) {
    const positions = [
      { top: '25%', left: '20%' },
      { top: '40%', left: '45%' },
      { top: '60%', left: '30%' },
      { top: '35%', left: '70%' },
      { top: '55%', left: '60%' },
      { top: '70%', left: '75%' },
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
}

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  const items = translations[currentLang].faq.items;
  list.innerHTML = items
    .map(
      (item, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-question" onclick="toggleFAQ(${i})">
        <span class="faq-question-text">${item.question}</span>
        <div class="faq-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer">
        <div class="faq-answer-inner">${item.answer}</div>
      </div>
    </div>
  `,
    )
    .join('');
}

function renderFooterLinks() {
  const navEl = document.getElementById('footer-nav-links');
  const legalEl = document.getElementById('footer-legal-links');
  const navLinks = translations[currentLang].footer.navLinks;
  const legalLinks = translations[currentLang].footer.legalLinks;
  const navTargets = ['#services', '#how-we-work', '#contact'];
  const legalTargets = ['#', '#', '#'];

  if (navEl) {
    navEl.innerHTML = navLinks
      .map((text, i) => `<li><a href="${navTargets[i]}">${text}</a></li>`)
      .join('');
  }
  if (legalEl) {
    legalEl.innerHTML = legalLinks
      .map((text, i) => `<li><a href="${legalTargets[i]}">${text}</a></li>`)
      .join('');
  }
}
