/* ============================================================
   GOOGLE APPS SCRIPT — URL do backend (planilha de trabalho)
   Mesmo deployment atende todas as abas via action=list-<sheetKey>
   e payload.sheet=<sheetKey>. Ver apps-script.gs.
   ============================================================ */
export const GAS_URL = 'https://script.google.com/macros/s/AKfycbwDoxvz4AWyVbX4qijz7iUP9xjBlgQ3aDn1b9a1n863oUAQ2UC1VzpO7ZVHItpKiOcR/exec';

// URL restrita ao domínio da organização — usada por páginas que forçam
// esse endpoint ao salvar (ver forcedUrl em sheet-crud.js).
export const GAS_URL_RESTRICTED = 'https://script.google.com/a/macros/exp.rec.br/s/AKfycbwDoxvz4AWyVbX4qijz7iUP9xjBlgQ3aDn1b9a1n863oUAQ2UC1VzpO7ZVHItpKiOcR/exec';
