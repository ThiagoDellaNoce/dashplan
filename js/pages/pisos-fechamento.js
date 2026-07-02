import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const pisosFechamentoPage = createSheetCrudPage({
  id:         'pisos-fechamento',
  idPrefix:   'pf',
  eyebrow:    'Itens',
  title:      'Pisos e Fechamento',
  description:'Distribuição de pisos e fechamentos por posicionamento, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por posicionamento',
  gasUrl:     GAS_URL,
  sheetKey:   'Pisos',
  labelField: 'item',

  fields: [
    { key:'item',            label:'Item',                 type:'text',   width:'full', placeholder:'Ex: Piso tablado, Fechamento octanorm…' },
    { key:'posicionamento',  label:'Posicionamento',        type:'text',   width:'full', placeholder:'Ex: Palco, Camarim, Backstage…' },
    { key:'altura',          label:'Altura (m)',            type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'quantidade',      label:'Quantidade',            type:'number', width:'half', min:0, placeholder:'0' },
    { key:'largura',         label:'Largura (m)',           type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'comprimento',     label:'Comprimento (m)',       type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'areaM2',          label:'Área (m²)',             type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'metragemLinear',  label:'Metragem linear (m)',   type:'number', width:'half', min:0, step:0.01, placeholder:'0' },
    { key:'valorUnit',       label:'Valor unit.',           type:'number', width:'half', min:0, step:0.01, placeholder:'0,00' },
    { key:'valorTotal',      label:'Valor T.T.',            type:'number', width:'full', min:0, step:0.01, placeholder:'0,00' },
  ],

  columns: [
    { key:'item',            label:'Item' },
    { key:'posicionamento',  label:'Posicionamento' },
    { key:'altura',          label:'Altura (m)',      format:'number',   align:'right' },
    { key:'quantidade',      label:'Qtd',             format:'number',   align:'right' },
    { key:'largura',         label:'Largura (m)',     format:'number',   align:'right' },
    { key:'comprimento',     label:'Compr. (m)',      format:'number',   align:'right' },
    { key:'areaM2',          label:'Área (m²)',       format:'number',   align:'right' },
    { key:'metragemLinear',  label:'Metragem (m)',    format:'number',   align:'right' },
    { key:'valorUnit',       label:'Valor unit.',     format:'currency', align:'right' },
    { key:'valorTotal',      label:'Valor total',     format:'currency', align:'right' },
  ],

  kpis: [
    { label:'Área total', icon:'square', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.areaM2) || 0), 0), suffix:' m²', meta:'Todos os posicionamentos' },
    { label:'Metragem linear total', icon:'ruler', iconBg:'rgba(136,227,247,.14)', iconColor:'var(--cyan)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.metragemLinear) || 0), 0), suffix:' m', meta:'Todos os posicionamentos' },
  ],
});
