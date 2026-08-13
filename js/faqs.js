function toggleFAQ(index) {
  let item = document.getElementById(`faq-${index}`);

  let wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach((el) => {
    el.classList.remove('open');
    let question = el.querySelector('.faq-question');
    if (question) question.setAttribute('aria-expanded', 'false');
  });
  // Open clicked if it was closed
  if (!wasOpen) {
    item.classList.add('open');
    let question = item.querySelector('.faq-question');
    if (question) question.setAttribute('aria-expanded', 'true');
  }
}
