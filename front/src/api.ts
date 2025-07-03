const API_BASE_URL = '/api';

// Função auxiliar para fazer requisições HTTP
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('Fazendo requisição para:', url, 'com opções:', options);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  console.log('Resposta recebida:', response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erro na resposta:', errorText);
    throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  console.log('Dados recebidos:', data);
  return data;
}

// Clientes
export const clientesApi = {
  listar: () => apiRequest('/clientes'),
  buscarPorId: (id: number) => apiRequest(`/clientes/${id}`),
  buscarPorCpf: (cpf: string) => apiRequest(`/clientes/cpf/${cpf}`),
  criar: (cliente: any) => {
    console.log('=== API: CRIAR CLIENTE ===');
    console.log('Cliente recebido na API:', cliente);
    console.log('JSON stringificado:', JSON.stringify(cliente));
    return apiRequest('/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
    });
  },
  atualizar: (id: number, cliente: any) => apiRequest(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cliente),
  }),
  excluir: (id: number) => apiRequest(`/clientes/${id}`, {
    method: 'DELETE',
  }),
  listarPets: (cpf: string) => apiRequest(`/clientes/${cpf}/pets`),
  listarConsumo: (cpf: string) => apiRequest(`/clientes/${cpf}/consumo`),
};

// Pets
export const petsApi = {
  listar: () => apiRequest('/pets'),
  buscarPorId: (id: number) => apiRequest(`/pets/${id}`),
  criar: (pet: any) => apiRequest('/pets', {
    method: 'POST',
    body: JSON.stringify(pet),
  }),
  atualizar: (id: number, pet: any) => apiRequest(`/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(pet),
  }),
  excluir: (id: number) => apiRequest(`/pets/${id}`, {
    method: 'DELETE',
  }),
  listarPorCliente: (cpf: string) => apiRequest(`/pets/cliente/${cpf}`),
};

// Produtos
export const produtosApi = {
  listar: () => apiRequest('/produtos'),
  buscarPorNome: (nome: string) => apiRequest(`/produtos/${nome}`),
  criar: (produto: any) => apiRequest('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto),
  }),
  atualizar: (nome: string, produto: any) => apiRequest(`/produtos/${nome}`, {
    method: 'PUT',
    body: JSON.stringify(produto),
  }),
  excluir: (nome: string) => apiRequest(`/produtos/${nome}`, {
    method: 'DELETE',
  }),
};

// Serviços
export const servicosApi = {
  listar: () => apiRequest('/servicos'),
  buscarPorNome: (nome: string) => apiRequest(`/servicos/${nome}`),
  criar: (servico: any) => apiRequest('/servicos', {
    method: 'POST',
    body: JSON.stringify(servico),
  }),
  atualizar: (nome: string, servico: any) => apiRequest(`/servicos/${nome}`, {
    method: 'PUT',
    body: JSON.stringify(servico),
  }),
  excluir: (nome: string) => apiRequest(`/servicos/${nome}`, {
    method: 'DELETE',
  }),
};

// Consumo
export const consumoApi = {
  registrarProduto: (consumo: any) => apiRequest('/consumo/produto', {
    method: 'POST',
    body: JSON.stringify(consumo),
  }),
  registrarServico: (consumo: any) => apiRequest('/consumo/servico', {
    method: 'POST',
    body: JSON.stringify(consumo),
  }),
};

// Listagens/Relatórios
export const listagensApi = {
  top10ClientesPorQuantidade: () => apiRequest('/listagens/top10-clientes-quantidade'),
  top5ClientesPorValor: () => apiRequest('/listagens/top5-clientes-valor'),
  produtosMaisConsumidos: () => apiRequest('/listagens/produtos-mais-consumidos'),
  servicosMaisConsumidos: () => apiRequest('/listagens/servicos-mais-consumidos'),
  consumoPorTipoRaca: () => apiRequest('/listagens/consumo-por-tipo-raca'),
}; 