// Mock API data for the dynamic application
export const menuData = [
  {
    programa: "financeiro",
    modulo: "clientes",
    acoes: ["listar", "cadastrar"],
    icon: "UserOutlined",
    columns: [
      { title: "ID", dataIndex: "id", sorter: true },
      { title: "Nome", dataIndex: "nome", sorter: true },
      { title: "Email", dataIndex: "email" },
      { title: "Status", dataIndex: "status", render: "status" }
    ],
    filters: [
      { type: "input", name: "nome", label: "Nome" },
      { type: "select", name: "status", label: "Status", options: ["Ativo", "Inativo"] }
    ]
  },
  {
    programa: "financeiro",
    modulo: "fornecedores",
    acoes: ["listar", "cadastrar"],
    icon: "ShopOutlined",
    columns: [
      { title: "ID", dataIndex: "id", sorter: true },
      { title: "Razão Social", dataIndex: "razaoSocial", sorter: true },
      { title: "CNPJ", dataIndex: "cnpj" },
      { title: "Telefone", dataIndex: "telefone" },
      { title: "Status", dataIndex: "status", render: "status" }
    ],
    filters: [
      { type: "input", name: "razaoSocial", label: "Razão Social" },
      { type: "input", name: "cnpj", label: "CNPJ" },
      { type: "select", name: "status", label: "Status", options: ["Ativo", "Inativo"] }
    ]
  },
  {
    programa: "estoque",
    modulo: "produtos",
    acoes: ["listar", "cadastrar"],
    icon: "ShoppingOutlined",
    columns: [
      { title: "ID", dataIndex: "id", sorter: true },
      { title: "Nome", dataIndex: "nome", sorter: true },
      { title: "Categoria", dataIndex: "categoria" },
      { title: "Preço", dataIndex: "preco", render: "currency" },
      { title: "Estoque", dataIndex: "estoque", sorter: true }
    ],
    filters: [
      { type: "input", name: "nome", label: "Nome do Produto" },
      { type: "select", name: "categoria", label: "Categoria", options: ["Eletrônicos", "Roupas", "Casa", "Livros"] },
      { type: "range", name: "preco", label: "Faixa de Preço" }
    ]
  },
  {
    programa: "estoque",
    modulo: "categorias",
    acoes: ["listar", "cadastrar"],
    icon: "TagsOutlined",
    columns: [
      { title: "ID", dataIndex: "id", sorter: true },
      { title: "Nome", dataIndex: "nome", sorter: true },
      { title: "Descrição", dataIndex: "descricao" },
      { title: "Produtos", dataIndex: "produtos", sorter: true }
    ],
    filters: [
      { type: "input", name: "nome", label: "Nome da Categoria" }
    ]
  },
  {
    programa: "vendas",
    modulo: "pedidos",
    acoes: ["listar", "cadastrar"],
    icon: "FileTextOutlined",
    columns: [
      { title: "ID", dataIndex: "id", sorter: true },
      { title: "Cliente", dataIndex: "cliente", sorter: true },
      { title: "Data", dataIndex: "data", render: "date" },
      { title: "Total", dataIndex: "total", render: "currency" },
      { title: "Status", dataIndex: "status", render: "status" }
    ],
    filters: [
      { type: "input", name: "cliente", label: "Cliente" },
      { type: "dateRange", name: "data", label: "Período" },
      { type: "select", name: "status", label: "Status", options: ["Pendente", "Processando", "Enviado", "Entregue", "Cancelado"] }
    ]
  }
];

export const clientesData = [
  { id: 1, nome: "Maria Silva", email: "maria@email.com", status: "Ativo" },
  { id: 2, nome: "João Souza", email: "joao@email.com", status: "Inativo" },
  { id: 3, nome: "Ana Costa", email: "ana@email.com", status: "Ativo" },
  { id: 4, nome: "Pedro Santos", email: "pedro@email.com", status: "Ativo" },
  { id: 5, nome: "Lucia Ferreira", email: "lucia@email.com", status: "Inativo" }
];

export const fornecedoresData = [
  { id: 1, razaoSocial: "Tech Solutions LTDA", cnpj: "12.345.678/0001-90", telefone: "(11) 1234-5678", status: "Ativo" },
  { id: 2, razaoSocial: "Supply Corp", cnpj: "98.765.432/0001-10", telefone: "(11) 8765-4321", status: "Ativo" },
  { id: 3, razaoSocial: "Materials Inc", cnpj: "11.222.333/0001-44", telefone: "(11) 1111-2222", status: "Inativo" }
];

export const produtosData = [
  { id: 1, nome: "Smartphone Samsung", categoria: "Eletrônicos", preco: 1299.99, estoque: 45 },
  { id: 2, nome: "Camiseta Básica", categoria: "Roupas", preco: 39.90, estoque: 120 },
  { id: 3, nome: "Mesa de Escritório", categoria: "Casa", preco: 599.99, estoque: 8 },
  { id: 4, nome: "Livro - JavaScript", categoria: "Livros", preco: 89.90, estoque: 30 },
  { id: 5, nome: "Notebook Dell", categoria: "Eletrônicos", preco: 2599.99, estoque: 12 }
];

export const categoriasData = [
  { id: 1, nome: "Eletrônicos", descricao: "Produtos eletrônicos e tecnologia", produtos: 156 },
  { id: 2, nome: "Roupas", descricao: "Vestuário e acessórios", produtos: 89 },
  { id: 3, nome: "Casa", descricao: "Móveis e decoração", produtos: 45 },
  { id: 4, nome: "Livros", descricao: "Livros e material educativo", produtos: 78 }
];

export const pedidosData = [
  { id: 1001, cliente: "Maria Silva", data: "2024-01-15", total: 1299.99, status: "Entregue" },
  { id: 1002, cliente: "João Souza", data: "2024-01-16", total: 39.90, status: "Processando" },
  { id: 1003, cliente: "Ana Costa", data: "2024-01-17", total: 599.99, status: "Enviado" },
  { id: 1004, cliente: "Pedro Santos", data: "2024-01-18", total: 89.90, status: "Pendente" },
  { id: 1005, cliente: "Lucia Ferreira", data: "2024-01-19", total: 2599.99, status: "Cancelado" }
];

const dataMap: Record<string, any[]> = {
  "financeiro/clientes": clientesData,
  "financeiro/fornecedores": fornecedoresData,
  "estoque/produtos": produtosData,
  "estoque/categorias": categoriasData,
  "vendas/pedidos": pedidosData
};

// Mock API functions
export const getMenu = async (): Promise<typeof menuData> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return menuData;
};

export const getListData = async (programa: string, modulo: string, filters?: Record<string, any>): Promise<any[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const key = `${programa}/${modulo}`;
  let data = dataMap[key] || [];
  
  if (filters) {
    data = data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        const itemValue = item[key];
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        if (typeof itemValue === 'number') {
          return itemValue.toString().includes(value.toString());
        }
        return itemValue === value;
      });
    });
  }
  
  return data;
};