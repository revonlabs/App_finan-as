export interface Category {
  label: string
  value: string
  type: 'receita' | 'despesa'
  parent?: string
  color: string
}

export const DESPESAS_CATEGORIES: Category[] = [
  // Operacionais - Pessoal
  { label: 'Salários e Encargos', value: 'salarios_encargos', type: 'despesa', parent: 'Pessoal', color: '#4A90E2' },
  { label: 'Benefícios', value: 'beneficios', type: 'despesa', parent: 'Pessoal', color: '#4A90E2' },
  { label: 'Treinamentos e Desenvolvimento', value: 'treinamentos', type: 'despesa', parent: 'Pessoal', color: '#4A90E2' },
  { label: 'Recrutamento', value: 'recrutamento', type: 'despesa', parent: 'Pessoal', color: '#4A90E2' },
  // Operacionais - Transporte
  { label: 'Combustível', value: 'combustivel', type: 'despesa', parent: 'Transporte', color: '#7E57C2' },
  { label: 'Manutenção de Veículos', value: 'manutencao_veiculos', type: 'despesa', parent: 'Transporte', color: '#7E57C2' },
  // Operacionais - Administrativo
  { label: 'Aluguel/Imóvel', value: 'aluguel', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  { label: 'Energia Elétrica', value: 'energia', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  { label: 'Água e Saneamento', value: 'agua', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  { label: 'Internet e Telefone', value: 'internet_telefone', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  { label: 'Material de Escritório', value: 'material_escritorio', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  { label: 'Limpeza e Manutenção', value: 'limpeza_manutencao', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  { label: 'Seguros', value: 'seguros', type: 'despesa', parent: 'Administrativo', color: '#00B8D4' },
  // Operacionais - Tecnologia
  { label: 'Software e Licenças', value: 'software_licencas', type: 'despesa', parent: 'Tecnologia e TI', color: '#3BFFA0' },
  { label: 'Infraestrutura IT', value: 'infraestrutura_ti', type: 'despesa', parent: 'Tecnologia e TI', color: '#3BFFA0' },
  { label: 'Suporte Técnico', value: 'suporte_tecnico', type: 'despesa', parent: 'Tecnologia e TI', color: '#3BFFA0' },
  { label: 'Hardware', value: 'hardware', type: 'despesa', parent: 'Tecnologia e TI', color: '#3BFFA0' },
  // Operacionais - Marketing
  { label: 'Publicidade Digital', value: 'publicidade_digital', type: 'despesa', parent: 'Marketing e Vendas', color: '#CE59B2' },
  { label: 'Publicidade Offline', value: 'publicidade_offline', type: 'despesa', parent: 'Marketing e Vendas', color: '#CE59B2' },
  { label: 'Comissões de Vendas', value: 'comissoes_vendas', type: 'despesa', parent: 'Marketing e Vendas', color: '#CE59B2' },
  { label: 'Eventos e Feiras', value: 'eventos_feiras', type: 'despesa', parent: 'Marketing e Vendas', color: '#CE59B2' },
  { label: 'Material de Marketing', value: 'material_marketing', type: 'despesa', parent: 'Marketing e Vendas', color: '#CE59B2' },
  // Operacionais - Serviços
  { label: 'Consultoria', value: 'consultoria', type: 'despesa', parent: 'Serviços e Terceirizados', color: '#FF7043' },
  { label: 'Auditoria', value: 'auditoria', type: 'despesa', parent: 'Serviços e Terceirizados', color: '#FF7043' },
  { label: 'Segurança', value: 'seguranca', type: 'despesa', parent: 'Serviços e Terceirizados', color: '#FF7043' },
  { label: 'Limpeza Terceirizada', value: 'limpeza_terceirizada', type: 'despesa', parent: 'Serviços e Terceirizados', color: '#FF7043' },
  { label: 'Serviços Gerais', value: 'servicos_gerais', type: 'despesa', parent: 'Serviços e Terceirizados', color: '#FF7043' },
  // Financeiras
  { label: 'Juros de Empréstimos', value: 'juros_emprestimos', type: 'despesa', parent: 'Financeiras', color: '#FFAB40' },
  { label: 'Juros de Financiamentos', value: 'juros_financiamentos', type: 'despesa', parent: 'Financeiras', color: '#FFAB40' },
  { label: 'Taxas Bancárias', value: 'taxas_bancarias', type: 'despesa', parent: 'Financeiras', color: '#FFAB40' },
  { label: 'Câmbio e Operações Cambiais', value: 'cambio', type: 'despesa', parent: 'Financeiras', color: '#FFAB40' },
  { label: 'Multas e Juros', value: 'multas_juros', type: 'despesa', parent: 'Financeiras', color: '#FFAB40' },
  { label: 'Descontos Concedidos', value: 'descontos_concedidos', type: 'despesa', parent: 'Financeiras', color: '#FFAB40' },
  // Não Operacionais
  { label: 'Perdas com Inventário', value: 'perdas_inventario', type: 'despesa', parent: 'Não Operacionais', color: '#8BACD4' },
  { label: 'Doações', value: 'doacoes', type: 'despesa', parent: 'Não Operacionais', color: '#8BACD4' },
  { label: 'Processos Legais', value: 'processos_legais', type: 'despesa', parent: 'Não Operacionais', color: '#8BACD4' },
  { label: 'Obsolescência de Ativos', value: 'obsolescencia', type: 'despesa', parent: 'Não Operacionais', color: '#8BACD4' },
  { label: 'Outros (Despesas)', value: 'outros_despesas', type: 'despesa', parent: 'Não Operacionais', color: '#8BACD4' },
  // Investimentos/Capital
  { label: 'Aquisição de Equipamentos', value: 'aquisicao_equipamentos', type: 'despesa', parent: 'Investimentos/Capital', color: '#00D4AA' },
  { label: 'Sistemas de TI', value: 'sistemas_ti', type: 'despesa', parent: 'Investimentos/Capital', color: '#00D4AA' },
  { label: 'Veículos', value: 'veiculos', type: 'despesa', parent: 'Investimentos/Capital', color: '#00D4AA' },
]

export const RECEITAS_CATEGORIES: Category[] = [
  // Operacionais
  { label: 'Vendas de Produtos', value: 'vendas_produtos', type: 'receita', parent: 'Receitas Operacionais', color: '#3BFFA0' },
  { label: 'Vendas de Serviços', value: 'vendas_servicos', type: 'receita', parent: 'Receitas Operacionais', color: '#3BFFA0' },
  { label: 'Comissões Recebidas', value: 'comissoes_recebidas', type: 'receita', parent: 'Receitas Operacionais', color: '#3BFFA0' },
  { label: 'Descontos Obtidos', value: 'descontos_obtidos', type: 'receita', parent: 'Receitas Operacionais', color: '#3BFFA0' },
  // Financeiras
  { label: 'Juros Recebidos', value: 'juros_recebidos', type: 'receita', parent: 'Receitas Financeiras', color: '#4A90E2' },
  { label: 'Rendimento de Aplicações', value: 'rendimento_aplicacoes', type: 'receita', parent: 'Receitas Financeiras', color: '#4A90E2' },
  { label: 'Ganho Cambial', value: 'ganho_cambial', type: 'receita', parent: 'Receitas Financeiras', color: '#4A90E2' },
  // Não Operacionais
  { label: 'Venda de Ativos', value: 'venda_ativos', type: 'receita', parent: 'Receitas Não Operacionais', color: '#7E57C2' },
  { label: 'Ganhos Ocasionais', value: 'ganhos_ocasionais', type: 'receita', parent: 'Receitas Não Operacionais', color: '#7E57C2' },
  { label: 'Outros (Receitas)', value: 'outros_receitas', type: 'receita', parent: 'Receitas Não Operacionais', color: '#7E57C2' },
]

export const ALL_CATEGORIES = [...RECEITAS_CATEGORIES, ...DESPESAS_CATEGORIES]

export function getCategoryLabel(value: string): string {
  const cat = ALL_CATEGORIES.find(c => c.value === value)
  return cat ? cat.label : value
}

export function getCategoryColor(value: string): string {
  const cat = ALL_CATEGORIES.find(c => c.value === value)
  return cat ? cat.color : '#8BACD4'
}

export function getCategoriesByType(type: 'receita' | 'despesa'): Category[] {
  return type === 'receita' ? RECEITAS_CATEGORIES : DESPESAS_CATEGORIES
}

export function groupCategoriesByParent(categories: Category[]): Record<string, Category[]> {
  return categories.reduce((acc, cat) => {
    const parent = cat.parent || 'Outros'
    if (!acc[parent]) acc[parent] = []
    acc[parent].push(cat)
    return acc
  }, {} as Record<string, Category[]>)
}
