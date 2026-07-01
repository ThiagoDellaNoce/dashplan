import { NAV } from './nav.js';
import { bindToasts } from './utils.js';

/* ============================================================
   ROTEAMENTO — registro de páginas + navegação
   Cada página é { id, render() } (mount() é opcional, chamado
   uma vez no boot para injetar modais/overlays no DOM).
   ============================================================ */
const pages = new Map();

export function registerPage(page){
  pages.set(page.id, page);
}

export function go(id){
  const view = document.getElementById('view');
  view.classList.remove('view-enter'); void view.offsetWidth; // reinicia animação

  const page = pages.get(id);
  view.innerHTML = page
    ? page.render()
    : `<div class="view-head"><h1 class="view-title">Página não encontrada</h1></div>`;
  view.classList.add('view-enter');

  document.querySelectorAll('.nav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.view === id));

  document.getElementById('app').classList.remove('nav-open'); // fecha menu mobile
  if (window.lucide) lucide.createIcons();
  bindToasts();
  window.scrollTo({ top:0 });
}

/* ============================================================
   OVERLAYS — modais/confirms registrados por qualquer página
   (ex: sheet-crud.js), fechados genericamente com ESC.
   ============================================================ */
const overlays = [];

export function registerOverlay(elementId, close){
  overlays.push({ elementId, close });
}

function closeOpenOverlays(){
  overlays.forEach(o => {
    const el = document.getElementById(o.elementId);
    if (el && !el.hidden) o.close();
  });
}

/* ============================================================
   SHELL — nav lateral, coletar/expandir menu, atalhos de teclado
   ============================================================ */
function buildNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = NAV.map(g => `
    <div class="nav-group">
      <div class="nav-group-label">${g.group}</div>
      ${g.items.map(i => `
        <button class="nav-item" data-view="${i.id}">
          <i data-lucide="${i.icon}"></i>
          <span class="nav-label">${i.label}</span>
        </button>`).join('')}
    </div>`).join('');

  nav.querySelectorAll('.nav-item').forEach(btn =>
    btn.addEventListener('click', () => go(btn.dataset.view)));
}

export function initShell(){
  buildNav();

  document.getElementById('collapseBtn').addEventListener('click', () =>
    document.getElementById('app').classList.toggle('collapsed'));

  document.getElementById('menuToggle').addEventListener('click', () =>
    document.getElementById('app').classList.toggle('nav-open'));
  document.getElementById('backdrop').addEventListener('click', () =>
    document.getElementById('app').classList.remove('nav-open'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeOpenOverlays();
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });

  bindToasts();
  if (window.lucide) lucide.createIcons();
}
