/* ============================================================
   UTILIDADES compartilhadas
   ============================================================ */
export const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

export function fmtRange(s, e){
  const a = new Date(s+'T00:00:00'), b = new Date(e+'T00:00:00');
  const y = b.getFullYear();
  if (a.getMonth() === b.getMonth())
    return `${a.getDate()}–${b.getDate()} ${MESES[b.getMonth()]} ${y}`;
  return `${a.getDate()} ${MESES[a.getMonth()]} – ${b.getDate()} ${MESES[b.getMonth()]} ${y}`;
}

export function countdown(event){
  const today = new Date(); today.setHours(0,0,0,0);
  const start = new Date(event.startDate+'T00:00:00');
  const end   = new Date(event.endDate+'T00:00:00');
  const days  = Math.round((start - today) / 86400000);
  if (today < start) return { num:days, label:'dias para o evento', tag:'Pré-produção', word:false };
  if (today >= start && today <= end) return { num:'AO VIVO', label:'evento em andamento', tag:'Operação', word:true };
  return { num:'Realizado', label:'evento encerrado', tag:'Pós-evento', word:true };
}

export function fmtNumberBR(v){ return Number(v || 0).toLocaleString('pt-BR'); }
export function fmtCurrencyBR(v){ return Number(v || 0).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); }

/* ---------- Toasts ---------- */
export function toast(msg){
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i data-lucide="sparkles"></i><span>${msg}</span>`;
  wrap.appendChild(t);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(12px)'; t.style.transition = 'all .25s'; setTimeout(() => t.remove(), 260); }, 2400);
}

export function bindToasts(){
  document.querySelectorAll('[data-toast]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('click', e => { e.preventDefault(); toast(el.dataset.toast); });
  });
}
