// ============================================================
//  DASHPLAN — Apps Script para as abas MESAS E CADEIRAS / GRADIL E TENDAS / PISOS E FECHAMENTO / BOX
//  Como usar:
//  1. Abra a planilha > Extensions > Apps Script
//  2. Cole este arquivo (substitua tudo)
//  3. Deploy > New deployment > Web app
//     Execute as: Me | Who has access: Anyone
//  4. Copie a URL e cole nas Configurações do painel
// ============================================================

// Cada chave é o valor esperado no parâmetro "sheet" (POST) ou no sufixo
// da action "list-<chave>" (GET). "columns" define a ordem das colunas na
// planilha (coluna A = primeiro item) e as chaves usadas no JSON.
const SHEETS = {
  Mesas: {
    sheetName: 'MESAS E CADEIRAS',
    totalMarkers: ['total madeira', 'total plástico'],
    columns: ['local', 'descricao', 'mesas', 'cadeiras', 'tipo'],
    numeric: ['mesas', 'cadeiras'],
  },
  Gradil: {
    sheetName: 'GRADIL E TENDAS',
    totalMarkers: ['total geral'],
    columns: [
      'item', 'posicionamento', 'estilo', 'quantidade',
      'largura', 'comprimento', 'altura',
      'tendas', 'fechamentoLonas', 'gradil',
      'valorUnit', 'valorTotal',
    ],
    numeric: ['quantidade', 'largura', 'comprimento', 'altura', 'tendas', 'fechamentoLonas', 'gradil', 'valorUnit', 'valorTotal'],
  },
  Pisos: {
    sheetName: 'PISO E FECHAMENTOS',
    totalMarkers: ['total geral'],
    columns: [
      'item', 'posicionamento', 'altura', 'quantidade',
      'largura', 'comprimento', 'areaM2', 'metragemLinear',
      'valorUnit', 'valorTotal',
    ],
    numeric: ['altura', 'quantidade', 'largura', 'comprimento', 'areaM2', 'metragemLinear', 'valorUnit', 'valorTotal'],
  },
  Box: {
    sheetName: 'BOX',
    totalMarkers: ['total geral'],
    columns: [
      'local', 'valorTotal', 'valor', 'und', 'metrosTotal', 'quantidade', 'cubo',
      'grau15', 'grau45', 'm020', 'm050', 'm070', 'm100', 'm150', 'm200', 'm300', 'm400', 'm500',
    ],
    numeric: [
      'valorTotal', 'valor', 'metrosTotal', 'quantidade', 'cubo',
      'grau15', 'grau45', 'm020', 'm050', 'm070', 'm100', 'm150', 'm200', 'm300', 'm400', 'm500',
    ],
  },
};

function getSheetDef(key) {
  const cfg = SHEETS[key];
  if (!cfg) return null;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(cfg.sheetName);
  if (!sheet) return null;
  return { sheet: sheet, columns: cfg.columns, numeric: cfg.numeric, totalMarkers: cfg.totalMarkers, sheetName: cfg.sheetName };
}

// Encontra a primeira linha de total (para não editá-la/sobrescrevê-la)
function findTotalRow(def) {
  const lastRow = def.sheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    const val = String(def.sheet.getRange(i, 1).getValue()).trim().toLowerCase();
    if (def.totalMarkers.indexOf(val) !== -1) return i;
  }
  return lastRow + 1;
}

function listRows(def) {
  const totalRow = findTotalRow(def);
  const rows = [];
  if (totalRow <= 2) return rows;

  const values = def.sheet.getRange(2, 1, totalRow - 2, def.columns.length).getValues();
  values.forEach((row, i) => {
    const obj = { rowIndex: i + 2 };
    def.columns.forEach((key, c) => { obj[key] = row[c]; });
    rows.push(obj);
  });
  return rows;
}

function rowValues(def, p) {
  return def.columns.map(key => {
    if (def.numeric.indexOf(key) !== -1) return Number(p[key]) || 0;
    return p[key] || '';
  });
}

function createRow(def, p) {
  const totalRow = findTotalRow(def);
  def.sheet.insertRowBefore(totalRow);
  def.sheet.getRange(totalRow, 1, 1, def.columns.length).setValues([rowValues(def, p)]);
  return { rowIndex: totalRow };
}

function updateRow(def, p) {
  const idx = Number(p.rowIndex);
  def.sheet.getRange(idx, 1, 1, def.columns.length).setValues([rowValues(def, p)]);
  return { rowIndex: idx };
}

function deleteRow(def, p) {
  def.sheet.deleteRow(Number(p.rowIndex));
  return { deleted: Number(p.rowIndex) };
}

function jsonOut(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const p      = e.parameter || {};
    const action = p.action || 'list-Mesas';

    const listMatch = /^list-(.+)$/.exec(action);
    if (listMatch) {
      const def = getSheetDef(listMatch[1]);
      if (!def) return jsonOut({ ok: false, error: 'Aba não encontrada para "' + action + '".' });
      return jsonOut({ ok: true, rows: listRows(def) });
    }

    if (action === 'delete') {
      const def = getSheetDef(p.sheet || 'Mesas');
      if (!def) return jsonOut({ ok: false, error: 'Aba "' + (p.sheet || 'Mesas') + '" não encontrada.' });
      return jsonOut({ ok: true, data: deleteRow(def, p) });
    }

    return jsonOut({ ok: false, error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonOut({ ok: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const action = body.action;
    const def    = getSheetDef(body.sheet || 'Mesas');
    if (!def) return jsonOut({ ok: false, error: 'Aba "' + (body.sheet || 'Mesas') + '" não encontrada.' });

    if (action === 'create') return jsonOut({ ok: true, data: createRow(def, body) });
    if (action === 'update') return jsonOut({ ok: true, data: updateRow(def, body) });
    if (action === 'delete') return jsonOut({ ok: true, data: deleteRow(def, body) });
    return jsonOut({ ok: false, error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonOut({ ok: false, error: err.toString() });
  }
}
