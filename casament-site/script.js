// ============================================================
// Rute & Diogo — 22 de Maio de 2027 — lógica partilhada do site
// ============================================================

// ---------- Menu hambúrguer ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelectorAll('.nav-link');
if (menuBtn){
  menuBtn.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  navLinks.forEach(link => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
}

// ---------- Reveal ao fazer scroll ----------
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}

// ---------- Contagem decrescente (só existe na página inicial) ----------
// AQUI: muda para a data e hora reais do casamento
const DATA_CASAMENTO = new Date("2027-05-22T12:00:00");
const cdDias = document.getElementById("cd-dias");
if (cdDias){
  function atualizarContagem(){
    const agora = new Date();
    let diff = DATA_CASAMENTO - agora;
    if (diff < 0) diff = 0;
    document.getElementById("cd-dias").textContent = String(Math.floor(diff / 86400000)).padStart(2,"0");
    document.getElementById("cd-horas").textContent = String(Math.floor(diff / 3600000) % 24).padStart(2,"0");
    document.getElementById("cd-min").textContent = String(Math.floor(diff / 60000) % 60).padStart(2,"0");
    document.getElementById("cd-seg").textContent = String(Math.floor(diff / 1000) % 60).padStart(2,"0");
  }
  atualizarContagem();
  setInterval(atualizarContagem, 1000);
}

// ---------- RSVP (só existe na página rsvp.html) ----------
// AQUI: cola o URL do Google Apps Script ou Formspree. Vazio = modo demonstração.
const FORM_ENDPOINT = "";
const form = document.getElementById("rsvp-form");
if (form){
  const msgOk = document.getElementById("rsvp-ok");
  const msgErr = document.getElementById("rsvp-err");

  form.addEventListener("submit", async function(e){
    e.preventDefault();
    msgOk.style.display = "none";
    msgErr.style.display = "none";
    const dados = {
      nome: document.getElementById("nome").value,
      presenca: form.querySelector('input[name="presenca"]:checked').value,
      acompanhantes: document.getElementById("acompanhantes").value,
      restricoes: document.getElementById("restricoes").value,
      enviado_em: new Date().toISOString()
    };
    if (!FORM_ENDPOINT){
      msgOk.style.display = "block";
      form.reset();
      return;
    }
    try{
      await fetch(FORM_ENDPOINT, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body: JSON.stringify(dados) });
      msgOk.style.display = "block";
      form.reset();
    }catch(erro){
      msgErr.style.display = "block";
    }
  });
}
