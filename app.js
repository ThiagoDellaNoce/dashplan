/* ============================================================
   CONFIG  — edite aqui para apontar o painel a um evento real.
   ============================================================ */
const EVENT = {
  name:     'Baile do manoDella',
  edition:  '2026',
  location: 'Local a definir',
  startDate:'2026-09-18',   // dia 1 (formato AAAA-MM-DD)
  endDate:  '2026-09-20',   // último dia
};

const USER = { name:'Della', role:'Planejamento' };

/* ============================================================
   ESTRUTURA DE NAVEGAÇÃO
   group → itens. Adicionar uma seção = adicionar um objeto aqui.
   ============================================================ */
const NAV = [
  { group:'Principal', items:[
    { id:'visao-geral',    label:'Visão Geral',           icon:'layout-dashboard' },
    { id:'demandas',       label:'Demandas',              icon:'clipboard-list' },
    { id:'orcamentos',     label:'Orçamentos',            icon:'circle-dollar-sign' },
    { id:'cronograma',     label:'Cronograma',            icon:'calendar-range' },
  ]},
  { group: 'Itens', items:[
    { id:'mesas-cadeiras', label:'Mesas e Cadeiras',      icon:'table-2' },
  ]},
  { group:'Gestão', items:[
    { id:'fornecedores',   label:'Fornecedores',          icon:'package' },
    { id:'equipe',         label:'Equipe',                icon:'users' },
    { id:'financeiro',     label:'Financeiro',            icon:'banknote' },
  ]},
  { group:'Subcontroles', items:[
    { id:'radios',         label:'Rádios',                icon:'radio' },
    { id:'crachas',        label:'Crachás',               icon:'contact' },
    { id:'alimentacao',    label:'Alimentação',           icon:'utensils' },
    { id:'carregadores',   label:'Carregadores',          icon:'hard-hat' },
    { id:'compras',        label:'Compras & Frete',       icon:'shopping-cart' },
    { id:'segurancas',     label:'Seguranças',            icon:'shield' },
    { id:'cv',             label:'Comunicação Visual',    icon:'image' },
  ]},
  { group:'Sistema', items:[
    { id:'config',         label:'Configurações',         icon:'settings' },
  ]},
];

/* Conteúdo dos estados vazios por seção */
const PLACEHOLDERS = {
  'demandas': {
    icon:'clipboard-list', title:'Demandas de produção',
    lead:'Aqui fica o quadro de itens da produção — categoria, fornecedor, responsável, status e prazo, puxados da Planilha de Trabalho.',
    feats:['Quadro Kanban por status de produção','Tabela com filtros por categoria e setor','Score de risco e prioridade por item'],
    action:'Conectar fonte de dados', legend:true,
  },
  'orcamentos': {
    icon:'circle-dollar-sign', title:'Orçamentos',
    lead:'Comparativo de cotações por item e fornecedor, acompanhando do orçado até o contratado.',
    feats:['Cotações lado a lado por item','Melhor preço por fornecedor','Saldo entre orçado e contratado'],
    action:'Conectar fonte de dados',
  },
  'cronograma': {
    icon:'calendar-range', title:'Cronograma',
    lead:'Linha do tempo da montagem por setor, da pré-produção ao dia do evento.',
    feats:['Gantt por setor e serviço','Marcos e contagem regressiva','Filtro de entrada por frente'],
    action:'Definir período',
  },
  'fornecedores': {
    icon:'package', title:'Fornecedores',
    lead:'Diretório de fornecedores com itens, valores e status de contrato.',
    feats:['Ficha por fornecedor','Histórico de contratações','Documentos e nota fiscal'],
    action:'Adicionar fornecedor',
  },
  'equipe': {
    icon:'users', title:'Equipe & Produtores',
    lead:'Quem cuida de cada frente — produtores, áreas de atuação e canaletas de rádio.',
    feats:['Produtores por área','Responsáveis por demanda','Canaletas e contatos'],
    action:'Adicionar pessoa',
  },
  'financeiro': {
    icon:'banknote', title:'Financeiro',
    lead:'Visão consolidada do empenhado, pago e saldo da produção.',
    feats:['Empenhado × pago por categoria','Status de pagamento por item','Notas fiscais emitidas'],
    action:'Conectar fonte de dados',
  },
  'radios': {
    icon:'radio', title:'Controle de rádios',
    lead:'Distribuição de rádios por responsável, função e localização.',
    feats:['Rádios por responsável','Status de devolução','Legenda por função'],
    action:'Registrar rádio',
  },
  'crachas': {
    icon:'contact', title:'Crachás',
    lead:'Lista de credenciamento — nome, foto, setor e número do crachá.',
    feats:['Credenciais por setor','Foto e nome de crachá','Exportar para impressão'],
    action:'Adicionar credencial',
  },
  'alimentacao': {
    icon:'utensils', title:'Alimentação',
    lead:'Controle de refeições por dia e frente, do almoço à janta.',
    feats:['Refeições por dia e turno','Contagem por frente','Histórico de consumo'],
    action:'Lançar refeição',
  },
  'carregadores': {
    icon:'hard-hat', title:'Carregadores',
    lead:'Demanda e realizado de carregadores por frente, fornecedor e dia.',
    feats:['Demanda × realizado','Programação por dia','Custo por frente'],
    action:'Programar diária',
  },
  'compras': {
    icon:'shopping-cart', title:'Compras & Frete',
    lead:'Lista de compras e solicitações de frete por material e solicitante.',
    feats:['Itens de compra com valor','Solicitações de frete','Por solicitante e local'],
    action:'Nova solicitação',
  },
  'segurancas': {
    icon:'shield', title:'Seguranças',
    lead:'Escala de segurança — tipo, carga horária, horários e datas.',
    feats:['Escala por tipo e turno','Carga horária por dia','Custo da operação'],
    action:'Adicionar escala',
  },
  'cv': {
    icon:'image', title:'Comunicação Visual',
    lead:'Peças de CV por localização, material, medida e status de entrega.',
    feats:['Peças por localização','Material e acabamento','Status de entrega e arquivo'],
    action:'Adicionar peça',
  },
  'config': {
    icon:'settings', title:'Configurações',
    lead:'Tema, fontes de dados, integrações e preferências do painel.',
    feats:['Fontes de dados e integrações','Cores e tipografia','Membros e permissões'],
    action:'Gerenciar integrações',
  },
};

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

const CATEGORIES = [
  { name:'Estrutura Geral', color:'var(--cat-estrutura)' },
  { name:'Técnica',         color:'var(--cat-tecnica)' },
  { name:'Cenografia',      color:'var(--cat-cenografia)' },
  { name:'Staff',           color:'var(--cat-staff)' },
  { name:'Maquinário',      color:'var(--cat-maquinario)' },
  { name:'Est. Eventual',   color:'var(--cat-eventual)' },
  { name:'Extras',          color:'var(--cat-extras)' },
];

/* ============================================================
   UTILIDADES
   ============================================================ */
const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

function fmtRange(s, e){
  const a = new Date(s+'T00:00:00'), b = new Date(e+'T00:00:00');
  const y = b.getFullYear();
  if (a.getMonth() === b.getMonth())
    return `${a.getDate()}–${b.getDate()} ${MESES[b.getMonth()]} ${y}`;
  return `${a.getDate()} ${MESES[a.getMonth()]} – ${b.getDate()} ${MESES[b.getMonth()]} ${y}`;
}

function countdown(){
  const today = new Date(); today.setHours(0,0,0,0);
  const start = new Date(EVENT.startDate+'T00:00:00');
  const end   = new Date(EVENT.endDate+'T00:00:00');
  const days  = Math.round((start - today) / 86400000);
  if (today < start) return { num:days, label:'dias para o evento', tag:'Pré-produção', word:false };
  if (today >= start && today <= end) return { num:'AO VIVO', label:'evento em andamento', tag:'Operação', word:true };
  return { num:'Realizado', label:'evento encerrado', tag:'Pós-evento', word:true };
}

/* ============================================================
   RENDER — Visão Geral
   ============================================================ */
function renderVisaoGeral(){
  const cd = countdown();
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

/* ============================================================
   RENDER — Estado vazio (seções fictícias)
   ============================================================ */
function renderPlaceholder(id){
  const p = PLACEHOLDERS[id];
  const feats = p.feats.map(f =>
    `<div class="empty-feat"><i data-lucide="clock"></i>${f}</div>`).join('');

  const legend = p.legend ? `
    <div class="cat-legend">
      ${CATEGORIES.map(c => `<span class="cat-chip"><span class="cat-dot" style="background:${c.color}"></span>${c.name}</span>`).join('')}
    </div>` : '';

  return `
  <div class="view-head">
    <div class="view-eyebrow">${currentGroupLabel(id)}</div>
    <h1 class="view-title">${p.title}</h1>
    <p class="view-desc">${p.lead}</p>
  </div>

  <div class="empty">
    <div class="empty-ico"><i data-lucide="${p.icon}"></i></div>
    <div class="empty-title">Em construção</div>
    <p class="empty-lead">Esta seção ainda não tem dados. Veja o que vem por aqui:</p>
    <div class="empty-features">${feats}</div>
    <button class="empty-action" data-toast="Disponível na próxima fase do painel."><i data-lucide="plug"></i>${p.action}</button>
    ${legend}
  </div>`;
}

function currentGroupLabel(id){
  for (const g of NAV) if (g.items.some(i => i.id === id)) return g.group;
  return 'Painel';
}

/* ============================================================
   RENDER — Navegação + roteamento
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

function go(id){
  const view = document.getElementById('view');
  view.classList.remove('view-enter'); void view.offsetWidth; // reinicia animação
  if      (id === 'visao-geral')    view.innerHTML = renderVisaoGeral();
  else if (id === 'mesas-cadeiras') view.innerHTML = renderMesasCadeiras();
  else                              view.innerHTML = renderPlaceholder(id);
  view.classList.add('view-enter');

  document.querySelectorAll('.nav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.view === id));

  document.getElementById('app').classList.remove('nav-open'); // fecha menu mobile
  if (window.lucide) lucide.createIcons();
  bindToasts();
  window.scrollTo({ top:0 });
}

/* ============================================================
   TOASTS + interações fictícias
   ============================================================ */
function toast(msg){
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i data-lucide="sparkles"></i><span>${msg}</span>`;
  wrap.appendChild(t);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(12px)'; t.style.transition = 'all .25s'; setTimeout(() => t.remove(), 260); }, 2400);
}

function bindToasts(){
  document.querySelectorAll('[data-toast]').forEach(el => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('click', e => { e.preventDefault(); toast(el.dataset.toast); });
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init(){
  
  document.getElementById('mcModal').hidden = true;
  document.getElementById('mcConfirm').hidden = true;
  
  buildNav();
  go('visao-geral');

  // Recolher sidebar (desktop)
  document.getElementById('collapseBtn').addEventListener('click', () =>
    document.getElementById('app').classList.toggle('collapsed'));

  // Menu mobile
  document.getElementById('menuToggle').addEventListener('click', () =>
    document.getElementById('app').classList.toggle('nav-open'));
  document.getElementById('backdrop').addEventListener('click', () =>
    document.getElementById('app').classList.remove('nav-open'));

  // Atalho "/" para busca + ESC fecha modais
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('mcModal').hidden)   mcCloseModal();
      if (!document.getElementById('mcConfirm').hidden) mcCloseConfirm();
    }
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });

  bindToasts();
  if (window.lucide) lucide.createIcons();

  // document.getElementById('mcConfirm').hidden = true;
}

document.addEventListener('DOMContentLoaded', init);

/* ============================================================
   MESAS E CADEIRAS — módulo CRUD
   ============================================================ */
const MC = {
  // gasUrl: localStorage.getItem('dashplan_gas_url') || '',
  gasUrl: 'https://script.google.com/macros/s/AKfycbwDoxvz4AWyVbX4qijz7iUP9xjBlgQ3aDn1b9a1n863oUAQ2UC1VzpO7ZVHItpKiOcR/exec',
  rows:   [],
  loading: false,
};

/* ---------- API ---------- */
async function mcApiGet(params) {
  const url = new URL(MC.gasUrl);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res  = await fetch(url.toString(), { redirect: 'follow' });
  const text = await res.text();
  return JSON.parse(text);
}

async function mcApiPost(body) {
  const res  = await fetch(MC.gasUrl, {
    method: 'POST',
    body:   JSON.stringify(body),
    redirect: 'follow',
  });
  const text = await res.text();
  return JSON.parse(text);
}

async function mcLoad() {
  MC.loading = true;
  mcRefreshContent();
  try {
    const data = await mcApiGet({ action: 'list-Mesas' });
    if (!data.ok) throw new Error(data.error);
    MC.rows = data.rows;
  } catch (e) {
    toast('Erro ao carregar dados: ' + e.message);
    MC.rows = [];
  }
  MC.loading = false;
  mcRefreshContent();
}

function mcRefreshContent() {
  const el = document.getElementById('mc-content');
  if (!el) return;
  el.innerHTML = MC.loading ? renderMCLoading() : renderMCData();
  if (window.lucide) lucide.createIcons();
}

/* ---------- RENDER ---------- */
function renderMesasCadeiras() {
  if (MC.gasUrl) setTimeout(() => mcLoad(), 0);
  return `
  <div class="view-head">
    <div class="view-eyebrow">Sistema</div>
    <h1 class="view-title">Mesas e Cadeiras</h1>
    <p class="view-desc">Distribuição de mesas e cadeiras por local e tipo, sincronizada com a Planilha de Trabalho.</p>
  </div>
  ${MC.gasUrl ? `<div id="mc-content">${renderMCLoading()}</div>` : renderMCSetup()}`;
}

function renderMCLoading() {
  return `<div class="mc-loading"><i data-lucide="loader-2"></i> Carregando dados da planilha…</div>`;
}

function renderMCSetup() {
  return `
  <div class="mc-setup">
    <div class="mc-setup-inner">
      <div class="empty-ico"><i data-lucide="plug"></i></div>
      <p class="empty-title">Conectar Google Sheets</p>
      <p class="empty-lead" style="margin-inline:auto">Cole a URL do Apps Script da planilha para ativar o controle de mesas e cadeiras.</p>
      <div class="mc-url-row">
        <input class="mc-url-input" id="mcUrlInput" type="url"
          placeholder="https://script.google.com/macros/s/…/exec" />
        <button class="btn-new" onclick="mcSaveUrl()">
          <i data-lucide="link"></i><span>Salvar URL</span>
        </button>
      </div>
      <details class="mc-howto">
        <summary>Como gerar a URL? ▾</summary>
        <ol>
          <li>Abra a planilha → <strong>Extensões → Apps Script</strong></li>
          <li>Cole o conteúdo do arquivo <code>apps-script.gs</code></li>
          <li>Clique em <strong>Implantar → Nova implantação</strong></li>
          <li>Tipo: <em>Aplicativo da web</em> · Executar como: <em>Eu</em> · Acesso: <em>Qualquer pessoa</em></li>
          <li>Autorize e copie a URL gerada — cole aqui</li>
        </ol>
      </details>
    </div>
  </div>`;
}

function renderMCData() {
  MC.rows.shift();
  console.log("array", MC.rows)

  const totalCadeiras = MC.rows.reduce((total, item) => {
    return total + (Number(item.cadeiras) || 0);
  }, 0);
  const totalMesas = MC.rows.reduce((total, item) => {
    return total + (Number(item.cadeiras) || 0);
  }, 0);

  const mad = MC.rows.filter(r => String(r.tipo).toLowerCase().includes('madeira'));
  const pla = MC.rows.filter(r => !String(r.tipo).toLowerCase().includes('madeira'));

  const kpis = `
  <div class="kpi-grid" style="margin-bottom:18px">
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">Mesas total</span>
        <span class="kpi-ico" style="background:rgba(189,147,249,.16);color:var(--highlight)"><i data-lucide="table-2"></i></span>
      </div>
      <div class="kpi-value">${totalMesas}</div>
      <div class="kpi-meta">Todos os locais</div>
    </div>
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">Cadeiras total</span>
        <span class="kpi-ico" style="background:rgba(136,227,247,.14);color:var(--cyan)"><i data-lucide="armchair"></i></span>
      </div>
      <div class="kpi-value">${totalCadeiras}</div>
      <div class="kpi-meta">Todos os locais</div>
    </div>
  </div>`;

  const tbody = MC.rows.length
    ? MC.rows.map(r => {
        const isMad  = String(r.tipo).toLowerCase().includes('madeira');
        const badge  = r.tipo
          ? `<span class="mc-badge ${isMad ? 'mc-badge-mad' : 'mc-badge-pla'}">${r.tipo}</span>`
          : '<span style="color:var(--dim)">—</span>';
        return `
        <tr>
          <td>${r.local     || '<span style="color:var(--dim)">—</span>'}</td>
          <td>${r.descricao || '<span style="color:var(--dim)">—</span>'}</td>
          <td class="td-num">${Number(r.mesas    || 0)}</td>
          <td class="td-num">${Number(r.cadeiras || 0)}</td>
          <td>${badge}</td>
          <td>
            <div class="mc-actions">
              <button class="btn-icon-sm" onclick="mcOpenModal(${r.rowIndex})" aria-label="Editar">
                <i data-lucide="pencil"></i>
              </button>
              <button class="btn-icon-sm danger" onclick="mcConfirmDelete(${r.rowIndex})" aria-label="Excluir">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </td>
        </tr>`;
      }).join('')
    : `<tr><td colspan="6"><div class="mc-empty">Nenhum registro. Clique em <strong>Adicionar</strong> para começar.</div></td></tr>`;

  const table = `
  <div class="panel">
    <div class="panel-head">
      <span class="panel-title">Distribuição por local</span>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-ghost" onclick="mcPromptUrl()" style="font-size:12px;padding:7px 12px">
          <i data-lucide="link" style="width:13px;height:13px;vertical-align:-2px;margin-right:4px"></i>Alterar URL
        </button>
        <button class="btn-new" onclick="mcOpenModal(null)">
          <i data-lucide="plus"></i><span>Adicionar</span>
        </button>
      </div>
    </div>
    <div class="mc-table-wrap">
      <table class="mc-table">
        <thead>
          <tr>
            <th>Local</th>
            <th>Descrição</th>
            <th style="text-align:right">Mesas</th>
            <th style="text-align:right">Cadeiras</th>
            <th>Tipo</th>
            <th style="width:76px"></th>
          </tr>
        </thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>
  </div>`;

  return kpis + table;
}

/* ---------- URL config ---------- */
function mcSaveUrl() {
  const input = document.getElementById('mcUrlInput');
  if (!input) return;
  const url = input.value.trim();
  if (!url) { toast('Cole a URL do Apps Script antes de salvar.'); return; }
  // MC.gasUrl = url;
  MC.gasUrl = "https://script.google.com/a/macros/exp.rec.br/s/AKfycbwDoxvz4AWyVbX4qijz7iUP9xjBlgQ3aDn1b9a1n863oUAQ2UC1VzpO7ZVHItpKiOcR/exec";
  localStorage.setItem('dashplan_gas_url', url);
  go('mesas-cadeiras');
}

function mcPromptUrl() {
  const url = prompt('URL do Apps Script (deixe vazio para desconectar):', MC.gasUrl);
  if (url === null) return;
  MC.gasUrl = url.trim();
  localStorage.setItem('dashplan_gas_url', MC.gasUrl);
  go('mesas-cadeiras');
}

/* ---------- Modal add/edit ---------- */
function mcOpenModal(rowIndex) {
  const row    = rowIndex ? MC.rows.find(r => r.rowIndex === rowIndex) : null;
  const isEdit = !!row;
  
  document.getElementById('mcModalTitle').textContent = isEdit ? 'Editar registro' : 'Novo registro';
  document.getElementById('mcRowIndex').value         = rowIndex || '';
  document.getElementById('mcLocal').value            = row?.local     || '';
  document.getElementById('mcDescricao').value        = row?.descricao || '';
  document.getElementById('mcMesas').value            = row?.mesas     ?? '';
  document.getElementById('mcCadeiras').value         = row?.cadeiras  ?? '';
  document.getElementById('mcTipo').value             = row?.tipo      || '';
  document.getElementById('mcSubmitBtn').disabled     = false;
  document.getElementById('mcSubmitBtn').textContent  = 'Salvar';
  
  document.getElementById('mcModal').hidden = false;
  document.getElementById('mcModal').classList.toggle('hidden');
  setTimeout(() => document.getElementById('mcLocal').focus(), 50);
  if (window.lucide) lucide.createIcons();
}

function mcCloseModal() {
  document.getElementById('mcModal').hidden = true;

  document.getElementById('mcModal').classList.toggle('hidden');
}

async function mcSubmitModal() {
  const rowIndex = document.getElementById('mcRowIndex').value;
  const row = {
    local:     document.getElementById('mcLocal').value.trim(),
    descricao: document.getElementById('mcDescricao').value.trim(),
    mesas:     document.getElementById('mcMesas').value,
    cadeiras:  document.getElementById('mcCadeiras').value,
    tipo:      document.getElementById('mcTipo').value,
  };

  const btn = document.getElementById('mcSubmitBtn');
  btn.disabled    = true;
  btn.textContent = 'Salvando…';

  try {
    const payload = rowIndex
      ? { action: 'update', rowIndex: Number(rowIndex), ...row }
      : { action: 'create', ...row };
    const data = await mcApiPost(payload);
    if (!data.ok) throw new Error(data.error);
    mcCloseModal();
    toast(rowIndex ? 'Registro atualizado!' : 'Registro adicionado!');
    await mcLoad();
  } catch (e) {
    toast('Erro: ' + e.message);
    btn.disabled    = false;
    btn.textContent = 'Salvar';
  }
}

/* ---------- Confirm delete ---------- */
function mcConfirmDelete(rowIndex) {
  const row  = MC.rows.find(r => r.rowIndex === rowIndex);
  const desc = row?.local ? `"${row.local}"` : `linha ${rowIndex}`;
  document.getElementById('mcConfirmDesc').textContent =
    `Deseja excluir ${desc}? Esta ação não pode ser desfeita.`;
  document.getElementById('mcConfirm').dataset.rowIndex = rowIndex;
  document.getElementById('mcDeleteBtn').disabled    = false;
  document.getElementById('mcDeleteBtn').textContent = 'Excluir';
  document.getElementById('mcConfirm').hidden = false;
}

function mcCloseConfirm() {
  document.getElementById('mcConfirm').hidden = true;
}

async function mcDoDelete() {
  const rowIndex = Number(document.getElementById('mcConfirm').dataset.rowIndex);
  const btn = document.getElementById('mcDeleteBtn');
  btn.disabled    = true;
  btn.textContent = 'Excluindo…';

  try {
    const data = await mcApiPost({ action: 'delete', rowIndex });
    if (!data.ok) throw new Error(data.error);
    mcCloseConfirm();
    toast('Registro excluído.');
    await mcLoad();
  } catch (e) {
    toast('Erro: ' + e.message);
    btn.disabled    = false;
    btn.textContent = 'Excluir';
  }
}
