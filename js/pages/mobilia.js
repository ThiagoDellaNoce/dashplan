import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const mobiliaPage = createSheetCrudPage({
  id:         'mobilia',
  idPrefix:   'mb',
  eyebrow:    'Itens',
  title:      'Mobília',
  description:'Distribuição de mobília por local e fornecedor, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por local',
  gasUrl:     GAS_URL,
  sheetKey:   'Mobilia',
  labelField: 'local',

  fields: [
    { key:'local',       label:'Local',       type:'text',   width:'full', placeholder:'Ex: Palco, Backstage…' },
    { key:'item',        label:'Item',        type:'text',   width:'full', placeholder:'Ex: Sofá, Puff, Aparador…' },
    { key:'quantidade',  label:'Quantidade',  type:'number', width:'half', min:0, placeholder:'0' },
    { key:'fornecedor',  label:'Fornecedor',  type:'text',   width:'half', placeholder:'Ex: Nome do fornecedor' },
  ],

  columns: [
    { key:'local',       label:'Local' },
    { key:'item',        label:'Item' },
    { key:'quantidade',  label:'Quantidade', format:'number', align:'right' },
    { key:'fornecedor',  label:'Fornecedor' },
  ],

  kpis: [
    { label:'Itens total', icon:'sofa', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.quantidade) || 0), 0), meta:'Todos os locais' },
  ],
});
