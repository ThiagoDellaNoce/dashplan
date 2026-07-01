import { toast, fmtNumberBR, fmtCurrencyBR } from './utils.js';
import { registerOverlay, go } from './router.js';

/* ============================================================
   SHEET CRUD — factory genérico para uma aba "planilha → painel"
   (listar / criar / editar / excluir via apps-script.gs).

   Uma página nova = um arquivo de config em pages/ chamando
   createSheetCrudPage({...}). Nada aqui deveria mudar por causa
   de uma aba específica — só a config em pages/*.js.
   ============================================================ */

function capitalize(key){ return key.charAt(0).toUpperCase() + key.slice(1); }
function fieldId(prefix, key){ return `${prefix}${capitalize(key)}`; }

function defaultCellRender(col, row){
  const raw = row[col.key];
  if (col.format === 'number')   return fmtNumberBR(raw);
  if (col.format === 'currency') return fmtCurrencyBR(raw);
  return raw || '<span style="color:var(--dim)">—</span>';
}

export function createSheetCrudPage(cfg){
  const P = cfg.idPrefix;
  const state = { rows: [], loading: false, gasUrl: cfg.gasUrl };

  /* ---------- API ---------- */
  async function apiGet(params){
    const url = new URL(state.gasUrl);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    const res  = await fetch(url.toString(), { redirect: 'follow' });
    return JSON.parse(await res.text());
  }

  async function apiPost(body){
    const res = await fetch(state.gasUrl, {
      method: 'POST',
      body:   JSON.stringify(body),
      redirect: 'follow',
    });
    return JSON.parse(await res.text());
  }

  async function load(){
    state.loading = true;
    refreshContent();
    try {
      const data = await apiGet({ action: `list-${cfg.sheetKey}` });
      if (!data.ok) throw new Error(data.error);
      state.rows = data.rows;
    } catch (e) {
      toast('Erro ao carregar dados: ' + e.message);
      state.rows = [];
    }
    state.loading = false;
    refreshContent();
  }

  function refreshContent(){
    const el = document.getElementById(`${P}-content`);
    if (!el) return;
    el.innerHTML = state.loading ? renderLoading() : renderData();
    if (window.lucide) lucide.createIcons();
  }

  /* ---------- RENDER: página ---------- */
  function render(){
    if (state.gasUrl) setTimeout(load, 0);
    return `
    <div class="view-head">
      <div class="view-eyebrow">${cfg.eyebrow}</div>
      <h1 class="view-title">${cfg.title}</h1>
      <p class="view-desc">${cfg.description}</p>
    </div>
    ${state.gasUrl ? `<div id="${P}-content">${renderLoading()}</div>` : renderSetup()}`;
  }

  function renderLoading(){
    return `<div class="mc-loading"><i data-lucide="loader-2"></i> Carregando dados da planilha…</div>`;
  }

  function renderSetup(){
    return `
    <div class="mc-setup">
      <div class="mc-setup-inner">
        <div class="empty-ico"><i data-lucide="plug"></i></div>
        <p class="empty-title">Conectar Google Sheets</p>
        <p class="empty-lead" style="margin-inline:auto">Cole a URL do Apps Script da planilha para ativar o controle de ${cfg.title.toLowerCase()}.</p>
        <div class="mc-url-row">
          <input class="mc-url-input" id="${P}UrlInput" type="url"
            placeholder="https://script.google.com/macros/s/…/exec" />
          <button class="btn-new" onclick="window.${P}SaveUrl()">
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

  function renderData(){
    state.rows.shift();

    const kpisHtml = `
    <div class="kpi-grid" style="margin-bottom:18px">
      ${cfg.kpis.map(k => {
        const value = k.compute(state.rows);
        return `
        <div class="kpi">
          <div class="kpi-top">
            <span class="kpi-label">${k.label}</span>
            <span class="kpi-ico" style="background:${k.iconBg};color:${k.iconColor}"><i data-lucide="${k.icon}"></i></span>
          </div>
          <div class="kpi-value">${value.toLocaleString('pt-BR')}${k.suffix || ''}</div>
          <div class="kpi-meta">${k.meta}</div>
        </div>`;
      }).join('')}
    </div>`;

    const tbody = state.rows.length
      ? state.rows.map(r => `
        <tr>
          ${cfg.columns.map(col => `<td class="${col.align === 'right' ? 'td-num' : ''}">${col.render ? col.render(r) : defaultCellRender(col, r)}</td>`).join('')}
          <td>
            <div class="mc-actions">
              <button class="btn-icon-sm" onclick="window.${P}OpenModal(${r.rowIndex})" aria-label="Editar">
                <i data-lucide="pencil"></i>
              </button>
              <button class="btn-icon-sm danger" onclick="window.${P}ConfirmDelete(${r.rowIndex})" aria-label="Excluir">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </td>
        </tr>`).join('')
      : `<tr><td colspan="${cfg.columns.length + 1}"><div class="mc-empty">Nenhum registro. Clique em <strong>Adicionar</strong> para começar.</div></td></tr>`;

    return kpisHtml + `
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">${cfg.tableTitle}</span>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn-ghost" onclick="window.${P}PromptUrl()" style="font-size:12px;padding:7px 12px">
            <i data-lucide="link" style="width:13px;height:13px;vertical-align:-2px;margin-right:4px"></i>Alterar URL
          </button>
          <button class="btn-new" onclick="window.${P}OpenModal(null)">
            <i data-lucide="plus"></i><span>Adicionar</span>
          </button>
        </div>
      </div>
      <div class="mc-table-wrap">
        <table class="mc-table">
          <thead>
            <tr>
              ${cfg.columns.map(col => `<th${col.align === 'right' ? ' style="text-align:right"' : ''}>${col.label}</th>`).join('')}
              <th style="width:76px"></th>
            </tr>
          </thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
    </div>`;
  }

  /* ---------- RENDER: modal (campos vêm da config) ---------- */
  function fieldHtml(f){
    const id = fieldId(P, f.key);
    const input = f.type === 'select'
      ? `<select class="form-select" id="${id}">
          ${f.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
        </select>`
      : `<input class="form-input" id="${id}" type="${f.type}"${f.min !== undefined ? ` min="${f.min}"` : ''}${f.step ? ` step="${f.step}"` : ''} placeholder="${f.placeholder || ''}" />`;
    return `
    <div class="form-field">
      <label class="form-label" for="${id}">${f.label}</label>
      ${input}
    </div>`;
  }

  function fieldRowsHtml(){
    const rowsHtml = [];
    let i = 0;
    while (i < cfg.fields.length) {
      const f = cfg.fields[i];
      const next = cfg.fields[i + 1];
      if (f.width === 'half' && next && next.width === 'half') {
        rowsHtml.push(`<div class="form-row-2">${fieldHtml(f)}${fieldHtml(next)}</div>`);
        i += 2;
      } else {
        rowsHtml.push(fieldHtml(f));
        i += 1;
      }
    }
    return rowsHtml.join('');
  }

  /* ---------- Injeta modal + confirm no DOM (uma vez, no boot) ---------- */
  function mount(){
    const root = document.getElementById('overlay-root');
    root.insertAdjacentHTML('beforeend', `
    <div id="${P}Modal" class="modal-overlay hidden" hidden="true">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="${P}ModalTitle">
        <div class="modal-head">
          <span class="modal-title" id="${P}ModalTitle">Novo registro</span>
          <button class="icon-btn" onclick="window.${P}CloseModal()" aria-label="Fechar">
            <i data-lucide="x"></i>
          </button>
        </div>
        <input type="hidden" id="${P}RowIndex" />
        ${fieldRowsHtml()}
        <div class="modal-foot">
          <button class="btn-ghost" onclick="window.${P}CloseModal()">Cancelar</button>
          <button class="btn-primary" id="${P}SubmitBtn" onclick="window.${P}SubmitModal()">Salvar</button>
        </div>
      </div>
    </div>

    <div id="${P}Confirm" class="confirm-overlay hidden" hidden="true">
      <div class="confirm-box" role="alertdialog" aria-modal="true">
        <div class="confirm-title">Confirmar exclusão</div>
        <p class="confirm-desc" id="${P}ConfirmDesc"></p>
        <div class="confirm-actions">
          <button class="btn-ghost" onclick="window.${P}CloseConfirm()">Cancelar</button>
          <button class="btn-danger" id="${P}DeleteBtn" onclick="window.${P}DoDelete()">Excluir</button>
        </div>
      </div>
    </div>`);

    document.getElementById(`${P}Modal`).hidden   = true;
    document.getElementById(`${P}Confirm`).hidden = true;

    registerOverlay(`${P}Modal`, closeModal);
    registerOverlay(`${P}Confirm`, closeConfirm);

    // onclick="..." inline precisa achar as funções no escopo global.
    window[`${P}SaveUrl`]       = saveUrl;
    window[`${P}PromptUrl`]     = promptUrl;
    window[`${P}OpenModal`]     = openModal;
    window[`${P}CloseModal`]    = closeModal;
    window[`${P}SubmitModal`]   = submitModal;
    window[`${P}ConfirmDelete`] = confirmDelete;
    window[`${P}CloseConfirm`]  = closeConfirm;
    window[`${P}DoDelete`]      = doDelete;
  }

  /* ---------- URL config ---------- */
  function saveUrl(){
    const input = document.getElementById(`${P}UrlInput`);
    if (!input) return;
    const typed = input.value.trim();
    if (!typed) { toast('Cole a URL do Apps Script antes de salvar.'); return; }
    state.gasUrl = cfg.forcedUrl || typed;
    localStorage.setItem(`dashplan_gas_url_${P}`, state.gasUrl);
    go(cfg.id);
  }

  function promptUrl(){
    const url = prompt('URL do Apps Script (deixe vazio para desconectar):', state.gasUrl);
    if (url === null) return;
    state.gasUrl = url.trim();
    localStorage.setItem(`dashplan_gas_url_${P}`, state.gasUrl);
    go(cfg.id);
  }

  /* ---------- Modal add/edit ---------- */
  function openModal(rowIndex){
    const row    = rowIndex ? state.rows.find(r => r.rowIndex === rowIndex) : null;
    const isEdit = !!row;

    document.getElementById(`${P}ModalTitle`).textContent = isEdit ? 'Editar registro' : 'Novo registro';
    document.getElementById(`${P}RowIndex`).value = rowIndex || '';
    cfg.fields.forEach(f => {
      const el = document.getElementById(fieldId(P, f.key));
      if (!el) return;
      el.value = row?.[f.key] ?? '';
    });
    document.getElementById(`${P}SubmitBtn`).disabled    = false;
    document.getElementById(`${P}SubmitBtn`).textContent = 'Salvar';

    document.getElementById(`${P}Modal`).hidden = false;
    document.getElementById(`${P}Modal`).classList.remove('hidden');
    setTimeout(() => document.getElementById(fieldId(P, cfg.fields[0].key)).focus(), 50);
    if (window.lucide) lucide.createIcons();
  }

  function closeModal(){
    document.getElementById(`${P}Modal`).hidden = true;
    document.getElementById(`${P}Modal`).classList.add('hidden');
  }

  async function submitModal(){
    const rowIndex = document.getElementById(`${P}RowIndex`).value;
    const row = {};
    cfg.fields.forEach(f => {
      const el = document.getElementById(fieldId(P, f.key));
      row[f.key] = el ? el.value.trim() : '';
    });

    const btn = document.getElementById(`${P}SubmitBtn`);
    btn.disabled    = true;
    btn.textContent = 'Salvando…';

    try {
      const payload = rowIndex
        ? { action: 'update', sheet: cfg.sheetKey, rowIndex: Number(rowIndex), ...row }
        : { action: 'create', sheet: cfg.sheetKey, ...row };
      const data = await apiPost(payload);
      if (!data.ok) throw new Error(data.error);
      closeModal();
      toast(rowIndex ? 'Registro atualizado!' : 'Registro adicionado!');
      await load();
    } catch (e) {
      toast('Erro: ' + e.message);
      btn.disabled    = false;
      btn.textContent = 'Salvar';
    }
  }

  /* ---------- Confirm delete ---------- */
  function confirmDelete(rowIndex){
    const row   = state.rows.find(r => r.rowIndex === rowIndex);
    const label = row?.[cfg.labelField];
    const desc  = label ? `"${label}"` : `linha ${rowIndex}`;
    document.getElementById(`${P}ConfirmDesc`).textContent =
      `Deseja excluir ${desc}? Esta ação não pode ser desfeita.`;
    document.getElementById(`${P}Confirm`).dataset.rowIndex = rowIndex;
    document.getElementById(`${P}DeleteBtn`).disabled    = false;
    document.getElementById(`${P}DeleteBtn`).textContent = 'Excluir';
    document.getElementById(`${P}Confirm`).hidden = false;
    document.getElementById(`${P}Confirm`).classList.remove('hidden');
  }

  function closeConfirm(){
    document.getElementById(`${P}Confirm`).hidden = true;
    document.getElementById(`${P}Confirm`).classList.add('hidden');
  }

  async function doDelete(){
    const rowIndex = Number(document.getElementById(`${P}Confirm`).dataset.rowIndex);
    const btn = document.getElementById(`${P}DeleteBtn`);
    btn.disabled    = true;
    btn.textContent = 'Excluindo…';

    try {
      const data = await apiPost({ action: 'delete', sheet: cfg.sheetKey, rowIndex });
      if (!data.ok) throw new Error(data.error);
      closeConfirm();
      toast('Registro excluído.');
      await load();
    } catch (e) {
      toast('Erro: ' + e.message);
      btn.disabled    = false;
      btn.textContent = 'Excluir';
    }
  }

  return { id: cfg.id, render, mount };
}
