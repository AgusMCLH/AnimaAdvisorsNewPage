const PHONE = '+1239251997';
const phoneTooltip = document.getElementById('phoneTooltip');
let resetTimer;

function getCopiedText() {
  const page = window.location.pathname.split('/').pop();

  if (page === 'en.html') {
    return 'Copied!';
  }

  if (page === 'es.html' || page === 'index.html' || page === '') {
    return '¡Copiado!';
  }

  return '¡Copiado!';
}

function showCopiedTooltip() {
  phoneTooltip.textContent = getCopiedText();
  phoneTooltip.classList.add('tooltip-copied');

  clearTimeout(resetTimer);

  resetTimer = setTimeout(() => {
    phoneTooltip.textContent = PHONE;
    phoneTooltip.classList.remove('tooltip-copied');
  }, 2000);
}

function copyPhone() {
  navigator.clipboard
    .writeText(PHONE)
    .then(() => {
      showCopiedTooltip();
    })
    .catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = PHONE;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      showCopiedTooltip();
    });
}
