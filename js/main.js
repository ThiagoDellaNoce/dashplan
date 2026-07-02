import { registerPage, initShell, go } from './router.js';
import { visaoGeralPage } from './pages/visao-geral.js';
import { registerPlaceholderPages } from './pages/placeholders.js';
import { mesasCadeirasPage } from './pages/mesas-cadeiras.js';
import { mobiliaPage } from './pages/mobilia.js';
import { gradilTendasPage } from './pages/gradil-tendas.js';
import { pisosFechamentoPage } from './pages/pisos-fechamento.js';
import { boxPage } from './pages/box.js';
import { banheirosPage } from './pages/banheiros.js';
import { barricadasPage } from './pages/barricadas.js';
import { painelLedPage } from './pages/painel-led.js';
import { eletricaPage } from './pages/eletrica.js';

/* ============================================================
   BOOT — registra páginas, injeta modais das páginas com CRUD
   (mount) e sobe a shell (nav lateral, atalhos, escape).

   Para adicionar uma nova aba com planilha própria:
   1. crie js/pages/minha-aba.js chamando createSheetCrudPage({...})
   2. importe e registre aqui (registerPage + .mount())
   3. adicione o item em js/nav.js com o mesmo id
   ============================================================ */
const sheetPages = [mesasCadeirasPage, mobiliaPage, gradilTendasPage, pisosFechamentoPage, boxPage, banheirosPage, barricadasPage, painelLedPage, eletricaPage];

function init(){
  registerPage(visaoGeralPage);
  registerPlaceholderPages(registerPage);
  sheetPages.forEach(registerPage);
  sheetPages.forEach(p => p.mount());

  initShell();
  go('visao-geral');
}

document.addEventListener('DOMContentLoaded', init);
