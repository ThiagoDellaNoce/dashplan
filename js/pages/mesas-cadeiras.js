import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL, GAS_URL_RESTRICTED } from '../gas-config.js';

export const mesasCadeirasPage = createSheetCrudPage({
  id:         'mesas-cadeiras',
  idPrefix:   'mc',
  eyebrow:    'Sistema',
  title:      'Mesas e Cadeiras',
  description:'Distribuição de mesas e cadeiras por local e tipo, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por local',
  gasUrl:     GAS_URL,
  forcedUrl:  GAS_URL_RESTRICTED, // "Salvar URL" força o endpoint restrito ao domínio da org
  sheetKey:   'Mesas',
  labelField: 'local',

  fields: [
    { key:'local',     label:'Local',     type:'text',   width:'full', placeholder:'Ex: Bar 1, Área VIP…' },
    { key:'descricao', label:'Descrição', type:'text',   width:'full', placeholder:'Ex: Mesa redonda com 4 cadeiras' },
    { key:'mesas',     label:'Mesas',     type:'number', width:'half', min:0, placeholder:'0' },
    { key:'cadeiras',  label:'Cadeiras',  type:'number', width:'half', min:0, placeholder:'0' },
    { key:'tipo',      label:'Tipo',      type:'select', width:'full', options:[
        { value:'',        label:'Selecionar tipo…' },
        { value:'Madeira',  label:'Madeira' },
        { value:'Plástico', label:'Plástico' },
      ]},
  ],

  columns: [
    { key:'local',     label:'Local' },
    { key:'descricao', label:'Descrição' },
    { key:'mesas',     label:'Mesas',    format:'number', align:'right' },
    { key:'cadeiras',  label:'Cadeiras', format:'number', align:'right' },
    { key:'tipo',      label:'Tipo', render: row => {
        const isMad = String(row.tipo).toLowerCase().includes('madeira');
        return row.tipo
          ? `<span class="mc-badge ${isMad ? 'mc-badge-mad' : 'mc-badge-pla'}">${row.tipo}</span>`
          : '<span style="color:var(--dim)">—</span>';
      }},
  ],

  kpis: [
    { label:'Mesas total', icon:'table-2', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.cadeiras) || 0), 0), meta:'Todos os locais' },
    { label:'Cadeiras total', icon:'armchair', iconBg:'rgba(136,227,247,.14)', iconColor:'var(--cyan)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.cadeiras) || 0), 0), meta:'Todos os locais' },
  ],
});
