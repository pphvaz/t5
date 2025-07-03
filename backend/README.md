# 🐾 Pet Shop API - Backend

Backend da API para sistema de gerenciamento de pet shops, desenvolvido com **Node.js + Express + TypeScript + Sequelize + SQLite**.

## 🚀 Funcionalidades da API

- ✅ **CRUD Completo** para Clientes, Pets, Produtos, Serviços
- ✅ **Controle de Consumo** de produtos e serviços
- ✅ **Relatórios e Analytics** diversos
- ✅ **Validações** de dados
- ✅ **Banco de dados SQLite** com Sequelize ORM
- ✅ **CORS** configurado para frontend

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **CORS** - Cross-origin resource sharing

## 📋 Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**

## 🚀 Instalação e Execução

### **1. Instalar dependências**
```bash
cd atvv/backend
npm install
```

### **2. Compilar TypeScript**
```bash
npm run build
```

### **3. Iniciar servidor**
```bash
npm start
```

**API estará disponível em:** http://localhost:3000

## 🔌 Endpoints da API

### **Health Check**
- `GET /health` - Status da API

### **Clientes** (`/api/clientes`)
- `GET /api/clientes` - Listar todos os clientes
- `POST /api/clientes` - Criar novo cliente
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Excluir cliente
- `GET /api/clientes/:cpf/pets` - Pets do cliente
- `GET /api/clientes/:cpf/consumo` - Consumo do cliente

### **Pets** (`/api/pets`)
- `GET /api/pets` - Listar todos os pets
- `POST /api/pets` - Cadastrar novo pet
- `PUT /api/pets/:id` - Atualizar pet
- `DELETE /api/pets/:id` - Excluir pet

### **Produtos** (`/api/produtos`)
- `GET /api/produtos` - Listar produtos
- `POST /api/produtos` - Cadastrar produto
- `PUT /api/produtos/:nome` - Atualizar produto
- `DELETE /api/produtos/:nome` - Excluir produto

### **Serviços** (`/api/servicos`)
- `GET /api/servicos` - Listar serviços
- `POST /api/servicos` - Cadastrar serviço
- `PUT /api/servicos/:nome` - Atualizar serviço
- `DELETE /api/servicos/:nome` - Excluir serviço

### **Consumo** (`/api/consumo`)
- `POST /api/consumo/produto` - Registrar consumo de produto
- `POST /api/consumo/servico` - Registrar consumo de serviço

### **Relatórios** (`/api/listagens`)
- `GET /api/listagens/top10-clientes-quantidade`
- `GET /api/listagens/top5-clientes-valor`
- `GET /api/listagens/produtos-mais-consumidos`
- `GET /api/listagens/servicos-mais-consumidos`
- `GET /api/listagens/consumo-por-tipo-raca`

## 💾 Banco de Dados

- **Arquivo:** `database.sqlite`
- **ORM:** Sequelize
- **Migrations:** Automáticas via `sequelize.sync()`

### **Tabelas:**
- `Clientes` - Dados dos clientes
- `Pets` - Pets dos clientes
- `Produtos` - Produtos do pet shop
- `Servicos` - Serviços oferecidos
- `Consumos` - Registro de consumos

## 🧪 Testes da API

### **Health Check**
```bash
curl http://localhost:3000/health
```

### **Listar Clientes**
```bash
curl http://localhost:3000/api/clientes
```

### **Criar Cliente**
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "rg": "12.345.678-9",
    "telefone": "(11) 99999-9999"
  }'
```

### **Criar Pet**
```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "cpfCliente": "123.456.789-00",
    "nome": "Rex",
    "tipo": "Cachorro",
    "raca": "Golden Retriever",
    "genero": "Macho"
  }'
```

## 🔧 Scripts Disponíveis

```bash
npm run build      # Compilar TypeScript
npm start          # Iniciar servidor
npm run dev        # Desenvolvimento com hot reload
```

## 📊 Estrutura do Projeto

```
backend/
├── src/
│   ├── api/
│   │   ├── controllers/    # Controllers da API
│   │   ├── routes/         # Rotas da API
│   │   └── server.ts       # Servidor Express
│   ├── modelo/
│   │   ├── *.ts           # Models Sequelize
│   │   ├── associations.ts # Associações entre models
│   │   └── db.ts          # Configuração do banco
│   └── negocio/           # Lógica de negócio
├── database.sqlite        # Banco de dados
├── package.json
└── tsconfig.json
```

## 🐛 Troubleshooting

### **Porta 3000 em uso:**
```bash
lsof -i :3000
kill -9 <PID>
```

### **Erro de dependências:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Erro de compilação:**
```bash
npm run build
```

## 📝 Exemplos de Resposta

### **Sucesso**
```json
{
  "success": true,
  "data": { ... }
}
```

### **Erro**
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

---

**Backend 100% funcional e integrado com o frontend React!** 🚀 