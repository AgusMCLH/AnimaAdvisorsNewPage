function toggleFAQ(index) {
  let item = document.getElementById(`faq-${index}`);

  let wasOpen = item.classList.contains('open');

  // Close all
  document
    .querySelectorAll('.faq-item')
    .forEach((el) => el.classList.remove('open'));
  // Open clicked if it was closed
  if (!wasOpen) item.classList.add('open');
}
