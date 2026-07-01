// ============================================================
//  DASHPLAN — Apps Script para aba MESAS E CADEIRAS
//  Como usar:
//  1. Abra a planilha > Extensions > Apps Script
//  2. Cole este arquivo (substitua tudo)
//  3. Deploy > New deployment > Web app
//     Execute as: Me | Who has access: Anyone
//  4. Copie a URL e cole nas Configurações do painel
// ============================================================

const SHEET_NAME = 'MESAS E CADEIRAS';

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

// Encontra a primeira linha de total (para não editá-las)
function findTotalRow(sheet) {
  const lastRow = sheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    const val = String(sheet.getRange(i, 1).getValue()).trim();
    if (val === 'Total Madeira' || val === 'Total Plástico') return i;
  }
  return lastRow + 1;
}

function listRows(sheet) {
  const totalRow = findTotalRow(sheet);
  const rows = [];
  if (totalRow <= 2) return rows;

  const values = sheet.getRange(2, 1, totalRow - 2, 5).getValues();
  values.forEach((row, i) => {
    rows.push({
      rowIndex: i + 2,
      local:     row[0],
      descricao: row[1],
      mesas:     row[2],
      cadeiras:  row[3],
      tipo:      row[4],
    });
  });
  return rows;
}

function createRow(sheet, p) {
  const totalRow = findTotalRow(sheet);
  sheet.insertRowBefore(totalRow);
  sheet.getRange(totalRow, 1, 1, 5).setValues([[
    p.local     || '',
    p.descricao || '',
    Number(p.mesas)    || 0,
    Number(p.cadeiras) || 0,
    p.tipo      || '',
  ]]);
  return { rowIndex: totalRow };
}

function updateRow(sheet, p) {
  const idx = Number(p.rowIndex);
  sheet.getRange(idx, 1, 1, 5).setValues([[
    p.local     || '',
    p.descricao || '',
    Number(p.mesas)    || 0,
    Number(p.cadeiras) || 0,
    p.tipo      || '',
  ]]);
  return { rowIndex: idx };
}

function deleteRow(sheet, p) {
  sheet.deleteRow(Number(p.rowIndex));
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
    const action = p.action || 'list';
    const sheet  = getSheet();
    if (!sheet) return jsonOut({ ok: false, error: 'Aba "' + SHEET_NAME + '" não encontrada.' });

    if (action === 'list')   return jsonOut({ ok: true, rows: listRows(sheet) });
    if (action === 'delete') return jsonOut({ ok: true, data: deleteRow(sheet, p) });
    return jsonOut({ ok: false, error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonOut({ ok: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const action = body.action;
    const sheet  = getSheet();
    if (!sheet) return jsonOut({ ok: false, error: 'Aba "' + SHEET_NAME + '" não encontrada.' });

    if (action === 'create') return jsonOut({ ok: true, data: createRow(sheet, body) });
    if (action === 'update') return jsonOut({ ok: true, data: updateRow(sheet, body) });
    if (action === 'delete') return jsonOut({ ok: true, data: deleteRow(sheet, body) });
    return jsonOut({ ok: false, error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonOut({ ok: false, error: err.toString() });
  }
}
