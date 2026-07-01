import { currentGroupLabel } from '../nav.js';

/* Legenda de categorias usada pelas seções ainda fictícias */
const CATEGORIES = [
  { name:'Estrutura Geral', color:'var(--cat-estrutura)' },
  { name:'Técnica',         color:'var(--cat-tecnica)' },
  { name:'Cenografia',      color:'var(--cat-cenografia)' },
  { name:'Staff',           color:'var(--cat-staff)' },
  { name:'Maquinário',      color:'var(--cat-maquinario)' },
  { name:'Est. Eventual',   color:'var(--cat-eventual)' },
  { name:'Extras',          color:'var(--cat-extras)' },
];

/* Conteúdo dos estados vazios por seção */
const PLACEHOLDERS = {
  'demandas': {
    icon:'clipboard-list', title:'Demandas de produção',
    lead:'Aqui fica o quadro de itens da produção — categoria, fornecedor, responsável, status e prazo, puxados da Planilha de Trabalho.',
    feats:['Quadro Kanban por status de produção','Tabela com filtros por categoria e setor','Score de risco e prioridade por item'],
    action:'Conectar fonte de dados', legend:true,
  },
  'orcamentos': {
    icon:'circle-dollar-sign', title:'Orçamentos',
    lead:'Comparativo de cotações por item e fornecedor, acompanhando do orçado até o contratado.',
    feats:['Cotações lado a lado por item','Melhor preço por fornecedor','Saldo entre orçado e contratado'],
    action:'Conectar fonte de dados',
  },
  'cronograma': {
    icon:'calendar-range', title:'Cronograma',
    lead:'Linha do tempo da montagem por setor, da pré-produção ao dia do evento.',
    feats:['Gantt por setor e serviço','Marcos e contagem regressiva','Filtro de entrada por frente'],
    action:'Definir período',
  },
  'fornecedores': {
    icon:'package', title:'Fornecedores',
    lead:'Diretório de fornecedores com itens, valores e status de contrato.',
    feats:['Ficha por fornecedor','Histórico de contratações','Documentos e nota fiscal'],
    action:'Adicionar fornecedor',
  },
  'equipe': {
    icon:'users', title:'Equipe & Produtores',
    lead:'Quem cuida de cada frente — produtores, áreas de atuação e canaletas de rádio.',
    feats:['Produtores por área','Responsáveis por demanda','Canaletas e contatos'],
    action:'Adicionar pessoa',
  },
  'financeiro': {
    icon:'banknote', title:'Financeiro',
    lead:'Visão consolidada do empenhado, pago e saldo da produção.',
    feats:['Empenhado × pago por categoria','Status de pagamento por item','Notas fiscais emitidas'],
    action:'Conectar fonte de dados',
  },
  'radios': {
    icon:'radio', title:'Controle de rádios',
    lead:'Distribuição de rádios por responsável, função e localização.',
    feats:['Rádios por responsável','Status de devolução','Legenda por função'],
    action:'Registrar rádio',
  },
  'crachas': {
    icon:'contact', title:'Crachás',
    lead:'Lista de credenciamento — nome, foto, setor e número do crachá.',
    feats:['Credenciais por setor','Foto e nome de crachá','Exportar para impressão'],
    action:'Adicionar credencial',
  },
  'alimentacao': {
    icon:'utensils', title:'Alimentação',
    lead:'Controle de refeições por dia e frente, do almoço à janta.',
    feats:['Refeições por dia e turno','Contagem por frente','Histórico de consumo'],
    action:'Lançar refeição',
  },
  'carregadores': {
    icon:'hard-hat', title:'Carregadores',
    lead:'Demanda e realizado de carregadores por frente, fornecedor e dia.',
    feats:['Demanda × realizado','Programação por dia','Custo por frente'],
    action:'Programar diária',
  },
  'compras': {
    icon:'shopping-cart', title:'Compras & Frete',
    lead:'Lista de compras e solicitações de frete por material e solicitante.',
    feats:['Itens de compra com valor','Solicitações de frete','Por solicitante e local'],
    action:'Nova solicitação',
  },
  'segurancas': {
    icon:'shield', title:'Seguranças',
    lead:'Escala de segurança — tipo, carga horária, horários e datas.',
    feats:['Escala por tipo e turno','Carga horária por dia','Custo da operação'],
    action:'Adicionar escala',
  },
  'cv': {
    icon:'image', title:'Comunicação Visual',
    lead:'Peças de CV por localização, material, medida e status de entrega.',
    feats:['Peças por localização','Material e acabamento','Status de entrega e arquivo'],
    action:'Adicionar peça',
  },
  'config': {
    icon:'settings', title:'Configurações',
    lead:'Tema, fontes de dados, integrações e preferências do painel.',
    feats:['Fontes de dados e integrações','Cores e tipografia','Membros e permissões'],
    action:'Gerenciar integrações',
  },
};

function renderPlaceholder(id){
  const p = PLACEHOLDERS[id];
  const feats = p.feats.map(f =>
    `<div class="empty-feat"><i data-lucide="clock"></i>${f}</div>`).join('');

  const legend = p.legend ? `
    <div class="cat-legend">
      ${CATEGORIES.map(c => `<span class="cat-chip"><span class="cat-dot" style="background:${c.color}"></span>${c.name}</span>`).join('')}
    </div>` : '';

  return `
  <div class="view-head">
    <div class="view-eyebrow">${currentGroupLabel(id)}</div>
    <h1 class="view-title">${p.title}</h1>
    <p class="view-desc">${p.lead}</p>
  </div>

  <div class="empty">
    <div class="empty-ico"><i data-lucide="${p.icon}"></i></div>
    <div class="empty-title">Em construção</div>
    <p class="empty-lead">Esta seção ainda não tem dados. Veja o que vem por aqui:</p>
    <div class="empty-features">${feats}</div>
    <button class="empty-action" data-toast="Disponível na próxima fase do painel."><i data-lucide="plug"></i>${p.action}</button>
    ${legend}
  </div>`;
}

export function registerPlaceholderPages(registerPage){
  Object.keys(PLACEHOLDERS).forEach(id => {
    registerPage({ id, render: () => renderPlaceholder(id) });
  });
}
