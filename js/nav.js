/* ============================================================
   ESTRUTURA DE NAVEGAÇÃO
   group → itens. Adicionar uma seção = adicionar um objeto aqui.
   Para uma aba nova com página própria, crie o módulo em pages/
   e registre-o em main.js — o id aqui precisa bater com o id
   passado a registerPage().
   ============================================================ */
export const NAV = [
  { group:'Principal', items:[
    { id:'visao-geral',    label:'Visão Geral',           icon:'layout-dashboard' },
    { id:'demandas',       label:'Demandas',              icon:'clipboard-list' },
    { id:'orcamentos',     label:'Orçamentos',            icon:'circle-dollar-sign' },
    { id:'cronograma',     label:'Cronograma',            icon:'calendar-range' },
  ]},
  { group: 'Itens', items:[
    { id:'mesas-cadeiras',    label:'Mesas e Cadeiras',      icon:'table-2' },
    { id:'gradil-tendas',     label:'Gradil e Tendas',       icon:'tent' },
    { id:'pisos-fechamento',  label:'Pisos e Fechamento',    icon:'layers' },
    { id:'box',               label:'Box',                   icon:'box' },
  ]},
  { group:'Gestão', items:[
    { id:'fornecedores',   label:'Fornecedores',          icon:'package' },
    { id:'equipe',         label:'Equipe',                icon:'users' },
    { id:'financeiro',     label:'Financeiro',            icon:'banknote' },
  ]},
  { group:'Subcontroles', items:[
    { id:'radios',         label:'Rádios',                icon:'radio' },
    { id:'crachas',        label:'Crachás',               icon:'contact' },
    { id:'alimentacao',    label:'Alimentação',           icon:'utensils' },
    { id:'carregadores',   label:'Carregadores',          icon:'hard-hat' },
    { id:'compras',        label:'Compras & Frete',       icon:'shopping-cart' },
    { id:'segurancas',     label:'Seguranças',            icon:'shield' },
    { id:'cv',             label:'Comunicação Visual',    icon:'image' },
  ]},
  { group:'Sistema', items:[
    { id:'config',         label:'Configurações',         icon:'settings' },
  ]},
];

export function currentGroupLabel(id) {
  for (const g of NAV) if (g.items.some(i => i.id === id)) return g.group;
  return 'Painel';
}
