const tg = window.Telegram.WebApp;
tg.expand();

const cards = document.querySelectorAll('.card');
const progressText = document.querySelector('.progress');
const submitBtn = document.querySelector('.submit');

const state = {
  invoice: null,
  medical: null,
  receipt: null
};

function updateProgress() {
  const uploaded = Object.values(state).filter(Boolean).length;
  progressText.textContent = `${uploaded} из 3 документов загружено`;

  if (uploaded === 3) {
    submitBtn.classList.add('active');
    submitBtn.disabled = false;
  }
}

cards.forEach(card => {
  const type = card.dataset.type;
  const button = card.querySelector('button');
  const input = card.querySelector('input');
  const status = card.querySelector('.status');

  button.addEventListener('click', () => {
    input.click();
  });

  input.addEventListener('change', () => {
    if (!input.files.length) return;

    const file = input.files[0];
    state[type] = file.name;

    status.textContent = `Загружен: ${file.name}`;
    status.classList.add('ok');

    button.textContent = 'Заменить';
    button.classList.remove('upload');
    button.classList.add('replace');

    updateProgress();

    tg.sendData(JSON.stringify({
      action: 'document_uploaded',
      docType: type,
      fileName: file.name
    }));
  });
});

submitBtn.addEventListener('click', () => {
  if (!submitBtn.classList.contains('active')) return;

  tg.sendData(JSON.stringify({
    action: 'submit_application',
    documents: state
  }));

  tg.showAlert('Заявка отправлена. Мы свяжемся с вами.');
});
