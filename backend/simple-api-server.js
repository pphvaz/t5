const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mock para teste
let clientes = [
    {
        id: 1,
        nome: "João Silva",
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        telefone: "(11) 99999-9999",
        dataCadastro: new Date().toISOString()
    },
    {
        id: 2,
        nome: "Maria Santos",
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        telefone: "(11) 88888-8888",
        dataCadastro: new Date().toISOString()
    }
];

let pets = [
    {
        id: 1,
        nome: "Rex",
        tipo: "Cachorro",
        raca: "Labrador",
        genero: "Macho",
        dono: { nome: "João Silva" }
    },
    {
        id: 2,
        nome: "Mimi",
        tipo: "Gato",
        raca: "Persa",
        genero: "Fêmea",
        dono: { nome: "Maria Santos" }
    }
];

let produtos = [
    { nome: "Ração Premium", preco: 50.00, estoque: 100 },
    { nome: "Brinquedo", preco: 25.00, estoque: 50 }
];

let servicos = [
    { nome: "Banho e Tosa", preco: 80.00 },
    { nome: "Consulta Veterinária", preco: 120.00 }
];

// Rotas da API
app.get('/', (req, res) => {
    res.json({ 
        message: 'API do Pet Shop funcionando!',
        version: '1.0.0',
        endpoints: {
            clientes: '/api/clientes',
            pets: '/api/pets',
            produtos: '/api/produtos',
            servicos: '/api/servicos'
        }
    });
});

// Rotas de Clientes
app.get('/api/clientes', (req, res) => {
    res.json({ success: true, data: clientes });
});

app.get('/api/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (cliente) {
        res.json({ success: true, data: cliente });
    } else {
        res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
});

app.post('/api/clientes', (req, res) => {
    const novoCliente = {
        id: clientes.length + 1,
        ...req.body,
        dataCadastro: new Date().toISOString()
    };
    clientes.push(novoCliente);
    res.status(201).json({ success: true, data: novoCliente });
});

app.put('/api/clientes/:id', (req, res) => {
    const index = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        clientes[index] = { ...clientes[index], ...req.body };
        res.json({ success: true, data: clientes[index] });
    } else {
        res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
});

app.delete('/api/clientes/:id', (req, res) => {
    const index = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        clientes.splice(index, 1);
        res.json({ success: true, message: 'Cliente excluído com sucesso' });
    } else {
        res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
});

// Rotas de Pets
app.get('/api/pets', (req, res) => {
    res.json({ success: true, data: pets });
});

app.get('/api/pets/:id', (req, res) => {
    const pet = pets.find(p => p.id === parseInt(req.params.id));
    if (pet) {
        res.json({ success: true, data: pet });
    } else {
        res.status(404).json({ success: false, message: 'Pet não encontrado' });
    }
});

app.post('/api/pets', (req, res) => {
    const novoPet = {
        id: pets.length + 1,
        ...req.body
    };
    pets.push(novoPet);
    res.status(201).json({ success: true, data: novoPet });
});

app.put('/api/pets/:id', (req, res) => {
    const index = pets.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        pets[index] = { ...pets[index], ...req.body };
        res.json({ success: true, data: pets[index] });
    } else {
        res.status(404).json({ success: false, message: 'Pet não encontrado' });
    }
});

app.delete('/api/pets/:id', (req, res) => {
    const index = pets.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        pets.splice(index, 1);
        res.json({ success: true, message: 'Pet excluído com sucesso' });
    } else {
        res.status(404).json({ success: false, message: 'Pet não encontrado' });
    }
});

// Rotas de Produtos
app.get('/api/produtos', (req, res) => {
    res.json({ success: true, data: produtos });
});

// Rotas de Serviços
app.get('/api/servicos', (req, res) => {
    res.json({ success: true, data: servicos });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando' });
});

app.listen(PORT, () => {
    console.log(`🚀 API do Pet Shop rodando na porta ${PORT}`);
    console.log(`📖 Acesse: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
}); 