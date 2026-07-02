import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const barricadasPage = createSheetCrudPage({
  id:         'barricadas',
  idPrefix:   'brc',
  eyebrow:    'Itens',
  title:      'Barricadas',
  description:'Distribuição de barricadas por tipo de peça e setor, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por setor',
  gasUrl:     GAS_URL,
  sheetKey:   'Barricadas',
  labelField: 'tipoPeca',

  fields: [
    { key:'tipoPeca',    label:'Tipo Peça',   type:'text',   width:'full', placeholder:'Ex: Barricada reta, Barricada canto…' },
    { key:'setor',       label:'Setor',       type:'text',   width:'full', placeholder:'Ex: Palco, Backstage…' },
    { key:'quantidade',  label:'Quantidade',  type:'number', width:'full', min:0, placeholder:'0' },
  ],

  columns: [
    { key:'tipoPeca',    label:'Tipo Peça' },
    { key:'setor',       label:'Setor' },
    { key:'quantidade',  label:'Quantidade', format:'number', align:'right' },
  ],

  kpis: [
    { label:'Barricadas total', icon:'construction', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.quantidade) || 0), 0), meta:'Todos os setores' },
  ],
});
