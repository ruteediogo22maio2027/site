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

// ---------- Copiar IBAN ----------
const copyIbanBtn = document.querySelector('[data-copy-iban]');
if (copyIbanBtn){
  const ibanValue = document.getElementById('iban-value').textContent.trim();
  const copyStatus = document.getElementById('copy-status');

  async function copiarIban(){
    try {
      if (navigator.clipboard){
        await navigator.clipboard.writeText(ibanValue);
      } else {
        const temporaryInput = document.createElement('textarea');
        temporaryInput.value = ibanValue;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'fixed';
        temporaryInput.style.opacity = '0';
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        document.execCommand('copy');
        temporaryInput.remove();
      }
      copyStatus.textContent = 'IBAN copiado';
      copyIbanBtn.classList.add('copied');
      copyIbanBtn.setAttribute('aria-label', 'IBAN copiado');
      copyIbanBtn.setAttribute('title', 'IBAN copiado');
      setTimeout(() => {
        copyStatus.textContent = '';
        copyIbanBtn.classList.remove('copied');
        copyIbanBtn.setAttribute('aria-label', 'Copiar IBAN');
        copyIbanBtn.setAttribute('title', 'Copiar IBAN');
      }, 2500);
    } catch {
      copyStatus.textContent = 'Não foi possível copiar. Selecione o IBAN manualmente.';
    }
  }

  copyIbanBtn.addEventListener('click', copiarIban);
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

