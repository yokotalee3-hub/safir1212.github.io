const tg = window.Telegram.WebApp;
tg.expand();

function goHelp() {
  window.location.href = "help.html";
}

function goUpload() {
  window.location.href = "upload.html";
}

function goBack() {
  window.history.back();
}

function markDone(input) {
  const status = input.parentElement.querySelector('.status');
  status.textContent = "загружен";
  status.style.color = "green";
}
