document.getElementById('hamburger').addEventListener('click', function () {
  this.classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobile-menu').classList.remove('open');
  });
});
