import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const gradilTendasPage = createSheetCrudPage({
  id:         'gradil-tendas',
  idPrefix:   'gt',
  eyebrow:    'Itens',
  title:      'Gradil e Tendas',
  description:'Distribuição de gradis e tendas por posicionamento e estilo, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por posicionamento',
  gasUrl:     GAS_URL,
  sheetKey:   'Gradil',
  labelField: 'item',

  fields: [
    { key:'item',            label:'Item',                     type:'text',   width:'full', placeholder:'Ex: Gradil de contenção' },
    { key:'posicionamento',  label:'Posicionamento',            type:'text',   width:'full', placeholder:'Ex: Entrada VIP, Perímetro…' },
    { key:'estilo',          label:'Estilo',                    type:'text',   width:'full', placeholder:'Ex: Piramidal, Chapelaria…' },
    { key:'quantidade',      label:'Quantidade',                type:'number', width:'half', min:0, placeholder:'0' },
    { key:'largura',         label:'Largura (m linear)',        type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'comprimento',     label:'Comprimento (m linear)',    type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'altura',          label:'Altura (m linear)',         type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'tendas',          label:'Tendas (m²)',                type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'fechamentoLonas', label:'Fechamento lonas (m²)',      type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'gradil',          label:'Gradil (m linear)',          type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'valorUnit',       label:'Valor unit.',                type:'number', width:'half', min:0, step:0.01, placeholder:'0,00' },
    { key:'valorTotal',      label:'Valor T.T.',                 type:'number', width:'full', min:0, step:0.01, placeholder:'0,00' },
  ],

  columns: [
    { key:'item',            label:'Item' },
    { key:'posicionamento',  label:'Posicionamento' },
    { key:'estilo',          label:'Estilo' },
    { key:'quantidade',      label:'Qtd',          format:'number',   align:'right' },
    { key:'largura',         label:'Largura (m)',  format:'number',   align:'right' },
    { key:'comprimento',     label:'Compr. (m)',   format:'number',   align:'right' },
    { key:'altura',          label:'Altura (m)',   format:'number',   align:'right' },
    { key:'tendas',          label:'Tendas (m²)',  format:'number',   align:'right' },
    { key:'fechamentoLonas', label:'Lonas (m²)',   format:'number',   align:'right' },
    { key:'gradil',          label:'Gradil (m)',   format:'number',   align:'right' },
    { key:'valorUnit',       label:'Valor unit.',  format:'currency', align:'right' },
    { key:'valorTotal',      label:'Valor total',  format:'currency', align:'right' },
  ],

  kpis: [
    { label:'Tendas total', icon:'tent', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.tendas) || 0), 0), suffix:' m²', meta:'Todos os posicionamentos' },
    { label:'Gradil total', icon:'fence', iconBg:'rgba(136,227,247,.14)', iconColor:'var(--cyan)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.gradil) || 0), 0), suffix:' m', meta:'Todos os posicionamentos' },
  ],
});
