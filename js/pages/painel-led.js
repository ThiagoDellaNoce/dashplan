import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const painelLedPage = createSheetCrudPage({
  id:         'painel-led',
  idPrefix:   'pl',
  eyebrow:    'Itens',
  title:      'Painel de LED',
  description:'Distribuição de painéis de LED por local e dimensão, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por local',
  gasUrl:     GAS_URL,
  sheetKey:   'PainelLed',
  labelField: 'local',

  fields: [
    { key:'local',        label:'Local',        type:'text',   width:'full', placeholder:'Ex: Palco, Backstage…' },
    { key:'descricao',    label:'Descrição',    type:'text',   width:'full', placeholder:'Ex: Painel de LED P3…' },
    { key:'dimensao',     label:'Dimensão',     type:'text',   width:'half', placeholder:'Ex: 4x3m' },
    { key:'metrosTotal',  label:'Metros T.T.',  type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
  ],

  columns: [
    { key:'local',        label:'Local' },
    { key:'descricao',    label:'Descrição' },
    { key:'dimensao',     label:'Dimensão' },
    { key:'metrosTotal',  label:'Metros T.T.', format:'number', align:'right' },
  ],

  kpis: [
    { label:'Metros total', icon:'monitor', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.metrosTotal) || 0), 0), suffix:' m', meta:'Todos os locais' },
  ],
});
