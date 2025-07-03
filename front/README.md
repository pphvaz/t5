# 🐾 Pet Shop Frontend - React

Frontend do sistema de gerenciamento de pet shops, desenvolvido com **React + TypeScript + Tailwind CSS**.

## 🚀 Funcionalidades

- ✅ **Interface Moderna** com Tailwind CSS
- ✅ **CRUD Completo** para todas as entidades
- ✅ **Formulários Validados** com feedback visual
- ✅ **Loading States** e Error Handling
- ✅ **Responsivo** para diferentes dispositivos
- ✅ **Integração Completa** com API REST

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **Fetch API** - Comunicação com backend
- **React Router** - Navegação (se necessário)

## 📋 Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**
- **Backend rodando** na porta 3000

## 🚀 Instalação e Execução

### **1. Instalar dependências**
```bash
cd atvv/front
npm install
```

### **2. Iniciar servidor de desenvolvimento**
```bash
npm start
```

**Frontend estará disponível em:** http://localhost:3001

## 📊 Estrutura do Projeto

```
front/
├── src/
│   ├── componentes/        # Componentes React
│   │   ├── barraNavegacao.tsx
│   │   ├── formularioCadastroCliente.tsx
│   │   ├── formularioCadastroPet.tsx
│   │   ├── formularioCadastroProduto.tsx
│   │   ├── formularioCadastroServico.tsx
│   │   ├── formularioCadastroConsumo.tsx
│   │   ├── listaClientes.tsx
│   │   ├── listaPets.tsx
│   │   ├── listaProdutos.tsx
│   │   ├── listaServicos.tsx
│   │   ├── listaConsumos.tsx
│   │   └── relatorios.tsx
│   ├── types/              # Tipos TypeScript
│   │   ├── cliente.ts
│   │   ├── pet.ts
│   │   ├── produto.ts
│   │   ├── servico.ts
│   │   └── consumo.ts
│   ├── api.ts              # Serviço de API
│   ├── App.tsx             # Componente principal
│   └── index.tsx           # Ponto de entrada
├── public/                 # Arquivos públicos
└── package.json
```

## 🎨 Componentes Principais

### **App.tsx**
- Componente principal com roteamento
- Gerenciamento de estado global
- Integração com API

### **Formulários**
- `FormularioCadastroCliente` - Cadastro/edição de clientes
- `FormularioCadastroPet` - Cadastro/edição de pets
- `FormularioCadastroProduto` - Cadastro/edição de produtos
- `FormularioCadastroServico` - Cadastro/edição de serviços
- `FormularioCadastroConsumo` - Registro de consumos

### **Listas**
- `ListaClientes` - Listagem de clientes com ações
- `ListaPets` - Listagem de pets com ações
- `ListaProdutos` - Listagem de produtos com ações
- `ListaServicos` - Listagem de serviços com ações
- `ListaConsumos` - Listagem de consumos

### **Relatórios**
- `Relatorios` - Visualização de relatórios e analytics

## 🔌 Integração com API

### **api.ts**
Serviço centralizado para comunicação com o backend:

```typescript
// Exemplo de uso
import { clientesApi } from './api';

// Listar clientes
const clientes = await clientesApi.listar();

// Criar cliente
const novoCliente = await clientesApi.criar({
  nome: "João Silva",
  cpf: "123.456.789-00",
  rg: "12.345.678-9",
  telefone: "(11) 99999-9999"
});
```

### **Endpoints Utilizados**
- `/api/clientes` - Gestão de clientes
- `/api/pets` - Gestão de pets
- `/api/produtos` - Gestão de produtos
- `/api/servicos` - Gestão de serviços
- `/api/consumo` - Registro de consumos
- `/api/listagens` - Relatórios

## 🎨 Design System

### **Tailwind CSS**
- Design responsivo
- Componentes reutilizáveis
- Tema consistente

### **Cores Principais**
- **Primária**: Indigo (`bg-indigo-600`)
- **Secundária**: Purple (`bg-purple-600`)
- **Sucesso**: Green (`bg-green-500`)
- **Erro**: Red (`text-red-600`)
- **Aviso**: Yellow (`bg-yellow-500`)

### **Componentes UI**
- Formulários com validação
- Tabelas responsivas
- Botões com estados
- Loading spinners
- Alertas e notificações

## 🔧 Scripts Disponíveis

```bash
npm start          # Servidor de desenvolvimento
npm run build      # Build de produção
npm test           # Executar testes
npm run eject      # Ejetar configurações (irreversível)
```

## 🧪 Como Testar

### **1. Verificar se o backend está rodando**
```bash
curl http://localhost:3000/health
```

### **2. Acessar o frontend**
1. Abra: http://localhost:3001
2. Navegue pelas seções do menu
3. Teste cadastros, edições e exclusões

### **3. Testar funcionalidades**
- ✅ Cadastrar cliente
- ✅ Cadastrar pet
- ✅ Cadastrar produto
- ✅ Cadastrar serviço
- ✅ Registrar consumo
- ✅ Visualizar relatórios

## 🐛 Troubleshooting

### **Frontend não conecta ao backend:**
- Verificar se backend está rodando na porta 3000
- Verificar proxy no `package.json`
- Verificar CORS no backend

### **Erro de dependências:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Erro de compilação:**
```bash
npm run build
```

### **Porta 3001 em uso:**
```bash
lsof -i :3001
kill -9 <PID>
```

## 📱 Responsividade

O frontend é totalmente responsivo:

- **Desktop** (> 1024px) - Layout completo
- **Tablet** (768px - 1024px) - Layout adaptado
- **Mobile** (< 768px) - Layout mobile-first

## 🔒 Validações

### **Formulários**
- Campos obrigatórios
- Validação de CPF
- Validação de telefone
- Validação de email (quando aplicável)

### **Feedback Visual**
- Loading states
- Error messages
- Success confirmations
- Form validation

## 🎯 Performance

- **Lazy loading** de componentes
- **Memoização** de componentes pesados
- **Otimização** de re-renders
- **Bundle splitting** automático

---

**Frontend 100% funcional e integrado com o backend!** 🚀
