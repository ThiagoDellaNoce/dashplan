import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const banheirosPage = createSheetCrudPage({
  id:         'banheiros',
  idPrefix:   'bn',
  eyebrow:    'Itens',
  title:      'Banheiros',
  description:'Controle de banheiros por setor e local, com status de montagem, sincronizado com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por setor',
  gasUrl:     GAS_URL,
  sheetKey:   'Banheiros',
  labelField: 'local',
  skipFirstRow: false, // a linha 6 (1ª após o cabeçalho da linha 5) já é dado real

  fields: [
    { key:'referencial', label:'Referencial', type:'text',   width:'full', placeholder:'Ex: BAN-01' },
    { key:'setor',       label:'Setor',       type:'text',   width:'full', placeholder:'Ex: Backstage, Praça de alimentação…' },
    { key:'local',       label:'Local',       type:'text',   width:'full', placeholder:'Ex: Próximo ao palco 2' },
    { key:'qtd',         label:'Qtd',         type:'number', width:'half', min:0, placeholder:'0' },
    { key:'qtdPne',      label:'Qtd PNE',     type:'number', width:'half', min:0, placeholder:'0' },
    { key:'check',       label:'Check',       type:'checkbox', width:'half' },
    { key:'servico',     label:'Serviço?',    type:'checkbox', width:'half' },
    { key:'montado',     label:'Montado',     type:'checkbox', width:'half' },
    { key:'alterado',    label:'Alterado',    type:'checkbox', width:'half' },
  ],

  columns: [
    { key:'check',       label:'Check',       format:'boolean' },
    { key:'referencial', label:'Referencial' },
    { key:'setor',       label:'Setor' },
    { key:'local',       label:'Local' },
    { key:'qtd',         label:'Qtd',         format:'number',  align:'right' },
    { key:'qtdPne',      label:'Qtd PNE',     format:'number',  align:'right' },
    { key:'servico',     label:'Serviço?',    format:'boolean' },
    { key:'montado',     label:'Montado',     format:'boolean' },
    { key:'alterado',    label:'Alterado',    format:'boolean' },
  ],

  kpis: [
    { label:'Banheiros total', icon:'toilet', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.qtd) || 0), 0), meta:'Todos os setores' },
    { label:'Banheiros PNE', icon:'accessibility', iconBg:'rgba(136,227,247,.14)', iconColor:'var(--cyan)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.qtdPne) || 0), 0), meta:'Todos os setores' },
  ],
});
