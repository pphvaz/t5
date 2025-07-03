import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clienteRoutes';
import petRoutes from './routes/petRoutes';
import produtoRoutes from './routes/produtoRoutes';
import servicoRoutes from './routes/servicoRoutes';
import consumoRoutes from './routes/consumoRoutes';
import listagemRoutes from './routes/listagemRoutes';
import sequelize from '../modelo/db';
import '../modelo/associations'; // Importar associações

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/clientes', clienteRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/consumo', consumoRoutes);
app.use('/api/listagens', listagemRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Pet Shop API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      pets: '/api/pets',
      produtos: '/api/produtos',
      servicos: '/api/servicos',
      consumo: '/api/consumo',
      listagens: '/api/listagens'
    }
  });
});

// Sincronizar banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado!');
}).catch((err) => {
  console.error('Erro ao sincronizar o banco:', err);
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Pet Shop API server running on port ${PORT}`);
  console.log(`📖 API Documentation available at http://localhost:${PORT}`);
}); 