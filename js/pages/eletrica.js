import { createSheetCrudPage } from '../sheet-crud.js';
import { GAS_URL } from '../gas-config.js';

export const eletricaPage = createSheetCrudPage({
  id:         'eletrica',
  idPrefix:   'elt',
  eyebrow:    'Itens',
  title:      'Elétrica',
  description:'Distribuição de pontos elétricos e iluminação por setor e área de serviço, sincronizada com a Planilha de Trabalho.',
  tableTitle: 'Distribuição por setor',
  gasUrl:     GAS_URL,
  sheetKey:   'Eletrica',
  labelField: 'setor',

  fields: [
    { key:'setor',                   label:'Setor',                        type:'text',   width:'full', placeholder:'Ex: Palco, Backstage…' },
    { key:'areaServico',             label:'Área de Serviço',              type:'text',   width:'full', placeholder:'Ex: Iluminação cênica, Quadro geral…' },
    { key:'medida',                  label:'Medida',                       type:'text',   width:'half', placeholder:'Ex: 10m' },
    { key:'especificacaoIluminacao', label:'Especificação de Iluminação',  type:'text',   width:'half', placeholder:'Ex: Refletor LED 200W' },
    { key:'obs',                     label:'Obs',                          type:'text',   width:'full', placeholder:'Observações' },
    { key:'quantidade',              label:'Quantidade',                   type:'number', width:'half', min:0, placeholder:'0' },
    { key:'potencia',                label:'Potência (W)',                 type:'number', width:'half', min:0, placeholder:'0' },
  ],

  columns: [
    { key:'setor',                   label:'Setor' },
    { key:'areaServico',             label:'Área de Serviço' },
    { key:'medida',                  label:'Medida' },
    { key:'especificacaoIluminacao', label:'Especificação de Iluminação' },
    { key:'obs',                     label:'Obs' },
    { key:'quantidade',              label:'Quantidade',   format:'number', align:'right' },
    { key:'potencia',                label:'Potência (W)', format:'number', align:'right' },
  ],

  kpis: [
    { label:'Quantidade total', icon:'plug', iconBg:'rgba(189,147,249,.16)', iconColor:'var(--highlight)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.quantidade) || 0), 0), meta:'Todos os setores' },
    { label:'Potência total', icon:'zap', iconBg:'rgba(136,227,247,.14)', iconColor:'var(--cyan)',
      compute: rows => rows.reduce((t, r) => t + (Number(r.potencia) || 0), 0), suffix:' W', meta:'Todos os setores' },
  ],
});
