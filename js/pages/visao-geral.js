import { EVENT } from '../app-config.js';
import { fmtRange, countdown } from '../utils.js';

/* Dados de exemplo da Visão Geral (substituir pela fonte real) */
const SAMPLE = {
  totalItens: 248,
  contratados: 201,
  valor: 'R$ 3,12 mi',
  criticos: 4,
  pulse: [
    { label:'Resolvido',     value:154, color:'var(--ok)' },
    { label:'Em andamento',  value:74,  color:'var(--warn)' },
    { label:'Em risco',      value:20,  color:'var(--risk)' },
  ],
  categorias: [
    { name:'Estrutura Geral', value:96, color:'var(--cat-estrutura)' },
    { name:'Staff',           value:54, color:'var(--cat-staff)' },
    { name:'Técnica',         value:38, color:'var(--cat-tecnica)' },
    { name:'Cenografia',      value:22, color:'var(--cat-cenografia)' },
    { name:'Maquinário',      value:18, color:'var(--cat-maquinario)' },
    { name:'Est. Eventual',   value:12, color:'var(--cat-eventual)' },
    { name:'Extras',          value:8,  color:'var(--cat-extras)' },
  ],
};

function renderVisaoGeral(){
  const cd = countdown(EVENT);
  const totalPulse = SAMPLE.pulse.reduce((a,p)=>a+p.value,0);
  const maxCat = Math.max(...SAMPLE.categorias.map(c=>c.value));

  const pulseSegs = SAMPLE.pulse.map(p =>
    `<div class="pulse-seg" style="width:${(p.value/totalPulse*100).toFixed(1)}%;background:${p.color}"></div>`).join('');

  const pulseLegend = SAMPLE.pulse.map(p =>
    `<div class="pulse-legend-item"><span class="lg-dot" style="background:${p.color}"></span>${p.label} <b>${p.value}</b></div>`).join('');

  const catRows = SAMPLE.categorias.map(c => `
    <div class="cat-row">
      <span class="cat-name"><span class="cat-dot" style="background:${c.color}"></span>${c.name}</span>
      <span class="cat-track"><span class="cat-fill" style="width:${(c.value/maxCat*100).toFixed(0)}%;background:${c.color}"></span></span>
      <span class="cat-val">${c.value}</span>
    </div>`).join('');

  return `
  <div class="view-head">
    <div class="view-eyebrow">Painel</div>
    <h1 class="view-title">Visão Geral</h1>
  </div>

  <section class="command">
    <div class="command-top">
      <div class="command-event">
        <div class="command-status-tag"><span class="pulse"></span>${cd.tag}</div>
        <div class="command-name">${EVENT.name} · ${EVENT.edition}</div>
        <div class="command-sub">
          <span>${fmtRange(EVENT.startDate, EVENT.endDate)}</span>
          <span class="sep">·</span>
          <span>${EVENT.location}</span>
        </div>
      </div>
      <div class="countdown">
        <div class="countdown-num ${cd.word?'word':''}">${cd.num}</div>
        <div class="countdown-label">${cd.label}</div>
      </div>
    </div>

    <div class="pulse-wrap">
      <div class="pulse-bar">${pulseSegs}</div>
      <div class="pulse-legend">${pulseLegend}</div>
    </div>
  </section>

  <div class="kpi-grid">
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">Itens no escopo</span>
        <span class="kpi-ico" style="background:rgba(189,147,249,.16);color:var(--highlight)"><i data-lucide="layers"></i></span>
      </div>
      <div class="kpi-value">${SAMPLE.totalItens}</div>
      <div class="kpi-meta">Total de demandas mapeadas</div>
    </div>
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">Contratados</span>
        <span class="kpi-ico" style="background:rgba(80,250,123,.14);color:var(--ok)"><i data-lucide="check-check"></i></span>
      </div>
      <div class="kpi-value">${Math.round(SAMPLE.contratados/SAMPLE.totalItens*100)}%</div>
      <div class="kpi-meta">${SAMPLE.contratados} de ${SAMPLE.totalItens} itens</div>
    </div>
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">Valor empenhado</span>
        <span class="kpi-ico" style="background:rgba(136,227,247,.14);color:var(--cyan)"><i data-lucide="circle-dollar-sign"></i></span>
      </div>
      <div class="kpi-value">${SAMPLE.valor}</div>
      <div class="kpi-meta">Soma contratada da produção</div>
    </div>
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">Risco crítico</span>
        <span class="kpi-ico" style="background:rgba(255,85,85,.14);color:var(--risk)"><i data-lucide="triangle-alert"></i></span>
      </div>
      <div class="kpi-value">${SAMPLE.criticos}</div>
      <div class="kpi-meta">Pendências que travam a operação</div>
    </div>
  </div>

  <div class="panel-grid">
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">Pendências por categoria</span>
        <span class="badge"><span class="badge-dot"></span>Dados de exemplo</span>
      </div>
      ${catRows}
    </div>

    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">Próximas ações</span>
        <a class="panel-link" data-toast="Decisões pendentes chegam com a fonte de dados.">Ver tudo</a>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:26px 8px;color:var(--muted)">
        <span class="empty-ico" style="width:48px;height:48px;border-radius:13px;margin-bottom:14px"><i data-lucide="list-todo"></i></span>
        <p style="font-size:13.5px;max-width:34ch">Conecte a Planilha de Trabalho para listar aqui as decisões pendentes e responsáveis.</p>
      </div>
    </div>
  </div>`;
}

export const visaoGeralPage = { id: 'visao-geral', render: renderVisaoGeral };
