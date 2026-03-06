const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

let active = false;

document
  .getElementById('submitForm')
  .addEventListener('click', async function () {
    if (active) return;
    active = true;

    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;
    const country = document.getElementById('countryInput').value;
    const service = document.getElementById('service-select').value;

    if (!name || !email || !message || !country || !service) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      active = false;
      return;
    }

    if (!isEmailValid(email)) {
      alert('Por favor, insira um email válido.');
      active = false;
      return;
    }

    try {
      const result = await fetch('https://formspree.io/f/mreygkqo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, country, service }),
      });
      alert('Mensagem enviada com sucesso!');
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      active = false; // ✅ Siempre se resetea, incluso si hay error
    }
  });
