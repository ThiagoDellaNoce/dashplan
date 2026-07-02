import { registerPage, initShell, go } from './router.js';
import { visaoGeralPage } from './pages/visao-geral.js';
import { registerPlaceholderPages } from './pages/placeholders.js';
import { mesasCadeirasPage } from './pages/mesas-cadeiras.js';
import { gradilTendasPage } from './pages/gradil-tendas.js';
import { pisosFechamentoPage } from './pages/pisos-fechamento.js';
import { boxPage } from './pages/box.js';

/* ============================================================
   BOOT — registra páginas, injeta modais das páginas com CRUD
   (mount) e sobe a shell (nav lateral, atalhos, escape).

   Para adicionar uma nova aba com planilha própria:
   1. crie js/pages/minha-aba.js chamando createSheetCrudPage({...})
   2. importe e registre aqui (registerPage + .mount())
   3. adicione o item em js/nav.js com o mesmo id
   ============================================================ */
const sheetPages = [mesasCadeirasPage, gradilTendasPage, pisosFechamentoPage, boxPage];

function init(){
  registerPage(visaoGeralPage);
  registerPlaceholderPages(registerPage);
  sheetPages.forEach(registerPage);
  sheetPages.forEach(p => p.mount());

  initShell();
  go('visao-geral');
}

document.addEventListener('DOMContentLoaded', init);
