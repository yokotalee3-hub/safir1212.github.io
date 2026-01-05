const tg = window.Telegram.WebApp;
tg.expand();

// demo storage
let requests = JSON.parse(localStorage.getItem("requests") || "[]");
let cases = JSON.parse(localStorage.getItem("cases") || "[]");
let pilgrims = JSON.parse(localStorage.getItem("pilgrims") || "[]");

// --- навигация ---
function goPatient() { window.location.href = "patient.html"; }
function goStaff() { window.location.href = "staff.html"; }
function goLeader() { window.location.href = "leader.html"; }
function goBack() { window.history.back(); }
function openUpload() { window.location.href = "case.html"; }

// --- пациент ---
function createRequest() {
  const request = { id: Date.now(), time: new Date().toLocaleString(), status: "новая" };
  requests.push(request);
  pilgrims.push({ id: request.id, name: `Паломник ${pilgrims.length+1}`, phone: "не отправлен", status: "подключился" });
  localStorage.setItem("requests", JSON.stringify(requests));
  localStorage.setItem("pilgrims", JSON.stringify(pilgrims));
  alert("Заявка отправлена. Мы уже помогаем вам.");
}

// --- сопровождающий ---
function renderRequests() {
  const container = document.getElementById("requests");
  if(!container) return;
  container.innerHTML = "";
  requests.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>Заявка ${i+1}</strong>
      <p>${r.time}</p>
      <button class="main-btn secondary" onclick="openCase()">Открыть кейс</button>
    `;
    container.appendChild(div);
  });
}

function createCase() {
  const name = prompt("Имя пациента");
  const id = Date.now();
  cases.push({ id, name, documents: { invoice:false, medical:false, receipt:false }, staff:"Вы" });
  localStorage.setItem("cases", JSON.stringify(cases));
  alert("Кейс создан");
  renderRequests();
}

function openCase() {
  window.location.href = "case.html";
}

// --- старший группы ---
function renderPilgrims() {
  const container = document.getElementById("pilgrims");
  if(!container) return;
  container.innerHTML = "";
  pilgrims.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <p>Статус: ${p.status}</p>
      <button class="main-btn secondary" onclick="openCase()">Открыть кейс</button>
    `;
    container.appendChild(div);
  });
}

// --- кейс документы ---
function markDone(input) {
  const status = input.parentElement.querySelector(".status");
  status.textContent = "загружен";
  status.style.color = "green";
}

// автозагрузка списков при открытии
renderRequests();
renderPilgrims();
